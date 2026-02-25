import type { FeedData } from '../utils/types';

interface FeedProps {
  feed: FeedData;
}

const FeedCard = ({ feed }: FeedProps) => {
  const { firstName, lastName, photoUrl, age, gender, about, interest } = feed;

  return (
    <div className='card bg-base-300 w-96 shadow-sm'>
      <figure>
        <img src={photoUrl} alt='profile pic' />
      </figure>
      <div className='card-body'>
        <h2 className='card-title'>
          {firstName} {lastName}
        </h2>
        {age && gender && (
          <p>
            {gender}, {age} years old
          </p>
        )}
        {}
        <p>{about}</p>
        {interest && interest.length > 0 && <p>{interest.join(', ')}</p>}
        <div className='card-actions justify-center my-5'>
          <button className='btn btn-secondary'>Ignore</button>
          <button className='btn btn-accent'>Interested</button>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
