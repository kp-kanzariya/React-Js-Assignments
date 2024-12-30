import { Image, View, Dimensions, Text, StyleSheet } from 'react-native';
import React from 'react';
import {
  SERVER_URL,
  getAppToken,
  getEmployeeId,
} from '../../api/commonRepository';
import WebView from 'react-native-webview';
import moment from 'moment';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import { ImagesAssets } from '../shared/ImagesAssets';
import { FontFamily } from '../../assets/fonts/FontFamily';
import { useSelector } from 'react-redux';

function Webview(props) {
  const [serverURL, setServerURL] = React.useState('');
  const [TOKEN, setTOKEN] = React.useState('');
  const [employee_id, setEmployee_id] = React.useState('');
  const [date, setDate] = React.useState('');
  const [show, setShow] = React.useState(false);
  const { headerDate } = useSelector(state => state.header);
  React.useEffect(() => {
    async function getToken() {
      let token = await getAppToken();
      let emp_Id = await getEmployeeId();
      setEmployee_id(emp_Id);
      setTOKEN(token);
      let crrDate = moment().format('YYYY-MM-DD');
      setDate(crrDate);
      setShow(true);
    }
    getToken();
    getServerURL();
  }, []);

  React.useEffect(() => {
    async function temp() {
      let a = `${serverURL}${props.route.params.URL}?apptoken=${TOKEN}&date=${props.route.params.date}&employee_id=${employee_id}`;
    }
    temp();
  }, []);

  const getServerURL = async () => {
    try {
      const url = await SERVER_URL();
      setServerURL(url);
    } catch (err) {
      console.error('err', err);
    }
  };
  const { width, height } = Dimensions.get('screen');
  const navigation = useNavigation();
  function LoadingIndicatorView() {
    return <View style={styles.container}><Image resizeMode='contain' style={{ justifyContent: 'center', alignSelf: 'center', width: 150, height: 150, }} source={ImagesAssets.Loading} /><Text style={styles.LoadingText}>Loading...</Text></View>;
  }

//  if(show){
//   console.log('1234URL',`${serverURL}${props?.route?.params?.URL}?position_id=${props?.route?.params?.position_id}&brand_id=${props?.route?.params?.brand_id}&rcpa=${props?.route?.params?.rcpa}&visits=${props?.route?.params?.visits}&status=${props?.route?.params?.status}&moye=${props?.route?.params?.moye}&apptoken=${TOKEN}`)
//   //  console.log('URL__Checkkkkkfffffffffff111_23332551231111hhhh--->',`${serverURL}${props?.route?.params?.URL}?position_id=${props?.route?.params?.position_id}&brand_id=${props?.route?.params?.brand_id}&rcpa=${props?.route?.params?.rcpa}&visits=${props?.route?.params?.visits}&status=${props?.route?.params?.status}&moye=${props?.route?.params?.moye}&apptoken=${TOKEN}`)
//  }
 
  return (
    <>
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        {show && props?.route?.params?.CameFrom == 'DarReport' ? (
          <WebView
            style={styles.WebViews}
            renderLoading={LoadingIndicatorView}
            loadingProgressBar
            startInLoadingState={true}
            source={{
              uri: `${serverURL}${props?.route?.params?.URL}?apptoken=${TOKEN}&date=${props?.route?.params?.date}&employee_id=${props?.route?.params?.EmployeeId}`,
            }}
          // source={{ html: '<a href="https://sample-videos.com/csv/Sample-Spreadsheet-10-rows.csv">please click me</a>' }}
          />
        ) : show && props?.route?.params?.CameFrom == 'MasReport' ? (
          <WebView
            style={styles.WebViews}
            renderLoading={LoadingIndicatorView}
            loadingProgressBar
            startInLoadingState={true}
            source={{
              uri: `${serverURL}${props?.route?.params?.URL}?apptoken=${TOKEN}&month=${props?.route?.params?.month}`,
              // uri: `${serverURL}${props?.route?.params?.URL}?apptoken=${TOKEN}&month=${props?.route?.params?.month}`,

            }}
          />
        ) : show && props?.route?.params?.CameFrom == 'RcpaBaseReport' ? (
          <WebView
            style={styles.WebViews}
            renderLoading={LoadingIndicatorView}
            loadingProgressBar
            startInLoadingState={true}
            source={{
              uri: `${serverURL}${props?.route?.params?.URL}?apptoken=${TOKEN}&month=${props?.route?.params?.month}`,
            }}
          />
        ) : show && props?.route?.params?.CameFrom == 'EdetailingReport' ? (
          <WebView
            style={styles.WebViews}
            renderLoading={LoadingIndicatorView}
            loadingProgressBar
            startInLoadingState={true}
            source={{
              uri: `${serverURL}${props?.route?.params?.URL}?apptoken=${TOKEN}`,
            }}
          />
        ) : show && props?.route?.params?.CameFrom == 'DvpReport' ? (
          <WebView
            style={styles.WebViews}
            renderLoading={LoadingIndicatorView}
            loadingProgressBar
            startInLoadingState={true}
            source={{
              uri: `${serverURL}${props?.route?.params?.URL}?apptoken=${TOKEN}`,
            }}
          />
        ) :
          show && props?.route?.params?.CameFrom == 'ExpenseMonthReport' ? (
            <WebView
              style={styles.WebViews}
              renderLoading={LoadingIndicatorView}
              loadingProgressBar
              startInLoadingState={true}
              source={{
                uri: `${serverURL}${props?.route?.params?.URL}?apptoken=${TOKEN}&month=${props?.route?.params?.month}&employee_id=${props?.route?.params?.employee_id}`,
              }}
            />
          ) : show && props?.route?.params?.CameFrom == 'SGPIReport' ? (
            <WebView
              style={styles.WebViews}
              renderLoading={LoadingIndicatorView}
              loadingProgressBar
              startInLoadingState={true}
              source={{
                uri: `${serverURL}${props?.route?.params?.URL}?apptoken=${TOKEN}&month=${props?.route?.params?.month}&employee_id=${props?.route?.params?.EmployeeId}`,
              }}
            />
          )
            : show && props?.route?.params?.CameFrom == 'PrescriberTally' ? (
              <WebView
                style={styles.WebViews}
                renderLoading={LoadingIndicatorView}
                loadingProgressBar
                startInLoadingState={true}
                source={{
                  uri: `${serverURL}${props?.route?.params?.URL}?position_id=${props?.route?.params?.position_id}&brand_id=${props?.route?.params?.brand_id}&rcpa=${props?.route?.params?.rcpa}&visits=${props?.route?.params?.visits}&status=${props?.route?.params?.status}&moye=${props?.route?.params?.moye}&apptoken=${TOKEN}`
                }}
              />
            )
            : show && props?.route?.params?.CameFrom == 'PrescriberTallyAll' ? (
                // uri: `${serverURL}${props?.route?.params?.URL}?position_id=${props?.route?.params?.position_id}&brand_id=${props?.route?.params?.brand_id}&rcpa=${props?.route?.params?.rcpa}&visits=${props?.route?.params?.visits}&moye=${props?.route?.params?.moye}&status=${props?.route?.params?.status}&apptoken=${TOKEN}`
              <WebView
                style={styles.WebViews}
                renderLoading={LoadingIndicatorView}
                loadingProgressBar
                startInLoadingState={true}
                source={{
                  uri: `${serverURL}${props?.route?.params?.URL}?position_id=${props?.route?.params?.position_id}&brand_id=${'All'}&moye=${props?.route?.params?.moye}&apptoken=${TOKEN}`
                }}
              />
            )
            : show && props?.route?.params?.CameFrom == 'PrescriberLadder' ? (
              <WebView
                style={styles.WebViews}
                renderLoading={LoadingIndicatorView}
                loadingProgressBar
                startInLoadingState={true}
                source={{
                  uri: `${serverURL}${props?.route?.params?.URL}?employee_id=${employee_id}&territoryId=${props?.route?.params?.territoryId}&BrandId=${props?.route?.params?.BrandId}&Moye=${props?.route?.params?.Moye}&Status=${props?.route?.params?.Status}&apptoken=${TOKEN}`
                }}
              />
            )
            : show && props?.route?.params?.CameFrom == 'PrescriberLadderRXer' ? (
              <WebView
                style={styles.WebViews}
                renderLoading={LoadingIndicatorView}
                loadingProgressBar
                startInLoadingState={true}
                source={{
                  uri: `${serverURL}${props?.route?.params?.URL}?prescriberLevel=${props?.route?.params?.prescriberLevel}&territoryId=${props?.route?.params?.territoryId}&Moye=${props?.route?.params?.Moye}&employee_id=${props?.route?.params?.employee_id}&apptoken=${TOKEN}`
                }}
              />
            ):show && props?.route?.params?.CameFrom == 'MTPDeviation' ? (
              <WebView
                style={styles.WebViews}
                renderLoading={LoadingIndicatorView}
                loadingProgressBar
                startInLoadingState={true}
                source={{
                  uri: `${serverURL}${props?.route?.params?.URL}?date=${props?.route?.params?.date}&apptoken=${TOKEN}`
                }}
              />
            ):
            show && props?.route?.params?.CameFrom == 'JWReport' ? (
              <WebView
                style={styles.WebViews}
                renderLoading={LoadingIndicatorView}
                loadingProgressBar
                startInLoadingState={true}
                source={{
                  uri: `${serverURL}${props?.route?.params?.URL}?month=${props?.route?.params?.month}&position_id=${props?.route?.params?.position_id}&apptoken=${TOKEN}`

                }}
              />
            )
            
              :
              (
                <></>
              )
        }
      </View>
      <View
        style={{
          alignItems: 'flex-end',
          position: 'absolute',
          top: 10,
          justifyContent: 'flex-end',
          right: 10,
        }}>
        <Entypo name="cross" size={40} onPress={() => navigation.goBack()} />
      </View>
    </>
  );
}

export default Webview;
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center', alignSelf: 'center', flex: 1
  },
  LoadingText: { fontFamily: FontFamily.TTCommonsDemiBold, fontSize: 20, textAlign: 'center', top: -50 },
  WebViews: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});

Webview.defaultProps = {
  URL: '',
};
