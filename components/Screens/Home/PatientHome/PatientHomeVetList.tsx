import {
  ScrollView, StyleSheet, Text, View,
} from 'react-native';
import { User } from 'types/api/user/types';
import { PatientHomeVetListItem } from 'components/Screens/Home/PatientHome/PatientHomeVetListItem';
import { patientHomeStyles } from 'components/Screens/Home/PatientHome/styles/styles';
import colors from 'themes/colors';

interface Props {
  vets: User[];
  title: string;
}

export const PatientHomeVetList = ({ vets, title }: Props) => (
  <View style={styles.container}>
    <Text
      style={patientHomeStyles.headerText}
    >
      {title}
    </Text>
    <View style={styles.listContainer}>
      <ScrollView
        horizontal
        contentContainerStyle={styles.scrollViewContainer}
        showsHorizontalScrollIndicator={false}
      >
        {vets.map((vet) => (
          <PatientHomeVetListItem
            vet={vet}
            key={vet.id}
          />
        ))}
      </ScrollView>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  listContainer: {
    backgroundColor: colors.GRAY_LIGHTER,
    padding: 16,
    borderRadius: 10,
  },
  scrollViewContainer: {
    gap: 10,
  },
  emptyListTitle: {
    textAlign: 'center',
    fontWeight: '500',
  },
});
