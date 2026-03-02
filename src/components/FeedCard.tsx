import type { FeedData } from '../utils/types';

interface FeedProps {
  feed: FeedData;
  showActions?: boolean;
  onInterest?: () => void;
  onIgnore?: () => void;
}

const FeedCard = ({ feed, showActions, onInterest, onIgnore }: FeedProps) => {
  const { firstName, lastName, photoUrl, age, gender, about, interest } = feed;

  return (
    <div className='w-[360px] mx-auto rounded-3xl overflow-hidden shadow-2xl bg-base-300'>
      <figure className='relative h-[420px] w-full'>
        <img
          src={photoUrl}
          loading='lazy'
          alt='profile'
          className='w-full h-full object-cover'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent' />

        <div className='absolute bottom-4 left-4 text-white'>
          <h2 className='text-2xl font-bold'>
            {firstName} {lastName}
          </h2>
          {age && gender && (
            <p className='text-sm opacity-90'>
              {gender}, {age} Years old
            </p>
          )}
        </div>
      </figure>

      <div className='p-4 space-y-2'>
        <p className='text-sm text-gray-300'>{about}</p>

        {interest && interest.length > 0 && (
          <div className='flex flex-wrap gap-2 pt-2'>
            {interest.map((i) => (
              <span
                key={i}
                className='px-3 py-1 text-xs rounded-full bg-accent/20 text-accent'
              >
                {i}
              </span>
            ))}
          </div>
        )}

        {showActions && (
          <div className='flex justify-center gap-6 mt-5'>
            <button
              className='btn btn-secondary btn-wide text-white'
              onClick={onIgnore}
            >
              Ignore
            </button>

            <button
              className='btn btn-accent btn-wide text-white'
              onClick={onInterest}
            >
              Interested
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedCard;
