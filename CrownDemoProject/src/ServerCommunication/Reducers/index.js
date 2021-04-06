import { combineReducers } from 'redux';

import CommonReducer from './CommonReducer';
import DashboardModuleReducer from './DashboardModuleReducer';

export default combineReducers({
  commonReducer: CommonReducer,
  dashboardModuleResponseData: DashboardModuleReducer
});
