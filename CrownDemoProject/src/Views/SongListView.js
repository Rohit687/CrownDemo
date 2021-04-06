import React, { Component } from 'react';
import { View, FlatList, Text, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { basicStyle, colors, dimensions, EmptyView, jsonCopy, OtherConstant, SERVICE_SUCCESS, SONGSLISTTYPE } from '../Resources/Constants';
import NetInfo from "@react-native-community/netinfo";
import { SongList } from '../Resources/JsonData/JsonData';
import { fetchAllSongsService } from '../ServerCommunication/Actions/DashboardModuleActions';
import { ProductOtherImage } from '../Resources/Components/ProductImage';
import { getAssetByFilename, ImageSource } from '../Resources/Images';

class SongListView extends Component {
    static navigationOptions = ({ screenProps }) => {
        return {
            title: 'Songs'
        }
    };

    constructor(props) {
        super(props);
        this.uniqueNo = '';

        OtherConstant.showConsoleLog(SongList);
        this.state = {
            list: jsonCopy(SongList)
        };
    }

    componentDidMount() {
    }

    fetchSongsList() {
        setTimeout(() => {
            NetInfo.fetch().then(state => {
                if (state.isConnected) {
                    global.serviceType = SONGSLISTTYPE;
                    global.screenType = 'SongListView';
                    this.uniqueNo = Math.random().toString();
                    // this.props.fetchAllSongsService({ uniqueNo: this.uniqueNo });
                }
            })
        }, 100);
    }

    componentWillUnmount() {

    }

    componentWillReceiveProps(newProps) {
        OtherConstant.showConsoleLog('componentWillReceiveProps:', newProps);
        if (global.serviceType == SONGSLISTTYPE && global.screenType == 'SongListView' && newProps.serviceType == SERVICE_SUCCESS && newProps.serviceDashboardResponseData && newProps.serviceDashboardResponseData.uniqueNo == this.uniqueNo) {
            global.serviceType = "";
            global.screenType = "";
            OtherConstant.showConsoleLog('SongListView:', newProps.serviceDashboardResponseData);
        }
    }

    render() {
        return (
            <View style={{
                flexGrow: 1,
                width: dimensions.width,
                backgroundColor: 'cyan'
            }}>
                <FlatList
                    data={this.state.list}
                    style={{
                        alignSelf: 'center',
                        backgroundColor: 'white',
                        width: '100%',
                        paddingHorizontal: basicStyle.paddingH
                    }}
                    contentContainerStyle={{
                        paddingVertical: basicStyle.paddingH
                    }}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={() => <EmptyView height={15} />}
                    ListFooterComponent={() => <EmptyView height={20} />}
                    renderItem={({ item, index }) =>
                        <TouchableOpacity style={{

                            paddingHorizontal: basicStyle.innerPadding,
                            borderRadius: 10,
                            borderWidth: 2,
                            borderColor: '#00000022',

                            paddingVertical: basicStyle.innerPadding,
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}
                            onPress={() => {
                                this.props.navigation.push('SongDetailView', {
                                    item
                                });
                            }}
                        >

                            <ProductOtherImage
                                resizeMode={'cover'}
                                placeholderIcon={getAssetByFilename(ImageSource.placeholder)}
                                imageUrl={item.artworkUrl60 != null ? item.artworkUrl60 : ''}
                                width={50}
                                height={50}
                                borderRadius={25}
                            />

                            <View style={{
                                flex: 1,
                                marginLeft: 15,
                                width: '100%',
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                            }}>

                                <Text
                                    style={{
                                        textAlign: 'left',
                                        color: colors.primary,
                                        fontSize: 14,
                                        fontWeight: '700'
                                    }}>
                                    {item.artistName}
                                </Text>
                            </View>

                        </TouchableOpacity>
                    }
                    keyExtractor={(item, index) => `songList_${index}`}
                />
            </View>
        );
    }
}

/**
 * end
 */

const mapStateToProps = ({ commonReducer, dashboardModuleResponseData }) => {
    const { serviceDashboardResponseData } = dashboardModuleResponseData;
    const { serviceType, serviceLoading } = commonReducer;
    return { serviceType, serviceDashboardResponseData, serviceLoading };
};

export default connect(mapStateToProps, { fetchAllSongsService })(SongListView);
