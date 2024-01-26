import { StyleSheet, View } from 'react-native';
import { TextInput } from 'components/Inputs/TextInput';
import { DefaultLayout } from 'layouts/Default.layout';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NavigationProps, RouteProps } from 'types/Navigation/types';
import { RatingInput } from 'components/Inputs/RatingInput';
import { useErrorAlert } from 'hooks/Alerts/useErrorAlert';
import { LoadingButton } from 'components/Buttons/LoadingButton';
import { CreateVetOpinion } from 'types/api/opinion/types';
import { useDispatch } from 'react-redux';
import { setForceFetchingList } from 'store/list/listSlice';
import { OpinionApi } from 'api/opinion/opinion.api';
import { getRequestErrors } from 'utils/errors';

export const VetOpinionScreen = () => {
  const { t } = useTranslation();
  const route = useRoute<RouteProps<'Create Opinion'>>();
  const navigation = useNavigation<NavigationProps>();
  const [ opinion, setOpinion ] = useState<string>('');
  const [ rating, setRating ] = useState<number>(0);
  const { handleErrorAlert } = useErrorAlert();
  const [ loading, setLoading ] = useState(false);
  const dispatch = useDispatch();

  const handleCreateOpinion = async () => {
    setLoading(true);
    try {
      const data: CreateVetOpinion = {
        vetId: route.params.vetId,
        appointmentId: route.params.appointmentId,
        message: opinion,
        rate: rating,
      };
      await OpinionApi.createOpinion(data);
      if (route.params.preventNavigateToVetScreen) {
        navigation.navigate('Appointment', {
          opinionAdded: true,
          appointmentId: route.params.appointmentId,
        });
      } else {
        dispatch(setForceFetchingList(true));
        navigation.navigate({
          name: 'Vet',
          params: {
            vetId: route.params.vetId,
            showSuccessAlert: true,
            shouldRefreshOpinionsAmount: true,
          },
        });
      }
    } catch (err: any) {
      const errors = getRequestErrors(err);
      handleErrorAlert(errors);
    }
    setLoading(false);
  };

  return (
    <DefaultLayout>
      <View>
        <TextInput
          variant="outline"
          value={opinion}
          onChangeText={(value) => setOpinion(value)}
          errors={[]}
          multiline
          textAlignVertical="top"
          numberOfLines={10}
          maxLength={200}
        />
        <RatingInput
          style={styles.ratingInput}
          onChange={setRating}
        />
        <LoadingButton
          title={t('actions.add.title')}
          variant="solid"
          style={styles.button}
          disabled={!rating || !opinion}
          loading={loading}
          onPress={handleCreateOpinion}
        />
      </View>
    </DefaultLayout>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
  },
  ratingInput: {
    marginVertical: 20,
  },
});
