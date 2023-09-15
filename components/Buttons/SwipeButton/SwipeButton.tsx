import Swipeable from 'react-native-gesture-handler/Swipeable';
import {useContext, useRef} from 'react';
import {SwipeButtonActionProps, SwipeButtonProps} from 'types/components/Buttons/types';
import {
  SWIPE_BUTTON_ACTION_DEFAULT_SIZE,
  SWIPE_BUTTON_ACTION_SMALL_SIZE,
  SwipeButtonAction,
} from 'components/Buttons/SwipeButton/SwipeButtonAction';
import {Animated, View} from 'react-native';
import {SwipeButtonContext} from 'contexts/buttons/SwipeButtonContext';
import {GestureHandlerRootView} from "react-native-gesture-handler";

export const SwipeButton = ({
                              leftActions, rightActions, children, size,
                            }: SwipeButtonProps) => {
  const ref = useRef<Swipeable>(null);
  const visibleRightActions = (rightActions || []).filter((action) => action.visible !== false);
  const visibleLeftActions = (leftActions || []).filter((action) => action.visible !== false);
  const buttonSize = size === 'small' ? SWIPE_BUTTON_ACTION_SMALL_SIZE : SWIPE_BUTTON_ACTION_DEFAULT_SIZE;
  const {currentSwipeButton, setCurrentSwipeButton} = useContext(SwipeButtonContext);
  const LEFT_ACTIONS_VIEW_WIDTH = buttonSize * visibleLeftActions.length;
  const RIGHT_ACTIONS_VIEW_WIDTH = buttonSize * visibleRightActions.length;

  const renderAction = (
    action: SwipeButtonActionProps,
    progress: Animated.AnimatedInterpolation<number>,
    outputRangeValue: number,
  ) => {
    const translateX = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [outputRangeValue, 0],
    });
    return (
      <SwipeButtonAction
        backgroundColor={action.backgroundColor}
        onPress={() => {
          action.onPress();
          if (ref.current) ref.current.close();
        }}
        translateX={translateX}
        id={action.id}
        key={action.id}
        color={action.color}
        icon={action.icon}
        size={size}
        visible={action.visible}
      />
    );
  };

  const renderActions = (
    actions: SwipeButtonActionProps[],
    progress: Animated.AnimatedInterpolation<number>,
    actionsViewWidth: number,
  ) => (
    <View
      style={{flexDirection: 'row'}}
    >
      {actions.map((action, index) => {
        const outputRangeValue = actionsViewWidth - (index * (actionsViewWidth / actions.length));
        return renderAction(action, progress, outputRangeValue);
      })}
    </View>
  );

  const renderLeftActions = (progress: Animated.AnimatedInterpolation<number>) => renderActions(
    visibleLeftActions,
    progress,
    LEFT_ACTIONS_VIEW_WIDTH,
  );
  const renderRightActions = (progress: Animated.AnimatedInterpolation<number>) => renderActions(
    visibleRightActions,
    progress,
    RIGHT_ACTIONS_VIEW_WIDTH,
  );

  const handleClosePreviousButton = () => {
    if (currentSwipeButton?.current) {
      currentSwipeButton.current.close();
    }
    setCurrentSwipeButton(ref.current);
  };

  return (
    <GestureHandlerRootView>
      <Swipeable
        renderRightActions={renderRightActions}
        renderLeftActions={renderLeftActions}
        ref={ref}
        rightThreshold={30}
        leftThreshold={40}
        friction={2}
        overshootFriction={10}
        onBegan={handleClosePreviousButton}
      >
        {children}
      </Swipeable>
    </GestureHandlerRootView>
  );
};
