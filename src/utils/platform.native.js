// @flow
import { Platform } from 'react-native';

export const isAndroid = () => Platform.OS === 'android';
export const isHigherThanLolipop = () => Platform.Version >= 25;
export const isIOS = () => Platform.OS === 'ios';
