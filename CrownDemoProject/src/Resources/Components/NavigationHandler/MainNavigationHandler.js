// https://reactnavigation.org/docs/getting-started.html
// https://reactnavigation.org/docs/headers.html
// https://reactnavigation.org/docs/stack-navigator.html#headerbacktitle

import { createAppContainer } from 'react-navigation';
// import { createStackNavigator } from 'react-navigation-stack';

import { createStackNavigator } from 'react-navigation-stack';
import { SongDetailView, SongListView } from '../../../Views';
import { defaultNavigationOptions } from '../../Constants';

const AppNavigator = createStackNavigator(
  {
    SongListView: SongListView,
    SongDetailView: SongDetailView
  },
  {
    initialRouteName: 'SongListView',
    defaultNavigationOptions: defaultNavigationOptions
  }
);

const AppContainer = createAppContainer(AppNavigator);
export default AppContainer;


