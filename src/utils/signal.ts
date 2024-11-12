import * as signalR from "@microsoft/signalr";

let establishedConnection!: signalR.HubConnection;

const createSignalRConnection = (hubUrl = "https://hawihub1-001-site1.gtempurl.com/api/hub") => {
  if (establishedConnection) {
    return establishedConnection;
  }
  const connection = new signalR.HubConnectionBuilder()
    .withUrl(hubUrl, {
      skipNegotiation: true,
      transport: signalR.HttpTransportType.WebSockets,
    })
    .configureLogging(signalR.LogLevel.Information)
    .build();
  establishedConnection = connection;
  return connection;
};

export default createSignalRConnection;
