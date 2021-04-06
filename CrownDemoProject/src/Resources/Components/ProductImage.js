import React, { Component } from 'react';
import { Image, ImageBackground } from 'react-native';

const ProductImage = (props) => (
  <ImageBackground

    style={[{
      backgroundColor: (props.backgroundColor != undefined ? props.backgroundColor : '#ffffff00'),
      borderRadius: (props.borderRadius != undefined ? props.borderRadius : 0),
      overflow: 'hidden',
      width: props.width,
      height: props.height,
      resizeMode: (props.resizeMode != undefined ? props.resizeMode : 'cover'),
    }, props.style]} source={props.placeholderIcon}
  >
    <Image
      style={{
        backgroundColor: '#ffffff00',
        width: props.width,
        height: props.height,
        resizeMode: (props.resizeMode != undefined ? props.resizeMode : 'contain'),
      }}
      source={{ uri: props.imageUrl }}
    />
  </ImageBackground>
);

class ProductOtherImage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      isError: false
    };
  }

  onLoadEnd() {
    this.setState({
      isLoaded: true
    });
  }

  onError() {
    this.setState({
      isError: true
    });
  }

  render() {
// OtherConstant.showConsoleLog('prodict image:', this.props);
    return (
      <ImageBackground
        style={[{
          backgroundColor: (this.props.backgroundColor != undefined ? this.props.backgroundColor : '#ffffff00'),
          borderRadius: (this.props.borderRadius != undefined ? this.props.borderRadius : 0),
          overflow: 'hidden',
          width: this.props.width,
          height: this.props.height,
          resizeMode: (this.props.placeholderResizeMode ? this.props.placeholderResizeMode : (this.props.resizeMode != undefined ? this.props.resizeMode : 'cover')),
        }, this.props.style]}
        // source={this.props.placeholderIcon}
        source={(this.state.isLoaded && !this.state.isError) ? null : this.props.placeholderIcon}
      >
        <Image
          onLoadEnd={this.onLoadEnd.bind(this)}
          onError={this.onError.bind(this)}
          style={{
            backgroundColor: '#ffffff00',
            width: this.props.width,
            height: this.props.height,
            resizeMode: (this.props.resizeMode != undefined ? this.props.resizeMode : 'contain'),
          }}
          source={(this.props.imageUrl == null || this.props.imageUrl == '' ? this.props.placeholderIcon : { uri: this.props.imageUrl })}
        />
      </ImageBackground>
    );
  }
}

class ProductOtherImageWithoutUri extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      isError: false
    };
  }

  onLoadEnd() {
    this.setState({
      isLoaded: true
    });
  }

  onError() {
    this.setState({
      isError: true
    });
  }

  render() {

    return (
      <ImageBackground
        style={[{
          backgroundColor: (this.props.backgroundColor != undefined ? this.props.backgroundColor : '#ffffff00'),
          borderRadius: (this.props.borderRadius != undefined ? this.props.borderRadius : 0),
          overflow: 'hidden',
          width: this.props.width,
          height: this.props.height,
          resizeMode: (this.props.resizeMode != undefined ? this.props.resizeMode : 'cover'),
        }, this.props.style]}
        // source={this.props.placeholderIcon}
        source={(this.state.isLoaded && !this.state.isError) ? null : this.props.placeholderIcon}
      >
        <Image
          onLoadEnd={this.onLoadEnd.bind(this)}
          onError={this.onError.bind(this)}
          style={{
            backgroundColor: '#ffffff00',
            width: this.props.width,
            height: this.props.height,
            resizeMode: (this.props.resizeMode != undefined ? this.props.resizeMode : 'contain'),
          }}
          source={(this.props.imageUrl == '' ? this.props.placeholderIcon : this.props.imageUrl)}
        />
      </ImageBackground>
    );
  }
}

export { ProductImage, ProductOtherImage, ProductOtherImageWithoutUri };
