import React, { useState } from "react";
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import AppColors from "../theme/styles/AppColors";
import styled from "styled-components";
import { generateName } from "../common/NameGenerator";
import { generateColor } from "../common/ColorGenerator";

const ChatRoomWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`
const ChatBox = styled.div`
  box-shadow:0 2.8px 2.2px rgba(0, 0, 0, 0.034),0 6.7px 5.3px rgba(0, 0, 0, 0.048),0 12.5px 10px rgba(0, 0, 0, 0.06),0 22.3px 17.9px rgba(0, 0, 0, 0.072),0 41.8px 33.4px rgba(0, 0, 0, 0.086),0 100px 80px rgba(0, 0, 0, 0.12);
  height: 80vh;
  width: 80vw;
  padding: 20px;
  display: flex;
  flex-direction: row;
  background-image: ${AppColors.MAIN_WHITE};
`
const Member = styled.li`
  background: ${AppColors.MAIN_WHITE};
  border-style: solid;
  color:black;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
`
const ChatContentArea = styled.div`
  width: 80%;
  margin-left: 10px;
  display: flex; 
  flex-direction: column;
  align-content: space-between;
`
const SendMessageArea = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 10px;
  margin-top: 10px;
`
const ChatMessageArea = styled.div`
  height: 80%;
  border: 1px solid #000;
  overflow: auto;
`
const SenderAvatar = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  padding: 8px;
  border-radius: 5px;
  color:#fff;
  margin-right: 3px;
  font-size: 12px;
  font-weight: bold;
`
const MessageBox = styled.div`
  padding: 8px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  margin: 6px;
  border-radius: 10px;
  clear:both;
  float:left;
`
const EntranceButton = styled.button`
  margin: 10px;
  border: none;
  padding: 10px;
  background: green;
  color:#fff;
  font-size: 1.2em;
  font-weight: bold;
`
const MessageContent = styled.div`
  padding: 5px;
`

const ButtonListBox = styled.div`
  padding: 5px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column; 
