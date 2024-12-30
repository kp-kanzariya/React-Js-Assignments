import React, {useState} from 'react';
import {StyleSheet, View, Dimensions, TouchableOpacity} from 'react-native';
import MIcon from 'react-native-vector-icons/MaterialIcons';



const {width, height} = Dimensions.get('window');

const ListGridView = props => {
  const [sqrView, setSqrView] = useState(true);
  const [listView, setListView] = useState(false);

  const handleSqrDot = () => {
    setSqrView(true);
    setListView(false);
    props.setColumns(3);
  };
  const handleSqlList = () => {
    setSqrView(false);
    setListView(true);
    props.setColumns(1);
  };

  return (
    <>



      <View style={styles.maincontainer}>
        <View style={styles.subContainer}>
          <View style={styles.thirdContainer}>
            <TouchableOpacity onPress={() => handleSqrDot()}>
              <View
                style={{
                  ...styles.iconView,
                  backgroundColor: sqrView ? '#42b1d6' : '#e2e2e2',
                }}>
                <MIcon
                  name="grid-view"
                  style={{
                    ...styles.iconCss,
                    color: sqrView ? '#ffffff' : '#7f8c8d',
                  }}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleSqlList()}>
              <View
                style={{
                  ...styles.listViewCss,
                  backgroundColor: listView ? '#42b1d6' : '#e2e2e2',
                }}>
                <MIcon
                  name="list"
                  style={{
                    ...styles.secondIconCss,
                    color: listView ? '#ffffff' : '#7f8c8d',
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

ListGridView.defaultProps = {
  setColumns: 3,
};

export default ListGridView;

const styles = StyleSheet.create({
  maincontainer: {
    flexDirection: 'row',
  },
  subContainer: {
    width: width * 0.84,
    height: height * 0.15,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  thirdContainer: {
    width: width * 0.05,
    height: height * 0.07,
    backgroundColor: '#e2e2e2',
    borderRadius: 15,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: width * 0.01,
  },
  iconView: {
    width: width * 0.03,
    height: height * 0.07,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: width * 0.01,
  },
  iconCss: {
    fontSize: 16,
    alignItems: 'center',
    fontWeight: 'bolder',
    borderRadius: 5,
  },
  listViewCss: {
    width: width * 0.03,
    height: height * 0.07,

    borderTopEndRadius: 15,
    borderBottomRightRadius: 15,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: width * 0.01,
  },
  secondIconCss: {
    fontSize: 20,
    alignItems: 'center',
    fontWeight: 'bolder',
    borderRadius: 5,
  },
});
