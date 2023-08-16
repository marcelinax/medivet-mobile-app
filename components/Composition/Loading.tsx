import { ActivityIndicator } from 'react-native';
import colors from 'themes/colors';

export const Loading = () => (
  <ActivityIndicator
    size="large"
    color={colors.GRAY_DARK}
  />
);
