import { VetClinicProvidedMedicalService } from 'types/api/vetClinicProvidedMedicalService/types';
import { StyleSheet, Text, View } from 'react-native';
import { OutlineCard } from 'components/Composition/OutlineCard';
import colors from 'themes/colors';
import { commonTranslations } from 'constants/translations/common.translations';

interface Props {
  medicalService: VetClinicProvidedMedicalService;
}

export const VetClinicProvidedMedicalServiceListItem = ({ medicalService }: Props) => {
  const a = '';

  return (
    <OutlineCard>
      <View>
        <Text style={styles.name}>{medicalService.medicalService.name}</Text>
        <Text style={styles.specialization}>{medicalService.medicalService.specialization.name}</Text>
        <View style={styles.otherInformationContainer}>
          <Text style={styles.otherInformationLabel}>
            {`${commonTranslations.PRICE}: `}
          </Text>
          <Text style={styles.otherInformationValue}>
            {`${medicalService.price} PLN`}
          </Text>
        </View>
        <View style={styles.otherInformationContainer}>
          <Text style={styles.otherInformationLabel}>
            {`${commonTranslations.AVERAGE_DURATION_TIME}: `}
          </Text>
          <Text style={styles.otherInformationValue}>
            {`${medicalService.duration} ${commonTranslations.MINUTES}`}
          </Text>
        </View>
      </View>
    </OutlineCard>
  );
};

const styles = StyleSheet.create({
  name: {
    fontWeight: '600',
    fontSize: 20,
    color: colors.PRIMARY,
  },
  specialization: {
    fontWeight: '500',
    fontSize: 16,
    marginTop: 5,
  },
  otherInformationContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  otherInformationLabel: {
    fontWeight: '500',
    fontSize: 15,
  },
  otherInformationValue: {
    fontSize: 15,
    color: colors.GRAY_DARK,
  },
});
