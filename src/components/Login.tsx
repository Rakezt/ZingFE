import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constant';
import { addUser } from '../utils/userSlice';

const Login = () => {
  const [emailId, setEmailId] = useState('rakesh@123.com');
  const [password, setPassword] = useState('Feb@2026');
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + '/login',
        { emailId, password },
        { withCredentials: true },
      );
      dispatch(addUser(res.data.data));
      navigate('/');
    } catch (error) {
      // setError(error);
      if (error instanceof axios.AxiosError) {
        setError(error.response?.data);
      }
    }
  };
  return (
    <div className='flex justify-center'>
      <div className='card card-border bg-base-300 w-96 my-10 '>
        <div className='card-body'>
          <h2 className='card-title justify-center'>Login</h2>
          <fieldset className='fieldset'>
            <input
              type='text'
              className='input'
              placeholder='Email'
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
            />
          </fieldset>
          <fieldset className='fieldset'>
            <input
              type='text'
              className='input'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>
          <p className='text-error'>{error}</p>
          <div className='card-actions justify-end'>
            <button className='btn btn-primary' onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
