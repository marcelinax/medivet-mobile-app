import { TabBar, TabView } from 'react-native-tab-view';
import {
  ScrollView, StyleSheet, Text, useWindowDimensions, View,
} from 'react-native';
import colors from 'themes/colors';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { VetClinics } from 'components/Screens/Home/Vet/VetClinics';
import { User } from 'types/api/user/types';
import { VetClinicProvidedMedicalService } from 'types/api/vetClinicProvidedMedicalService/types';
import { PriceLists } from 'components/Screens/Home/Vet/PriceLists';

interface Props {
  vet: User;
  medicalServices: VetClinicProvidedMedicalService[];
}

export const VetPreviewNavigation = ({ vet, medicalServices }: Props) => {
  const { t } = useTranslation();
  const layout = useWindowDimensions();
  const [ index, setIndex ] = useState<number>(0);
  const [ routes ] = useState([
    {
      key: 'address',
      title: t('words.addresses.title'),
    },
    {
      key: 'priceList',
      title: t('words.price_list.title'),
    },
    {
      key: 'opinions',
      title: t('words.opinions.title'),
    },
  ]);

  const renderView = () => {
    switch (index) {
    case 1:
      return <PriceLists medicalServices={medicalServices} />;
    case 2:
      return <View><Text>Opinie</Text></View>;
    case 0:
    default:
      return (
        <VetClinics
          clinics={vet?.clinics || []}
          medicalServices={medicalServices}
        />
      );
    }
  };

  return (
    <ScrollView bounces={false}>
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
            contentContainerStyle={styles.tabBarContainer}
            indicatorContainerStyle={styles.indicatorContainer}
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
      {renderView()}
    </ScrollView>
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
  tabBarContainer: {
    flexGrow: 1,
  },
});
