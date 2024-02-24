import { ScrollView, StyleSheet, View } from 'react-native';
import { Clinic } from 'types/api/clinic/types';
import { Button } from 'components/Buttons/Button';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { VetClinic } from 'components/Screens/Home/Vet/VetClinic';
import { VetClinicProvidedMedicalService } from 'types/api/vetClinicProvidedMedicalService/types';
import colors from 'themes/colors';
import { User } from 'types/api/user/types';

interface Props {
  clinics: Clinic[];
  medicalServices: VetClinicProvidedMedicalService[];
  vet: User;
}

export const VetClinics = ({ clinics, medicalServices, vet }: Props) => {
  const [ currentClinic, setCurrentClinic ] = useState<Clinic>(clinics[0]);
  const { t } = useTranslation();

  const getMedicalServicesForClinic = () => medicalServices.filter((medicalService) => medicalService.clinic.id === currentClinic.id);

  const drawClinicButtons = () => clinics.map((clinic, index) => (
    <Button
      title={`${t('words.address.title')} ${index + 1}`}
      variant={currentClinic.id === clinic.id ? 'solid' : 'outline'}
      onPress={() => setCurrentClinic(clinic)}
      containerStyle={index !== clinics.length - 1 ? styles.buttonContainer : styles.lastButtonContainer}
      style={styles.button}
      key={`clinic-${clinic.id}`}
    />
  ));

  return (
    <ScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
    >
      {clinics.length > 1 && (
        <View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            <View style={styles.buttonsContainer}>
              {drawClinicButtons()}
            </View>
          </ScrollView>
        </View>
      )}
      <View style={clinics.length > 1 ? styles.clinicContainer : { marginTop: 16 }}>
        <VetClinic
          clinic={currentClinic}
          medicalServices={getMedicalServicesForClinic()}
          vet={vet}
        />
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginRight: 10,
  },
  lastButtonContainer: {
    marginRight: 0,
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  buttonsContainer: {
    marginVertical: 10,
    flexDirection: 'row',
  },
  clinicContainer: {
    borderTopWidth: 1,
    borderColor: colors.GRAY_LIGHT,
    paddingVertical: 16,
    marginTop: 16,
  },
});
