import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import ModalRoot from '../ModalRoot';
import {FontFamily} from '../../../../assets/fonts/FontFamily';
import ButtonRoot from '../../buttons/ButtonRoot';
import {useSelector} from 'react-redux';
import Input from '../../textinputs/Input';

const ConductRCPA = props => {
    const {isLandscape} = useSelector(state => state.isLandscape);
  const [showModal, setShowModal] = React.useState(true);
  const RCPA = () => {
    return (
      <View>
        <ScrollView>
          <View style={{...styles.heading_text_container}}>
            <Text style={{...styles.heading_text}}>RCPA</Text>
          </View>
          <View style={{flexDirection: 'row', padding: 10}}>
            <Text
              style={{color: '#000', fontFamily: FontFamily.Popinssemibold,fontSize:isLandscape? 14:10}}>
              Own
            </Text>
            <Text
              style={{
                color: '#000',
                fontFamily: FontFamily.Popinssemibold,
                marginLeft: isLandscape? 120:20
                ,fontSize:isLandscape? 14:10
                
              }}>
              Competitor 02
            </Text>
            <Text
              style={{
                color: '#000',
                fontFamily: FontFamily.Popinssemibold,
                marginLeft:isLandscape? 60:10
                ,fontSize:isLandscape? 14:10
              }}>
              Competitor 03
            </Text>
            <Text
              style={{
                color: '#000',
                fontFamily: FontFamily.Popinssemibold,
                marginLeft:isLandscape? 70:10
                ,fontSize:isLandscape? 14:10
              }}>
              Competitor 04
            </Text>
          </View>

          <View style={{width: '100%'}}>
            <View style={{width: '32%', flexDirection: 'row'}}>
              <Input height={40} />
              <Input height={40} />
              <Input height={40} />
              <Input height={40} />
            </View>
          </View>
          <View style={{flexDirection: 'row', padding: 10}}>
            <Text
              style={{color: '#000', fontFamily: FontFamily.Popinssemibold ,fontSize:isLandscape? 14:10}}>
              Azithral
            </Text>
            <Text
              style={{
                color: '#000',
                fontFamily: FontFamily.Popinssemibold,
                marginLeft:isLandscape? 90:10,
                fontSize:isLandscape? 14:10
              }}>
              Omega Doxycycline
            </Text>
            <Text
              style={{
                color: '#000',
                fontFamily: FontFamily.Popinssemibold,
                marginLeft: isLandscape? 30:7,
                fontSize:isLandscape? 14:10
              }}>
              Resteclin
            </Text>
            <Text
              style={{
                color: '#000',
                fontFamily: FontFamily.Popinssemibold,
                marginLeft: isLandscape? 100:10,
                fontSize:isLandscape? 14:10
              }}>
              Metrogyl
            </Text>
          </View>

          <View style={{width: '100%'}}>
            <View style={{width: '32%', flexDirection: 'row'}}>
              <Input height={40} />
              <Input height={40} />
              <Input height={40} />
              <Input height={40} />
            </View>
          </View>
          <View style={{flexDirection: 'row', padding: 10}}>
            <Text
              style={{color: '#000', fontFamily: FontFamily.Popinssemibold,fontSize:isLandscape?14:10}}>
              Azithral
            </Text>
            <Text
              style={{
                color: '#000',
                fontFamily: FontFamily.Popinssemibold,
                marginLeft:isLandscape? 100:10,
                fontSize:isLandscape?14:10
              }}>
              Competitor 02
            </Text>
            <Text
              style={{
                color: '#000',
                fontFamily: FontFamily.Popinssemibold,
                marginLeft:isLandscape? 60:10,
                fontSize:isLandscape?14:10
              }}>
              Competitor 03
            </Text>
            <Text
              style={{
                color: '#000',
                fontFamily: FontFamily.Popinssemibold,
                marginLeft:isLandscape? 55:4,
                fontSize:isLandscape?14:10
              }}>
              Competitor 04
            </Text>
          </View>

          <View style={{width: '100%'}}>
            <View style={{width: '32%', flexDirection: 'row'}}>
              <Input height={40} />
              <Input height={40} />
              <Input height={40} />
              <Input height={40} />
            </View>
          </View>
          <View
            style={{
              marginTop: 15,
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View style={{}}>
              <ButtonRoot color="#50b030" width={100} borderRadius={15} />
            </View>
            <View style={{marginLeft: 15}}>
              <Text>Cancel</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  };

  return (
    <ModalRoot
      height={450}

      padding={15}
      showModal={showModal}
      setShowModal={setShowModal}
      content={<RCPA />}
    />
  );
};

export default ConductRCPA;

const styles = StyleSheet.create({
  heading_text: {
    fontFamily: FontFamily.Popinssemibold,
    color: '#000000',
    fontSize: 17,
  },
  heading_text_container: {
    width: '100%',
    padding: 5,
  },
});

