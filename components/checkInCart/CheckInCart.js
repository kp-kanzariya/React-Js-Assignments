import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { FontFamily } from '../../assets/fonts/FontFamily'
import ButtonRoot from '../shared/buttons/ButtonRoot'
const CheckInCart = (props) => {
    return (
        <View style={{...styles.container,backgroundColor:props.backgroundColor}
        }
        >
            <View style={{
                ...styles.img_container
            }}>
                <Image
                    resizeMode='contain'
                    style={styles.img_size}
                    source={require('../../assets/alembicimages/store.png')}
                />
            </View>
            <View style={styles.text_container}>
                <View >
                    <Text style={{ ...styles.text }}>
                        {/* {props.txt} */}Are you ready to meet the Outlet?
                        </Text>
                </View>

                <View style={styles.Button}>
                    <ButtonRoot width="100%" height={30} borderRadius={15} color='#50b030' title="Check In" fontSize={12} />
                </View>
            </View>
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        width:'45%',
        
        borderRadius: 10, 
        flexDirection: 'row',
        paddingHorizontal: 12,
        paddingVertical: 8
    },
    img_container: {
        width: '35%',   
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },
    img_size: {
        width: 80, height: 110
    },
    text_container: {
        justifyContent: 'center',
        flexWrap: 'wrap', 
        width: '65%',
        padding: 10

    },
    text: {
        fontFamily: FontFamily.TTCommonsBold,
        color: '#000',
        fontSize: 14
    },
    Button:{
        alignSelf: 'flex-start', 
        width: "50%", 
        marginTop: 5
    }

})


export default CheckInCart
CheckInCart.defaultProps={
backgroundColor:'#e6f1e2',

}