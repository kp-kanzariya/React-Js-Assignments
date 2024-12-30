
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import {
    VictoryBar,
    VictoryChart,
    VictoryTheme,
    VictoryGroup,
} from 'victory-native';
import { Colors } from '../../../../assets/config/Colors';
import { FontFamily } from '../../../../assets/fonts/FontFamily';
import { useSelector } from 'react-redux';
import moment from 'moment';
import SgpiOutSummaryDAO from '../../../../Database/DAO/SgpiOutSummaryDAO';
import { getData } from '../../../../api/Request';
import { API } from '../../../../api/API';
import { StoreDatatoAsync } from '../../../../helper/utils/AsyncStorageServices';

export default function SampleVsInputChart(props) {
    const { isLandscape } = useSelector(state => state.isLandscape);
    const { network } = useSelector(state => state.network);
    const { width } = Dimensions.get('window');
    const [actualData, setActualData] = React.useState([]);
    const [allSGPITypes, setAllSGPITypes] = React.useState([]);

    React.useEffect(() => {
        async function temp() {

            if (network) {
                let res = await getData({ url: API.appFirstStart })
                if (res.statusCode == 200) {
                    setAllSGPITypes(Object.keys(res?.data?.SgpiType))
                    await StoreDatatoAsync('@sgpiTypes', res?.data?.SgpiType);
                    return Object.keys(res?.data?.SgpiType)
                }
            } else {
                let sgpi = await getDatafromAsync('@sgpiTypes');
                setAllSGPITypes(sgpi);
                return sgpi
            }

        }
        temp().then((sgpiTypeArr) => {
            const threeMonthsAgo = moment().subtract(2, 'months').startOf('month').format('MM-YYYY');
            const twoMonthsAgo = moment().subtract(1, 'months').startOf('month').format('MM-YYYY');
            const currentMonth = moment().startOf('month').format('MM-YYYY');
            let objThirdMonth = {}
            let objSecondMonth = {}
            let objLatestMonth = {}
            let arr = []
            async function tempInside() {

                let thirdMonth = await SgpiOutSummaryDAO.getSampleVsInput({ threeMonthsAgo, outletOrgId: props.outletOrgId })
                let secondMonth = await SgpiOutSummaryDAO.getSampleVsInput({ twoMonthsAgo, outletOrgId: props.outletOrgId })
                let latestMonth = await SgpiOutSummaryDAO.getSampleVsInput({ currentMonth, outletOrgId: props.outletOrgId })


                // Third Month Start 
                thirdMonth.forEach(item => {
                    objThirdMonth["month"] = moment().subtract(2, 'months').startOf('month').format('MM-YYYY')
                    objThirdMonth[item?.SgpiType] = item.Qty
                })
                // Third Month End

                // Second Month Start 
                secondMonth.forEach(item => {
                    objSecondMonth["month"] = moment().subtract(1, 'months').startOf('month').format('MM-YYYY')
                    objSecondMonth[item?.SgpiType] = item.Qty
                })
                // Second Month End

                // Latest Month Start 
                latestMonth.forEach(item => {
                    objLatestMonth["month"] = moment().startOf('month').format('MMM')
                    objLatestMonth[item?.SgpiType] = item.Qty
                })
                if (Object.keys(objThirdMonth).length > 0) {
                    arr.push(objThirdMonth)
                }
                if (Object.keys(objSecondMonth).length > 0) {
                    arr.push(objSecondMonth)
                }
                if (Object.keys(objLatestMonth).length > 0) {
                    arr.push(objLatestMonth)
                }

                //Check if key exist or not object
                sgpiTypeArr.forEach(type => {
                    arr.forEach(eachItem => {
                        if (!eachItem.hasOwnProperty(type)) {
                            // Add 'age' key with a default value of 0
                            eachItem[type] = 0;
                        }
                    })
                });
                setActualData(arr);
            }

            tempInside()
        })
    }, [])

    return (
        <View style={{ ...styles.container }}>
            {
                (
                    <>
                        {
                            actualData.length > 0 ?
                                (<>
                                    <VictoryChart
                                        width={isLandscape ? 450 : width * 0.9}
                                        height={props.height}
                                        theme={VictoryTheme.material}>
                                        <VictoryGroup offset={35} colorScale={'qualitative'}>
                                            {actualData.length > 0 &&
                                                Object.keys(actualData[0])
                                                    .filter(key => key !== "month")
                                                    .map((key, i) => (
                                                        <VictoryBar key={i} data={actualData} x="month" y={key}
                                                            barWidth={25}
                                                            // labels={({ datum }) => datum._y > 0 ? datum._y : null}
                                                            labels={({ datum }) => datum._y > 999 ? `${parseFloat(datum._y / 1000).toFixed(2)}k` : datum._y > 9999 ? `${parseFloat(datum._y / 1000).toFixed(2)}k` : datum._y}
                                                            style={{ data: { fill: key == 'samples' ? '#34ACD3' : (key == 'gifts' ? '#50B030' : '#95afc0') } }}
                                                        />
                                                    ))}
                                        </VictoryGroup>
                                    </VictoryChart>

                                    <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', paddingVertical: 10 }}>


                                        {allSGPITypes.map((item) => {
                                            return (
                                                <>
                                                    <View
                                                        style={{
                                                            width: 12,
                                                            height: 12,
                                                            right: 4, backgroundColor: item == 'samples' ? '#34ACD3' : (item == 'gifts' ? '#50B030' : '#95afc0')
                                                        }}
                                                    />
                                                    <Text
                                                        style={{
                                                            color: item == 'samples' ? '#34ACD3' : (item == 'gifts' ? '#50B030' : '#95afc0'),
                                                            fontFamily: FontFamily.TTCommonsBold,
                                                        }}>
                                                        {item}
                                                    </Text>
                                                    <View style={{ paddingHorizontal: 7 }} />
                                                </>

                                            )
                                        })
                                        }

                                    </View>
                                </>

                                ) : (
                                    <>
                                        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, alignSelf: "center" }} ><Text style={{ fontFamily: FontFamily.TTCommonsMedium, color: 'black' }} >No sample and inputs Found</Text>
                                        </View>
                                    </>
                                )}
                    </>
                )
            }
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 12,
        borderColor: Colors.borderColor1,
        position: 'relative',
    },
    viewstyle: {
        width: 12,
        height: 12,
        backgroundColor: '',
        right: 4,
    },
});

SampleVsInputChart.defaultProps = {
    firstBarColor: '#34ACD3',
    secondBarColor: '#50B030',
    x: 'x',
    y: 'y',
    width: 450,
    height: 250,
    // offset: 35,
    firstTitle: 'Sample',
    secondTitle: 'Input',
    containerHeight: 290,
};