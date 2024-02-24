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
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from 'types/Navigation/types';
import { User } from 'types/api/user/types';
import { PaymentMethodStatus } from 'constants/enums/enums';

interface Props {
  clinic: Clinic;
  medicalServices: VetClinicProvidedMedicalService[];
  vet: User;
}

export const VetClinic = ({ clinic, medicalServices, vet }: Props) => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProps>();

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
      <View style={[ styles.row, { marginBottom: 16 } ]}>
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
      <View style={styles.row}>
        <Ionicons
          name={icons.CASH_OUTLINE}
          color={colors.PRIMARY}
          size={20}
          style={styles.icon}
        />
        <View>
          <Text style={styles.information}>
            {clinic.paymentMethods.filter(
              (paymentMethod) => paymentMethod.status === PaymentMethodStatus.ACTIVE,
            ).map((paymentMethod) => paymentMethod.name).join(', ')}
          </Text>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <Button
          title={t('actions.show_calendar.title')}
          variant="outline"
          style={styles.button}
          onPress={() => navigation.navigate('Appointment Calendar', {
            vet,
            clinicId: clinic.id,
            medicalService: medicalServices[0],
          })}
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
    marginTop: 2,
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
