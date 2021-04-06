import React, { Component } from 'react';
import { View, Text, Linking } from 'react-native';
import { connect } from 'react-redux';
import { ProductOtherImage } from '../Resources/Components/ProductImage';
import { basicStyle, colors, dimensions, EmptyView, OtherConstant } from '../Resources/Constants';
import { getAssetByFilename, ImageSource } from '../Resources/Images';

class SongDetailView extends Component {
    static navigationOptions = ({ screenProps }) => {
        return {
            title: 'Details'
        }
    };

    constructor(props) {
        super(props);
        this.uniqueNo = '';

        this.songinfo = this.props.navigation.state.params.item
        OtherConstant.showConsoleLog(this.props.navigation.state.params.item);
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    componentWillReceiveProps(newProps) {

    }

    songsInfoLayout(title, value) {
        return (
            <View style={{
                flexDirection: 'row',
                width: '100%',
                marginTop: 15,
            }}>
                <Text style={{

                    fontWeight: '600',
                    fontSize: 13,
                    width: 150,
                    textAlign: 'left',
                    color: colors.primary
                }}>
                    {title}
                </Text>
                <EmptyView width={20} />

                <Text style={{
                    fontSize: 13,
                    flex: 1,
                    textAlign: 'right',
                    color: colors.gray
                }}>
                    {value}
                </Text>
            </View>
        )
    }

    render() {
        return (
            <View style={{
                flexGrow: 1,
                width: dimensions.width,
                backgroundColor: colors.white,
                alignItems: 'center',
                paddingVertical: 30,
                paddingHorizontal: basicStyle.paddingH
            }}>
                <ProductOtherImage
                    resizeMode={'cover'}
                    placeholderIcon={getAssetByFilename(ImageSource.placeholder)}
                    imageUrl={this.songinfo.artworkUrl100 != null ? this.songinfo.artworkUrl100 : ''}
                    width={100}
                    height={100}
                    borderRadius={50}
                />
                <Text style={{
                    marginTop: 10,
                    fontWeight: '800',
                    fontSize: 16,
                    color: colors.primary
                }}>
                    {this.songinfo.artistName}
                </Text>

                <View style={{
                    width: '100%',
                    marginTop: 10,
                }}>

                    {this.songsInfoLayout('Collection Name', this.songinfo.collectionName)}
                    {this.songsInfoLayout('collection Price', this.songinfo.collectionPrice)}
                    {this.songsInfoLayout('Country', this.songinfo.country)}
                    {this.songsInfoLayout('Genre Name', this.songinfo.primaryGenreName)}
                    {this.songsInfoLayout('Track Name', this.songinfo.trackName)}
                    {this.songsInfoLayout('Price', `${this.songinfo.currency} ${this.songinfo.trackPrice}`)}

                </View>

                <Text style={{
                    marginTop: 20,
                    fontWeight: '600',
                    fontSize: 15,
                    color: 'blue',
                    textDecorationLine: 'underline',
                    lineHeight: 25
                }}
                    onPress={() => {
                        Linking.canOpenURL(this.songinfo.trackViewUrl).then(supported => {
                            if (!supported) {
                                //console.log('Can\'t handle settings url');
                            } else {
                                return Linking.openURL(this.songinfo.trackViewUrl);
                            }
                        }).catch(err => console.error('An error occurred', err));
                    }}
                >
                    Track
                </Text>
            </View>
        );
    }
}

/**
 * end
 */

// const mapStateToProps = ({ commonReducer, userModuleResponseData }) => {
//     const { serviceUserResponseData } = userModuleResponseData;
//     const { serviceType, serviceLoading } = commonReducer;
//     return { serviceType, serviceUserResponseData, serviceLoading };
// };

export default connect(null, {})(SongDetailView);
