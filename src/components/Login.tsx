import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constant';
import { addUser } from '../utils/userSlice';

const Login = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [newUser, setNewUser] = useState(false);

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
      if (error instanceof axios.AxiosError) {
        setError(error.response?.data);
      }
    }
  };
  const handleSignup = async () => {
    try {
      const res = await axios.post(
        BASE_URL + '/signup',
        { firstName, lastName, emailId, password },
        { withCredentials: true },
      );
      dispatch(addUser(res.data.data));
      navigate('/');
    } catch (error) {
      if (error instanceof axios.AxiosError) {
        setError(error.response?.data);
      }
    }
  };
  const handleToggle = () => {
    setNewUser(!newUser);
  };
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  return (
    <div className='min-h-[calc(100vh-120px)] flex justify-center items-center'>
      <div className='w-full max-w-md'>
        <div className='bg-base-200/70 backdrop-blur-lg shadow-2xl rounded-3xl p-8 border border-base-300'>
          {' '}
          <h2 className='text-3xl font-bold text-center mb-6'>
            {newUser ? 'Create Account 💘' : 'Welcome Back'}
          </h2>
          {newUser && (
            <>
              <fieldset className='fieldset'>
                <input
                  type='text'
                  className='input input-bordered w-full mb-3'
                  placeholder='First Name'
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </fieldset>
              <fieldset className='fieldset'>
                <input
                  type='text'
                  className='input input-bordered w-full mb-3'
                  placeholder='Last Name'
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </fieldset>
            </>
          )}
          <fieldset className='fieldset'>
            <input
              type='text'
              className='input input-bordered w-full mb-3'
              placeholder='Email'
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
            />
          </fieldset>
          <fieldset className='fieldset'>
            <input
              type='password'
              className='input input-bordered w-full mb-3'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>
          {error && <p className='text-error text-sm mb-3'>{error}</p>}
          <div className='card-actions justify-end'>
            {newUser ? (
              <button
                className='btn btn-accent w-full mt-2'
                onClick={handleSignup}
              >
                Sign Up
              </button>
            ) : (
              <button
                className='btn btn-accent w-full mt-2'
                onClick={handleLogin}
              >
                Login
              </button>
            )}
          </div>
          <div className='text-center mt-5 text-sm'>
            {newUser ? (
              <p>
                Already have an account?{' '}
                <span
                  className='text-accent cursor-pointer font-semibold'
                  onClick={handleToggle}
                >
                  Login
                </span>
              </p>
            ) : (
              <p>
                New here?{' '}
                <span
                  className='text-accent cursor-pointer font-semibold'
                  onClick={handleToggle}
                >
                  Create account
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
