import React from 'react'
import { StyleSheet, View } from 'react-native'
import SkipVisit from './SkipVisit'

const SkipVisitModal = (props) => {
  
    return (
        <View>
            <SkipVisit
                remark
                SubmitCancel
                skipHeading="Skip Visit"
                showModal={props.showModal} setShowModal={props.setShowModal}
            />
        </View>
    )
}

export default SkipVisitModal

const styles = StyleSheet.create({})