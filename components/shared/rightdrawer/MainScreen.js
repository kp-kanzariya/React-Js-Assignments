import React from 'react';
import { View, Button } from 'react-native';
import ButtonRoot from '../buttons/ButtonRoot';
import NewRightDrawer from './NewRightDrawer';


const MainScreen = () => {
  const [sheetVisible, setSheetVisible] = React.useState(false);

  const toggleSheet = () => {
    setSheetVisible(!sheetVisible);
  };

  return (
    <View style={{ flex: 1,backgroundColor:'red', }}>

      <ButtonRoot title="Toggle Sheet"  onPress={toggleSheet}/>
      {sheetVisible && <NewRightDrawer />}
    </View>
  );
};

export default MainScreen;
