import { View, Image, Text } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import ModalRoot from '../shared/modals/ModalRoot';
import { FontFamily } from '../../assets/fonts/FontFamily';
import { FontSize } from '../../assets/fonts/Fonts';
import useResponsiveDimensions from '../../hooks/useResponsiveDimensions';

export default function FullSyncModal({ showModal, setShowModal }) {
  const { isLandscape,isMobile } = useSelector(state => state.isLandscape);
  const [modalWidth] = useResponsiveDimensions({
    mobile: ['50%', '90%'],
    tab: ['40%', '60%'],
  });
  // console.log("sync Modal in FullSync Modal===>", setShowModal)
  return (
    <ModalRoot
      width={modalWidth}
      height={'auto'}
      padding={15}
      disableBackPress={true}
      showModal={showModal}
      setShowModal={setShowModal}
      content={
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Image style={{ width: 200, height: 200 }}
            source={require('../../assets/alembicimages/FullSync.gif')}
            resizeMode='center'
          />
          <Text style={{fontFamily:FontFamily.TTCommonsMedium,fontSize:FontSize.labelText4}} >
            Full Sync is in progress. Please wait for a moment.
          </Text>
        </View>
      }
    />
  )
}