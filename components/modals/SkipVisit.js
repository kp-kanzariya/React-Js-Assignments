import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import React, {useState} from 'react';
import ModalRoot from '../shared/modals/ModalRoot';
import {FontFamily} from '../../assets/fonts/FontFamily';
import ButtonRoot from '../shared/buttons/ButtonRoot';
import DateTimePicker from '../shared/datepicker/DateTimePicker';
import Input from '../shared/textinputs/Input';
import {ImagesAssets} from '../shared/ImagesAssets';
import { TouchableOpacity } from 'react-native';
const SkipVisit = props => {
  const SkipVisitComp = () => {
    return (
      <ScrollView>
        <View style={{...styles.container}}>
          <View>
            <Image
              resizeMode="contain"
              style={{height: 200, width: 200}}
              source={ImagesAssets.QuestionMark}
            />
          </View>
          {props.skipHeading && (
            <View>
              <Text
                style={{
                  ...styles.textStyle,
                  fontFamily: FontFamily.TTCommonsBold,
                  fontSize: 17,
                }}>
                {props.skipHeading}{' '}
              </Text>
            </View>
          )}
          {props.firstHeadingText && (
            <View>
              <Text style={{...styles.textStyle}}>
                {props.firstHeadingText}{' '}
              </Text>
            </View>
          )}

          {props.secondHeadingText && (
            <View>
              <Text style={{...styles.textStyle}}>
                {props.secondHeadingText}{' '}
              </Text>
            </View>
          )}

          {props.thirdHeadingText && (
            <View style={{marginTop: 10}}>
              <Text style={{...styles.textStyle, fontSize: 12}}>
                {props.thirdHeadingText}
              </Text>
            </View>
          )}

          {props.showDateTime && (
            <View style={{width: '100%', marginTop: 20}}>
              <DateTimePicker
                height={50}
                borderColor="#f4f4f4"
                backgroundColor="#f4f4f4"
                mode="date"
              />
            </View>
          )}

          {props.remark && (
            <View style={{width: '100%', flexWrap: 'wrap', marginTop: 10}}>
              <Input
                placeholder="Enter Remark"
                placeholderColor="#000"
                width="100%"
                height={102}
                borderRadius={0}
                backgroundColor="#f4f4f4"
              />
            </View>
          )}

          {props.SubmitCancel && (
            <View style={{...styles.btnCont}}>
              <View>
                <ButtonRoot 
                  borderRadius={16}
                  color="#50b030"
                  title="Submit"
                  onPress={props.submitOnpress}
                  width={70}
                  height={40}
                />
              </View>
              <TouchableOpacity onPress={()=>{props.setShowModal(false)}}>
              <View style={{marginLeft: 10}}>
                <Text onPress={() => props.setShowModal(false)} style={{...styles.noBtn}}>Cancel</Text>
              </View>
              </TouchableOpacity>

            </View>
          )}
          {props.ResheduleCancelBtn && (
            <View style={{...styles.btnCont}}>
              <View>
                <ButtonRoot
                  borderRadius={5}
                  color="#50b030"
                  title="Reshedule"
                  width={120}
                  height={40}
                />
              </View>
              <TouchableOpacity onPress={()=>{props.setShowModal(false)}} >
              <View style={{marginLeft: 10}}>
                <Text style={{...styles.noBtn}}>Cancel</Text>
              </View>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    );
  };

  return (
    <ModalRoot
      width={350}
      padding={props.remark ? 1 : 20}
      showModal={props.showModal}
      setShowModal={props.setShowModal}
      content={<SkipVisitComp />}
    />
  );
};

export default SkipVisit;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  textStyle: {
    fontFamily: FontFamily.TTCommonsMedium,
    color: '#000',
    textAlign: 'center',
  },
  btnCont: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  noBtn: {
    color: '#a7a7a7',
    fontFamily: FontFamily.TTCommonsMedium,
  },
});
