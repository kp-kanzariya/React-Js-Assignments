import { useColorScheme } from 'react-native'
import React from 'react'
import { store } from '../../../redux/store';

const darkTheme = {
    background: "#1A1A1A",
    foreground: "#FAFAFA"
  };
  
  const lightTheme = {
    background: "#FAFAFA",
    foreground: "#1A1A1A",
  };

export default function Theme() {
   const colorScheme = useColorScheme();
   
   React.useEffect(()=>{
     store.dispatch({type:'THEME_CHANGE',payload:colorScheme})
    },[colorScheme]);

  return (
   null   
  )
}

export{darkTheme,lightTheme}