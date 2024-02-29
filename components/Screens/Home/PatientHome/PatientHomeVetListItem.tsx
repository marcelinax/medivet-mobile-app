import { User } from 'types/api/user/types';
import {
  StyleSheet, Text, TouchableWithoutFeedback, View,
} from 'react-native';
import { Avatar } from 'components/Composition/Avatar';
import { Card } from 'components/Composition/Card';
import colors from 'themes/colors';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from 'types/Navigation/types';

interface Props {
  vet: User;
}

export const PatientHomeVetListItem = ({ vet }: Props) => {
  const navigation = useNavigation<NavigationProps>();
  const specializations = (vet.specializations || []).map(
    (specialization) => specialization.name,
  ).join(', ');

  return (
    <TouchableWithoutFeedback onPress={() => navigation.push('Vet', { vetId: vet.id })}>
      <View>
        <Card style={styles.card}>
          <View style={styles.container}>
            <Avatar
              size="medium"
              url={vet.profilePhotoUrl}
            />
            <Text
              style={styles.name}
              numberOfLines={2}
            >
              {vet.name}
            </Text>
            <Text
              style={styles.specializations}
              numberOfLines={3}
            >
              {specializations}
            </Text>
          </View>
        </Card>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  name: {
    fontWeight: '500',
    marginTop: 10,
    textAlign: 'center',
    flex: 0.4,
  },
  specializations: {
    fontSize: 14,
    color: colors.GRAY_DARK,
    textAlign: 'center',
    flex: 0.6,
    verticalAlign: 'top',
  },
  card: {
    flex: 1,
    maxWidth: 180,
    height: 210,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
});
