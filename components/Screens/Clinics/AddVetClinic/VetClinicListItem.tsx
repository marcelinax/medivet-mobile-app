import { Clinic } from 'types/api/clinic/types';
import React, { FC, useState } from 'react';
import { simpleListItemStyles } from 'screens/utils/styles';
import {
  StyleSheet, Text, TouchableWithoutFeedback, View,
} from 'react-native';
import { BreakLine } from 'components/Composition/BreakLine';
import { useConfirmationAlert } from 'hooks/Alerts/useConfirmationAlert';
import { useErrorAlert } from 'hooks/Alerts/useErrorAlert';
import { hasInternalError } from 'api/error/services';
import { confirmationAlertTranslations } from 'constants/translations/alerts/confirmationAlert.translations';
import { FormatAddress } from 'components/Formatters/FormatAddress';
import colors from 'themes/colors';
import { useSuccessAlert } from 'hooks/Alerts/useSuccessAlert';
import { useNavigation } from '@react-navigation/native';
import { AddVetClinicScreenNavigationProps } from 'types/Navigation/types';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { ClinicAssignmentRequestStatus } from 'constants/enums/clinic.enum';
import { Ionicons } from '@expo/vector-icons';
import icons from 'themes/icons';
import { otherTranslations } from 'constants/translations/other.translations';
import { FullScreenLoading } from 'components/Composition/FullScreenLoading';
import { ClinicApi } from 'api/clinic/clinic.api';

interface Props {
  clinic: Clinic;
}

export const VetClinicListItem: FC<Props> = ({ clinic }) => {
  const confirmation = useConfirmationAlert();
  const { handleErrorAlert, drawErrorAlert } = useErrorAlert();
  const navigation = useNavigation<AddVetClinicScreenNavigationProps>();
  const user = useSelector((state: RootState) => state.user.currentUser);
  const [ loading, setLoading ] = useState<boolean>(false);
  const { drawSuccessAlert, handleSuccessAlert } = useSuccessAlert(() => navigation.goBack());

  const handleAddClinic = async () => {
    if (isClinicWaitingForAssignment()) return;
    try {
      await confirmation({
        title: '',
        message: `${confirmationAlertTranslations.ADD_CLINIC_CONFIRMATION} "${clinic.name}"?`,
      });
      setLoading((prevState) => !prevState);
      await ClinicApi.addClinic(clinic.id);
      setLoading((prevState) => !prevState);
      handleSuccessAlert();
    } catch (err: any) {
      setLoading(false);
      const errs = [ err?.response?.data ];
      if (hasInternalError(errs)) handleErrorAlert();
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
        {drawErrorAlert()}
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
                    {otherTranslations.PENDING_APPROVAL}
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
