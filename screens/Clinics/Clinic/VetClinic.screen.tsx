import { Clinic } from 'types/api/clinic/types';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NavigationProps, RouteProps } from 'types/Navigation/types';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useErrorAlert } from 'hooks/Alerts/useErrorAlert';
import { LoadingContainer } from 'components/Composition/LoadingContainer';
import { DefaultLayout } from 'layouts/Default.layout';
import { ClinicApi } from 'api/clinic/clinic.api';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'components/Buttons/Button';
import { useDispatch } from 'react-redux';
import { setCurrentClinic } from 'store/clinic/clinicSlice';
import { ApiError } from 'types/api/error/types';
import { useConfirmationAlert } from 'hooks/Alerts/useConfirmationAlert';
import colors from 'themes/colors';
import { useSuccessAlert } from 'hooks/Alerts/useSuccessAlert';
import { useTranslation } from 'react-i18next';
import { ClinicAssignmentRequestStatus } from 'constants/enums/enums';

export const VetClinicScreen = () => {
  const route = useRoute<RouteProps<'Vet Clinic'>>();
  const navigation = useNavigation<NavigationProps>();
  const [ clinic, setClinic ] = useState<Clinic | undefined>();
  const { drawErrorAlert, handleErrorAlert } = useErrorAlert();
  const { drawSuccessAlert, handleSuccessAlert } = useSuccessAlert();
  const dispatch = useDispatch();
  const confirmation = useConfirmationAlert();
  const [ errors, setErrors ] = useState<ApiError[]>([]);
  const isClinicAboutToRemove = !!clinic?.clinicAssignmentRequests?.find(
    (request) => request.status === ClinicAssignmentRequestStatus.TO_UNASSIGN
      && request.clinic.id === clinic?.id,
  );
  const { t } = useTranslation();

  useEffect(() => {
    fetchVetClinic();
  }, []);

  useLayoutEffect(() => {
    if (clinic) {
      navigation.setOptions({
        headerTitle: `${t('navigation.clinic.title')} "${clinic.name}"`,
      });
    }
  }, [ clinic, navigation ]);

  const fetchVetClinic = async (): Promise<void> => {
    try {
      const params = { include: 'clinicAssignmentRequests,clinicAssignmentRequests.clinic' };
      const res = await ClinicApi.getClinic(route.params.clinicId, params);
      setClinic(res);
      dispatch(setCurrentClinic(res));
    } catch (err: any) {
      const errs = [ err?.response?.data ];
      setErrors([ ...errs ]);
      handleErrorAlert(errs);
    }
  };

  const handleRemoveVetClinic = async (): Promise<void> => {
    try {
      await confirmation({
        title: '',
        message: `${t('alerts.confirmation.remove_clinic.title')} "${clinic!.name}"?`,
      });
      await ClinicApi.removeClinic(clinic!.id);
      handleSuccessAlert();
      fetchVetClinic();
    } catch (err: any) {
      const errs = [ err?.response?.data ];
      setErrors([ ...errs ]);
      handleErrorAlert(errs);
    }
  };

  const handleCancelVetClinicRemoval = async (): Promise<void> => {
    try {
      await confirmation({
        title: '',
        message: t('alerts.confirmation.message'),
      });
      await ClinicApi.cancelClinicRemoval(clinic!.id);
      handleSuccessAlert();
      fetchVetClinic();
    } catch (err: any) {
      const errs = [ err?.response?.data ];
      setErrors([ ...errs ]);
      handleErrorAlert(errs);
    }
  };

  return (
    <DefaultLayout>
      <>
        {drawErrorAlert(errors)}
        {drawSuccessAlert()}
        {
          !clinic ? <LoadingContainer />
            : (
              <View>
                {isClinicAboutToRemove && (
                  <View style={styles.buttonContainer}>
                    <Text style={styles.removingInfo}>
                      {t('words.pending_clinic_removal.title')}
                    </Text>
                  </View>
                )}
                <View style={styles.buttonContainer}>
                  <Button
                    title={t('words.availabilities.title')}
                    variant="outline"
                    color="light"
                    onPress={() => navigation.navigate('Vet Clinic Availabilities')}
                  />
                </View>
                <View style={styles.buttonContainer}>
                  <Button
                    title={t('words.vet_clinic_provided_medical_services.title')}
                    variant="outline"
                    color="light"
                    onPress={() => navigation.navigate('Vet Clinic Provided Medical Services')}
                  />
                </View>
                {
                  isClinicAboutToRemove ? (
                    <View style={styles.buttonContainer}>
                      <Button
                        title={t('actions.cancel_removal.title')}
                        variant="outline"
                        color="primary"
                        onPress={handleCancelVetClinicRemoval}
                      />
                    </View>
                  ) : (
                    <View style={styles.buttonContainer}>
                      <Button
                        title={t('actions.remove.title')}
                        variant="outline"
                        color="danger"
                        onPress={handleRemoveVetClinic}
                      />
                    </View>
                  )
                }
              </View>
            )
        }
      </>
    </DefaultLayout>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginBottom: 20,
  },
  removingInfo: {
    textAlign: 'center',
    color: colors.DANGER,
    fontSize: 17,
    fontWeight: '500',
  },
});
