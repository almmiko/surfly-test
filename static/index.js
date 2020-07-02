const socket = io();

const EVENTS = {
    connect: 'connect',
    userConnected: 'user-connected',
    userDisconnected: 'user-disconnected',
    updateState: 'update-state',
}

socket.on(EVENTS.connect, () => {
    console.log('Connected');
});

socket.on(EVENTS.userConnected, ({ userId }) => {
    console.log(`User connected, id: ${userId}`);
});

socket.on(EVENTS.userDisconnected, ({ userId }) => {
    console.log(`User disconnected, id: ${userId}`);
});

const editor = document.getElementById('editor');

editor.addEventListener('input', handleEvent);
editor.addEventListener('click', handleEvent);

function handleEvent(event) {
    //todo throttle function
    sendState({
        text: event.target.value,
        meta: getPosition(editor)
    });
}

function getPosition(target) {
    const start = target.selectionStart;
    const end = target.selectionEnd;

    const textLength = target.value.length;

    return start === end ? {
        isSelected: false,
        start,
        textLength
    } : {
        isSelected: true,
        start,
        end,
        textLength
    }
}

function sendState(state) {
    socket.emit(EVENTS.updateState, state);
}