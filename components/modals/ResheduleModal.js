import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import SkipVisit from './SkipVisit'

const ResheduleModal = (props) => {
    return (
        <View>
            <SkipVisit
                showDateTime
                ResheduleCancelBtn
                firstHeadingText="Reshedule call"
                thirdHeadingText=""
                showModal={props.showModal} setShowModal={props.setShowModal}
            />
        </View>
    )
}

export default ResheduleModal

const styles = StyleSheet.create({})