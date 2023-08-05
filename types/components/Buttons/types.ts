import { TouchableHighlightProps, TouchableWithoutFeedbackProps } from 'react-native';
import { ReactNode } from 'react';

export type ButtonVariant = 'solid' | 'outline' | 'link';

export type ButtonColor = 'primary' | 'secondary' | 'light' | 'danger' | 'success' | 'info';

export type ButtonFontWeight = 'bolder' | 'bold' | 'light';

export type ButtonIconSize = 'large' | 'medium' | 'small';

export interface ButtonProps extends TouchableHighlightProps {
  title: string;
  variant: ButtonVariant;
  color?: ButtonColor;
  disabled?: boolean;
  leftIcon?: any;
  rightIcon?: any;
  fontWeight?: ButtonFontWeight;
}

export interface ButtonLoadingProps extends TouchableHighlightProps {
  title: string;
  variant: ButtonVariant;
  color?: ButtonColor;
  disabled?: boolean;
  loading: boolean;
  fontWeight?: ButtonFontWeight;
}

export interface ButtonIconProps extends TouchableWithoutFeedbackProps {
  icon: any;
  size: ButtonIconSize;
  color?: string;
}

export interface SwipeButtonProps {
  children: ReactNode;
  leftActions?: SwipeButtonActionProps[];
  rightActions?: SwipeButtonActionProps[];
  size?: SwipeButtonSize;
}

export type SwipeButtonSize = 'small' | 'default';

export interface SwipeButtonActionProps {
  id: string;
  backgroundColor: string;
  onPress: () => void;
  icon: any;
  visible?: boolean;
  color?: string;
}
