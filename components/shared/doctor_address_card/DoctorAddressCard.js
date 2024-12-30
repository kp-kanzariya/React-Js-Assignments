import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import FA from 'react-native-vector-icons/MaterialIcons';
import { FontFamily } from '../../../assets/fonts/FontFamily';
import { Colors } from '../../../assets/config/Colors';
const RenderItem = ({ item }) => {
  return (
    <View style={{ ...styles.render_itm_cont, width: '100%' }}>
      <View style={{ paddingHorizontal: 10, paddingVertical: 5, top: 6 }}>
        <View style={{ ...styles.render_itm_txt_view, }}>
          <FA name='location-on' size={16} color={Colors.MRGREEN} />
          <Text style={{ ...styles.text }}>{item.AddressName}</Text>
        </View>

        <View style={{ ...styles.address_view, width: '100%' }}>
          <Text numberOfLines={2} ellipsizeMode="tail" style={{ ...styles.address_text, width: '100%', paddingHorizontal: 5 }}>
            {item.OutletAddress != null ? item.OutletAddress : ''}{' '}
            {item.OutletCity != null ? item.OutletCity : ''}
            {item.OutletState != null ? `,${item.OutletState}` : ''}
            {item.OutletPincode != null ? `,${item.OutletPincode}` : ''}
          </Text>
        </View>
      </View>
    </View>)
};

const data = [
  { id: 1, text: 'Clinic address', address: '101,Shitalnath,Vikas Gruh Rd,Paldi,Ahemdabad' },
  { id: 2, text: 'Hospital address', address: 'Bodyline Hospital,Dev Status,Paldi,Ahemdabad' },
  { id: 3, text: 'Residential address', address: 'B1,Opera House,shangiram apartment,Ahemdabad' },
]

const DoctorAddressCard = (props) => {
  return (
    <View style={{ ...styles.container, width: '100%', height: props.Height }}>
      <FlatList
        data={props.data}
        renderItem={({ item }) =>
          <>
            <RenderItem item={item} />
          </>
        }
        nestedScrollEnabled
        keyExtractor={item => item.id} />
    </View>
  )
}

export default DoctorAddressCard

DoctorAddressCard.defaultProps = {
  data: []
}

const styles = StyleSheet.create({
  container: {

    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e2e2e2',
    overflow: 'hidden',
    height: 135,
  },
  text: {
    fontSize: 14,
    fontFamily: FontFamily.TTCommonsMedium,
    color: Colors.MRGREEN
  },
  address_view: {
    flexDirection: 'column',
    marginLeft: 10,

  },
  address_text: {
    fontSize: 12,
    fontFamily: FontFamily.TTCommonsMedium,
    color: 'black',
  },

  render_itm_cont: {
    width: '100%', flex: 1, margin: 3, paddingHorizontal: 1
  },
  render_itm_txt_view: {
    flexDirection: 'row', alignItems: 'center', width: '100%'
  }

})