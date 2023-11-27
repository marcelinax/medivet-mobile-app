import { StyleSheet, Text, View } from 'react-native';
import colors from 'themes/colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import icons from 'themes/icons';
import { FormatAddress } from 'components/Formatters/FormatAddress';
import { Button } from 'components/Buttons/Button';
import { Clinic } from 'types/api/clinic/types';
import { VetClinicProvidedMedicalService } from 'types/api/vetClinicProvidedMedicalService/types';
import { VetClinicMedicalService } from 'components/Screens/Home/Vet/VetClinicMedicalService';
import { useTranslation } from 'react-i18next';

interface Props {
  clinic: Clinic;
  medicalServices: VetClinicProvidedMedicalService[];
}

export const VetClinic = ({ clinic, medicalServices }: Props) => {
  const { t } = useTranslation();

  const drawMedicalServices = () => {
    if (medicalServices.length > 0) {
      return medicalServices.map((medicalService) => (
        <VetClinicMedicalService
          medicalService={medicalService}
          key={`medical-service-${medicalService.id}`}
        />
      ));
    }
    return <Text style={styles.information}>{t('words.vet_has_not_any_medical_services.title')}</Text>;
  };

  return (
    <View>
      <View style={styles.row}>
        <Ionicons
          name={icons.LOCATION}
          color={colors.PRIMARY}
          size={20}
          style={styles.icon}
        />
        <View>
          <Text style={styles.name}>
            {clinic.name}
          </Text>
          <FormatAddress
            address={clinic.address}
            style={styles.information}
          />
        </View>
      </View>
      <View style={styles.infoContainer}>
        <Button
          title={t('actions.show_calendar.title')}
          variant="outline"
          style={styles.button}
          onPress={() => {
            // TODO przenieść do kalendarza
          }}
          containerStyle={styles.buttonContainer}
        />
      </View>
      <View style={{ marginTop: 16 }}>
        <View style={styles.row}>
          <Ionicons
            name={icons.MEDKIT_OUTLINE}
            color={colors.PRIMARY}
            size={20}
            style={{ marginRight: 7 }}
          />
          <Text style={styles.heading}>
            {t('words.services.title')}
          </Text>
        </View>
        {drawMedicalServices()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  icon: {
    marginRight: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: '500',
  },
  information: {
    fontSize: 16,
    color: colors.GRAY_DARK,
  },
  infoContainer: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  buttonContainer: { flex: 1 },
  heading: {
    fontWeight: '500',
    fontSize: 18,
    marginBottom: 8,
  },
});
