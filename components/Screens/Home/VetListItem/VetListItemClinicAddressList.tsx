import {
  ScrollView, StyleSheet, Text, useWindowDimensions, View,
} from 'react-native';
import { Clinic } from 'types/api/clinic/types';
import { TabBar, TabView } from 'react-native-tab-view';
import { useState } from 'react';
import colors from 'themes/colors';
import { useTranslation } from 'react-i18next';
import { VetListItemClinicAddressItem } from 'components/Screens/Home/VetListItem/VetListItemClinicAddressItem';
import sizes from 'constants/sizes';
import { User } from 'types/api/user/types';

interface Props {
  clinics: Clinic[];
  vet: User;
}

export const VetListItemClinicAddressList = ({ clinics, vet }: Props) => {
  const { t } = useTranslation();
  const [ index, setIndex ] = useState<number>(0);
  // poprawic bo zawsze beda kliniki
  const [ currentClinicId, setCurrentClinicId ] = useState<string>(clinics[0]?.id?.toString() ?? '0');
  const [ routes ] = useState(
    clinics.map((clinic, clinicIndex) => ({
      key: clinic.id.toString(),
      title: `${t('words.address.title')} ${clinicIndex + 1}`,
    })),
  );
  const layout = useWindowDimensions();

  return (
    clinics.length > 1 ? (
      <ScrollView>
        <TabView
          onIndexChange={setIndex}
          navigationState={{
            index,
            routes,
          }}
          initialLayout={{
            height: 0,
            width: layout.width,
          }}
          renderScene={() => null}
          renderTabBar={(props) => (
            <TabBar
              {...props}
              scrollEnabled
              indicatorContainerStyle={styles.indicatorContainer}
              onTabPress={({ route }) => setCurrentClinicId(route.key)}
              indicatorStyle={styles.indicator}
              style={styles.tabBar}
              renderLabel={(scene) => (
                <Text style={{
                  color: scene.focused ? colors.PRIMARY : colors.GRAY_DARK,
                }}
                >
                  {scene.route.title}
                </Text>
              )}
            />
          )}
        />
        {index === clinics.findIndex((clinic) => clinic.id.toString() === currentClinicId)
            && (
              <VetListItemClinicAddressItem
                clinic={clinics[index]}
                vet={vet}
              />
            )}
      </ScrollView>
    )
      : (
        <View style={styles.tabBar}>
          {clinics[0] ? (
            <VetListItemClinicAddressItem
              clinic={clinics[0]}
              vet={vet}
            />
          ) : <Text>Brak</Text>}
        </View>
      )
  );
};

const styles = StyleSheet.create({
  indicator: {
    backgroundColor: colors.PRIMARY,
  },
  indicatorContainer: {
    borderBottomWidth: 1,
    borderColor: colors.GRAY,
  },
  tabBar: {
    backgroundColor: 'transparent',
    marginBottom: 15,
  },
  layout: {
    height: 0,
    width: sizes.FULL_WIDTH,
  },
});
