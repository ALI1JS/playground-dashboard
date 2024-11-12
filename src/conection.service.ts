import { HubConnectionBuilder, HubConnection } from '@microsoft/signalr';

class SignalRService {
  connection: HubConnection | null = null;

  // Create a connection to the SignalR hub
  startConnection = (url: string) => {
    
    this.connection = new HubConnectionBuilder()
      .withUrl(url) // URL of the SignalR hub
      .withAutomaticReconnect()
      .build();

    // Start the connection
    this.connection
      .start()
      .then(() => console.log('SignalR Connected!'))
      .catch((err) => console.log('Error while connecting to SignalR: ', err));
  };

  onMessageReceived = (callback: (message: any) => void) => {
    if (this.connection) {
      this.connection.on('ReceiveMessage', callback);
    }
  };

  sendMessage = (message: string) => {
    if (this.connection) {
      this.connection.invoke('SendMessage', message).catch((err) => console.error(err));
    }
  };
}

const signalRService = new SignalRService();
export default signalRService;
