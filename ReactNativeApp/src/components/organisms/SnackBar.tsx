import React, {FC, memo, useCallback, useEffect, useRef, useState} from 'react';
import {Animated, StyleSheet, View, ViewProps} from 'react-native';

import {palette} from '../../styles/palette';
import {sizes} from '../../styles/sizes';
import Icon from '../atoms/Icon';
import Typography from '../atoms/Typography';
import IconButton from '../molecules/IconButton';

export interface ISnackBarProps extends ViewProps {
  animationDuration?: number;
  duration?: number;
  isOpen?: boolean;
  text?: string;
  onClose?(): void;
  onHide?(): void;
}

const SnackBar: FC<ISnackBarProps> = memo(
  ({
    animationDuration = 300,
    duration = 2000,
    isOpen,
    text,
    onClose,
    onHide,
    style,
    ...props
  }) => {
    const [open, setOpen] = useState<boolean>(isOpen || true);
    const {current: translateY} = useRef(new Animated.Value(0));
    const closeRef = useRef(0);
    const transformStyle = {
      transform: [
        {
          translateY: translateY.interpolate({
            inputRange: [0, 1],
            outputRange: [-200, 20],
          }),
        },
      ],
    };

    const handleClose = useCallback(() => {
      setOpen(false);
      if (onClose) {
        onClose();
      }
      if (onHide) {
        setTimeout(onHide, animationDuration + 200);
      }
    }, [onClose, onHide, animationDuration]);

    const handleCloseTimeout = useCallback(() => {
      clearTimeout(closeRef.current);
      closeRef.current = setTimeout(handleClose, duration);
    }, [handleClose, duration]);

    const handleAnimation = useCallback(() => {
      Animated.timing(translateY, {
        toValue: open ? 1 : 0,
        duration: animationDuration,
        useNativeDriver: true,
      }).start(open ? handleCloseTimeout : undefined);
    }, [translateY, open, animationDuration, handleCloseTimeout]);

    useEffect(() => handleAnimation(), [handleAnimation]);

    useEffect(() => {
      if (isOpen) {
        setOpen(isOpen);
      }
    }, [isOpen]);

    return (
      <View {...props} style={[style, snackBarStyles.container]}>
        <Animated.View
          style={[snackBarStyles.animatedContainer, transformStyle]}>
          <View style={snackBarStyles.contentContainer}>
            <Icon isMaterialIcon color="white" iconSize="md" name="info" />
            <Typography
              marginLeft={sizes.xl}
              marginRight={sizes['9xl']}
              color="white">
              {text}
            </Typography>
          </View>
          <View style={snackBarStyles.buttonContainer}>
            <IconButton name="close" color="white" onPress={handleClose} />
          </View>
        </Animated.View>
      </View>
    );
  },
);

export const snackBarStyles = StyleSheet.create({
  container: {
    width: '100%',
  },
  animatedContainer: {
    zIndex: 1,
    borderRadius: sizes.xxl,
    backgroundColor: palette.green,
    width: '100%',
  },
  contentContainer: {
    elevation: sizes.lg,
    padding: sizes.xl,
    paddingTop: sizes['5xl'],
    borderRadius: sizes.xl,
    backgroundColor: palette.primary,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    width: '100%',
    top: -5,
    zIndex: 1,
    flexDirection: 'row-reverse',
  },
});

export default SnackBar;
