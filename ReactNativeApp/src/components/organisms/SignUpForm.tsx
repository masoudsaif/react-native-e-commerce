import {useIsFocused} from '@react-navigation/native';
import {FC, memo, useEffect, useState} from 'react';
import React from 'react';
import {
  KeyboardAvoidingView,
  TouchableOpacity,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';

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
import useUsers from '../../hooks/useUsers';

export interface ISignUpFormProps
  extends INavigationProp,
    ViewProps,
    ViewStyle {
  isAdmin?: boolean;
}

const SignUpForm: FC<ISignUpFormProps> = memo(
  ({isAdmin, navigation, style, ...props}) => {
    const isFocused = useIsFocused();
    const {values, handleCreateHandler, handleResetForm} = useForm({
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
      useState(false);
    const [error, setError] = useState<string>();
    const {handleAuth} = useAuth(setError);
    const {createAdminUser} = useUsers(setError);

    const handleTogglePasswordVisibility = () =>
      setIsPasswordVisible(prev => !prev);

    const handleToggleConfirmPasswordVisibility = () =>
      setIsConfirmPasswordVisible(prev => !prev);

    const handleNavigateSignIn = () => navigation.navigate(SCREENS.SIGN_IN);

    const handleSubmit = () =>
      isAdmin ? createAdminUser(values) : handleAuth(values);

    useEffect(() => {
      if (!isFocused) {
        setError(undefined);
        handleResetForm();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFocused]);

    return (
      <KeyboardAvoidingView
        style={[styles.spaceBetween, styles.flex, styles.center, style, props]}>
        <View style={[styles.flex, styles.semiFullWidth, styles.centerContent]}>
          <Typography
            fontColor="primaryFont"
            size="3xl"
            fontWeight="800"
            numberOfLines={1}>
            {isAdmin ? 'Create admin account' : 'Create account'}
          </Typography>
          <Typography marginVertical={sizes.xxl}>
            {isAdmin
              ? 'Please enter the account information'
              : 'Please create an account to continue.'}
          </Typography>
          <Input
            autoFocus
            autoComplete="name-given"
            label="Full name"
            marginTop={sizes.xxl}
            value={values.fullName}
            onChangeText={handleCreateHandler('fullName')}
            startAdornment={<Icon name="person-circle-outline" color="dark" />}
          />
          <Input
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
            autoComplete="password-new"
            marginTop={sizes.xl}
            value={values.password}
            onChangeText={handleCreateHandler('password')}
            startAdornment={
              <IconButton
                padding={0}
                name={isPasswordVisible ? 'ios-eye-off-outline' : 'eye-outline'}
                color="dark"
                onPress={handleTogglePasswordVisibility}
              />
            }
          />
          <Input
            secureTextEntry={!isConfirmPasswordVisible}
            label="Confirm password"
            autoComplete="password-new"
            marginVertical={sizes.xl}
            value={values.confirmPassword}
            onChangeText={handleCreateHandler('confirmPassword')}
            startAdornment={
              <IconButton
                padding={0}
                name={
                  isConfirmPasswordVisible
                    ? 'ios-eye-off-outline'
                    : 'eye-outline'
                }
                color="dark"
                onPress={handleToggleConfirmPasswordVisibility}
              />
            }
          />
          <CollapsibleAlert>{error}</CollapsibleAlert>
          <View style={styles.flexEnd}>
            <Button
              marginTop={sizes.xl}
              title={isAdmin ? 'Create' : 'Sign up'}
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
        {!isAdmin ? (
          <View style={[styles.row, styles.center, styles.separator]}>
            <Typography>Already have an account?</Typography>
            <TouchableOpacity onPress={handleNavigateSignIn}>
              <Typography fontColor="primary" padding={sizes.md}>
                Sign in!
              </Typography>
            </TouchableOpacity>
          </View>
        ) : null}
      </KeyboardAvoidingView>
    );
  },
);

export default SignUpForm;
