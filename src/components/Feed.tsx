import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';
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
  useEffect(() => {
    feedData();
  }, []);
  return (
    <div className='flex justify-center my-10'>
      {/* {feed?.map((user) => (
        <FeedCard key={user._id} feed={user} />
      ))} */}
      {feed && feed.length > 0 && <FeedCard feed={feed[0]} />}
    </div>
  );
};

export default Feed;
