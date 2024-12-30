import { View, Text, StyleSheet, Dimensions, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FontFamily } from '../../../../assets/fonts/FontFamily';
import { FontSize } from '../../../../assets/fonts/Fonts';
import { Colors } from '../../../../assets/config/Colors';
import { MyThemeClass } from '../../Theme/ThemeDarkLightColor';
import { useSelector } from 'react-redux';
import {
    VictoryBar,
    VictoryChart,
    VictoryTheme,
    VictoryLabel,
    VictoryAxis,
    VictoryGroup,
    VictoryZoomContainer
} from 'victory-native';
import { Svg } from 'react-native-svg';
import { ScrollView } from 'react-native';

const { height } = Dimensions.get('screen');
const { width } = Dimensions.get('screen');

const data = [
    true,
]
function BeatWiseSalesList({ item, themecolor }) {
    return (
        <>
            {/* <View
                style={{
                   ...styles.beat_com_container,
                    alignSelf: item ? 'flex-start' : 'flex-end',
                }}>


                {
                    item ? (
                        <View>
                            <Text style={{ ...styles.FONTSETUP, color: '#34ACD3', }}>Distributed</Text>
                        </View>
                    ) : (
                        <View>
                            <Text style={{ ...styles.FONTSETUP, color: '#F45831', }}>Missed</Text>
                        </View>)
                }

                <View
                    style={{
                        width: 22,
                        backgroundColor: '#34ACD3',
                        borderBottomWidth: 1,
                        height: item ? 140 : 0,
                    }}
                />


                <View style={{ marginTop: 10 }}>
                    <View style={{ width: 60 }}>
                        <View style={{ alignSelf: 'center', justifyContent: 'center' }}>
                            <Text
                                style={{
                                    ...styles.FONTSETUP,
                                    fontSize: 9,
                                    color: Colors.black,
                                    textAlign: 'center',
                                }}>
                                9 Jun
                            </Text>
                        </View>
                    </View>
                </View>

            </View> */}

        </>
    );
}

export default function CompaignInputDistributionChart(props) {
    const mode = useSelector(state => state.mode);
    const themecolor = new MyThemeClass(mode).getThemeColor()
    const { isLandscape } = useSelector(state => state.isLandscape);

    return (
        <ScrollView horizontal>
        <View style={{ justifyContent: 'center', alignSelf: 'center', backgroundColor: '#ffffff' }}>
            <Svg viewBox={"0 0 width, height"} preserveAspectRatio="none" width="100%">
              

               <VictoryChart 
                    // width={isLandscape ? width * 0.5 : width}
                    height={220}
                    responsive={true}


                  
                    domainPadding={{ x: 20 }}
                    theme={VictoryTheme.material}
                   
                >
                    <VictoryAxis />
                    <VictoryBar
                        barRatio={0}
                        cornerRadius={0} // Having this be a non-zero number looks good when it isn't transitioning, but looks like garbage when it is....
                        style={{ data: { fill: Colors.MRTAG }, labels: { fill: Colors.MRTAG } }}
                        alignment="middle"
                        labels={["Distributed", "Missed", "Missed", "Distributed", "Distributed", "Distributed"]}
                        data={[

                            { x: "Jan 1", y: 650000, },
                            { x: "Feb 2", y: 150000 },
                            { x: "March 3", y: 100020 },
                            { x: "April 4", y: 750000 },
                            { x: "June 5", y: 840000 },
                            { x: "June 7", y: 800000 },
                            { x: "June 8", y: 960000 },
                            { x: "June 10", y: 120000 },
                            { x: "June 18", y: 100000 },
                            { x: "June 13", y: 90000 },
                            { x: "June 24", y: 50000 },
                            { x: "July 24", y: 20000 },
                            { x: "July 1", y: 1000 },
                            { x: "July 4", y: 50000 },
                            { x: "Aug 2", y: 50000 },
                            { x: "Aug 14", y: 50000 },
                            { x: "Sep 4", y: 50000 },
                            { x: "Sep 24", y: 50000 },
                            { x: "Oct 4", y: 50000 },
                            { x: "Oct 13", y: 50000 },
                            { x: "OC 24", y: 50000 },
                        ]}
                    />
                </VictoryChart>
          
            </Svg>
        </View>
        </ScrollView>
    )
}

CompaignInputDistributionChart.defaultProps = {
    data: data
}


const styles = StyleSheet.create({
    FONTSETUP: { fontSize: 10, fontFamily: FontFamily.TTCommonsMedium },
    FLMainView: {
        borderWidth: 1,
        borderRadius: 8,
        width: '100%'
    },
    PV5: { paddingVertical: 5 },


    beat_com_container: {
        alignItems: 'center',
        right: 15,

    }

});