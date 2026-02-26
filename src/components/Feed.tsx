import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed, removeFeed } from '../utils/feedSlice';
import { BASE_URL } from '../utils/constant';
import type { FeedData } from '../utils/types';
import FeedCard from './FeedCard';

interface RootState {
  feed: FeedData[];
}

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((state: RootState) => state.feed);

  const feedData = async () => {
    if (feed.length > 0) return;
    try {
      const res = await axios.get(BASE_URL + '/user/feed', {
        withCredentials: true,
      });
      dispatch(addFeed(res.data.data));
    } catch (error) {
      console.error(error);
    }
  };
  const handleReview = async (status: string, _id: string) => {
    await axios.post(
      BASE_URL + '/request/send/' + status + '/' + _id,
      {},
      { withCredentials: true },
    );
    dispatch(removeFeed(_id));
  };
  useEffect(() => {
    feedData();
  }, []);
  if (!feed || feed.length === 0) {
    return (
      <div className='text-center mt-20 text-gray-400 text-lg'>
        No new user found
      </div>
    );
  }
  const firstFeed = feed[0];
  return (
    <div className='flex justify-center mt-10 '>
      {feed && (
        <FeedCard
          feed={firstFeed}
          showActions={true}
          onInterest={() => handleReview('interested', firstFeed._id as string)}
          onIgnore={() => handleReview('ignored', firstFeed._id as string)}
        />
      )}
    </div>
  );
};

export default Feed;
