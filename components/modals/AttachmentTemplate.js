import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ModalRoot from '../shared/modals/ModalRoot'
import { ImagesAssets } from '../shared/ImagesAssets'
import useResponsiveDimensions from '../../hooks/useResponsiveDimensions'
import { useSelector } from 'react-redux';

const AttachmentTemplate = (props) => {
    const { isLandscape, isMobile } = useSelector(state => state.isLandscape);
    const [AttachmentModalWidth] = useResponsiveDimensions({
        mobile: ['40%', '90%'],
        
        tab: ['60%', '70%'],
    });
    const [AttachmentModalHeight] = useResponsiveDimensions({
        mobile: ['95%', '50%'],
        tab: ['80%', '60%'],
    });



    const SelectAttachment = () => {
        return (
            <View style={{ ...styles.container }}>
                <Image
                    resizeMode="contain"
                    style={{ ...styles.img_style }}
                    source={ImagesAssets.Form_img}
                />
            </View>
        )
    }


    return (
        <ModalRoot
            width={AttachmentModalWidth}
            height={AttachmentModalHeight}
            padding={1}
            borderRadius={0}
            showModal={props.showModal}
            setShowModal={props.setShowModal}
            content={<SelectAttachment />}
        />
    )
}

export default AttachmentTemplate

const styles = StyleSheet.create({
    container: {
        width: '100%',/* backgroundColor:'yellow', */justifyContent: 'center', alignItems: 'center'
    },
    img_style: {
        height: '100%', width: '100%',/* backgroundColor:'red' */
    }

})