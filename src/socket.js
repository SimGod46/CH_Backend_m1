import io from "socket.io"
let io;

export function init(server) {
    io = require('socket.io').listen(server); io.origins('*:*');
    return io;
}

export function init(server) {
    io = require('socket.io').listen(server); io.origins('*:*');
    return io;
}


export function get() {
    if (!io) {
        throw new Error("socket is not initialized");
    }
    return io;
}
export default io;