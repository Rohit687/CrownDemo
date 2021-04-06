import React from 'react';
import { Dimensions, View, Platform } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const colors = {
  primary: 'black',
  white: 'white',
  gray: 'gray'
};


export const noShadow = {
  shadowOpacity: 0,
  shadowRadius: 0,
  shadowOffset: {
    height: 0,
    width: 0
  },
  elevation: 0
};

export const headerRemoveShadow = {
  elevation: 0,       //add shadow for Android
  shadowOpacity: 0, //add shadow for iOS
  shadowOffset: { //add shadow for iOS
    height: 0,
    width: 0
  }, //add shadow for iOS
  borderBottomWidth: 0,
};

export const headerShadow = {
  elevation: 1,       //add shadow for Android
  shadowColor: '#bbbbbb', //add shadow for iOS
  shadowOpacity: 0.2, //add shadow for iOS
  shadowOffset: { //add shadow for iOS
    height: 5, //add shadow for iOS
  }, //add shadow for iOS
  shadowRadius: 3, //add shadow for iOS
};

export const defaultNavigationOptions = {
  // headerTransparent: true,
  headerTitleAlign: 'center',
  headerTitleStyle: {
    ...Platform.select({
      ios: { fontFamily: 'Arial', },
      android: { fontFamily: 'Roboto' },
    }),
    fontSize: 18,
    color: colors.primary,
  },
  headerStyle: [{
    backgroundColor: colors.white
  }],
  // gestureEnabled: false,
};

export const basicStyle = {
  paddingH: 20,
  innerPadding: 15,
  separator: 10,
}

export const dimensions = {
  height: Dimensions.get('window').height,
  width: Dimensions.get('window').width,
  aspectRatio: (Dimensions.get('window').width / 320)
};

export const statusBar = {
  dark: 'dark-content',
  light: 'light-content',
  default: 'default'
};

export const EmptyView = ({ height = 10, width = 0, backgroundColor = 'transparent', flex = null }) => {
  if (flex) {
    if (width == 0) {
      return <View style={{
        flex: 1,
        height: height,
        backgroundColor: backgroundColor
      }} />
    } else {
      return <View style={{
        flex: 1,
        width: width,
        backgroundColor: backgroundColor
      }} />
    }

  }
  return <View style={{
    height: height,
    width: width,
    backgroundColor: backgroundColor
  }} />
}
