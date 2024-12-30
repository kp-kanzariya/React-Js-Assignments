import { View, Text, Image } from 'react-native';
import React from 'react';
import ModalRoot from './ModalRoot';
import ButtonRoot from '../buttons/ButtonRoot';
import { FontFamily } from '../../../assets/fonts/FontFamily';
import useResponsiveDimensions from '../../../hooks/useResponsiveDimensions';
import { ImagesAssets } from '../ImagesAssets';

const FreqOrderedUI = ({ title, subTitle, setShowModal, onConfirm }) => {

    return (
        <View style={{ width: '100%', justifyContent: 'center', alignSelf: 'center', alignItems: 'center' }}>
            {/* <View> */}
            <Image
                resizeMode="contain"
                style={{ width: 200, height: 170 }}
                source={ImagesAssets.WarningGif}
            />
            {/* </View> */}
            <View style={{ alignItems: 'center' }}>
                <Text style={{ color: 'black', fontFamily: FontFamily.TTCommonsDemiBold, fontSize: 16, top: 10 }} >{title}</Text>
                <Text style={{ color: 'black', fontFamily: FontFamily.TTCommonsMedium }} >{subTitle}</Text>
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
                    width={160}
                    color="#50b030"
                    height={35}
                    title={'Back to previous screen'}
                />
            </View>
        </View>
    );
};

const FreqOrderedModal = ({
    showModal,
    subTitle,
    setShowModal,
    title,
    onConfirm,
}) => {
    const [modalWidth] = useResponsiveDimensions({
        mobile: ['50%', '90%'],
        tab: ['40%', '60%'],
    });
    return (
        <>
            <ModalRoot
                showModal={showModal}
                setShowModal={setShowModal}
                width={modalWidth}
                content={
                    <FreqOrderedUI
                        title={title}
                        subTitle={subTitle}
                        setShowModal={setShowModal}
                        onConfirm={onConfirm}
                    />
                }
            />
        </>
    );
};

export default FreqOrderedModal;

FreqOrderedModal.defaultProps = {
    title: 'Reschedule call',
    subTitle: 'Are you sure you want to Reschedule your Call',
    onConfirm: () => {
        alert('please pass onConfirm function');
    },
};
