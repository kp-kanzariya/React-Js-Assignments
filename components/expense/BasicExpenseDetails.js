import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from '../../assets/config/Colors';
import { useSelector } from 'react-redux';
import { MyThemeClass } from '../shared/Theme/ThemeDarkLightColor';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { FontFamily } from '../../assets/fonts/FontFamily';
import { FontSize } from '../../assets/fonts/Fonts';
import UserDummyImage from '../shared/UserDummyImage';
import moment from 'moment';
import Spacer from '../shared/spacers/Spacer';
import BasicTable from '../shared/tables/BasicTable';
import ButtonRoot from '../shared/buttons/ButtonRoot';
import { useNavigation } from '@react-navigation/native';
import { API } from '../../api/API';
import { AlertWarning } from '../shared/alerts/Alert';
import { appendTextToFile } from '../../helper/utils/Logger';
import { store } from '../../redux/store';

const BasicExpenseDetails = (props) => {
  const mode = useSelector(state => state.mode);

  const navigation = useNavigation();
  const themecolor = new MyThemeClass(mode).getThemeColor();
  const { isMobile } = useSelector(state => state.isLandscape);
  const [data, setData] = useState(props.masterData);
  const [ceratedOn, setCeratedOn] = useState(`Created on ${props?.masterData?.log?.length > 0 ? moment(props.masterData?.log[0]?.CreatedAt?.date).format('HH:MM A, DD MMM YYYY') : ''}`);
  const [activityData, setActivityData] = useState([]);
  const [activityLabelName, setActivitylabelName] = useState([]);

  useEffect(() => {
    try {
      let obj = data?.DayActivities
      let dayActivityData = Object.keys(obj)?.reduce((arr, item) => {
        const values = Object.values(obj[item]);
        arr.push([item, ...values]);
        return arr
      }, [])
      setActivityData(dayActivityData)
      
      const patchName = Object.keys(obj)[0];
      const labelName = Object.keys(obj[patchName]);
      labelName.unshift('Patch Name')
      setActivitylabelName(labelName)
 
    } catch (err) {
      appendTextToFile({
        text: `Error in catch useEffect inside BasicExpenseDetails Line 41 ${err}`,
        headerDate: store?.getState().header.headerDate
      });
 
      console.error("🚀 ~ file: BasicExpenseDetails.js:38 ~ useEffect ~ err:", err)
    }
  }, [])

  return (
    <View
      style={{
        ...styles.mainContainer,
      }}>
      <View style={{ backgroundColor: themecolor.HEADERTHEMECOLOR, flex: 3 }}>
        <View
          style={{
            ...styles.subContainer,
          }}>
          <View
            style={{
              ...styles.UserDummy_Image_Css,
            }}>
            <UserDummyImage />
          </View>
          <View style={{ marginLeft: 15 }}>
            <Text
              style={{
                ...styles.textOne,
                bottom: 0,
                fontSize: FontSize.labelText4,
                fontFamily: FontFamily.TTCommonsDemiBold
              }}>
              {data?.expenses?.Employee?.FirstName} {data?.expenses?.Employee?.LastName}
            </Text>
            <View style={{ ...styles.IconView, marginVertical: 5 }}>
              <FAIcon name="calendar" color="white" />
              <Text style={{ marginLeft: 5, ...styles.textTwo, fontFamily: FontFamily.TTCommonsMedium }}>
                {ceratedOn || '-'}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ ...styles.textView }}>
          <View
            style={{
              ...styles.textSubViewCss,
              width: isMobile ? '100%' : '60%'
            }}>
            <View >
              <Text style={styles.textOne}>Day Type</Text>
              <Text style={{ ...styles.textTwo, top: 5 }}>{props.dayType || 'NA'}</Text>
            </View>
            <View>
              <Text style={styles.textOne}>Type</Text>
              <Text style={{ ...styles.textTwo, top: 5 }}>{data.expenseType}</Text>
            </View>
            <View>
              <Text style={styles.textOne}>Place Of Work</Text>
              <Text style={{ ...styles.textTwo, top: 5 }}>{data?.expenses?.ExpensePlacewrk}</Text>
            </View>

          </View>
        </View>

      </View>
      <View
        style={{
          ...styles.Expense_overView_Css,
        }}>
        <Text style={{ ...styles.textOne, color: 'black', bottom: 0, fontFamily: FontFamily.TTCommonsDemiBold, fontSize: 14 }}>
          Expense Overview
        </Text>
        <View
          style={{
            ...styles.ExpenseViewCss,
            top: 5
          }}>
          <View
            style={{
              ...styles.View_Container,
            }}>
            <View
              style={{
                ...styles.Requsted_Css,
              }}>
              <Text
                style={{
                  ...styles.RequstedTextCss,
                  color: themecolor.HEADERTHEMECOLOR,
                }}>
                Requested
              </Text>
            </View>
            <View
              style={{
                ...styles.FinalViewCss,
              }}>
              <Text
                style={{
                  ...styles.FinalTextCss,
                  color: themecolor.HEADERTHEMECOLOR,
                }}>
                Final
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              height: 35,
            }}>
            <View
              style={{
                // backgroundColor: 'yellow',
                width: '50%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: FontFamily.TTCommonsMedium,
                  fontSize: FontSize.labelText,
                  color: 'black',
                }}>
                {data?.expenses?.ExpenseReqAmt}
              </Text>
            </View>
            <View
              style={{
                // backgroundColor: 'red',
                width: '50%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: FontFamily.TTCommonsMedium,
                  fontSize: FontSize.labelText,
                  color: 'black',
                }}>
                {data?.expenses?.ExpenseFinalAmt}
              </Text>
            </View>
          </View>
        </View>
        <Spacer h={15} />
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} >
          <Text style={{ ...styles.textOne, color: 'black', bottom: 0, fontFamily: FontFamily.TTCommonsDemiBold, fontSize: 14 }}>
            Day's activity breakup
          </Text>
          <ButtonRoot testID={'expense-DarReport'} width='auto' color={activityData.length > 0 ? Colors.MRGREEN : Colors.grey} title='View DAR Report' fontSize={10} padding={6} preIconName='eye' preIconSize={10} height={20} onPress={() => {
            activityData.length > 0 ? navigation.navigate('Webview', {
              URL: API.DarReport,
              date: data?.expenses?.ExpenseDate,
              EmployeeId: data?.expenses?.Employee?.EmployeeId,
              CameFrom: 'DarReport',
            }) : AlertWarning('Data not available')
          }} />
        </View>
        <Spacer h={5} />
        <BasicTable noDataHeight={70} HT={220}  columnRatio={[3]} MH={0} RowBorderWidth={0.5} RowBorderColor={Colors.borderColor1} tableHead={activityLabelName} tableData={activityData} />
      </View>
    </View>
  )
};

