import { ScrollView, StyleSheet, View } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { ApiError } from 'types/api/error/types';
import { useErrorAlert } from 'hooks/Alerts/useErrorAlert';
import { AvailableDateApi } from 'api/availableDate/availableDate.api';
import { AvailableDate } from 'types/api/availableDates/types';
import { CalendarDay } from 'components/Composition/CalendarDay';
import { Loading } from 'components/Composition/Loading';
import moment from 'moment';
import { ReceptionHour } from 'components/Composition/ReceptionHour';
import { EmptyList } from 'components/Composition/EmptyList';
import { useTranslation } from 'react-i18next';
import { AppointmentDetails } from 'store/home/appointmentSlice';

interface Props {
  vetId: number;
  medicalServiceId: number;
  setForm: (form: AppointmentDetails) => void;
  form: AppointmentDetails;
}

export const AppointmentCalendarDatesForm = ({
  medicalServiceId, vetId, setForm, form,
}: Props) => {
  const [ errors, setErrors ] = useState<ApiError[]>([]);
  const [ loading, setLoading ] = useState(true);
  const [ availableDates, setAvailableDates ] = useState<AvailableDate[]>([]);
  const { handleErrorAlert, drawErrorAlert } = useErrorAlert();
  const containerWidth = useRef(0);
  const { t } = useTranslation();

  useEffect(() => {
    if (medicalServiceId) {
      fetchAvailableDates();
      setForm({
        ...form,
        hour: undefined,
        date: undefined,
      });
    } else setAvailableDates([]);
  }, [ medicalServiceId ]);

  const fetchAvailableDates = async () => {
    setLoading(true);
    try {
      const res = await AvailableDateApi.getAvailableDates(vetId, medicalServiceId);
      const filteredRes = res.filter((resItem) => resItem.dates.length > 0);
      setAvailableDates(filteredRes);
    } catch (err: any) {
      const errs = [ err?.response?.data ];
      handleErrorAlert(errs);
      setErrors([ ...errs ]);
    }
    setLoading(false);
  };

  const drawDates = () => availableDates.map((availableDate) => (
    <CalendarDay
      onPress={() => setForm({
        ...form,
        date: availableDate.date,
      })}
      date={availableDate.date}
      key={`${availableDate.date}`}
      isSelected={!form.date ? false : availableDate.date === form.date}
    />
  ));

  const drawHours = () => {
    const dates = availableDates.find((availableDate) => availableDate.date === form.date)?.dates || [];
    const hours = dates.map((date) => moment(date).format('HH:mm'));
    const MIN_WIDTH = 110;
    const maxNumberOfColumns = Math.floor(containerWidth.current / MIN_WIDTH);
    const numberOfRows = hours.length / maxNumberOfColumns;
    const elements: JSX.Element[] = [];

    for (let i = 0; i < numberOfRows; i++) {
      const startIndex = i * maxNumberOfColumns;
      const endIndex = startIndex + maxNumberOfColumns;
      const hoursToDraw = hours.filter((_, index) => index >= startIndex && index < endIndex);
      const columnWidth = hours.length < maxNumberOfColumns ? `${(100 / hours.length)}%` : `${100 / maxNumberOfColumns}%`;

      elements.push(
        <View
          style={styles.hoursRow}
          key={`row-${i}`}
        >
          {hoursToDraw.map((hour, index) => (
            <View
              key={hour}
              style={{
                width: columnWidth,
                paddingRight: index === (hours.length < maxNumberOfColumns ? hours.length - 1 : maxNumberOfColumns - 1) ? 0 : 5,
                paddingLeft: index === 0 ? 0 : 5,
              }}
            >
              <ReceptionHour
                hour={hour}
                onPress={() => setForm({
                  ...form,
                  hour,
                })}
                isSelected={hour === form.hour}
                variant="normal"
              />
            </View>
          ))}
        </View>,
      );
    }
    return elements;
  };

  return (
    <View
      style={styles.container}
      onLayout={(event) => {
        containerWidth.current = event.nativeEvent.layout.width;
      }}
    >
      {drawErrorAlert(errors)}
      {
        loading ? <Loading /> : (
          <View style={styles.scrollViewContainer}>
            {!availableDates ? <EmptyList title={t('words.not_available_dates.title')} /> : (
              <>
                <ScrollView
                  horizontal
                  contentContainerStyle={styles.datesContainer}
                >
                  {drawDates()}
                </ScrollView>
                {form.date && (
                  <View style={styles.hoursContainer}>
                    {drawHours()}
                  </View>
                )}
              </>
            )}
          </View>
        )
      }
    </View>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexDirection: 'column',
  },
  container: {
    marginTop: 20,
  },
  datesContainer: {
    gap: 10,
    paddingBottom: 12,
  },
  hoursContainer: {
    marginTop: 20,
    width: '100%',
  },
  hoursRow: {
    marginBottom: 10,
    flexDirection: 'row',
    width: '100%',
  },
});
