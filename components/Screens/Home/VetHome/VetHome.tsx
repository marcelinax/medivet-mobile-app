import { useEffect, useState } from 'react';
import { OpinionApi } from 'api/opinion/opinion.api';
import { useErrorAlert } from 'hooks/Alerts/useErrorAlert';
import { getRequestErrors } from 'utils/errors';
import { LoadingContainer } from 'components/Composition/LoadingContainer';
import { RecentOpinion } from 'components/Screens/Home/VetHome/RecentOpinion';
import { VetOpinion } from 'types/api/opinion/types';

export const VetHome = () => {
  const [ recentOpinionLoading, setRecentOpinionLoading ] = useState(true);
  const [ recentOpinion, setRecentOpinion ] = useState<VetOpinion | undefined>();
  const { handleErrorAlert } = useErrorAlert();

  useEffect(() => {
    handleInit();
  }, []);

  const handleInit = async () => {
    await fetchRecentOpinion();
  };

  const fetchRecentOpinion = async () => {
    try {
      const params = {
        size: 1,
        include: 'issuer',
      };
      const res = await OpinionApi.getMyOpinions(params);
      setRecentOpinion(res[0]);
    } catch (err: any) {
      const errors = getRequestErrors(err);
      handleErrorAlert(errors);
    }
    setRecentOpinionLoading(false);
  };

  if (recentOpinionLoading) return <LoadingContainer />;

  return (
    <>
      <RecentOpinion opinion={recentOpinion} />
    </>
  );
};
