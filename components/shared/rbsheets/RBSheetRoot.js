import React, {useRef} from 'react';
import {View, Button, Text, Dimensions} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
const {height, width} = Dimensions.get('screen');

export default function RBSheetRoot(props) {
  return (
    <>
      {/* <Button title="OPEN BOTTOM SHEET"  /> */}
      <RBSheet
        ref={props.refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        height={props.height}
        // animationType='fade'
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}>
        {props.content}
      </RBSheet>
    </>
  );
}

RBSheetRoot.defaultProps = {
  content: <Text>use 'content' prop to add your component inside RBsheet</Text>,
  height:height/2
};
