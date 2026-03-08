import type { UserState } from '../utils/types';

interface FriendProps {
  user: UserState;
  showActions?: boolean;
  onAccept?: () => void;
  onReject?: () => void;
  showChat?: boolean;
  onChat?: () => void;
}
const FriendsCard = ({
  user,
  showActions,
  onAccept,
  onReject,
  showChat,
  onChat,
}: FriendProps) => {
  const { firstName, lastName, age, gender, photoUrl, about, interest } = user;
  return (
    <div
      className='card card-side bg-base-200 border border-base-300 
             rounded-xl shadow-md hover:shadow-xl 
             transition-all duration-300 min-h-44 w-full items-start'
    >
      <figure className='p-7'>
        <img
          src={photoUrl}
          loading='lazy'
          alt='Profile pic'
          className='w-16 h-16 rounded-full object-cover ring ring-primary ring-offset-2'
        />
      </figure>
      <div className='card-body py-4 px-2 pb-8 justify-between'>
        <h2 className='card-title text-base font-semibold'>
          {firstName} {lastName}
        </h2>
        {age && gender && (
          <h2 className='card-title text-base font-semibold'>
            {age} {gender}
          </h2>
        )}
        <p className='text-sm text-gray-400 line-clamp-2'>{about}</p>
        {interest && (
          <div className='mt-2 h-10 overflow-hidden'>
            <div className='flex flex-wrap gap-1'>
              {interest.map((skill, index) => (
                <span
                  key={index}
                  className='badge badge-accent badge-outline text-xs'
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
        <div className='card-actions mt-4'>
          {showActions && (
            <div>
              <button className='btn btn-secondary' onClick={onAccept}>
                Accept
              </button>
              <button className='btn btn-accent' onClick={onReject}>
                Rejected
              </button>
            </div>
          )}
          {showChat && (
            <div>
              <button className='btn btn-accent' onClick={onChat}>
                Chat
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FriendsCard;
