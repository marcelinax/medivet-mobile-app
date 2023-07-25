import { Navigator } from 'navigation/Navigator';
import React from 'react';
import {
  Animated, SafeAreaView, StatusBar, StyleSheet,
} from 'react-native';
import { isAndroidPlatform } from 'utils/isAndroidPlatfrom';

export const AppWrapper = () => {
  const drawWrapper = (children: JSX.Element): JSX.Element => (
    isAndroidPlatform()
      ? (
        <Animated.View style={styles.wrapper}>
          {children}
        </Animated.View>
      )
      : (
        <SafeAreaView style={styles.wrapper}>
          <Animated.View style={{ flex: 1 }}>
            {children}
          </Animated.View>
        </SafeAreaView>
      )
  );

  return (
    drawWrapper(
      <>
        <StatusBar
          networkActivityIndicatorVisible
          barStyle={`${isAndroidPlatform() ? 'default' : 'dark-content'}`}
        />
        <Navigator />
      </>,
    )
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    flex: 1,
  },
});
