import {useIsFocused} from '@react-navigation/native';
import {FC, memo, useEffect, useState} from 'react';
import React from 'react';
import {KeyboardAvoidingView, TouchableOpacity, View} from 'react-native';

import useAuth from '../../hooks/useAuth';
import useForm from '../../hooks/useForm';
import {sizes} from '../../styles/sizes';
import styles from '../../styles/styles';
import {SCREENS} from '../../utility/constants/screens';
import {INavigationProp} from '../../utility/constants/types';
import Icon from '../atoms/Icon';
import Input from '../atoms/Input';
import Typography from '../atoms/Typography';
import Button from '../molecules/Button';
import IconButton from '../molecules/IconButton';
import CollapsibleAlert from './CollapsibleAlert';

const SignInForm: FC<INavigationProp> = memo(({navigation}) => {
  const isFocused = useIsFocused();
  const {values, handleCreateHandler, handleResetForm} = useForm({
    email: '',
    password: '',
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState<string>();
  const {handleAuth} = useAuth(setError);

  const handleToggleVisibility = () => setIsPasswordVisible(prev => !prev);

  const handleNavigateSignUp = () => navigation.navigate(SCREENS.SIGN_UP);

  const handleSubmit = () => handleAuth(values);

  useEffect(() => {
    if (!isFocused) {
      setError(undefined);
      handleResetForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  return (
    <KeyboardAvoidingView
      style={[styles.spaceBetween, styles.flex, styles.center]}>
      <View style={[styles.flex, styles.semiFullWidth, styles.centerContent]}>
        <Typography
          fontColor="primaryFont"
          size="3xl"
          fontWeight="800"
          numberOfLines={1}>
          Sign in
        </Typography>
        <Typography marginVertical={sizes.xxl}>
          Please sign in to continue.
        </Typography>
        <Input
          autoFocus
          label="Email"
          keyboardType="email-address"
          autoComplete="email"
          marginTop={sizes.xxl}
          value={values.email}
          onChangeText={handleCreateHandler('email')}
          startAdornment={<Icon name="mail-outline" color="dark" />}
        />
        <Input
          secureTextEntry={!isPasswordVisible}
          label="Password"
          autoComplete="password"
          marginVertical={sizes.xl}
          value={values.password}
          onChangeText={handleCreateHandler('password')}
          startAdornment={
            <IconButton
              padding={0}
              name={isPasswordVisible ? 'ios-eye-off-outline' : 'eye-outline'}
              color="dark"
              onPress={handleToggleVisibility}
            />
          }
        />
        <CollapsibleAlert>{error}</CollapsibleAlert>
        <View style={styles.flexEnd}>
          <Button
            marginTop={sizes.xl}
            title="Sign in"
            onPress={handleSubmit}
            endAdornment={
              <Icon
                name="ios-arrow-forward"
                color="white"
                style={styles.horizontalMargin}
              />
            }
          />
        </View>
      </View>
      <View style={[styles.row, styles.center, styles.separator]}>
        <Typography>Don't have an account?</Typography>
        <TouchableOpacity onPress={handleNavigateSignUp}>
          <Typography fontColor="primary" padding={sizes.md}>
            Sign up!
          </Typography>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
});

export default SignInForm;
