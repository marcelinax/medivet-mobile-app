import { StyleSheet, View } from 'react-native';
import { TextInput } from 'components/Inputs/TextInput';
import { DefaultLayout } from 'layouts/Default.layout';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NavigationProps, RouteProps } from 'types/Navigation/types';
import { RatingInput } from 'components/Inputs/RatingInput';
import { ApiError } from 'types/api/error/types';
import { useErrorAlert } from 'hooks/Alerts/useErrorAlert';
import { LoadingButton } from 'components/Buttons/LoadingButton';
import { OpinionApi } from 'api/opinion/opinion.api';
import { CreateVetOpinion } from 'types/api/opinion/types';
import { useDispatch } from 'react-redux';
import { setForceFetchingList } from 'store/list/listSlice';

export const VetOpinionScreen = () => {
  const { t } = useTranslation();
  const route = useRoute<RouteProps<'Create Opinion'>>();
  const navigation = useNavigation<NavigationProps>();
  const [ opinion, setOpinion ] = useState<string>('');
  const [ rating, setRating ] = useState<number>(0);
  const [ errors, setErrors ] = useState<ApiError[]>([]);
  const { handleErrorAlert, drawErrorAlert } = useErrorAlert();
  const [ loading, setLoading ] = useState(false);
  const dispatch = useDispatch();

  const handleCreateOpinion = async () => {
    setLoading(true);
    try {
      const data: CreateVetOpinion = {
        vetId: route.params.vetId,
        message: opinion,
        rate: rating,
      };
      await OpinionApi.createOpinion(data);
      dispatch(setForceFetchingList(true));
      navigation.navigate({
        name: 'Vet',
        params: {
          vetId: route.params.vetId,
          showSuccessAlert: true,
          shouldRefreshOpinionsAmount: true,
        },
      });
    } catch (err: any) {
      const errs = [ err?.response?.data ];
      setErrors([ ...errs ]);
      handleErrorAlert(errs);
    }
    setLoading(false);
  };

  return (
    <DefaultLayout>
      <View>
        {drawErrorAlert(errors)}
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
