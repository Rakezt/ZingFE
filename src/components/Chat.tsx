import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createSocketConnection } from '../utils/socket';
import { useSelector } from 'react-redux';
import type { UserState } from '../utils/types';
import axios from 'axios';
import { BASE_URL } from '../utils/constant';

interface RootState {
  user: UserState;
}
interface RootState {
  connection: UserState[];
}

const Chat = () => {
  const { targetUserId } = useParams();
  const user = useSelector((store: RootState) => store.user);
  const connection = useSelector((state: RootState) => state.connection);
  const [message, setMessage] = useState<
    { firstName: string; lastName: string; text: string }[]
  >([]);
  const [newMessage, setNewMessage] = useState('');
  const userId = user?._id;

  const targetUser = connection.find((user) => user._id === targetUserId);

  const fetchChatMessage = async () => {
    try {
      const res = await axios.get(BASE_URL + '/chat/' + targetUserId, {
        withCredentials: true,
      });
      // console.log(res.data.data.messages);
      const chatMessage = res.data.data.messages.map(
        (msg: {
          senderId: { firstName: string; lastName: string };
          text: string;
        }) => {
          const { senderId, text } = msg;
          return {
            firstName: senderId?.firstName,
            lastName: senderId?.lastName,
            text,
          };
        },
      );
      setMessage(chatMessage);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    (async () => {
      await fetchChatMessage();
    })();
  }, []);

  useEffect(() => {
    const socket = createSocketConnection();
    socket.emit('joinChat', {
      firstName: user?.firstName,
      lastName: user?.lastName,
      userId,
      targetUserId,
    });

    socket.on(
      'messageReceived',
      ({
        firstName,
        lastName,
        text,
      }: {
        firstName: string;
        lastName: string;
        text: string;
      }) => {
        // console.log(firstName + ':' + text);
        setMessage((message) => [...message, { firstName, lastName, text }]);
      },
    );

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit('sendMessage', {
      firstName: user.firstName,
      lastName: user?.lastName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage('');
  };

  const messageRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    messageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [message]);

  return (
    <div className='flex flex-col h-[calc(100vh-120px)] max-w-3xl mx-auto bg-base-200 rounded-xl shadow-lg border border-base-300 mt-5'>
      <div className='flex items-center gap-3 p-4 border-b border-base-300 bg-base-200 rounded-t-xl '>
        <div className='avatar '>
          <div className='w-10 rounded-full'>
            <img src={targetUser?.photoUrl} />
          </div>
        </div>
        <div>
          <h2 className='font-semibold text-lg'>
            {targetUser?.firstName + ' ' + targetUser?.lastName}
          </h2>
          <p className='text-xs opacity-60'>Online</p>
        </div>
      </div>

      <div className='flex-1 overflow-y-auto p-4 space-y-4'>
        {message.map((msg, index) => {
          return (
            <div
              key={index}
              className={`chat ${user.firstName === msg.firstName ? 'chat-end' : 'chat-start'}`}
            >
              <div className='chat-header text-xs opacity-60'>
                {msg.firstName + ' ' + msg.lastName}
                {/* <time className='ml-2'>12:45</time> */}
              </div>
              <div className='chat-bubble bg-base-100 text-base-content shadow'>
                {msg.text}
              </div>
              <div className='chat-footer text-xs opacity-50'>Delivered</div>
              <div ref={messageRef} />
            </div>
          );
        })}
      </div>

      <div className='p-4 border-t border-base-300 bg-base-100 rounded-b-xl'>
        <div className='flex gap-3'>
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            type='text'
            placeholder='Type a message...'
            className='input input-bordered flex-1'
          />

          <button className='btn btn-accent px-6' onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
