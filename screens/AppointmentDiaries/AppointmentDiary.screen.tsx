import { DefaultLayout } from 'layouts/Default.layout';
import { AppointmentDiaryPreview } from 'components/Screens/AppointmentDiaries/Preview/AppointmentDiaryPreview';

interface Props {
  extendedView?: boolean;
}

export const AppointmentDiaryScreen = ({ extendedView }: Props) => (
  <DefaultLayout>
    <AppointmentDiaryPreview extendedView={extendedView} />
  </DefaultLayout>
);
