import {
  ScrollView, StyleSheet, Text, View,
} from 'react-native';
import { User } from 'types/api/user/types';
import { PatientHomeVetListItem } from 'components/Screens/Home/PatientHome/PatientHomeVetListItem';
import { homeStyles } from 'components/Screens/Home/styles/styles';

interface Props {
  vets: User[] | undefined;
  title: string;
  emptyDataTitle: string;
}

export const PatientHomeVetList = ({ vets, title, emptyDataTitle }: Props) => (
  <View style={styles.container}>
    <Text
      style={homeStyles.headerText}
    >
      {title}
    </Text>
    <View style={[ homeStyles.listContainer, !vets && styles.containerWithoutData ]}>
      {vets ? (
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
      ) : <Text style={homeStyles.sectionNoData}>{emptyDataTitle}</Text>}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  containerWithoutData: {
    minHeight: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
