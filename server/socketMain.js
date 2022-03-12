const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/perfData', { useNewUrlParser: true });

const Machine = require('./models/Machine');

function socketMain(io, socket) {
    let macA;

    socket.on('clientAuth', (key) => {
        if(key === '5765asdad') {
            socket.join('clients')
        } else if (key === 'ui12312asda') {
            socket.join('ui')
        } else {
            socket.disconnect(true);
        }
    });

    socket.on('initPerfData', async (data) => {
        macA = data.macA;
        const mongooseResponse = await checkAndAdd(macA);
        console.log(mongooseResponse)
    });

    socket.on('perfData', (data) => {

    });
}

function checkAndAdd(data) {
    return new Promise((resolve, reject) => {
        Machine.findOne(
            {macA: data.macA},
            (err, doc) => {
                if(err) {
                    throw err;
                    reject(err)
                } else if(doc == null) {
                    let newMachine = new Machine(data);
                    newMachine.save();
                    resolve('added')
                } else {
                    resolve('found')
                }
            }
        )
    })
}

module.exports = socketMain;