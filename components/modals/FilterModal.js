import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import ModalRoot from '../shared/modals/ModalRoot';
import { Checkbox } from 'react-native-paper';
import { FontFamily } from '../../assets/fonts/FontFamily';
import ButtonRoot from '../shared/buttons/ButtonRoot';
import { useSelector } from 'react-redux';
import { store } from '../../redux/store';
import { Colors } from '../../assets/config/Colors';
import isLandscape from '../../redux/reducers/orientation';

function CheckBoxRenderFunction({ item, index, customerFiterKeys }) {

  const handleChecked = item => {
    if (customerFiterKeys.includes(`${item?.Classification_Id}`)) {
      //   delete g[item.id];
      store.dispatch({
        type: 'REMOVE_CUSTOMER_CLASSIFICATION',
        payload: item?.Classification_Id,
      });
    } else {
      store.dispatch({
        type: 'ADD_CUSTOMER_CLASSIFICATION',
        payload: [item?.Classification_Id, item],
      });
      //   s(prev=>({...prev,[item.id]:item}))
    }
  };

  return (
    <View key={index} style={{ ...styles.mapContainer }}>
      <View>
        <Checkbox.Android
          color="#34acd3"
          // label={item.label}
          status={
            customerFiterKeys.includes(`${item?.Classification_Id}`)
              ? 'checked'
              : 'unchecked'
          }
          onPress={() => handleChecked(item)}
        />
      </View>
      <View>
        <Text style={{ ...styles.labelText, fontSize: 13 }}>
          {item?.Classification}
        </Text>
      </View>
    </View>
  );
}


function CheckBoxRenderFunctionPatch({ item, index, customerFiterKeys }) {
  const [g, s] = React.useState({});

  const handleChecked = item => {
    if (customerFiterKeys.includes(`${item?.BeatId}`)) {
      //   delete g[item.id];
      store.dispatch({
        type: 'REMOVE_CUSTOMER_PATCHES',
        payload: item?.BeatId,
      });
    } else {
      store.dispatch({
        type: 'ADD_CUSTOMER_PATCHES',
        payload: [item?.BeatId, item],
      });
      //   s(prev=>({...prev,[item.id]:item}))
    }
  };
  // console.log("item patch...",item)

  return (
    <View key={index} style={{ ...styles.mapContainer }}>
      <View>
        <Checkbox.Android
          color="#34acd3"
          // label={item.label}
          status={
            customerFiterKeys.includes(`${item?.BeatId}`)
              ? 'checked'
              : 'unchecked'

          }
          onPress={() => handleChecked(item)}
        />
      </View>
      <View>
        <Text style={{ ...styles.labelText, fontSize: 13 }}>
          {item?.BeatName}
        </Text>
      </View>
    </View>
  );
}

function CheckBoxRenderFunctionType({ item, index, customerFiterKeys }) {
  const [g, s] = React.useState({});

  const handleChecked = item => {
    if (customerFiterKeys.includes(`${item?.OutlettypeId}`)) {
      //   delete g[item.id];
      store.dispatch({
        type: 'REMOVE_CUSTOMER_TYPES',
        payload: item?.OutlettypeId,
      });
    } else {
      store.dispatch({
        type: 'ADD_CUSTOMER_TYPES',
        payload: [item?.OutlettypeId, item],

      });
      //   s(prev=>({...prev,[item.id]:item}))
    }
  };

  // console.log("item patch...", item)

  return (
    <View key={index} style={{ ...styles.mapContainer }}>
      <View>
        <Checkbox.Android
          color="#34acd3"
          // label={item.label}
          status={
            customerFiterKeys.includes(`${item?.OutlettypeId}`)
              ? 'checked'
              : 'unchecked'

          }
          onPress={() => handleChecked(item)}
        />
      </View>
      <View>
        <Text style={{ ...styles.labelText, fontSize: 13 }}>
          {item?.OutlettypeName}
        </Text>
      </View>
    </View>
  );
}

