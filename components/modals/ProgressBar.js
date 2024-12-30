import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ModalRoot from '../shared/modals/ModalRoot'
import Entypo from 'react-native-vector-icons/Entypo';
import Spacer from '../shared/spacers/Spacer';
import ProgressCircle from 'react-native-progress-circle'
const ProgressBar = (props) => {
    return (
        <ModalRoot width={250} showModal={props.openModal} setShowModal={props.setOpenModal} content={
            <View style={{ width: 220, alignSelf: 'center', position: 'relative' }} >
                <TouchableOpacity onPress={() => props.setOpenModal(!props.openModal)}
                    style={{ position: 'absolute', top: -20, right: -5, }}
                >
                    <Entypo name='circle-with-cross' size={25} />
                </TouchableOpacity>
                <Spacer />
                <View style={{alignItems:'center'}}>
                    <ProgressCircle
                        percent={30}
                        radius={50}
                        borderWidth={8}
                        color="#59ad6d"
                        shadowColor="#999"
                        bgColor="#fff"
                    >
                        <Text style={{ fontSize: 18 }}>{'30%'}</Text>
                    </ProgressCircle>
                </View>
            </View>
        } />
    )
}

export default ProgressBar

const styles = StyleSheet.create({})