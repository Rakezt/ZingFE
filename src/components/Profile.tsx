import { useSelector } from 'react-redux';

import type { UserState } from '../utils/types';
import EditProfile from './EditProfile';
interface RootState {
  user: UserState;
}

const Profile = () => {
  const user = useSelector((state: RootState) => state.user);

  return <>{user && <EditProfile user={user} />}</>;
};

export default Profile;
