import { StyleSheet, Text, View } from 'react-native';
import { Clinic } from 'types/api/clinic/types';
import Ionicons from '@expo/vector-icons/Ionicons';
import icons from 'themes/icons';
import colors from 'themes/colors';
import { FormatAddress } from 'components/Formatters/FormatAddress';
import { useEffect, useState } from 'react';
import {
  VetClinicProvidedMedicalServiceApi,
} from 'api/vetClinicProvidedMedicalService/vetClinicProvidedMedicalService.api';
import { VetClinicProvidedMedicalService } from 'types/api/vetClinicProvidedMedicalService/types';
import { Loading } from 'components/Composition/Loading';
import { User } from 'types/api/user/types';
import { ApiError } from 'types/api/error/types';
import { useErrorAlert } from 'hooks/Alerts/useErrorAlert';
import { useTranslation } from 'react-i18next';
import { AvailableDatesApi } from 'api/availableDates/availableDates.api';
import { ReceptionHour } from 'components/Composition/ReceptionHour';
import { AvailableDate } from 'types/api/availableDates/types';
import moment from 'moment';

interface Props {
  clinic: Clinic;
  vet: User;
}

export const VetListItemClinicAddressItem = ({ clinic, vet }: Props) => {
  const [ medicalService, setMedicalService ] = useState<VetClinicProvidedMedicalService | undefined>(undefined);
  const [ availableDate, setAvailableDate ] = useState<AvailableDate | undefined>();
  const [ errors, setErrors ] = useState<ApiError[]>([]);
  const { handleErrorAlert, drawErrorAlert } = useErrorAlert();
  const { t } = useTranslation();
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    fetchMedicalServices();
  }, []);

  useEffect(() => {
    if (medicalService?.id) fetchFirstAvailableDate();
  }, [ medicalService?.id ]);

  const fetchMedicalServices = async () => {
    try {
      const res = await VetClinicProvidedMedicalServiceApi.getVetClinicProvidedMedicalServices(clinic.id, {
        vetId: vet.id,
        include: 'medicalService',
        size: 1,
      });
      setMedicalService(res[0]);
    } catch (err: any) {
      const errs = [ err?.response?.data ];
      setErrors([ ...errs ]);
      handleErrorAlert(errs);
    }
  };

  const fetchFirstAvailableDate = async () => {
    try {
      const res = await AvailableDatesApi.getAvailableDate(vet.id, medicalService!.id);
      setAvailableDate(res);
    } catch (err: any) {
      const errs = [ err?.response?.data ];
      setErrors([ ...errs ]);
      handleErrorAlert(errs);
    }
    setLoading(false);
  };

  const drawAvailableDateHours = () => {
    const datesToDisplay = availableDate!.dates.filter((_, index) => index < 3);
    return datesToDisplay.map((date, index) => {
      const parsedDate = moment.utc(date).format('HH:mm');
      return (
        <ReceptionHour
          hour={parsedDate}
          onPress={() => {
            // TODO przenieść do umawiania wizyty
          }}
          key={`vet-${vet.id}-clinic-${clinic.id}-medical-service-${medicalService!.id}-hour-${index}`}
        />
      );
    });
  };

  const drawAvailableDateText = () => {
    let style = {};
    let title;
    if (availableDate && availableDate.dates.length > 0) {
      const date = moment.utc(availableDate.dates[0]).format('DD MMMM');
      title = `${t('words.next_date.title')}: ${t(`enums.day_of_week.shortcut.${availableDate.day}`)} ${date}`;
    } else {
      title = t('words.no_available_dates.title');
      style = {
        ...style,
        color: colors.GRAY_DARK,
      };
    }

    return (
      <Text style={[ styles.title, style ]}>
        {title}
      </Text>
    );
  };

  return (
    <>
      {drawErrorAlert(errors)}
      <View>
        <View style={styles.infoContainer}>
          <Ionicons
            name={icons.LOCATION}
            size={20}
            color={colors.PRIMARY}
            style={styles.icon}
          />
          <View>
            <FormatAddress
              address={clinic.address}
              style={styles.title}
            />
            <Text style={styles.description}>{clinic.name}</Text>
          </View>
        </View>
        {
          !medicalService || loading ? <Loading /> : (
            <>
              <View style={styles.infoContainer}>
                <Ionicons
                  name={icons.MEDKIT_OUTLINE}
                  size={18}
                  color={colors.PRIMARY}
                  style={styles.icon}
                />
                <Text style={styles.title}>
                  {medicalService.medicalService.name}
                </Text>
                <Text style={styles.price}>
                  {`${medicalService.price} PLN`}
                </Text>
              </View>
              <View style={styles.infoContainer}>
                <Ionicons
                  name={icons.CALENDAR_OUTLINE}
                  size={20}
                  color={colors.PRIMARY}
                  style={styles.icon}
                />
                {drawAvailableDateText()}
              </View>
              {
                availableDate && (
                  <View style={styles.availableDatesContainer}>
                    {drawAvailableDateHours()}
                    {availableDate.dates.length > 3 && (
                      <ReceptionHour
                        hour={t('words.more.title')}
                        onPress={() => {
                          // TODO przenieść do kalendarza
                        }}
                      />
                    )}
                  </View>
                )
              }
            </>
          )
        }
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    marginBottom: 13,
    flexDirection: 'row',
  },
  title: {
    fontSize: 16,
    flex: 0.9,
  },
  description: {
    color: colors.GRAY_DARK,
    fontWeight: '500',
    fontSize: 15,
    marginTop: 3,
    flex: 1,
  },
  icon: {
    marginRight: 10,
  },
  price: {
    marginLeft: 'auto',
    fontSize: 16,
    fontWeight: '500',
    color: colors.PRIMARY,
  },
  availableDatesContainer: {
    flexWrap: 'wrap',
    flex: 1,
    flexDirection: 'row',
  },
});
