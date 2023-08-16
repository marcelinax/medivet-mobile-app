import { Clinic } from 'types/api/clinic/types';
import { useNavigation, useRoute } from '@react-navigation/native';
import { VetClinicScreenNavigationProps, VetClinicScreenRouteProps } from 'types/Navigation/types';
import { navigationTranslations } from 'constants/translations/navigation.translations';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useErrorAlert } from 'hooks/Alerts/useErrorAlert';
import { LoadingContainer } from 'components/Composition/LoadingContainer';
import { DefaultLayout } from 'layouts/Default.layout';
import { ClinicApi } from 'api/clinic/clinic.api';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'components/Buttons/Button';
import { commonTranslations } from 'constants/translations/common.translations';
import { useDispatch } from 'react-redux';
import { setCurrentClinic } from 'store/clinic/clinicSlice';
import { ApiError } from 'types/api/error/types';
import { buttonsTranslations } from 'constants/translations/buttons.translations';
import { useConfirmationAlert } from 'hooks/Alerts/useConfirmationAlert';
import { confirmationAlertTranslations } from 'constants/translations/alerts/confirmationAlert.translations';
import { ClinicAssignmentRequestStatus } from 'constants/enums/clinic.enum';
import colors from 'themes/colors';
import { otherTranslations } from 'constants/translations/other.translations';
import { useSuccessAlert } from 'hooks/Alerts/useSuccessAlert';

export const VetClinicScreen = () => {
  const route = useRoute<VetClinicScreenRouteProps>();
  const navigation = useNavigation<VetClinicScreenNavigationProps>();
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

  useEffect(() => {
    fetchVetClinic();
  }, []);

  useLayoutEffect(() => {
    if (clinic) {
      navigation.setOptions({
        headerTitle: `${navigationTranslations.CLINIC} "${clinic.name}"`,
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
        message: `${confirmationAlertTranslations.REMOVE_CLINIC_CONFIRMATION} "${clinic!.name}"?`,
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
        message: confirmationAlertTranslations.CONFIRMATION_MESSAGE,
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
                      {otherTranslations.PENDING_CLINIC_REMOVAL}
                    </Text>
                  </View>
                )}
                <View style={styles.buttonContainer}>
                  <Button
                    title={commonTranslations.AVAILABILITIES}
                    variant="outline"
                    color="light"
                    onPress={() => navigation.navigate('Vet Clinic Availabilities')}
                  />
                </View>
                {
                  isClinicAboutToRemove ? (
                    <View style={styles.buttonContainer}>
                      <Button
                        title={buttonsTranslations.CANCEL_REMOVAL}
                        variant="outline"
                        color="primary"
                        onPress={handleCancelVetClinicRemoval}
                      />
                    </View>
                  ) : (
                    <View style={styles.buttonContainer}>
                      <Button
                        title={buttonsTranslations.REMOVE}
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
