import { VetClinicProvidedMedicalService } from 'types/api/vetClinicProvidedMedicalService/types';
import { StyleSheet, Text, View } from 'react-native';
import colors from 'themes/colors';
import { SwipeButtonActionProps } from 'types/components/Buttons/types';
import icons from 'themes/icons';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from 'types/Navigation/types';
import { SwipeButton } from 'components/Buttons/SwipeButton/SwipeButton';
import { useConfirmationAlert } from 'hooks/Alerts/useConfirmationAlert';
import { useErrorAlert } from 'hooks/Alerts/useErrorAlert';
import {
  VetClinicProvidedMedicalServiceApi,
} from 'api/vetClinicProvidedMedicalService/vetClinicProvidedMedicalService.api';
import { useTranslation } from 'react-i18next';
import { getRequestErrors } from 'utils/errors';
import { Card } from 'components/Composition/Card';
import { listItemStyles } from 'screens/utils/styles';
import { useSuccessAlert } from 'hooks/Alerts/useSuccessAlert';
import { useDispatch } from 'react-redux';
import { setForceFetchingList } from 'store/list/listSlice';

interface Props {
  medicalService: VetClinicProvidedMedicalService;
  setRemoveLoading: (loading: boolean) => void;
}

export const VetClinicProvidedMedicalServiceListItem = ({
  medicalService,
  setRemoveLoading,
}: Props) => {
  const navigation = useNavigation<NavigationProps>();
  const confirmation = useConfirmationAlert();
  const { handleErrorAlert } = useErrorAlert();
  const { handleSuccessAlert } = useSuccessAlert();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleEditVetClinicProvidedMedicalService = () => navigation.navigate(
    'Edit Vet Clinic Provided Medical Service',
    { medicalServiceId: medicalService.id },
  );

  const handleRemoveVetClinicProvidedMedicalService = async () => {
    await confirmation({
      title: '',
      message: t('alerts.confirmation.remove.title'),
    });
    setRemoveLoading(true);
    try {
      await VetClinicProvidedMedicalServiceApi.removeVetClinicProvidedMedicalService(medicalService.id);
      handleSuccessAlert();
      dispatch(setForceFetchingList(true));
    } catch (err: any) {
      const errors = getRequestErrors(err);
      handleErrorAlert(errors);
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
    <SwipeButton
      size="small"
      rightActions={rightActions}
    >
      <View style={listItemStyles.container}>
        <Card>
          <View>
            <Text style={styles.name}>{medicalService.medicalService.name}</Text>
            <Text style={styles.specialization}>{medicalService.medicalService.specialization.name}</Text>
            <View style={styles.otherInformationContainer}>
              <Text style={styles.otherInformationLabel}>
                {`${t('words.price.title')}: `}
              </Text>
              <Text style={styles.otherInformationValue}>
                {`${medicalService.price} PLN`}
              </Text>
            </View>
            <View style={styles.otherInformationContainer}>
              <Text style={styles.otherInformationLabel}>
                {`${t('words.average_duration_time.title')}: `}
              </Text>
              <Text style={styles.otherInformationValue}>
                {`${t('words.minutes.title', { count: medicalService.duration })}`}
              </Text>
            </View>
          </View>
        </Card>
      </View>
    </SwipeButton>
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
  container: {
    paddingHorizontal: 15,
    backgroundColor: colors.WHITE,
  },
});
