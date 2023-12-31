import React, {FC, memo} from 'react';

import ScreenLayout from '../components/organisms/ScreenLayout';
import SignUpForm from '../components/organisms/SignUpForm';
import {INavigationProp} from '../utility/constants/types';

const SignUpScreen: FC<INavigationProp> = memo(({navigation}) => (
  <ScreenLayout isBackActive navigation={navigation}>
    <SignUpForm navigation={navigation} />
  </ScreenLayout>
));

export default SignUpScreen;
