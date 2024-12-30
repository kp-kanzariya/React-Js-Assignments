import { StyleSheet, Image, View, Dimensions, Appearance } from 'react-native'
import React from 'react';
import { ImagesAssets } from './ImagesAssets';

let Brandlogo = (props) => {
    const styles = StyleSheet.create({
        brandimg: {
            width: props.width,
            height: props.height,
            resizeMode: 'contain',
            alignSelf: 'center',
        }
    })
    return (
        <View>
            <Image
                style={styles.brandimg}
                source={
                    ImagesAssets.BrandlogoTSPHARMA
                }
            />
        </View>
    )
}

export default Brandlogo;

Brandlogo.defaultProps = ({
    height: 80,
    width: '100%'
})