function CheckBoxRenderFunctionTags({ item, index, customerFiterKeys }) {
  const [g, s] = React.useState({});

  // const handleChecked = item => {
  //   if (customerFiterKeys.includes(`${item.Classification_Id}`)) {
  //     //   delete g[item.id];
  //     store.dispatch({
  //       type: 'REMOVE_CUSTOMER_CLASSIFICATION',
  //       payload: item.Classification_Id,
  //     });
  //   } else {
  //     store.dispatch({
  //       type: 'ADD_CUSTOMER_CLASSIFICATION',
  //       payload: [item.Classification_Id, item],
  //     });
  //     //   s(prev=>({...prev,[item.id]:item}))
  //   }
  // };
  // console.log("item patch...", item)

  return (
    <View key={index} style={{ ...styles.mapContainer }}>
      <View>
        <Checkbox.Android
          color="#34acd3"
          // label={item.label}
          status={
            customerFiterKeys.includes(`${item?.OutletTagId}`)
              ? 'checked'
              : 'unchecked'

          }
          onPress={() => handleChecked(item)}
        />
      </View>
      <View>
        <Text style={{ ...styles.labelText, fontSize: 13 }}>
          {item?.TagName}
        </Text>
      </View>
    </View>
  );
}

function FilterPopComp({ data, showModal, setShowModal, handleSubmitOnFilter, patchData, typeData, tagsData }) {
  const { customerFilter } = useSelector(state => state.customers);
  const { customerFilterType } = useSelector(state => state.customers);
  const { customerFilterPatch } = useSelector(state => state.customers);
  const customerFiterKeys = Object.keys(customerFilter);
  const customerTypeKeys = Object.keys(customerFilterType);
  const customerFiterPatchKeys = Object.keys(customerFilterPatch);
  var allFilterVal = [...customerFiterKeys, ...customerTypeKeys, ...customerFiterPatchKeys]
  // console.log("customerFiterKeys==",customerFiterKeys)

  const handleSubmit = () => {
    setShowModal(false);
    handleSubmitOnFilter();
  };

  return (
    <>
      <View
        style={{
          width: '100%',
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{ ...styles.heading }}>Filter By</Text>
      </View>
      <View
        style={{
          borderBottomWidth: 0.5,
          borderBottomColor: Colors.borderColor1,
          width: '100%',
          paddingVertical: 3,
        }}
      />
      <View style={{ marginVertical: 5 }} />
      <View style={{ width: '100%', flex: 1 }}>
        <View style={{ width: '100%', flex: 1 }}>
          <ScrollView contentInsetAdjustmentBehavior={'automatic'}>
            <ScrollView contentInsetAdjustmentBehavior={'automatic'}
              horizontal={true}
              nestedScrollEnabled={true}
            >

              {/* Type Filter Start */}
              <View>

                <View style={{ backgroundColor: Colors.MRTAG, borderRadius: 20 }}>
                  <Text style={{
                    fontFamily: FontFamily.TTCommonsBold,
                    color: '#FFF', left: 12,
                    paddingVertical: 3

                  }}>Type</Text>
                </View>
                {typeData.map((item, index) => {
                  return (
                    <View style={{}}>
                      <CheckBoxRenderFunctionType
                        item={item}
                        index={index}
                        customerFiterKeys={customerTypeKeys}
                      />
                    </View>
                  );
                })}

              </View>
              <View style={{ paddingHorizontal: 10 }} />

              {/* Type Filter End */}

              <View style={{ flexDirection: 'row' }}>

                {/* Speciality Filter Start */}

                <View>
                  <View style={{ backgroundColor: Colors.MRTAG, borderRadius: 20 }}>
                    <Text style={{
                      fontFamily: FontFamily.TTCommonsBold,
                      color: '#FFF', left: 12,
                      paddingVertical: 3

                    }}>Speciality</Text>
                  </View>

                  {data.map((item, index) => {
                    return (
                      <View style={{}}>
                        <CheckBoxRenderFunction
                          item={item}
                          index={index}
                          customerFiterKeys={customerFiterKeys}
                        />
                      </View>
                    );
                  })}
                </View>
                {/* Speciality Filter Start */}
                <View style={{ paddingHorizontal: 10 }} />


                {/* Patch Filter Start */}
                <View>
                  <View style={{ backgroundColor: Colors.MRTAG, borderRadius: 20 }}>

                    <Text style={{
                      fontFamily: FontFamily.TTCommonsBold,
                      color: '#FFF', left: 12,
                      paddingVertical: 3

                    }}>Patch</Text>
                  </View>
                  {patchData.map((item, index) => {
                    return (
                      <View style={{}}>
                        <CheckBoxRenderFunctionPatch
                          item={item}
                          index={index}
                          customerFiterKeys={customerFiterPatchKeys}
                        />
                      </View>
                    );
                  })}
                </View>
                {/* Patch Filter Start */}

                {/* Tags Filter Start */}
                {/* <View>
                <View style={{backgroundColor:Colors.MRTAG,borderRadius:20}}>

                <Text style={{
                  fontFamily: FontFamily.TTCommonsBold,
                  color: '#FFF', left: 12
                }}>Tags</Text>
                </View>
                {tagsData.map((item, index) => {
                  return (
                    <View style={{}}>
                      <CheckBoxRenderFunctionTags
                        item={item}
                        index={index}
                        customerFiterKeys={customerFiterKeys}
                      />
                    </View>
                  );
                })}
              </View> */}

                {/* Tags Filter End */}

              </View>

            </ScrollView>
          </ScrollView>
        </View>
      </View>
      <View style={{ ...styles.btnCont }}>
        <View>
          <ButtonRoot
            borderRadius={10}
            fontSize={isLandscape ? 16 : 13}
            color="#50b030"
            isdisable={allFilterVal?.length > 0 ? false : true}
            title="Apply"
            width={80}
            height={42}
            onPress={() => handleSubmit()}
          />
        </View>

        <View style={{ marginLeft: 10 }}>
          <Text
            style={{
              fontSize: 14,
              fontFamily: FontFamily.TTCommonsMedium,
              color: Colors.black,
            }}
            onPress={() => setShowModal(false)}
          // style={{...styles.noBtn}}
          >
            Cancel
          </Text>
        </View>
      </View>
    </>
  );
}

const FilterModal = props => {
  const { isLandscape } = useSelector(state => state.isLandscape);

  return (
    <>
      <ModalRoot
        width={isLandscape ? '40%' : 360}
        padding={15}
        height={360}
        showModal={props.showModal}
        setShowModal={props.setShowModal}
        content={
          <>
            <FilterPopComp
              data={props.data}
              patchData={props.patchData}
              typeData={props.typeData}
              tagsData={props.tagsData}
              showModal={props.showModal}
              setShowModal={props.setShowModal}
              handleSubmitOnFilter={props.handleSubmitOnFilter}
            />
          </>
        }
      />
    </>
  );
};

export default FilterModal;

const styles = StyleSheet.create({
  btnCont: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginLeft: 10,
  },
  noBtn: {
    color: '#a7a7a7',
    fontFamily: FontFamily.TTCommonsMedium,
  },

  container: {
    width: '100%',
    /*  backgroundColor: '#fff', */ flexDirection: 'row',
  },
  heading: {
    fontFamily: FontFamily.TTCommonsBold,
    color: '#000',
    fontSize: 18,
  },
  mapContainer: {
    width: '100%',
    /* backgroundColor: '#e3e3e3', */ flexDirection: 'row',
    alignItems: 'center',
  },
  labelText: {
    fontFamily: FontFamily.TTCommonsMedium,
    color: '#000',
    fontSize: 12,
  },
});
