import { View, Text, Image } from 'react-native';
import React from 'react';
import ModalRoot from './ModalRoot';
import ButtonRoot from '../buttons/ButtonRoot';
import { FontFamily } from '../../../assets/fonts/FontFamily';
import useResponsiveDimensions from '../../../hooks/useResponsiveDimensions';
import { ImagesAssets } from '../ImagesAssets';

const ConfirmationUi = ({ title, subTitle, setShowModal, onConfirm, onDiscard }) => {

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
        <Text style={{ color: 'black', fontFamily: FontFamily.TTCommonsDemiBold, fontSize: 20, top: 10 }} >{title}</Text>
        <Text style={{ color: 'black', fontFamily: FontFamily.TTCommonsDemiBold, top: 10 }} >{subTitle}</Text>
      </View>
      <View style={{ height: 20 }} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignSelf: 'center',
        }}>
        <ButtonRoot
          testID={'onConfirm'}
          onPress={onConfirm}
          borderRadius={30}
          width={60}
          color="#50b030"
          height={35}
          title={'Yes'}
        />
        <ButtonRoot
          testID={'onDiscard'}
          onPress={() => {
            setShowModal(false)
            onDiscard()
          }}
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

const ConfirmationModal = ({
  showModal,
  subTitle,
  setShowModal,
  title,
  onConfirm,
  onDiscard,
  testID = 'confirmationModal'
}) => {
  const [modalWidth] = useResponsiveDimensions({
    mobile: ['50%', '90%'],
    tab: ['40%', '60%'],
  });
  return (
    <>
      <ModalRoot
        testID={testID}
        showModal={showModal}
        setShowModal={setShowModal}
        width={modalWidth}
        content={
          <ConfirmationUi
            title={title}
            subTitle={subTitle}
            setShowModal={setShowModal}
            onConfirm={onConfirm}
            onDiscard={onDiscard}
          />
        }
      />
    </>
  );
};

export default ConfirmationModal;

ConfirmationModal.defaultProps = {
  title: 'Reschedule call',
  subTitle: 'Are you sure you want to Reschedule your Call',
  onConfirm: () => {
    alert('please pass onConfirm function');
  },
  onDiscard: () => { },
};
