import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import ModalRoot from '../shared/modals/ModalRoot';
import {ImagesAssets} from '../shared/ImagesAssets';
import {FontFamily} from '../../assets/fonts/FontFamily';
import {Image} from 'react-native';
import ButtonRoot from '../shared/buttons/ButtonRoot';
import TextInputRoot from '../shared/textinputs/TextInputRoot';
import {Colors} from '../../assets/config/Colors';
import Spacer from '../shared/spacers/Spacer';
import {formatText} from '../../api/commonRepository';
import {AlertSuccess, AlertWarning} from '../shared/alerts/Alert';
import {postData} from '../../api/Request';
import {API} from '../../api/API';
import moment from 'moment';
import { appendTextToFile } from '../../helper/utils/Logger';
import { store } from '../../redux/store';

const DayUnlockingModal = props => {
  const [remark, setRemark] = useState('');
  // alert(remark)
  const unlockDays = async () => {
    try {
      let params = {employee_id: props.empId, remark: remark};
      const response = await postData({url: API.UnlockDays, params: params});
      if (response.statusCode === 200) {
        AlertSuccess(response.message);
        props.setShowModal(false);
      } else {
        AlertWarning(response.message);
      }
    } catch (err) {
      console.error('🚀 ~ file: Team360.js:86 ~ unlockDays ~ err:', err);
      appendTextToFile({
        text:`Error in catch fun unlockDays inside DayUnlockingModal component Line 35 ${err}`,
        headerDate:store?.getState().header.headerDate
      });
    }
  };

  return (
    <ModalRoot
      showModal={props.showModal}
      setShowModal={props.setShowModal}
      width={'30%'}
      content={
        <View>
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignSelf: 'center',
              alignItems: 'center',
            }}>
            {/* <View> */}
            <Image
              resizeMode="contain"
              style={{width: 200, height: 170}}
              source={ImagesAssets.QuestionMark}
            />
            <View style={{width: '100%', alignSelf: 'center'}}>
              <Text
                style={{
                  fontFamily: FontFamily.TTCommonsMedium,
                  color: 'black',
                  lineHeight: 15,
                }}>
                Are you sure you want to unlock days for{' '}
                {formatText(props.name)} ?
              </Text>
            </View>
            <Text
              style={{
                fontFamily: FontFamily.TTCommonsMedium,
                color: 'red',
                // lineHeight: 15,
              }}>
              Locked Dates
            </Text>
            <Spacer/>
            <View
              style={{
                width: '100%',
                alignSelf: 'center',
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
              {props?.lockedDates.map(item => {
                return (
                  <Text
                    style={{
                      fontFamily: FontFamily.TTCommonsMedium,
                      color: 'black',
                      lineHeight: 15,
                      marginLeft:5
                    }}>
                    {moment(item).format('Do MMM YYYY')},
                  </Text>
                );
              })}
            </View>
            <Spacer h={17} />
            <TextInputRoot
              placeholder="Enter Remark"
              multiline
              numberOfLines={5}
              setInput={setRemark}
              OnFocusColor={Colors.MRGREEN}
              height={70}
            />
            <Spacer h={17} />
          </View>
          <View style={{flexDirection: 'row', width: '100%', left: -10}}>
            <ButtonRoot
              width={'auto'}
              padding={15}
              height={35}
              //   title="Reject Reques"
              //   color="red"
              onPress={() => {
                unlockDays();
              }}
            />

            <ButtonRoot
              width={'auto'}
              padding={0}
              height={35}
              color="transparent"
              textColor="black"
              title="Cancel"
              borderWidth={0}
              onPress={() => {
                props.setShowModal(false);
              }}
            />
          </View>
        </View>
      }
    />
  );
};

export default DayUnlockingModal;

const styles = StyleSheet.create({});
