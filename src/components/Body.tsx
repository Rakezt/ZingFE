import { Outlet, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import NavBar from './NavBar';
import axios, { AxiosError } from 'axios';
import { BASE_URL } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useEffect } from 'react';
import type { UserState } from '../utils/types';

interface RootState {
  user: UserState;
}

const Body = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const fetchUser = async () => {
    if (userData) return;
    try {
      const res = await axios.get(BASE_URL + '/profile/view', {
        withCredentials: true,
      });
      dispatch(addUser(res.data.data));
    } catch (error) {
      if ((error as AxiosError).status === 401) {
        navigate('/login');
      }
      console.error(error);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
