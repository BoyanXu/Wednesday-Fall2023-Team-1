let currentRoomID = ''
let chatSocket = null;

function initializeWebSocket(roomID) {
    if (chatSocket) {
        chatSocket.close();
    }
    
    currentRoomID = roomID;
    chatSocket = new WebSocket( 'ws://' + window.location.host + '/ws/chatroom/');
    
    chatSocket.onmessage = function(e) {
        const data = JSON.parse(e.data);
        
        // console.log(data.type);
        // console.log(data.type)
        // console.log(data.message)
    
        
        if (data.type === 'chat_message') {
            // Handle chat messages
            const sender = data.sender || 'Anonymous';  // Default to 'Anonymous' if sender is not provided
            const message = data.message;
            console.log("Chate Added ")
            // Append the message to the chat interface
            document.querySelector('#chat-messages').innerHTML += (
                '<div class="message incoming">' +
                '<strong>' + sender + ':</strong> ' + message + '</div>'
            );
        }
    
    
        
    };
    chatSocket.onopen = function (event) {
        console.log('WebSocket connection opened:', event);
        chatSocket.send(JSON.stringify({
            'type': 'join_room',
            'roomID': roomID
        }));
    };
    chatSocket.onerror = function (error) {
        console.error('WebSocket Error: ', error);
    };
    
    chatSocket.onclose = function(e) {
        console.log('Chat socket closed unexpectedly', e.log);
        // stoping roomlist observer
        // observer.disconnect();  
    };
}



