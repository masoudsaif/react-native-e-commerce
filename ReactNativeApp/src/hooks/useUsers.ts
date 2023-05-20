import {useNavigation} from '@react-navigation/native';
import {Dispatch, SetStateAction} from 'react';
import {useDispatch} from 'react-redux';

import {turnOffBoolean, turnOnBoolean} from '../redux/reducers/booleansSlice';
import {setUsers, updateUserIsDisable} from '../redux/reducers/settingsSlice';
import {USERS_API} from '../utility/constants/api';
import axios from '../utility/constants/axios';
import {MENU_SCREENS} from '../utility/constants/screens';
import {INavigation} from '../utility/constants/types';
import useAuth, {IAuthValues} from './useAuth';

const useUsers = (setError?: Dispatch<SetStateAction<string | undefined>>) => {
  const dispatch = useDispatch();
  const {handleSignOut} = useAuth();
  const {navigate} = useNavigation() as INavigation;

  const getUsers = () => {
    axios
      .get(USERS_API)
      .then(({data}) => dispatch(setUsers(data)))
      .catch(error => {
        if (error.response?.status === 401) {
          handleSignOut();
        }
      });
  };

  const createAdminUser = (values: IAuthValues) => {
    dispatch(turnOnBoolean('isLoading'));
    axios
      .post(USERS_API, values)
      .then(() => navigate({name: MENU_SCREENS.LIST}))
      .catch(error => {
        if (setError) {
          setError(error.response?.data.message || error.message);
        }
      })
      .finally(() => dispatch(turnOffBoolean('isLoading')));
  };

  const updateUser = (_id: string, isDisabled: boolean) => {
    dispatch(turnOnBoolean('isLoading'));
    axios
      .patch(`${USERS_API}/${_id}`, {isDisabled})
      .then(() => dispatch(updateUserIsDisable({_id, isDisabled})))
      .catch(error => {
        if (error.response?.status === 401) {
          handleSignOut();
        }
      })
      .finally(() => dispatch(turnOffBoolean('isLoading')));
  };

  return {getUsers, createAdminUser, updateUser};
};

export default useUsers;
