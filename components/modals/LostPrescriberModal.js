import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import ModalRoot from '../shared/modals/ModalRoot'
import { useSelector } from 'react-redux';
import ATD from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { FontFamily } from '../../assets/fonts/FontFamily';
import { Colors } from '../../assets/config/Colors';
import { useFocusEffect } from '@react-navigation/native';
const LostPrescriberModal = (props) => {
    let previousIndex = 0;
    // console.log('previousIndexxxx',previousIndex)
    const { isLandscape, } = useSelector(state => state.isLandscape);
    const [expandedNodes, setExpandedNodes] = useState([]);
    const toggleNode = (node, nodeId, index) => {
        if (node?.children?.length <= 0) {
            // props?.finalSelectionFunction(nodeId)
            return;
        }
        if (previousIndex !== index) {
            // props?.finalSelectionFunction(null)
            setExpandedNodes([nodeId]);
            previousIndex = index;
            return;
        }
        if (previousIndex === index) {
            if (expandedNodes.includes(nodeId)) {
                setExpandedNodes(expandedNodes.filter(id => id !== nodeId));
            } else {
                setExpandedNodes([...expandedNodes, nodeId]);
            }
        }

    };


    const handleFunction = (node) => {
        props?.handlePress(node)
        props?.setShowModal(false);
    }

    const RenderFunction = (node, index) => {
        const isExpanded = expandedNodes.includes(node?.position_id);

        return (
            <>
                <View style={{ ...styles.margin_item }}>
                    <View style={{ ...styles.icon_text_view }} >
                        {node?.children?.length > 0 &&
                            <TouchableOpacity onPress={() => toggleNode(node, node?.position_id, index)}>
                                <ATD
                                    name={isExpanded ? "minuscircle" : "pluscircle"}
                                    size={18}
                                    color={isExpanded ? Colors.MRGREEN : '#0178BD'}
                                />
                            </TouchableOpacity>
                        }
                        <TouchableOpacity onPress={() => handleFunction(node)}>
                            <Text style={{ ...styles.name_text, color: node?.children?.length <= 0 ? Colors.MRGREEN : 'black', fontFamily: FontFamily.TTCommonsMedium, }}>{`${node?.EmployeeName}-${node?.position_name}`}</Text>
                        </TouchableOpacity>
                    </View>
                    {isExpanded && node?.children && node?.children?.length > 0 && (
                        <View style={{ ...styles.marSlider }}>
                            {node.children.map((child) => RenderFunction(child, index))}
                        </View>
                    )}
                </View>
            </>
        );
    };

    const handleCross = () => {
        props?.setShowModal(false);
        setExpandedNodes([]);
        // setData({})
        previousIndex = null
    }

    useFocusEffect(useCallback(() => {
        if (props.DATA && props.DATA.length > 0) {
            setExpandedNodes([props.DATA[0].position_id])
            //    console.log('data_props_DATA',props.DATA[0].position_id)
        }
    }, [props?.DATA]))

    return (
        <ModalRoot
            width={isLandscape ? '28%' : '70%'}
            padding={15}
            height={360}
            showModal={props?.showModal}
            setShowModal={props?.setShowModal}
            content={
                <View style={{ ...styles.container }}>
                    <View style={{ ...styles.title_view }}>
                        <Text style={{ ...styles.title_text, fontFamily: FontFamily.TTCommonsBold, }}> {props?.title} </Text>
                        <TouchableOpacity onPress={() => { handleCross() }}>
                            <Entypo
                                name={'cross'}
                                size={20}
                                color={'black'}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ ...styles.container_render_fun }}>
                        <ScrollView>
                            {props?.DATA.map((node, index) => {
                                return (
                                    <>
                                        <View style={{ ...styles.line }} />
                                        {RenderFunction(node, index)}
                                    </>
                                )
                            })}
                        </ScrollView>
                    </View>
                </View>
            }
        />
    )
}

export default LostPrescriberModal



const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    title_view: { flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center' },
    title_text: { color: 'black', fontSize: 16, marginBottom: 5 },
    container_render_fun: { width: '100%', maxHeight: 300 },
    line: { width: '100%', height: 1.5, backgroundColor: '#e2e2e2', alignSelf: 'center', marginVertical: 2 },
    margin_item: { marginVertical: 5 },
    icon_text_view: { flexDirection: 'row', alignItems: 'center',flexWrap:'wrap' },
    name_text: { fontSize: 16, marginLeft: 5, },
    marSlider: { marginLeft: 20 },

})

LostPrescriberModal.defaultProps = {
    DATA: [
        {
            "position_id": 1777,
            "position_code": "200253",
            "position_name": "Vijayawada",
            "cav_positions_down": "4749,4746,4747,4748",
            "children": [
                {
                    "position_id": 4749,
                    "position_code": "110273",
                    "position_name": "Nellore",
                    "cav_positions_down": "",
                    "children": []
                },
                {
                    "position_id": 4746,
                    "position_code": "100886",
                    "position_name": "Guntur",
                    "cav_positions_down": "",
                    "children": []
                },
                {
                    "position_id": 4747,
                    "position_code": "100884",
                    "position_name": "VIJAYAWADA 1",
                    "cav_positions_down": "",
                    "children": []
                },
                {
                    "position_id": 4748,
                    "position_code": "109474",
                    "position_name": "Vijayawada 2",
                    "cav_positions_down": "",
                    "children": []
                }
            ]
        }
    ],
    title: 'Positions',
    // finalSelectionFunction:()=>{}
    handlePress: () => { }


}

// ------------usage---------------
// const [openLostPrescriberModal, setOpenLostPrescriberModal] = useState(false)
//<ButtonRoot onPress={() => {setOpenLostPrescriberModal(true) }}   color={'#fff'} width={'99%'} />
//<LostPrescriberModal finalSelectionFunction={(i)=>{alert(i)}} setShowModal={setOpenLostPrescriberModal}  showModal={openLostPrescriberModal} /> 