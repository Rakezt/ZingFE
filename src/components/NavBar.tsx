import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../utils/constant';
import { removeUser } from '../utils/userSlice';
import type { UserState } from '../utils/types';
import { useEffect } from 'react';
interface RootState {
  user: UserState;
}

const NavBar = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + '/logout', {}, { withCredentials: true });
      dispatch(removeUser());
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    (document.activeElement as HTMLElement)?.blur();
  }, [location.pathname]);

  return (
    <div className='navbar bg-base-300 shadow-sm fixed top-0 w-full z-50'>
      <div className='flex-1'>
        <Link to='/' className='btn btn-ghost bg-accent text-xl'>
          Zing
        </Link>
      </div>
      {user && (
        <div className='flex gap-10 items-center'>
          <p>Welcome {user?.firstName}</p>

          <div className='dropdown dropdown-end mx-5'>
            <div
              tabIndex={0}
              role='button'
              className='btn btn-ghost btn-circle avatar'
            >
              <div className='w-10 rounded-full'>
                <img alt='user-photo' src={user.photoUrl} loading='lazy' />
              </div>
            </div>
            <ul
              tabIndex={-1}
              className='menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow'
            >
              <li>
                <Link to='/' className='justify-between'>
                  Home
                  {/* <span className='badge'>Edit</span> */}
                </Link>
              </li>
              <li>
                <Link to='/profile' className='justify-between'>
                  Profile
                  <span className='badge'>Edit</span>
                </Link>
              </li>
              <li>
                <Link to='/friends'>
                  Friends <span className='badge'>List</span>
                </Link>
              </li>
              <li>
                <Link to='/requests'>
                  Request <span className='badge'>Received</span>
                </Link>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
