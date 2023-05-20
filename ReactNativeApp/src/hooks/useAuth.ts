import {useNavigation} from '@react-navigation/native';
import {Dispatch, SetStateAction} from 'react';
import {useDispatch} from 'react-redux';

import {signInUser, signOutUser} from '../redux/reducers/authSlice';
import {turnOffBoolean, turnOnBoolean} from '../redux/reducers/booleansSlice';
import {sensitiveStorage} from '../redux/reducers/reducer';
import {clearSettings} from '../redux/reducers/settingsSlice';
import {setToken} from '../redux/reducers/tokenSlice';
import {SIGN_IN_API, SIGN_UP_API} from '../utility/constants/api';
import axios from '../utility/constants/axios';
import {TOKEN} from '../utility/constants/keys';
import {SCREENS} from '../utility/constants/screens';
import {INavigation} from '../utility/constants/types';

export interface IAuthValues {
  fullName?: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

const useAuth = (setError?: Dispatch<SetStateAction<string | undefined>>) => {
  const dispatch = useDispatch();
  const {navigate} = useNavigation() as INavigation;

  const handleAuth = (values: IAuthValues) => {
    dispatch(turnOnBoolean('isLoading'));
    axios
      .post(values.fullName ? SIGN_UP_API : SIGN_IN_API, values)
      .then(({data}) => {
        const {token, ...user} = data;
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
        dispatch(setToken(token));
        dispatch(signInUser(user));
        dispatch(turnOnBoolean('isTabBarActive'));
        sensitiveStorage.setItem(TOKEN, token);
        navigate({name: SCREENS.HOME});
      })
      .catch(error => {
        if (setError) {
          setError(error.response?.data.message || error.message);
        }
      })
      .finally(() => dispatch(turnOffBoolean('isLoading')));
  };

  const handleSignOut = () => {
    dispatch(signOutUser());
    dispatch(setToken(null));
    dispatch(turnOffBoolean('isTabBarActive'));
    dispatch(clearSettings());
    navigate({name: SCREENS.SIGN_IN});
    axios.defaults.headers.common.Authorization = '';
    sensitiveStorage.removeItem(TOKEN);
  };

  return {handleAuth, handleSignOut};
};

export default useAuth;
