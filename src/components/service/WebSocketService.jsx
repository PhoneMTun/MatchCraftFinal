// WebSocketService.js
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

class WebSocketService {
  constructor(userId) {
    this.userId = userId; // Pass the current user's ID when creating an instance of WebSocketService
    this.stompClient = null;
  }

  connect() {
    const serverUrl = 'http://localhost:8080/ws'; // Adjust as necessary
    const socket = new SockJS(serverUrl);
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, this.onConnected, this.onError);
  }

  onConnected = () => {
    // Subscribe to the public chat topic
    this.stompClient.subscribe('/topic/publicChat', this.onMessageReceived);

    // Subscribe to the online users topic
    this.stompClient.subscribe('/topic/onlineUsers', this.onUserStatusUpdate);

    // Notify the server about the new user, including the user ID
    // This example assumes that the server needs to know the user's ID and username.
    // Adjust the payload as necessary for your application's requirements.
    this.stompClient.send("/app/chat.newUser", {}, JSON.stringify({userId: this.userId, type: "JOIN"}));
  }

  onMessageReceived = (payload) => {
    // Handle incoming messages
    console.log('Message Received:', JSON.parse(payload.body));
  }

  onUserStatusUpdate = (payload) => {
    // Handle user status updates (e.g., online/offline)
    console.log('User Status Update:', JSON.parse(payload.body));
  }

  sendMessage = (chatMessage) => {
    // Send a chat message, including the user ID in the message if needed
    // Ensure that the chatMessage object matches the structure expected by the server
    this.stompClient.send("/app/chat.sendMessage", {}, JSON.stringify({...chatMessage, userId: this.userId}));
  }

  onError = (err) => {
    // Handle WebSocket connection errors
    console.log('WebSocket Connection Error:', err);
  }
}

// Export the WebSocketService class instead of a new instance
// This allows passing the current user's ID when creating an instance elsewhere in the application
export { WebSocketService };
