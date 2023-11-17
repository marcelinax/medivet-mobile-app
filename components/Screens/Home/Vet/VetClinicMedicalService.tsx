import { StyleSheet, Text, View } from 'react-native';
import colors from 'themes/colors';
import { VetClinicProvidedMedicalService } from 'types/api/vetClinicProvidedMedicalService/types';

interface Props {
  medicalService: VetClinicProvidedMedicalService;
}

export const VetClinicMedicalService = ({ medicalService }: Props) => (
  <View style={styles.container}>
    <Text style={styles.name}>
      {`${medicalService.medicalService.name} `}
      <Text style={styles.price}>
        {`${medicalService.price} PLN`}
      </Text>
    </Text>
  </View>
);

const styles = StyleSheet.create({
  price: {
    fontSize: 18,
    color: colors.PRIMARY,
  },
  name: {
    fontSize: 18,
    color: colors.GRAY_DARK,
  },
  container: {
    flexDirection: 'row',
    paddingVertical: 8,
    flexWrap: 'wrap',
  },
});
