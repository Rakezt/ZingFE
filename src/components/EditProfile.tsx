import { useState } from 'react';
import FeedCard from './FeedCard';
import type { Gender, UserState } from '../utils/types';
import axios from 'axios';
import { BASE_URL } from '../utils/constant';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

interface EditProfileProps {
  user: UserState;
}
const EditProfile = ({ user }: EditProfileProps) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [about, setAbout] = useState(user.about);
  const [interest, setInterest] = useState(user.interest || []);
  const [interestInput, setInterestInput] = useState('');
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const updateProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + '/profile/edit',
        {
          firstName,
          lastName,
          photoUrl,
          gender,
          about,
          age,
          interest,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res.data.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err: unknown) {
      setError(
        axios.isAxiosError(err)
          ? err.response?.data || 'Profile Update failed'
          : 'Profile Update failed',
      );
    }
  };

  return (
    <>
      <div className='flex justify-center py-5 '>
        <div className='flex flex-col lg:flex-row gap-8 items-center lg:items-start'>
          <div className='card card-border bg-base-300 w-full max-w-md'>
            <div className='card-body'>
              <h2 className='card-title justify-center'>Profile</h2>
              <fieldset className='fieldset'>
                <input
                  type='text'
                  className='input'
                  placeholder='First Name'
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </fieldset>
              <fieldset className='fieldset'>
                <input
                  type='text'
                  className='input'
                  placeholder='Last Name'
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </fieldset>

              <fieldset className='fieldset'>
                <input
                  type='text'
                  className='input'
                  placeholder='Photo Link'
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </fieldset>
              <fieldset className='fieldset'>
                <input
                  type='number'
                  className='input'
                  placeholder='Age'
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                />
              </fieldset>
              <fieldset className='fieldset relative'>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value as Gender)}
                  className='select select-bordered w-full relative z-50'
                >
                  <option value='' disabled>
                    Select Gender
                  </option>
                  <option value='male'>Male</option>
                  <option value='female'>Female</option>
                  <option value='other'>Other</option>
                </select>
              </fieldset>
              <fieldset className='fieldset'>
                <input
                  type='text'
                  className='input'
                  placeholder='Add interest and press Enter'
                  value={interestInput}
                  onChange={(e) => setInterestInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && interestInput.trim()) {
                      e.preventDefault();
                      setInterest([...interest, interestInput.trim()]);
                      setInterestInput('');
                    }
                  }}
                />
                <div className='flex flex-wrap gap-2 m-2'>
                  {interest.map((item, index) => (
                    <div key={index} className='badge badge-accent gap-2'>
                      {item}
                      <button
                        type='button'
                        onClick={() =>
                          setInterest(interest.filter((_, i) => i !== index))
                        }
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </fieldset>
              <fieldset className='fieldset'>
                <textarea
                  className='textarea'
                  placeholder='About'
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                ></textarea>
              </fieldset>

              <p className='text-error'>{error}</p>
              <div className='card-actions justify-center'>
                <button className='btn btn-accent' onClick={updateProfile}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
          <div className='w-full max-w-sm'>
            <FeedCard feed={user} />
          </div>
          {showToast && (
            <div className='toast toast-top toast-end my-15'>
              <div className='alert alert-success'>
                <span>Profile save successfully.</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EditProfile;
