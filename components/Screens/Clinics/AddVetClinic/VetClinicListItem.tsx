import { Clinic } from 'types/api/clinic/types';
import React, { useState } from 'react';
import { simpleListItemStyles } from 'screens/utils/styles';
import {
  StyleSheet, Text, TouchableWithoutFeedback, View,
} from 'react-native';
import { BreakLine } from 'components/Composition/BreakLine';
import { useConfirmationAlert } from 'hooks/Alerts/useConfirmationAlert';
import { useErrorAlert } from 'hooks/Alerts/useErrorAlert';
import { FormatAddress } from 'components/Formatters/FormatAddress';
import colors from 'themes/colors';
import { useSuccessAlert } from 'hooks/Alerts/useSuccessAlert';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from 'types/Navigation/types';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { ClinicAssignmentRequestStatus } from 'constants/enums/clinic.enum';
import { Ionicons } from '@expo/vector-icons';
import icons from 'themes/icons';
import { FullScreenLoading } from 'components/Composition/FullScreenLoading';
import { ClinicApi } from 'api/clinic/clinic.api';
import { ApiError } from 'types/api/error/types';
import { useTranslation } from 'react-i18next';

interface Props {
  clinic: Clinic;
}

export const VetClinicListItem = ({ clinic }: Props) => {
  const confirmation = useConfirmationAlert();
  const { handleErrorAlert, drawErrorAlert } = useErrorAlert();
  const navigation = useNavigation<NavigationProps>();
  const user = useSelector((state: RootState) => state.user.currentUser);
  const [ loading, setLoading ] = useState<boolean>(false);
  const { drawSuccessAlert, handleSuccessAlert } = useSuccessAlert(() => navigation.goBack());
  const [ errors, setErrors ] = useState<ApiError[]>([]);
  const { t } = useTranslation();

  const handleAddClinic = async () => {
    if (isClinicWaitingForAssignment()) return;
    try {
      await confirmation({
        title: '',
        message: `${t('alerts.confirmation.add_clinic.title')} "${clinic.name}"?`,
      });
      setLoading((prevState) => !prevState);
      await ClinicApi.addClinic(clinic.id);
      setLoading((prevState) => !prevState);
      handleSuccessAlert();
    } catch (err: any) {
      setLoading(false);
      const errs = [ err?.response?.data ];
      setErrors([ ...errs ]);
      handleErrorAlert(errs);
    }
  };

  const isClinicWaitingForAssignment = (): boolean => {
    const existingClinicAssignmentRequest = clinic.clinicAssignmentRequests.find(
      (clinicAssignmentRequest) => clinicAssignmentRequest.user.id === user!.id,
    );
    if (existingClinicAssignmentRequest) {
      return existingClinicAssignmentRequest.status === ClinicAssignmentRequestStatus.TO_ASSIGN;
    }
    return false;
  };

  return (
    <TouchableWithoutFeedback onPress={handleAddClinic}>
      <View>
        <FullScreenLoading loading={loading} />
        {drawErrorAlert(errors)}
        {drawSuccessAlert()}
        <View style={simpleListItemStyles.container}>
          <View style={simpleListItemStyles.innerContainer}>
            <View style={simpleListItemStyles.nameContainer}>
              <Text style={simpleListItemStyles.name}>
                {clinic.name}
              </Text>
              <FormatAddress
                address={clinic.address}
                style={styles.address}
              />
              {isClinicWaitingForAssignment() && (
                <View style={styles.waitingInformationContainer}>
                  <Ionicons
                    name={icons.TIME_OUTLINE}
                    size={20}
                    color={colors.PRIMARY}
                  />
                  <Text style={styles.waitingInformationText}>
                    {t('words.pending_approval.title')}
                  </Text>
                </View>
              )}
            </View>
          </View>
          <BreakLine />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  address: {
    color: colors.GRAY_DARK,
  },
  waitingInformationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  waitingInformationText: {
    marginLeft: 5,
    color: colors.PRIMARY,
    fontSize: 13,
  },
});
