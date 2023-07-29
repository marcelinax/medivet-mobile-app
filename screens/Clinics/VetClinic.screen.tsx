import { Clinic } from 'types/api/clinic/types';
import { useNavigation, useRoute } from '@react-navigation/native';
import { VetClinicScreenNavigationProps, VetClinicScreenRouteProps } from 'types/Navigation/types';
import { navigationTranslations } from 'constants/translations/navigation.translations';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useErrorAlert } from 'hooks/Alerts/useErrorAlert';
import { LoadingContainer } from 'components/Composition/LoadingContainer';
import { DefaultLayout } from 'layouts/Default.layout';
import { ClinicApi } from 'api/clinic/clinic.api';
import { hasInternalError } from 'api/error/services';
import { StyleSheet, View } from 'react-native';
import { Button } from 'components/Buttons/Button';
import { commonTranslations } from 'constants/translations/common.translations';
import { useDispatch } from 'react-redux';
import { setCurrentClinic } from 'store/clinic/clinicSlice';

export const VetClinicScreen = () => {
  const route = useRoute<VetClinicScreenRouteProps>();
  const navigation = useNavigation<VetClinicScreenNavigationProps>();
  const [ clinic, setClinic ] = useState<Clinic | undefined>();
  const { drawErrorAlert, handleErrorAlert } = useErrorAlert();
  const dispatch = useDispatch();

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
      const res = await ClinicApi.getClinic(route.params.clinicId);
      setClinic(res);
      dispatch(setCurrentClinic(res));
    } catch (err: any) {
      const errs = [ err?.response?.data ];

      if (hasInternalError(errs)) handleErrorAlert();
    }
  };

  return (
    <DefaultLayout>
      <>
        {drawErrorAlert()}
        {
          !clinic ? <LoadingContainer />
            : (
              <View>
                <View style={styles.buttonContainer}>
                  <Button
                    title={commonTranslations.AVAILABILITIES}
                    variant="outline"
                    color="light"
                    onPress={() => navigation.navigate('Vet Clinic Availabilities')}
                  />
                </View>
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
});
