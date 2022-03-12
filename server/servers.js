//See https://github.com/elad/node-cluster-socket.io

const express = require('express');
const cluster = require('cluster');
const net = require('net');
const socketio = require('socket.io');
const socketMain = require('./socketMain');

const port = 8181;
const numProcesses = require('os').cpus().length;
const ioRedis = require('socket.io-redis');
const farmhash = require('farmhash');

if (cluster.isMaster) {
	// This stores our workers. We need to keep them to be able to reference
	// them based on source IP address. It's also useful for auto-restart
	let workers = [];

	// Helper function for spawning worker at index 'i'.
	let spawn = function(i) {
		workers[i] = cluster.fork();

		// Optional: Restart worker on exit
		workers[i].on('exit', function(code, signal) {
			spawn(i);
		});
    };

    // Spawn workers.
	for (var i = 0; i < numProcesses; i++) {
		spawn(i);
	}

	const workerIndex = function(ip, len) {
		return farmhash.fingerprint32(ip) % len; 
	};

	const server = net.createServer({ pauseOnConnect: true }, (connection) =>{
		let worker = workers[workerIndex(connection.remoteAddress, numProcesses)];
		worker.send('sticky-session:connection', connection);
    });
    server.listen(port);
    console.log(`Master listening on port ${port}`);
} else {
    let app = express();

    const server = app.listen(0, 'localhost');
	const io = socketio(server);

	io.adapter(ioRedis({ host: 'localhost', port: 6379 }));
    io.on('connection', function(socket) {
		socketMain(io,socket);
		console.log(`connected to worker: ${cluster.worker.id}`);
    });

	process.on('message', function(message, connection) {
		if (message !== 'sticky-session:connection') {
			return;
		}

		server.emit('connection', connection);

		connection.resume();
	});
}
