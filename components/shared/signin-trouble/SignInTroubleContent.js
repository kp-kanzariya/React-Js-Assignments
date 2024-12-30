import { StyleSheet, Text, View, TouchableOpacity, Alert, ScrollView, Linking } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import MCIcon from 'react-native-vector-icons/MaterialIcons';
import { FontFamily } from '../../../assets/fonts/FontFamily';
import { FontSize } from '../../../assets/fonts/Fonts';
import { TextInput } from 'react-native';
import ButtonRoot from '../buttons/ButtonRoot';
import Dropdown from '../dropdowns/DropdownComponent';
import { MyThemeClass } from '../Theme/ThemeDarkLightColor';
import { Colors } from '../../../assets/config/Colors';
import mailer from '../../../sharedFunctions/mailer';
import { AlertWarning } from '../alerts/Alert';
import { openComposer, openInbox } from "react-native-email-link";
const options = [
  { label: 'Not receiving OTP', value: 'Not receiving OTP' },
  { label: 'Unauthorised User', value: 'Unauthorised User' },
  { label: 'Number Change', value: 'Number Change' },
];

const SignInTroubleContent = props => {
  const { isLandscape } = useSelector(state => state.isLandscape);
  const { mode } = useSelector(state => state.mode);
  const themecolor = new MyThemeClass(mode).getThemeColor();
  const [issue, setIssue] = useState('');
  const [empCode, setEmpCode] = useState('');
  const [mobile, setMobile] = useState('');
  const [note, setNote] = useState('');

  useEffect(() => {
    // alert(props.status)
  }, [props]);
  // const sharePhraseToGmail = async () => {


  //   let url = `mailto:support@example.com`
  //   let discription= `Employee Code : ${empCode}
  //   Phone : ${mobile}
  //   Discription : ${note}`
  //   const query = ({
  //     subject:`${issue}`,
  //     body:`${discription}`,   

  //   })

  //   if (query.length) {
  //     url += `?${query}`;
  // }

  //   try {
  //      Linking.openURL(url)
  //   } catch (e) {
  //     console.log('--------e',e)
  //   }


  // }
  const goToMail = () => {
    if (issue == '' || empCode == '') {
      AlertWarning('All fields are required');
    } else {
      if (mobile.length != 10) {
        AlertWarning('Please enter a valid mobile number');
      } else {
        if (note == '') {
          AlertWarning('Please enter a note');
        } else {
          mailer({ issue: issue, empCode: empCode, mobile: mobile, note: note, refRBSheet: props.refRBSheet });
          // openComposer({

          // props.refRBSheet.current.close();
        }
      }
    }
  };

  return (
    <>
      <View
        style={{
          ...styles.MainViewCss,
        }}>
        <View
          style={{
            ...styles.SubContainer,
          }}>
          <Text style={{ ...styles.leave_Text_Css, fontFamily: FontFamily.TTCommonsDemiBold, fontSize: 18 }}>Trouble Login</Text>
          <TouchableOpacity onPress={() => props.refRBSheet.current.close()}>
            <MCIcon name="close" size={20} />
          </TouchableOpacity>
        </View>

        <View style={styles.MV5} />

        <View style={{}}>
          <Text
            style={{
              ...styles.Date_Text_Css,
            }}>
            Issue
          </Text>

          <View
            style={{
              ...styles.InputMainView,
              borderWidth: 0.5,
              borderColor: themecolor.BOXBORDERCOLOR1,
              backgroundColor: Colors.Textinputbg,
              marginTop: 5,
              width: '100%',
              zIndex: 9999
            }}>

            <Dropdown
              width={'100%'}
              backroundColor={Colors.Textinputbg}
              borderRadius={10}
              borderwidth={0.5}
              borderColors={Colors.borderColor}
              options={options}
              onSelect={setIssue}
              placeholder="Select"
              placecolor={Colors.black}
            />
          </View>
        </View>
        <View style={styles.MV5} />
        <View style={{ zIndex: -1 }}>
          <Text
            style={{
              ...styles.Date_Text_Css,
            }}>
            Employee Code
          </Text>
          <View
            style={{
              ...styles.TextInput_View_Css,
              top: 5
            }}>
            <TextInput
              // multiline
              // textAlignVertical={'top'}

              style={{
                width: '100%',
                color: 'black',
                minHeight: 40,
                fontFamily: FontFamily.TTCommonsMedium,
                left: 5
              }}
              onChangeText={txt => setEmpCode(txt)}
            />
          </View>

        </View>
        <View style={styles.MV5} />
        <View style={{ zIndex: -1 }}>
          <Text
            style={{
              ...styles.Date_Text_Css,
            }}>
            Mobile Number
          </Text>
          <View
            style={{
              ...styles.TextInput_View_Css,
              top: 5
            }}>

            <TextInput
              keyboardType="numeric"
              style={{
                width: '100%',
                height: 45,
                fontSize: 12,
                left: 5
              }}
              value={mobile}
              maxLength={10}
              onChangeText={txt => {
                let temp = '';
                temp = txt.replace(/[^0-9]/g, '');
                if (temp.length === 0) {
                  setMobile('');
                } else {
                  setMobile(temp);
                }
              }}
              placeholderStyle={{
                fontFamily: 'AnotherFont',
                color: '#000',
              }}
            />
          </View>
        </View>
        <View style={styles.MV5} />
        <View style={{ zIndex: -1 }}>
          <Text
            style={{
              ...styles.Date_Text_Css,
            }}>
            Note
          </Text>
          <View
            style={{
              ...styles.TextInput_View_Css,
              top: 5
            }}>
            <TextInput
              multiline
              textAlignVertical={'top'}
              style={{
                width: '100%',
                color: 'black',
                minHeight: 60,
                fontFamily: FontFamily.TTCommonsMedium,
                left: 5
              }}
              onChangeText={txt => setNote(txt)}
            />
          </View>
          <View style={styles.MV5} />
          <View style={{ width: '100%' }}>
            <View style={styles.MV5} />
            <ButtonRoot
              onPress={() => goToMail()}
              title={'Submit'}
              // width={'100%'}
              color="#50b030"
              height={45}
              fontSize={isLandscape ? 18 : 16}
            />
          </View>
        </View>
        <View style={styles.MV8} />

      </View>

    </>
  );
};

