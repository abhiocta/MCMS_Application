import React, { useEffect, useState } from 'react'
import {over} from 'stompjs';
import SockJS from 'sockjs-client';

var stompClient =null;
const ChatRoom = () => {
    const [privateChats, setPrivateChats] = useState(new Map());     
    const [publicChats, setPublicChats] = useState([]); 
    const [tab,setTab] =useState("CHATROOM");
    const [userData, setUserData] = useState({
        username: '',
        receivername: '',
        connected: false,
        message: ''
      });
    useEffect(() => {
      console.log(userData);
    }, [userData]);

    useEffect(() => {
        const userDetailsString = sessionStorage.getItem('userDetails');
        const savedUsername = JSON.parse(userDetailsString).fullName+" ("+JSON.parse(userDetailsString).occupation+")";
        
        if (savedUsername) {
            setUserData({ ...userData, username: savedUsername, connected: false });
        }
    }, []);
    

    const connect =()=>{
       let Sock = new SockJS('http://localhost:8088/ws');
       stompClient = over(Sock);
        stompClient.connect({},onConnected, onError);
    }

    const onConnected = () => {
        setUserData({ ...userData, connected: true });
        stompClient.subscribe('/chatroom/public', onMessageReceived);
        stompClient.subscribe('/user/'+userData.username+'/private', onPrivateMessage);
        //stompClient.subscribe('/chatroom/members', onMemberListReceived);
        
        userJoin();
    
        // Send automatic "Hello, I am Online" message to existing connected users
        publicChats.forEach((member) => {
            if (member.senderName !== userData.username) {
                const autoMessage = {
                    senderName: userData.username,
                    message: "Hello, I am Online",
                    status: "MESSAGE"
                };
                stompClient.send("/app/private-message", {}, JSON.stringify(autoMessage));
            }
        });
    };    

    const onMemberListReceived = (payload) => {
        const members = JSON.parse(payload.body);
        const newMemberList = [...members];
        setPublicChats(newMemberList);
    };
    
    

    const userJoin = () => {
        var chatMessage = {
            senderName: userData.username,
            status: "JOIN"
        };
        stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
        // Remove this line: setUserData({ ...userData, connected: true });
    };

    const onMessageReceived = (payload) => {
        var payloadData = JSON.parse(payload.body);
        switch(payloadData.status){
            case "JOIN":
                if (!privateChats.get(payloadData.senderName)) {
                    privateChats.set(payloadData.senderName, []);
                    setPrivateChats(new Map(privateChats));
                }
                // Update the publicChats to reflect connected members
                const connectedMembers = [...publicChats];
                if (!connectedMembers.some(member => member.senderName === payloadData.senderName)) {
                    connectedMembers.push({
                        senderName: payloadData.senderName,
                        status: "CONNECTED"
                    });
                    setPublicChats(connectedMembers);
                }
                break;
            case "MESSAGE":
                publicChats.push(payloadData);
                setPublicChats([...publicChats]);
                break;
        }
    };
    
    
    
    
    const onPrivateMessage = (payload) => {
        console.log(payload);
        var payloadData = JSON.parse(payload.body);
        if (privateChats.get(payloadData.senderName)) {
            privateChats.get(payloadData.senderName).push(payloadData);
        } else {
            let list = [];
            list.push(payloadData);
            privateChats.set(payloadData.senderName, list);
        }
        
        // Check if the received message is an automatic "Hello, I am Online" message
        if (payloadData.message === "Hello, I am Online") {
            // Add it to the user's private chat
            if (!privateChats.get(userData.username)) {
                privateChats.set(userData.username, []);
            }
            privateChats.get(userData.username).push(payloadData);
        }
    
        setPrivateChats(new Map(privateChats));
    };
    
    

    const onError = (err) => {
        console.log(err);
        
    }

    const handleMessage =(event)=>{
        const {value}=event.target;
        setUserData({...userData,"message": value});
    }
    const sendValue=()=>{
            if (stompClient) {
              var chatMessage = {
                senderName: userData.username,
                message: userData.message,
                status:"MESSAGE"
              };
              console.log(chatMessage);
              stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
              setUserData({...userData,"message": ""});
            }
    }

    const sendPrivateValue=()=>{
        if (stompClient) {
          var chatMessage = {
            senderName: userData.username,
            receiverName:tab,
            message: userData.message,
            status:"MESSAGE"
          };
          
          if(userData.username !== tab){
            privateChats.get(tab).push(chatMessage);
            setPrivateChats(new Map(privateChats));
          }
          stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
          setUserData({...userData,"message": ""});
        }
    }

    const handleUsername=(event)=>{
        const {value}=event.target;
        setUserData({...userData,"username": value});
    }

    const registerUser=()=>{
        connect();
    }
    return (
    <div className="container">
        {userData.connected?
        <div className="chat-box">
            <div className="member-list">
                <ul>
                    {/* <li onClick={()=>{setTab("CHATROOM")}} className={`member ${tab==="CHATROOM" && "active"}`}>Chatroom</li> */}
                    {[...privateChats.keys()].map((name,index)=>(
                        <li onClick={()=>{setTab(name)}} className={`member ${tab===name && "active"}`} key={index}>{name}</li>
                    ))}
                </ul>
            </div>

            {tab==="CHATROOM" && <div className="chat-content">
                <ul className="chat-messages">
                    {publicChats.map((chat,index)=>(
                        <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
                            {chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>}
                            <div className="message-data">{chat.message}</div>
                            {chat.senderName === userData.username && <div className="avatar self">{chat.senderName}</div>}
                        </li>
                    ))}
                </ul>

                <div className="send-message">
                    <input type="text" className="input-message" placeholder="enter the message" value={userData.message} onChange={handleMessage} /> 
                    <button type="button" className="send-button" onClick={sendValue}>send</button>
                </div>
            </div>}
            {tab!=="CHATROOM" && <div className="chat-content">
                <ul className="chat-messages">
                    {[...privateChats.get(tab)].map((chat,index)=>(
                        <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
                            {chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>}
                            <div className="message-data">{chat.message}</div>
                            {chat.senderName === userData.username && <div className="avatar self">{chat.senderName}</div>}
                        </li>
                    ))}
                </ul>

                <div className="send-message">
                    <input type="text" className="input-message" placeholder="enter the message" value={userData.message} onChange={handleMessage} /> 
                    <button type="button" className="send-button" onClick={sendPrivateValue}>send</button>
                </div>
            </div>}
        </div>
        :
        <div className="register">
    <input
        id="user-name"
        placeholder="Enter your name"
        name="userName"
        value={userData.username}
        onChange={handleUsername}
        margin="normal"
        disabled={userData.username !== ''} // Disable input if a username is set
    />
    <button style={{margin:'10px'}} type="button" onClick={registerUser} disabled={userData.username === ''}>
        Connect
    </button> 
</div>
}
    </div>
    )
}

export default ChatRoom;