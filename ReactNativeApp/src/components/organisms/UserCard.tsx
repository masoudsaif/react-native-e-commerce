import React, {FC, memo} from 'react';
import {View, ViewProps, ViewStyle} from 'react-native';

import useUsers from '../../hooks/useUsers';
import {sizes} from '../../styles/sizes';
import {IUser} from '../../utility/constants/types';
import Typography from '../atoms/Typography';
import Button from '../molecules/Button';

export interface IUserCardProps extends ViewProps, ViewStyle {
  user: IUser;
}

const UserCard: FC<IUserCardProps> = memo(({user, style, ...props}) => {
  const {_id, fullName, email, role, isDisabled} = user;
  const {updateUser} = useUsers();

  const handleUserUpdate = () => updateUser(_id, !isDisabled);

  return (
    <View {...props} style={[style, props]}>
      <Typography
        fontWeight="800"
        size="lg"
        fontColor="primaryFont"
        marginVertical={sizes.md}>
        {fullName}
      </Typography>
      <Typography size="sm" marginBottom={sizes.md}>
        {email}
      </Typography>
      <Typography marginBottom={sizes.md}>{role}</Typography>
      {role === 'CUSTOMER' ? (
        <Button
          size="small"
          alignSelf="flex-end"
          title={isDisabled ? 'Activate' : 'Disable'}
          onPress={handleUserUpdate}
        />
      ) : null}
    </View>
  );
});

export default UserCard;
