import React, { Component } from 'react';

import { View, Image } from 'react-native';
import { Provider } from 'react-redux';
import RootSiblings, { RootSiblingParent } from "react-native-root-siblings";

import AppContainer from './src/Resources/Components/NavigationHandler/MainNavigationHandler';
import { dimensions, OtherConstant, store } from './src/Resources/Constants';
import { getAssetByFilename, ImageSource } from './src/Resources/Images';


var sibling = new RootSiblings(
  (
    <View
      style={{
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: "red"
      }}
    />
  )
);


export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isSplashEnd: false
    };
    //Set variables in state to render values
  }

  showLoader() {
    //OtherConstant.showConsoleLog("hererer");
    OtherConstant.getMainAppThis().stopLoader();
    sibling = new RootSiblings(
      (
        <View style={styles.fullScreenSpinnerStyle}>
          <ActivityIndicator
            size={"large"}
            color={colors.primary}
          />
        </View>
      )
    );
  }

  stopLoader() {
    sibling.destroy();
  }

  componentDidMount() {
    OtherConstant.setMainAppThis(this);
    setTimeout(() => {
      this.setState({ isSplashEnd: true });
    }, 3000);

  }

  componentWillUnmount() {

  }

  splashView() {
    const { splashStyle } = styles;
    return (
      <View>
        <Image
          style={splashStyle}
          source={getAssetByFilename(ImageSource.splash)}
        />
      </View>
    );
  }

  render() {
    // To see all the requests in the chrome Dev tools in the network tab.

    if (!this.state.isSplashEnd) {
      return this.splashView();
    }
    return (
      <RootSiblingParent>
        <Provider store={store}>
          <AppContainer />
        </Provider>
      </RootSiblingParent>
    );
  }
}

const styles = {
  splashStyle: {
    resizeMode: 'cover',
    width: dimensions.width,
    height: dimensions.height
  },
  fullScreenSpinnerStyle: {
    backgroundColor: "rgba(52, 52, 52, 0.3)",
    position: "absolute",
    top: 0,
    left: 0,
    width: dimensions.width,
    height: dimensions.height,
    alignItems: "center",
    justifyContent: "center"
  }
};
