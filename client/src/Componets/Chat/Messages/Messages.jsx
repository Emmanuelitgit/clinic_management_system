import React from 'react'
import "./Messages.css"
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ScrollToBottom from 'react-scroll-to-bottom';
import ReactTimeAgo from 'react-time-ago'


const Messages = ({messages, date}) => {
  
  const userId = localStorage.getItem("userId")
  const messagesEndRef = useRef(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    
    <div className='messages-container'>
    {messages.map((msg, index) => (
        <div 
            key={index} 
            className={`message ${msg.sender === userId ? 'message-sender' : 'message-receiver'}`}
        >
            <p>{msg.message}</p>
            <p>{new Date(msg.created_at).toLocaleTimeString()}</p>
        </div>
    ))}
    <div ref={messagesEndRef} />
</div>

  )
}


export default Messages