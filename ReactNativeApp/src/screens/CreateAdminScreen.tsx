import React, {FC, memo} from 'react';

import ScreenLayout from '../components/organisms/ScreenLayout';
import SignUpForm from '../components/organisms/SignUpForm';
import {INavigationProp} from '../utility/constants/types';

const CreateAdminScreen: FC<INavigationProp> = memo(({navigation}) => (
  <ScreenLayout isBackActive navigation={navigation}>
    <SignUpForm isAdmin navigation={navigation} />
  </ScreenLayout>
));

export default CreateAdminScreen;
