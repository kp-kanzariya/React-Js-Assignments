import React, {useRef} from 'react';
import {StyleSheet, Animated, PanResponder, Text} from 'react-native';
import { useSelector } from 'react-redux';
import {Colors} from '../../../assets/config/Colors';

const NewRightDrawer = props => {
  const {isLandscape} = useSelector(state => state.isLandscape);

  const sheetWidth = 300;
  const animationDuration = 300;
  const animation = useRef(new Animated.Value(sheetWidth)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,

      onPanResponderMove: (event, gestureState) => {
        if (
          gestureState.dx > 0 &&
          Math.abs(gestureState.dx) > Math.abs(gestureState.dy)
        ) {
          props.setIsShowRightDrawer(!props.isShowRightDrawer);
          // the user is swiping right
          // you can use the gestureState.dx value for animation or other actions
          Animated.timing(animation, {
            toValue: 800,
            duration: animationDuration,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  return (
    <Animated.View
      style={[
        {width: isLandscape?'50%':'90%'},
        styles.sheet,
        {transform: [{translateX: animation}]},
        {borderTopLeftRadius: 18, borderBottomLeftRadius: 18},
      ]}
      {...panResponder.panHandlers}>
      {props.content}
    </Animated.View>
  );
};

NewRightDrawer.defaultProps = {
  width: '50%',
  content: <Text>Content</Text>,
};

const styles = StyleSheet.create({
  sheet: {
    position: 'absolute',
    top: 0,
    right: 300,
    bottom: 0,
    backgroundColor: '#fff',
    zIndex: 1,
    borderWidth: 1,
    borderColor: Colors.borderColor1,
  },
});

export default NewRightDrawer;