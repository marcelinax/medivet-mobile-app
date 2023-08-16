import Swipeable from 'react-native-gesture-handler/Swipeable';
import { createContext, RefObject } from 'react';

interface SwipeButtonContextType {
    currentSwipeButton: RefObject<Swipeable | null>;
    setCurrentSwipeButton: (swipeButton: Swipeable | null) => void;
}

export const SwipeButtonContext = createContext<SwipeButtonContextType>({
  currentSwipeButton: { current: null },
  setCurrentSwipeButton: (swipeButton: Swipeable | null) => {
  },
});
