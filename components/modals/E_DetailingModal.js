import React from 'react'
import { StyleSheet, View } from 'react-native'
import Select_Customer_Type_Model from '../doctor360/Select_Customer_Type_Model'
import { useNavigation } from '@react-navigation/native'
const E_DetailingModal = (props) => {
    const navigation = useNavigation();

    return (
        <>
            <Select_Customer_Type_Model
                firstBoxText="Rehearse Mode"
                secondBoxText="Detailing Mode"
                heading="Select Presentation Mode"
                firstIcon="play-speed"
                secondIcon="play-circle-outline"
                showModal={props.showModal} setShowModal={props.setShowModal}
                firstBoxOnPress={() => {
                    props.setShowModal(false)
                    navigation.push('EdetailingTask', { rehearse: true, data: props.data, navigateFrom: 'doctor' })
                }}
                secondBoxOnPress={() => {
                    props.setShowModal(false)
                    navigation.push('EdetailingTask', {
                        rehearse: false,
                        data: props.data,
                        navigateFrom: 'doctor'
                    })
                }}
            />
        </>
    )
}

export default E_DetailingModal

const styles = StyleSheet.create({})