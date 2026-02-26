import axios from 'axios';
import { BASE_URL } from '../utils/constant';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addConnection } from '../utils/connectionSlice';
import type { UserState } from '../utils/types';
import FriendsCard from './FriendsCard';
interface RootState {
  connection: UserState[];
}

const Friends = () => {
  const dispatch = useDispatch();
  const connection = useSelector((state: RootState) => state.connection);
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + '/user/connections', {
        withCredentials: true,
      });
      dispatch(addConnection(res.data.data));
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);
  // console.log(connection);
  if (!connection || connection.length === 0)
    return (
      <div className='text-center mt-20 text-gray-400 text-lg'>
        No friends found
      </div>
    );

  return (
    <div className='max-w-5xl mx-auto px-4 mt-10'>
      <div className='grid md:grid-cols-2 lg:grid-cols-2 gap-6'>
        {connection.map((user) => (
          <div>
            <FriendsCard key={user._id} user={user} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Friends;
