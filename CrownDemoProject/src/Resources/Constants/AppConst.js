import { Platform } from 'react-native'

export class OtherConstant {
  static isIosDevice() {
    if (Platform.OS === 'ios') {
      return true;
    }
    return false;
  }

  static mainAppThis = null;
  static getMainAppThis() {
    return this.mainAppThis;
  }
  static setMainAppThis(mainAppThis) {
    this.mainAppThis = mainAppThis;
  }

  static logedInUserAuthToken = null;
  static getLogedInUserAuthToken() {
    return this.logedInUserAuthToken;
  }
  static setLogedInUserAuthToken(logedInUserAuthToken) {
    this.logedInUserAuthToken = logedInUserAuthToken;
  }

  static getServiceHeader(type = 2) {
    switch (type) {
      case 1:
        return {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          Authorization: this.getLogedInUserAuthToken() ? `Bearer ${this.getLogedInUserAuthToken()}` : ''
        };
      case 2:
        return {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: this.getLogedInUserAuthToken() ? `Bearer ${this.getLogedInUserAuthToken()}` : ''
        };
      default:
        return {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: this.getLogedInUserAuthToken() ? `Bearer ${this.getLogedInUserAuthToken()}` : ''
        };
    }
  }

  static getServiceHeaderData(type = 2) {
    return {
      headers: this.getServiceHeader(type),
      credentials: 'include',
    }
  }

  static urlEncodeDataBody(data) {
    var urlEncodedData = "";
    var urlEncodedDataPairs = [];
    urlEncodedDataPairs = [...data._parts] // expand the elements from the .entries() iterator into an actual array
      .map(e => encodeURIComponent(e[0]) + "=" + encodeURIComponent(e[1]))  // transform the elements into encoded key-value-pairs
    urlEncodedData = urlEncodedDataPairs.join('&');
    // this.showConsoleLog(`urlEncodedData:`, urlEncodedData);
    return urlEncodedData;
  }

  static rawDataBody(data) {
    let json = {};
    [...data._parts].map(e => {
      json[e[0]] = e[1];
    })
    // this.showConsoleLog(`json:`, json);
    return JSON.stringify(json);
  }

  static showConsoleLog(message, ...optionalParams) {
    console.log(message, ...optionalParams);
  }
}
