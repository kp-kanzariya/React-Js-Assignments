import { View, Text, Image } from 'react-native';
import React from 'react';
import ModalRoot from './ModalRoot';
import ButtonRoot from '../buttons/ButtonRoot';
import { FontFamily } from '../../../assets/fonts/FontFamily';
import useResponsiveDimensions from '../../../hooks/useResponsiveDimensions';
import { ImagesAssets } from '../ImagesAssets';

const ConfirmationUi = ({ title, subTitle, setShowModal, onConfirm, onCancel }) => {

  return (
    <View style={{ width: '100%', justifyContent: 'center', alignSelf: 'center', alignItems: 'center' }}>
      {/* <View> */}
      <Image
        resizeMode="contain"
        style={{ width: 200, height: 170 }}
        source={ImagesAssets.QuestionMark}
      />
      {/* </View> */}
      <View style={{ alignItems: 'center' }}>
        <Text style={{ color: 'black', fontFamily: FontFamily.Popinssemibold, fontSize: 16, top: 10 }} >{title}</Text>
        <Text style={{ color: 'black', fontFamily: FontFamily.PopinsMedium }} >{subTitle}</Text>
      </View>
      <View style={{ height: 10 }} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          width: '100%',
          alignSelf: 'center',
        }}>
        <ButtonRoot
          onPress={onConfirm}
          borderRadius={30}
          width={60}
          color="#50b030"
          height={35}
          title={'Yes'}
        />
        <ButtonRoot
          onPress={onCancel}
          width={60}
          borderRadius={30}
          height={35}
          color={'white'}
          textColor={'black'}
          title={'No'}
          borderWidth={0}
        />
      </View>
    </View>
  );
};

const ConfirmationModals = ({
  showModal,
  subTitle,
  setShowModal,
  title,
  onConfirm,
  onCancel
}) => {
  // console.log(showModal);
  const [modalWidth] = useResponsiveDimensions({
    mobile: ['50%', '90%'],
    tab: ['40%', '60%'],
  });

  // alert("modal "+showModal)

  return (
    <>
      <ModalRoot
        showModal={showModal}
        setShowModal={setShowModal}
        onCancel={onCancel}
        width={modalWidth}
        content={
          <ConfirmationUi
            title={title}
            subTitle={subTitle}
            setShowModal={setShowModal}
            onConfirm={onConfirm}
            onCancel={onCancel}
          />
        }
      />
    </>
  );
};

export default ConfirmationModals;

ConfirmationModals.defaultProps = {
  title: 'Reschedule call',
  subTitle: 'Are you sure you want to Reschedule your Call',
  onConfirm: () => {
    alert('please pass onConfirm function');
  },
  onDiscard: () => {
    alert('aaa');
  },
};
