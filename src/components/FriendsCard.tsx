import type { UserState } from '../utils/types';

interface FriendProps {
  user: UserState;
}
const FriendsCard = ({ user }: FriendProps) => {
  const { firstName, lastName, age, gender, photoUrl, about, interest } = user;
  return (
    <div
      className='card card-side bg-base-200 hover:bg-base-300 
                    transition-all duration-300 shadow-md hover:shadow-xl
                    border border-base-300 rounded-xl h-44 w-full'
    >
      <figure className='p-5'>
        <img
          src={photoUrl}
          alt='Profile pic'
          className='w-16 h-16 rounded-full object-cover ring ring-primary ring-offset-2'
        />
      </figure>
      <div className='card-body py-4 px-2 justify-between'>
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
              {interest.map((skill) => (
                <span className='badge badge-accent badge-outline text-xs'>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendsCard;
