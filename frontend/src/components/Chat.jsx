import { useState,useEffect,useLayoutEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { io } from 'socket.io-client'
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './chat.css'
import SingleMessage from './SingleMessage';

const Chat= () => {
    
    const navigate = useNavigate();
    const {userInfo} = useSelector((state)=>state.auth);;
    const{id:roomId} = useParams();
    const [socket,setSocket] = useState();
    const [inputText, setInputText] = useState('');
    const [allMessages, setAllMessages] = useState([]);
    const userName = userInfo.rows[0].name;
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    //Make a connection to ther server
    useEffect(()=>{
        const s = io("http://localhost:3001");
        setSocket(s);
        
        return ()=>{
            s.disconnect();
        }
    },[])
    
    useEffect(()=>{
        if (socket == null) return; 
        socket.emit('joinRoomCode',roomId)
        return ()=>{
            socket.off('joinRoomCode');
        }
    },[socket, roomId])

    const submitForm = (e)=>{
        e.preventDefault();
        if(socket == null) return ;

        const currentTime = `${hours}:${minutes}`

        socket.emit('chatMessage',{inputText, userName, currentTime})
        setInputText('')
    } 
    
    //Receive changes made by other client
    useEffect(()=>{
        if(socket == null) return ; 
        
        socket.on("message",(receivedMessage)=>{
            console.log(receivedMessage)
        });
        
        socket.on("receiveChatMessage", (data)=>{
            let updatedData = {};
            updatedData = data;
             setAllMessages((allMessages)=>[
                ...allMessages, 
                {inputText: data.inputText, userName: data.userName, currentTime: data.currentTime}
            ]
            );
        });
        
        return ()=>{
            socket.off('message')
        }
    },[socket])

    // useEffect(()=>{
    //     if(socket == null) return ;
    //     socket.emit('get-document',roomId)
    // },[socket,roomId])

    useEffect(()=>{
        console.log(allMessages)
        const chatMessages = document.getElementById('chat-messages')
        chatMessages.scrollTop = chatMessages.scrollHeight;

    },[allMessages])

    return (
        <>
            <div className="chat-container">
                <header className="chat-header">
                    <h1><i className="fas fa-smile"></i> SXYNiX</h1>
                        <a href="index.html" className="btn">Leave Room</a>
                </header>
                <main className="chat-main">
                    <div className="chat-sidebar">
                        <h3><i className="fas fa-comments"></i> Room Name:</h3>
                        <h2 id="room-name">JavaScript</h2>
                        <h3><i className="fas fa-users"></i> Users</h3>
                        <ul id="users">
                            <li>Brad</li>
                            <li>John</li>
                            <li>Mary</li>
                            <li>Paul</li>
                            <li>Mike</li>
                        </ul>
                    </div>
                    <div className="chat-messages" id='chat-messages'>
                        {
                            allMessages.map((msg,index)=>(
                                <SingleMessage key={index}  name={msg.userName} displayTime={msg.currentTime} message={msg.inputText}/>
                            ))
                        }
                    </div>
                </main>
                <div className="chat-form-container">
                    <form id="chat-form" onSubmit={submitForm}>
                        <input
                            id="msg"
                            value={inputText}
                            type="text"
                            placeholder="Enter Message"
                            required
                            autoComplete="off"
                            onChange={(e)=>{
                                setInputText(e.target.value)
                            }}
                        />
                        <button className="btn"><i className="fas fa-paper-plane"></i> Send</button>
                    </form>
                </div>
            </div>

        </>
    );
}

export default Chat;