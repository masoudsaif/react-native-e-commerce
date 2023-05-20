import React, {FC, memo} from 'react';

import ScreenLayout from '../components/organisms/ScreenLayout';
import SignInForm from '../components/organisms/SignInForm';
import {INavigationProp} from '../utility/constants/types';

const SignInScreen: FC<INavigationProp> = memo(({navigation}) => (
  <ScreenLayout navigation={navigation}>
    <SignInForm navigation={navigation} />
  </ScreenLayout>
));

export default SignInScreen;
