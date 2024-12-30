import { FC } from "react";
import { StyleSheet, Text } from "react-native";
import { View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome'; // Importing icon library


interface NoDataAvailableProps {
  text?:string;
  iconSize?:number;
  backgroundColor?:string;
  iconColor?:string;
  textColor?:string;  
  height?:number 

}


const NoDataAvailable:FC<NoDataAvailableProps> = ({
  text = 'No data available',
  iconSize = 50 ,
  backgroundColor ='#F5F5DC',
  iconColor = '#FF6347',
  textColor = '#721c24' ,
  height = 200 
}) => {
    return (
      <View style={{...styles.noDataContainer,backgroundColor,height}}>
        <Icon name="exclamation-triangle" size={iconSize} color={iconColor} />
        <Text style={{...styles.noDataText,color:textColor}}>{text}</Text>
      </View>
    );
  };

  export default NoDataAvailable

  const styles = StyleSheet.create({
    // Styles for the no data message with an icon
    noDataContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      borderRadius: 10,
      width: '100%',
    },
    noDataText: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop: 10, // Space between icon and text
    }
  });