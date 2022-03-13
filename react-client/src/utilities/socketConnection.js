import io from 'socket.io-client';

let socket = io.connect('http://localhost:8181');
socket.emit('clientAuth', 'ui12312asda');

export default socket;