export default BasicExpenseDetails;

const styles = StyleSheet.create({
  textOne: {
    fontFamily: FontFamily.TTCommonsMedium,
    fontSize: FontSize.labelText,
    color: 'white',
    bottom: -3,
  },
  textTwo: {
    fontFamily: FontFamily.TTCommonsMedium,
    fontSize: FontSize.labelText,
    color: 'white',
  },
  mainContainer: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    borderColor: Colors.borderColor1,
    borderWidth: 1,
    backgroundColor: 'white'
  },
  subContainer: {
    flexDirection: 'row',
    width: '100%',
    alignSelf: 'center',
    borderBottomColor: Colors.borderColor1,
    borderBottomWidth: 1,
    padding: 10,
    alignItems: 'center',
  },
  UserDummy_Image_Css: {
    height: 60,
    width: 60,
    //   backgroundColor: 'red',
    borderRadius: 100,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: Colors.borderColor1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  IconView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textView: {
    width: '95%',
    alignSelf: 'center',
  },
  textSubViewCss: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    padding: 10,
  },
  Expense_overView_Css: {
    flex: 1,
    width: '97%',
    alignSelf: 'center',
    paddingVertical: 15,
  },
  ExpenseViewCss: {
    borderWidth: 1,
    borderColor: Colors.borderColor1,
    borderRadius: 10,
    width: '50%',
    overflow: 'hidden',
  },
  View_Container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 35,
    backgroundColor: '#e9f6fa',
    borderBottomWidth: 1,
    borderColor: Colors.borderColor1,
  },
  Requsted_Css: {
    // backgroundColor: 'yellow',
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  RequstedTextCss: {
    fontFamily: FontFamily.TTCommonsMedium,
    fontSize: FontSize.labelText,
  },
  FinalViewCss: {
    // backgroundColor: 'yellow',
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  FinalTextCss: {
    fontFamily: FontFamily.TTCommonsMedium,
    fontSize: FontSize.labelText,
  },
});
