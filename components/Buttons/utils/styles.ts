import { ColorValue, StyleSheet } from 'react-native';
import colors from 'themes/colors';
import { ButtonColor, ButtonFontWeight, ButtonVariant } from 'types/components/Buttons/types';

export const buttonStyles = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 13,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    fontSize: 16,
  },
  disabled: {
    opacity: 0.5,
  },
});

export const getButtonBackgroundColor = (variant: ButtonVariant, color?: ButtonColor): ColorValue => {
  switch (variant) {
  case 'link':
  case 'outline':
    return 'transparent';
  case 'solid': {
    switch (color) {
    case 'secondary':
      return colors.SECONDARY;
    case 'light':
      return colors.GRAY_DARK;
    case 'success':
      return colors.SUCCESS;
    case 'danger':
      return colors.DANGER;
    case 'info':
      return colors.INFO;
    case 'primary':
    default:
      return colors.PRIMARY;
    }
  }
  default:
    return colors.PRIMARY;
  }
};

export const getButtonBorderColor = (color?: ButtonColor): ColorValue => {
  switch (color) {
  case 'secondary':
    return colors.SECONDARY;
  case 'light':
    return colors.GRAY_DARK;
  case 'success':
    return colors.SUCCESS;
  case 'danger':
    return colors.DANGER;
  case 'info':
    return colors.INFO;
  case 'primary':
  default:
    return colors.PRIMARY;
  }
};

export const getButtonTextColor = (variant: ButtonVariant, color?: ButtonColor): ColorValue => {
  switch (variant) {
  case 'link': {
    switch (color) {
    case 'success':
      return colors.SUCCESS;
    case 'danger':
      return colors.DANGER;
    case 'secondary':
      return colors.SECONDARY;
    case 'light':
      return colors.GRAY_DARK;
    case 'info':
      return colors.INFO;
    case 'primary':
    default:
      return colors.PRIMARY;
    }
  }
  case 'solid':
    return colors.WHITE;
  case 'outline': {
    switch (color) {
    case 'success':
      return colors.SUCCESS;
    case 'danger':
      return colors.DANGER;
    case 'secondary':
      return colors.SECONDARY;
    case 'light':
      return colors.GRAY_DARK;
    case 'info':
      return colors.INFO;
    case 'primary':
    default:
      return colors.PRIMARY;
    }
  }

  default:
    return colors.WHITE;
  }
};

export const getButtonFontWeight = (fontWeight?: ButtonFontWeight): '400' | '500' | '600' => {
  switch (fontWeight) {
  case 'light':
    return '400';
  case 'bolder':
    return '600';
  case 'bold':
  default:
    return '500';
  }
};
