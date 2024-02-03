import { BreakLine } from 'components/Composition/BreakLine';
import { StyleSheet, Text } from 'react-native';

interface Props {
  message: string;
}

export const OpinionMessage = ({ message }: Props) => (
  <>
    <BreakLine style={styles.breakLine} />
    <Text style={styles.message}>{message}</Text>
    <BreakLine style={styles.breakLine} />
  </>
);

const styles = StyleSheet.create({
  breakLine: {
    marginVertical: 16,
  },
  message: {
    fontSize: 16,
  },
});
