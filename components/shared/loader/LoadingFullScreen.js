import { View, ActivityIndicator, Text, Dimensions, Image } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../Theme/ThemeDarkLightColor';
const { width } = Dimensions.get('screen');


export default function LoadingFullScreen(props) {

  const [message, setMessage] = React.useState(
    <>
      <Text style={{ fontWeight: 'bold' }}>Please wait...</Text>
      <Text style={{ width: width * 0.8, textAlign: 'center', justifyContent: 'center' }}>Do not press back button or kill the application.
      </Text>
    </>
  );
  const mode = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();

  return (
    <>
      <View testID={props?.testID} style={{ position: 'relative', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', flex: 1, backgroundColor: themecolor.THEMECOLOR, width: '100%' }}>
        <Image source={
          require('../../../assets/alembicimages/smallLoader.gif')
        } resizeMode="center" style={{ backgroundColor: 'transparent', width: width, height: 200, flex: 1 }} />
        {props.loadingMsg && <View style={{ position: 'absolute' }} >
          <Text>{props.loadingMsg}</Text>
        </View>}
      </View>
    </>
  );
}

LoadingFullScreen.defaultProps = {
  loadingMsg: '',
  testID:'LoadingScreen'
}