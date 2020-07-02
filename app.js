const { generateID, generateColor } = require('./utils');

const editorState = {
    text: '',
    users: {}
};

/**
 * @param {SocketIO.Server} io
 */
function initSocketApp(io) {
    io.on('connection', (socket) => {
        onConnection(socket);

        socket.on('update-state', (state) => {

            //todo handle state
            console.log(state);
        })
    });
}

function onConnection(socket) {
    const user = {
        id: generateID(),
        color: generateColor(),
        cursorPosition: 0,
        selectedTextPosition: 0,
    }

    editorState.users[user.id] = user;

    // emit `user-connected` event to all open connections except this
    socket.broadcast.emit('user-connected', { id: user.id });
}

// function onDisconnect() {
//     socket.on('disconnect', () => {
//         socket.broadcast.emit('user-disconnected', { userId });
//     });
// }

module.exports = { initSocketApp };