import { TabBar, TabView } from 'react-native-tab-view';
import {
  ScrollView, StyleSheet, Text, useWindowDimensions,
} from 'react-native';
import colors from 'themes/colors';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { VetClinics } from 'components/Screens/Home/Vet/VetClinics';
import { User } from 'types/api/user/types';
import { VetClinicProvidedMedicalService } from 'types/api/vetClinicProvidedMedicalService/types';
import { PriceLists } from 'components/Screens/Home/Vet/PriceLists';
import { Opinions } from 'components/Screens/Home/Vet/Opinions';

interface Props {
  vet: User;
  medicalServices: VetClinicProvidedMedicalService[];
}

export const VetPreviewNavigation = ({ vet, medicalServices }: Props) => {
  const { t } = useTranslation();
  const layout = useWindowDimensions();
  const [ index, setIndex ] = useState<number>(2);
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
      return (
        <Opinions
          vetId={vet.id}
        />
      );
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

  const renderScene = (props) => {
    switch (props.route.key) {
    case 'address':
      return (
        <VetClinics
          clinics={vet?.clinics || []}
          medicalServices={medicalServices}
          {...props}
        />
      );
    case 'opinions':
      return (
        <Opinions
          vetId={vet.id}
          {...props}
        />
      );
    case 'priceList':
      return (
        <PriceLists
          medicalServices={medicalServices}
          {...props}
        />
      );
    default:
      return null;
    }
  };
  console.log(index);
  return (
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
      renderScene={renderScene}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          scrollEnabled
          onTabPress={(scene) => {
            const { route } = scene;
            props.jumpTo(route.key);
          }}
        />
      )}
      // renderTabBar={(props) => (
      //   <TabBar
      //     {...props}
      //     navigationState={{
      //       index,
      //       routes,
      //     }}
      //     onTabPress={(event) => {
      //       console.log('props', props);
      //       const i = Math.floor(Math.random() * 3);
      //       // const tabIndex = routes.findIndex((route) => route.key === event.route.key);
      //       console.log('Math.floor(Math.random() * 3)', i);
      //       setIndex(i);
      //       // props.jumpTo(event.route.key);
      //     }}
      //     scrollEnabled
      //     pressOpacity={1}
      //     pressColor={colors.WHITE}
      //     contentContainerStyle={styles.tabBarContainer}
      //     indicatorContainerStyle={styles.indicatorContainer}
      //     indicatorStyle={styles.indicator}
      //     style={styles.tabBar}
      //     renderLabel={(scene) => (
      //       <Text style={{
      //         color: scene.focused ? colors.PRIMARY : colors.GRAY_DARK,
      //       }}
      //       >
      //         {scene.route.title}
      //       </Text>
      //     )}
      //   />
      // )}
    />
  );

  return (
    <ScrollView bounces={false}>
      <TabView
        onIndexChange={() => {
        }}
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
