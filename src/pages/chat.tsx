import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar/navbar.com";
import Nav from "../components/nav/nav.comp";
import humbrgerBar from "../assets/menu-icon.png";

import * as signalR from '@microsoft/signalr';

const Chat: React.FC = () => {
  const [navbarIsHidden, setNavbarIsHidden] = useState(true);
  // const [users, setUsers] = useState<{ id: number; name: string; image: string }[]>([]);
  // const [selectedUser, setSelectedUser] = useState<{ id: number; name: string; image: string } | null>(null);
  // const [messages, setMessages] = useState<string[]>([]);
  const [messageInput, setMessageInput] = useState<string>('');
  // const [socket, setSocket] = useState<Socket | null>(null);

  const navbarDisplayHandle = () => {
    setNavbarIsHidden(!navbarIsHidden);
  };

  // const adminId = 1; // Replace with actual admin ID

  // Function to initialize socket connection and handle events
  // const initializeSocket = (connectionToken: string) => {
  //   const socketInstance = io(`ws://hawihub1-001-site1.gtempurl.com/api/hub?id=${connectionToken}`, {
  //     transports: ['websocket'], 
  //   });

  //   // Store the socket connection in state
  //   setSocket(socketInstance);

  //   // Event when the socket connects
  //   socketInstance.on("connect", () => {
  //     console.log('Connected to Socket.IO server');
  //   });

  //   // Listen for messages
  //   socketInstance.on("message", (message: string) => {
     
  //   });

  //   // Handle connection error
  //   socketInstance.on("connect_error", (error) => {
  //     console.error('Connection Error:', error);
  //   });

  //   // Handle disconnection
  //   socketInstance.on("disconnect", () => {
  //     console.log("Disconnected from Socket.IO server");
  //   });

  //   return socketInstance;
  // };

  useEffect(() => {
    const hubUrl = "https://hawihub1-001-site1.gtempurl.com/api/hub";

    // Initialize SignalR connection
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl)
      .build();

      connection.start().then(()=>{
        console.log("Connection ID: " + connection.connectionId);
      })
      .catch((error)=>{
         console.log(error)
      })

    // Cleanup function to stop the connection when the component unmounts
    // return () => {
    //   connection.stop().then(() => console.log("SignalR Connection stopped."));
    // };
  }, []);

  // useEffect(() => {
  //   // Fetch conversations on mount
  //   const fetchConversations = async () => {
  //     try {
  //       const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/Hub/AdminConversationsWithPlayers/${adminId}`);
  //       // setConversations(response.data); // Set fetched conversations
  //     } catch (error) {
  //       console.error('Error fetching conversations:', error);
  //     }
  //   };

  //   fetchConversations();
  // }, [adminId]);

  // const handleUserClick = (user: { id: number; name: string; image: string }) => {
  //   setSelectedUser(user);
  // };

  // const sendMessage = () => {
  //   if (messageInput.trim() && selectedUser && socket) {
  //     socket.emit('message', { text: messageInput, to: selectedUser.id }); // Send message to selected user
  //     setMessages((prevMessages) => [...prevMessages, messageInput]);
  //     setMessageInput(''); // Clear input after sending
  //   }
  // };

  return (
    <div className="flex gap-5 w-[100vw] min-h-[100vh] relative">
      <div className="w-8 h-8 ml-5 absolute mt-10 cursor-pointer xl:hidden">
        <img onClick={() => navbarDisplayHandle()} src={humbrgerBar} alt="Menu" />
      </div>
      <Navbar closeNavbar={navbarDisplayHandle} isHidden={navbarIsHidden} />

      <div className="w-[100%] xl:w-[72%] 2xl:w-[78%] min-h-[100%] flex flex-col xl:absolute xl:right-10">
        <Nav />

        <div className="flex flex-col md:flex-row justify-center w-full mt-10 p-10 bg-slate-100 h-full">
          <div className="flex md:w-1/3 md:h-[300px] w-full h-[200px] overflow-x-auto md:overflow-y-auto p-4 bg-gray-100 shadow-inner">
            {/* <div className="flex md:flex-col flex-row w-full overflow-x-scroll md:overflow-y-scroll space-x-4 md:space-x-0 md:space-y-4">
              {users.map((user) => (
                <button
                  key={user.id}
                  onClick={() => handleUserClick(user)}
                  className="flex md:flex-row flex-col items-center md:space-x-4 space-y-2 md:space-y-0 p-2 transition-all duration-200 rounded-lg bg-white shadow hover:bg-gray-100"
                >
                  <img
                    src={user.image || defaultAvatar}
                    alt={user.name}
                    className={`w-16 h-16 rounded-full object-cover transition-all duration-200 ${selectedUser?.id === user.id ? 'ring-4 ring-blue-500' : 'ring-2 ring-gray-300'}`}
                  />
                  <div className={`text-center md:text-left text-sm font-bold transition-all duration-200 ${selectedUser?.id === user.id ? 'text-black' : 'text-gray-700'}`}>
                    {user.name}
                  </div>
                </button>
              ))}
            </div> */}
          </div>

          <div className="flex-1 flex flex-col p-4 bg-gray-50 h-[calc(100vh-200px)] md:h-full w-full md:w-2/3">
            <div className="flex-1 overflow-y-auto mb-4 space-y-2">
              {/* {messages.length > 0 ? (
                messages.map((message, index) => (
                  <div key={index} className="p-2 bg-gray-200 rounded-lg">
                    {message}
                  </div>
                ))
              ) : (
                <p>No messages yet. Start a conversation!</p>
              )} */}
            </div>

            <div className="flex items-center">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded-lg"
                placeholder="Type a message"
              />
              <button
                className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