`


var stompClient = null;

const ChatRoom = initUserData => {
  const [userList, setUserList] = useState([<li></li>]);
  const [publicChats, setPublicChats] = useState([]);
  const [privateChats, setPrivateChats] = useState(new Map());
  const [isEnablePrivateChats] = useState({});
  const [tab] = useState('CHATROOM');
  const [userData, setUserData] = useState({
    username: '',
    receiverName: '',
    connected: false,
    message: '',
    avatarColor: 'lightpink',
    chatRoomNumber: '1',
  })

  const handleValue = (event) => {
    const { value, name } = event.target;
    setUserData({ ...userData, [name]: value });
  }

  const registerUser = chatRoomNumber => {
    userData.username = generateName(initUserData.school);
    userData.avatarColor = generateColor();
    userData.chatRoomNumber = chatRoomNumber;
    // console.log(userData.avatarColor);
    setUserData({ ...userData });
    let Sock = new SockJS('http://localhost:8080/websocket');

    // for EC2
    // let Sock = new SockJS('https://ec2-3-37-243-198.ap-northeast-2.compute.amazonaws.com:8080/websocket');
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  }

  const onConnected = () => {
    setUserData({ ...userData, 'connected': true });
    // stompClient.subscribe(`/chatroom/public`, onPublicMessageReceived);
    stompClient.subscribe(`/chatroom/` + userData.chatRoomNumber, onPublicMessageReceived);
    // if (isEnablePrivateChats) stompClient.subscribe('/user/' + userData.username + '/private', onPrivateMessageReceived);
    userJoin();
  }

  const userJoin = () => {
    let chatMessage = {
      senderName: userData.username,
      status: 'JOIN',
      avatarColor: userData.avatarColor
    };
    stompClient.send(`/app/chatroom/${userData.chatRoomNumber}`, {}, JSON.stringify(chatMessage));
  }

  const onError = (error) => {
    console.log(error);
  }

  const onPublicMessageReceived = (payload) => {
    let payloadData = JSON.parse(payload.body);
    switch (payloadData.status) {
      case 'JOIN':
        userList.push(
          <li className={`member active`}>
            {payloadData.senderName}
          </li>
        );
        setUserList(userList);
        console.log(userList);
        if (isEnablePrivateChats && !privateChats.get(payloadData.senderName)) {
          privateChats.set(payloadData.senderName, []);
          setPrivateChats(new Map(privateChats));
        }
        break;
      case 'MESSAGE':
        publicChats.push(payloadData);
        setPublicChats([...publicChats]);
        break;
      default: break;
    }
  }

  const onPrivateMessageReceived = (payload) => {
    let payloadData = JSON.parse(payload);

    if (privateChats.get(payloadData.senderName)) {
      privateChats.get(payloadData.senderName).push(payloadData);
    } else {
      let list = [];
      list.push(payloadData);
      privateChats.set(payloadData.senderName, list);
    }
    setPrivateChats(new Map(privateChats));
  }

  const sendPublicMessage = () => {
    if (stompClient) {
      let chatMessage = {
        senderName: userData.username,
        message: userData.message,
        status: 'MESSAGE',
        avatarColor: userData.avatarColor,
        chatRoomNumber: userData.chatRoomNumber
      };
      stompClient.send('/app/message', {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, 'message': '' });
    }
  }

  const sendChatRoomMessage = () => {
    if (stompClient) {
      let chatMessage = {
        senderName: userData.username,
        message: userData.message,
        status: 'MESSAGE',
        avatarColor: userData.avatarColor,
        chatRoomNumber: userData.chatRoomNumber
      };
      stompClient.send(`/app/chatroom-message/${userData.chatRoomNumber}`, {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, 'message': '' });
    }
  }

  const sendPrivateMessage = () => {
    if (stompClient) {
      let chatMessage = {
        senderName: userData.username,
        receiverName: tab,
        message: userData.message,
        status: 'MESSAGE'
      };
      if (userData.username !== tab) {
        privateChats.get(tab).push(chatMessage);
        setPrivateChats(new Map(privateChats));
      }
      stompClient.send('/app/private-message', {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, "message": "" });
    }
  }

  return (
    <ChatRoomWrapper>
      {userData.connected ?
        <ChatBox>
          <div className='member-list'>
            <Member> {userData.username} </Member>
            {
              userList.map((userNameComponent, index) => {
                return index > 1 ? userNameComponent : null;
              })
            }
          </div>
          {
            tab === 'CHATROOM' ?
              <ChatContentArea>
                <ChatMessageArea>
                  {
                    publicChats.map((chat, index) => (
                      <div>
                        {/* <div className={chat.senderName === userData.username ? 'avatar self' : 'avatar'} > { chat.senderName } </div> */}
                        {chat.senderName !== userData.username ?
                          <MessageBox key={index} >
                            <SenderAvatar style={{ backgroundColor: chat.avatarColor }}> {chat.senderName} </SenderAvatar>
                            <MessageContent> {chat.message}</MessageContent>
                          </MessageBox>
                          :
                          <MessageBox key={index} style={{ float: 'right', backgroundColor: 'lightblue' }}>
                            <MessageContent> {chat.message}</MessageContent>
                          </MessageBox>
                        }
                      </div>
                    ))
                  }
                </ChatMessageArea>
                <SendMessageArea>
                  <input type='text' className='input-message' name='message' placeholder='채팅 입력..' value={userData.message} onChange={handleValue} />
                  {/* <button type='button' className='send-button' onClick={sendPublicMessage}> 전송 </button> */}
                  <button type='button' className='send-button' onClick={sendChatRoomMessage}> 전송 </button>
                </SendMessageArea>
              </ChatContentArea>
              :
              <div className='chat-content'>
                {
                  [...publicChats.get(tab)].map((chat, index) => (
                    <li className='message' key={index}>
                      <div className={chat.senderName === userData.username ? 'avatar self' : 'avatar'} > {chat.senderName} </div>
                      <MessageContent> {chat.message}</MessageContent>
                    </li>
                  ))
                }
                <div className='send-message'>
                  <input type='text' className='input-message'
                    name='message' placeholder={`enter private message for ${tab}`} value={userData.message} onChange={handleValue} />
                  {isEnablePrivateChats && <button type='button' className='send-button' onClick={sendPrivateMessage}>send</button>}
                </div>
              </div>
          }
        </ChatBox>
        :
        <ButtonListBox>
          <EntranceButton type='button' onClick={() => registerUser(1)}>
            홍대 서버 입장
          </EntranceButton>
          <EntranceButton type='button' onClick={() => registerUser(2)}>
            연대 서버 입장
          </EntranceButton>
          <EntranceButton type='button' onClick={() => registerUser(3)}>
            서강대 서버 입장
          </EntranceButton>
          <EntranceButton type='button' onClick={() => registerUser(4)}>
            이화여대 서버 입장
          </EntranceButton>
          <EntranceButton type='button' onClick={() => registerUser(5)}>
            장동호의 50가지 그림자
          </EntranceButton>
        </ButtonListBox>

      }
    </ChatRoomWrapper >
  )
}

export default ChatRoom