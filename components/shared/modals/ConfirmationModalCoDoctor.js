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
                    width={60}
                    color="#50b030"
                    height={35}
                    title={'Save'}
                />
                <ButtonRoot
                    onPress={onDiscard}
                    borderRadius={30}
                    width={60}
                    color={'white'}
                    textColor={'black'}
                    height={35}
                    title={'Discard'}
                    borderWidth={0}
                />
                <ButtonRoot
                    onPress={() => setShowModal(false)}
                    width={60}
                    borderRadius={30}
                    height={35}
                    color={'white'}
                    textColor={'black'}
                    title={'Cancel'}
                    borderWidth={0}
                />
            </View>
        </View>
    );
};

const ConfirmationModalCoDoctor = ({
    showModal,
    subTitle,
    setShowModal,
    title,
    onConfirm,
    onDiscard,
}) => {
    // console.log(showModal);
    const [modalWidth] = useResponsiveDimensions({
        mobile: ['60%', '90%'],
        tab: ['55%', '70%'],
    });
    return (
        <>
            <ModalRoot
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

export default ConfirmationModalCoDoctor;

ConfirmationModalCoDoctor.defaultProps = {
    title: 'Reschedule call',
    subTitle: 'Are you sure you want to Reschedule your Call',
    onConfirm: () => {
        alert('please pass onConfirm function');
    },
    onDiscard: () => {
        alert('please pass onDiscard function');
    },
};
