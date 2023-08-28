import { VetClinicProvidedMedicalService } from 'types/api/vetClinicProvidedMedicalService/types';
import { StyleSheet, Text, View } from 'react-native';
import { OutlineCard } from 'components/Composition/OutlineCard';
import colors from 'themes/colors';
import { commonTranslations } from 'constants/translations/common.translations';
import { SwipeButtonActionProps } from 'types/components/Buttons/types';
import icons from 'themes/icons';
import { useNavigation } from '@react-navigation/native';
import { VetClinicProvidedMedicalServicesScreenNavigationProps } from 'types/Navigation/types';
import { SwipeButton } from 'components/Buttons/SwipeButton/SwipeButton';
import { confirmationAlertTranslations } from 'constants/translations/alerts/confirmationAlert.translations';
import { useConfirmationAlert } from 'hooks/Alerts/useConfirmationAlert';
import { useErrorAlert } from 'hooks/Alerts/useErrorAlert';
import { useState } from 'react';
import { ApiError } from 'types/api/error/types';
import {
  VetClinicProvidedMedicalServiceApi,
} from 'api/vetClinicProvidedMedicalService/vetClinicProvidedMedicalService.api';

interface Props {
  medicalService: VetClinicProvidedMedicalService;
  setRemoveLoading: (loading: boolean) => void;
  handleSuccessAction: () => void;
}

export const VetClinicProvidedMedicalServiceListItem = ({
  medicalService,
  setRemoveLoading,
  handleSuccessAction,
}: Props) => {
  const navigation = useNavigation<VetClinicProvidedMedicalServicesScreenNavigationProps>();
  const confirmation = useConfirmationAlert();
  const { handleErrorAlert, drawErrorAlert } = useErrorAlert();
  const [ errors, setErrors ] = useState<ApiError[]>([]);

  const handleEditVetClinicProvidedMedicalService = () => navigation.navigate(
    'Edit Vet Clinic Provided Medical Service',
    { medicalServiceId: medicalService.id },
  );

  const handleRemoveVetClinicProvidedMedicalService = async () => {
    await confirmation({
      title: '',
      message: confirmationAlertTranslations.REMOVING_CONFIRMATION,
    });
    setRemoveLoading(true);
    try {
      await VetClinicProvidedMedicalServiceApi.removeVetClinicProvidedMedicalService(medicalService.id);
      handleSuccessAction();
    } catch (err: any) {
      const errs = [ err?.response?.data ];
      setErrors([ ...errs ]);
      handleErrorAlert(errs);
    }
    setRemoveLoading(false);
  };

  const rightActions: SwipeButtonActionProps[] = [
    {
      icon: icons.PENCIL_OUTLINE,
      color: colors.WARNING,
      onPress: handleEditVetClinicProvidedMedicalService,
      id: 'edit',
      backgroundColor: 'transparent',
    },
    {
      icon: icons.TRASH_OUTLINE,
      color: colors.DANGER,
      onPress: handleRemoveVetClinicProvidedMedicalService,
      id: 'remove',
      backgroundColor: 'transparent',
    },
  ];

  return (
    <>
      {drawErrorAlert(errors)}
      <SwipeButton
        size="small"
        rightActions={rightActions}
      >
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
      </SwipeButton>
    </>
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
