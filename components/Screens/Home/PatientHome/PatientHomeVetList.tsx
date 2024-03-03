import {
  ScrollView, StyleSheet, Text, View,
} from 'react-native';
import { User } from 'types/api/user/types';
import { PatientHomeVetListItem } from 'components/Screens/Home/PatientHome/PatientHomeVetListItem';
import { homeStyles } from 'components/Screens/Home/styles/styles';

interface Props {
  vets: User[];
  title: string;
}

export const PatientHomeVetList = ({ vets, title }: Props) => (
  <View style={styles.container}>
    <Text
      style={homeStyles.headerText}
    >
      {title}
    </Text>
    <View style={homeStyles.listContainer}>
      <ScrollView
        horizontal
        contentContainerStyle={homeStyles.scrollViewContainer}
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
});