export default SignInTroubleContent;
const styles = StyleSheet.create({
  MV3: { marginVertical: 3 },
  MV5: { marginVertical: 5 },
  MV8: { marginVertical: 8 },
  MainView: {
    width: '100%',
    flexWrap: 'wrap',
    alignSelf: 'center',
    //   height: 'auto',
    // justifyContent: 'space-between',
  },
  InputMainView: {
    width: '90%',
    flexDirection: 'row',
    backgroundColor: Colors.Textinputbg,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },

  MainViewCss: {
    // flex: 1,
    // padding: 20,
    width: '90%',
    alignSelf: 'center',
    // backgroundColor: 'lightblue',
  },
  SubContainer: {
    height: 50,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: Colors.borderColor1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  leave_Text_Css: {
    fontFamily: FontFamily.TTCommonsMedium,
    color: 'black',
  },
  FormDate_To_ToDate_Css: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    fontSize: FontSize.labelText,
    // padding: 8,
    flexWrap: 'wrap',
    // backgroundColor:'red'
  },
  Date_Text_Css: {
    color: 'black',
    fontFamily: FontFamily.TTCommonsMedium,
    fontSize: FontSize.labelText3,
  },

  leave_Durataion_Text_Css: {
    fontFamily: FontFamily.TTCommonsMedium,
    color: 'black',
    fontSize: FontSize.labelText,
    marginLeft: 5,
    marginTop: 5,
  },

  FirstSecondHalfView_Css: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // padding: 8,
    marginTop: 5,
  },
  To_Text_Css: {
    marginHorizontal: 10,
    fontFamily: FontFamily.TTCommonsMedium,
    fontSize: 12,
    color: Colors.black,
  },

  TextInput_View_Css: {
    borderRadius: 10,
    backgroundColor: Colors.Textinputbg,
    width: '100%',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.borderColor1,
  },

  Button_View_Css: {
    flexDirection: 'row',
    width: '100%'
  },
});
