import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import ModalRoot from '../shared/modals/ModalRoot';
import useResponsiveDimensions from '../../hooks/useResponsiveDimensions';
import {ImagesAssets} from '../shared/ImagesAssets';
import {FontFamily} from '../../assets/fonts/FontFamily';
import ButtonRoot from '../shared/buttons/ButtonRoot';
import Spacer from '../shared/spacers/Spacer';

const WarningContent = ({closeModal})=> {
  return (
    <View style={{}}>
      <View
        style={{
          height: 220,
          width: 200,
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
        }}>
        <Image
          source={ImagesAssets.WarningGif}
          resizeMode="contain"
          style={{height: '100%', width: '100%'}}
        />
      </View>
      <Text style={{textAlign: 'center', fontFamily: FontFamily.TTCommonsMedium}}>
        This Day is lock, kindly connect with your manager to Unlock the day.
      </Text>
      <Spacer h={18}/>
      <ButtonRoot
        title="Thank You"
        padding={10}
        borderRadius={20}
        height={35}
        onPress={() =>closeModal()}
      />
    </View>
  );
};

const DateLockWarningModal = props => {
  const [modalWidth] = useResponsiveDimensions({
    mobile: ['50%', '90%'],
    tab: ['30%', '55%'],
  });

  const closeModal = () => {
    props.setDateLockModal(false);
  };

  return (
    <ModalRoot
      showModal={props.dateLockModal}
      setShowModal={props.setDateLockModal}
      width={
        // isMobile ? (isLandscape ? '60%' : '90%') : isLandscape ? '35%' : '80%'
        modalWidth
      }
      height={'auto'}
      padding={15}
      content={<WarningContent closeModal={closeModal} />}
      //   backgroundColor={'transparent'}
    />
  );
};

export default DateLockWarningModal;

const styles = StyleSheet.create({});
