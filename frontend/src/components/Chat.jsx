import { useState,useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { io } from 'socket.io-client'
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './chat.css'
import SingleMessage from './SingleMessage';
import {useEndRoomMutation} from '../slices/roomSlice';
import Room from './Room';
import { clearRoomData } from '../slices/chatRoomSlice';

const Chat = async () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {roomInfo} = await useSelector((state)=>state.chatRoom);
    const {userInfo} = useSelector((state)=>state.auth);
    const {id:room_id} = useParams();
    const [socket,setSocket] = useState();
    const [inputText, setInputText] = useState('');
    const [endRoom] = useEndRoomMutation();
    const [allMessages, setAllMessages] = useState([]);
    const userName = userInfo.rows[0].name;
    const userEmail = userInfo.rows[0].email;
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    console.log(roomInfo);
    // const hostEmail = roomInfo.rows[0].host_email

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
        socket.emit('joinRoomCode',room_id)
        return ()=>{
            socket.off('joinRoomCode');
        }
    },[socket, room_id])
    
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
    //     socket.emit('get-document',room_id)
    // },[socket,room_id])

    // useEffect(()=>{
    //     console.log(allMessages)
    //     const chatMessages = document.getElementById('chat-messages')
    //     chatMessages.scrollTop = chatMessages.scrollHeight;

    // },[allMessages])

    const submitForm = (e)=>{
        e.preventDefault();
        if(socket == null) return ;

        const currentTime = `${hours}:${minutes}`

        socket.emit('chatMessage',{inputText, userName, currentTime})
        setInputText('')
    } 
    
    const leaveRoomUser = () =>{
        setSocket(null);
        navigate('/')
    }
    
    const endRoomOnClick = async () =>{
        setSocket(null);
        const res = await endRoom({ room_id, userEmail }).unwrap();
        navigate('/');
        dispatch(clearRoomData({...res}));
    }

    return (
        <>
            <div className="chat-container">
                <header className="chat-header">
                    <h1><i className="fas fa-smile"></i> SXYNIX</h1>
                    {
                        (userEmail !== roomInfo.rows[0].host_email) ? (
                            <button onClick={leaveRoomUser} type="button" class="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Leave Room</button>
                        ):(
                            <button onClick={endRoomOnClick} type="button" class="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">End Room</button>
                        )
                    }
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