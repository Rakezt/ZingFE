import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createSocketConnection } from '../utils/socket';
import { useSelector } from 'react-redux';
import type { UserState } from '../utils/types';

interface RootState {
  user: UserState;
}

const Chat = () => {
  const { targetUserId } = useParams();
  const user = useSelector((store: RootState) => store.user);
  const [message, setMessage] = useState<{ firstName: string; text: string }[]>(
    [],
  );
  const [newMessage, setNewMessage] = useState('');
  const userId = user?._id;

  useEffect(() => {
    const socket = createSocketConnection();
    socket.emit('joinChat', {
      firstName: user?.firstName,
      userId,
      targetUserId,
    });

    socket.on(
      'messageReceived',
      ({ firstName, text }: { firstName: string; text: string }) => {
        console.log(firstName + ':' + text);
        setMessage([...message, { firstName, text }]);
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
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage('');
  };

  return (
    <div className='flex flex-col h-[calc(100vh-120px)] max-w-3xl mx-auto bg-base-200 rounded-xl shadow-lg border border-base-300'>
      <div className='flex items-center gap-3 p-4 border-b border-base-300 bg-base-100 rounded-t-xl'>
        <div className='avatar'>
          <div className='w-10 rounded-full'>
            <img src='https://img.daisyui.com/images/profile/demo/anakeen@192.webp' />
          </div>
        </div>
        <div>
          <h2 className='font-semibold text-lg'>Anakin Skywalker</h2>
          <p className='text-xs opacity-60'>Online</p>
        </div>
      </div>

      <div className='flex-1 overflow-y-auto p-4 space-y-4'>
        <div className='chat chat-start'>
          {/* <div className='chat-image avatar'>
            <div className='w-10 rounded-full'>
              <img src='https://img.daisyui.com/images/profile/demo/kenobee@192.webp' />
            </div>
          </div>*/}
          {message.map((msg) => {
            return (
              <div>
                <div className='chat-header text-xs opacity-60'>
                  {msg.firstName}
                  {/* <time className='ml-2'>12:45</time> */}
                </div>
                <div className='chat-bubble bg-base-100 text-base-content shadow'>
                  {msg.text}
                </div>
                <div className='chat-footer text-xs opacity-50'>Delivered</div>
              </div>
            );
          })}
        </div>

        <div className='chat chat-end'>
          <div className='chat-image avatar'>
            <div className='w-10 rounded-full'>
              <img src='https://img.daisyui.com/images/profile/demo/anakeen@192.webp' />
            </div>
          </div>

          <div className='chat-header text-xs opacity-60'>
            Anakin
            <time className='ml-2'>12:46</time>
          </div>

          <div className='chat-bubble bg-accent text-accent-content shadow'>
            I hate you!
          </div>

          <div className='chat-footer text-xs opacity-50'>Seen</div>
        </div>
      </div>

      {/* Input */}
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
