import { SELECT_OPTIONS_MODAL_HEIGHT } from 'components/Inputs/Select/utils/constants';
import { Navigator } from 'navigation/Navigator';
import React, { useEffect, useRef } from 'react';
import { Animated, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { isAndroidPlatfrom } from 'utils/isAndroidPlatfrom';

export const AppWrapper = () => {
    const showSelectInputOptionsModal = useSelector((state: RootState) => state.layout.showSelectInputOptionsModal);
    const selectInputOptionsModalAnimatedValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (showSelectInputOptionsModal) moveWrapperUp();
        else moveWrapperDown();
    }, [showSelectInputOptionsModal]);

    const moveWrapperUp = () => {
        Animated.timing(selectInputOptionsModalAnimatedValue, {
            toValue: -SELECT_OPTIONS_MODAL_HEIGHT,
            duration: 300,
            useNativeDriver: true
        }).start();
    };
    const moveWrapperDown = () => {
        Animated.timing(selectInputOptionsModalAnimatedValue, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true
        }).start();
    };

    const animatedSelectInputStyles = {
        transform: [
            {
                translateY: selectInputOptionsModalAnimatedValue
            }
        ],
    };

    const drawWrapper = (children: JSX.Element): JSX.Element => (
        isAndroidPlatfrom() ?
            <Animated.View style={[styles.wrapper, animatedSelectInputStyles]}>
                {children}
            </Animated.View> :
            <SafeAreaView style={styles.wrapper}>
                <Animated.View style={[{ flex: 1 }, animatedSelectInputStyles]}>
                    {children}
                </Animated.View>
            </SafeAreaView>
    );

    return (
        drawWrapper(
            <>
                <StatusBar
                    networkActivityIndicatorVisible
                    barStyle={`${isAndroidPlatfrom() ? 'default' : 'dark-content'}`}
                />
                <Navigator />
            </>
        )
    );
};

const styles = StyleSheet.create({
    wrapper: {
        position: 'relative',
        flex: 1
    }
});