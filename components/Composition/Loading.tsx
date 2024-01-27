import { ActivityIndicator } from 'react-native';
import colors from 'themes/colors';

interface Props {
  size?: 'large' | 'small';
  color?: string;
}

export const Loading = ({ size, color }: Props) => (
  <ActivityIndicator
    size={size ?? 'large'}
    color={color ?? colors.GRAY_DARK}
  />
);
