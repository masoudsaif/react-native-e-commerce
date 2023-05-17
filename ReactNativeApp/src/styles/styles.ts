import {StyleSheet} from 'react-native';

import palette from './palette';
import {sizes} from './sizes';
import {StatusBar} from 'react-native';

const styles = StyleSheet.create({
  defaultScreen: {
    paddingTop: StatusBar.currentHeight || 60,
    height: '100%',
    backgroundColor: palette.background,
  },
  screen: {
    paddingVertical: sizes['7xl'],
    paddingHorizontal: sizes['5xl'],
    height: '100%',
    backgroundColor: palette.background,
  },
  screenHeaderPadding: {
    paddingTop: 80,
  },
  screenPadding: {
    paddingVertical: sizes['7xl'],
    paddingHorizontal: sizes['5xl'],
  },
  screenHorizontalPadding: {
    paddingHorizontal: sizes['5xl'],
  },
  screenVerticalPadding: {
    paddingVertical: sizes['7xl'],
  },
  row: {
    flexDirection: 'row',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  flexEnd: {
    alignItems: 'flex-end',
  },
  center: {
    alignItems: 'center',
  },
  fullWidth: {
    width: '100%',
  },
  semiFullWidth: {
    width: '80%',
  },
  centerContent: {
    justifyContent: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    paddingTop: StatusBar.currentHeight || 80,
    paddingHorizontal: sizes['5xl'],
    zIndex: sizes.xs,
  },
  notificationsContainer: {
    position: 'absolute',
    zIndex: sizes.sm,
    width: '100%',
  },
  horizontalMargin: {
    marginHorizontal: sizes.md,
  },
  separator: {
    marginVertical: sizes['7xl'],
  },
  miniSeparator: {
    marginVertical: sizes.lg,
  },
  hugeVerticalPadding: {
    paddingVertical: sizes['11xl'],
  },
  square: {
    width: sizes['5xl'],
    height: sizes['5xl'],
  },
  divider: {
    height: 1,
    backgroundColor: palette.gray,
  },
  flex: {
    flex: 1,
  },
  starRating: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  categoryTypography: {
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: palette.white,
    paddingVertical: sizes['5xl'],
  },
  iconButton: {
    justifyContent: 'center',
    borderRadius: 500,
    padding: sizes.lg,
  },
  smIconButton: {
    width: 35,
    height: 35,
    padding: 0,
    borderRadius: 50,
    alignItems: 'center',
  },
  gradientIconButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 500,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: sizes.lg,
  },
  productCardImage: {
    alignSelf: 'center',
    resizeMode: 'contain',
    width: 150,
    height: 150,
  },
  productCard: {
    flex: 1,
    padding: sizes.xxl,
  },
  productButton: {
    position: 'absolute',
    marginRight: -sizes.xxl,
    right: 0,
    bottom: 7,
    borderRadius: 0,
    backgroundColor: palette.primary,
    borderTopLeftRadius: sizes['3xl'],
    borderBottomLeftRadius: sizes['3xl'],
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: '80%',
    marginBottom: -sizes.lg,
    resizeMode: 'contain',
  },
  cartImage: {
    width: 150,
    height: 150,
  },
  emptyCartImage: {
    width: 250,
    height: 250,
  },
});

export default styles;
