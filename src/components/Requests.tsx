import axios from 'axios';
import { BASE_URL } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { addRequests, removeRequest } from '../utils/requestSlics';
import { useEffect } from 'react';
import type { RequestData } from '../utils/types';
import FriendsCard from './FriendsCard';

interface RootState {
  request: RequestData[];
}

const Requests = () => {
  const dispatch = useDispatch();
  const request = useSelector((state: RootState) => state.request);
  const fetchRequest = async () => {
    try {
      const res = await axios.get(BASE_URL + '/user/request/received', {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
      console.log(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleRequest = async (status: string, _id: string) => {
    try {
      await axios.post(
        BASE_URL + '/request/review/' + status + '/' + _id,
        {},
        { withCredentials: true },
      );
      dispatch(removeRequest(_id));
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchRequest();
  }, []);
  if (!request || request.length === 0)
    return (
      <div className='text-center mt-20 text-gray-400 text-lg'>
        No friends found
      </div>
    );

  return (
    <div className='max-w-5xl mx-auto px-4 mt-10'>
      <div className='grid md:grid-cols-2 lg:grid-cols-2 gap-6'>
        {request.map((req) => (
          <div key={req._id}>
            <FriendsCard
              user={req.fromUserId}
              showActions={true}
              onAccept={() => handleRequest('accepted', req._id)}
              onReject={() => handleRequest('rejected', req._id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default Requests;
