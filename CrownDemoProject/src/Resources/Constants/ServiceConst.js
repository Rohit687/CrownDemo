import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk'
import reducers from '../../ServerCommunication/Reducers';
import { SERVICE_FAIL, SERVICE_SUCCESS, OtherConstant } from './';
import { Messages, OtherMessages } from './StringConstant';
import moment from "moment";

export const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

export const ServiceMethod = {
  baseUrl: '',

}

export const ServiceType = {
  get: 'GET',
  post: 'POST',
  delete: 'DELETE',
  put: 'PUT',
  patch: 'PATCH'
};

export const ServiceOtherConstant = {
  localDateFormat: 'MMM DD YYYY',
  serviceDateFormat: "YYYY-MM-DD",
};

export const serviceDateConvertion = (date) => {
  return moment(moment(date, ServiceOtherConstant.localDateFormat).toDate()).format(ServiceOtherConstant.serviceDateFormat);
}
export const localDateConvertion = (date) => {
  return moment(moment(date, ServiceOtherConstant.serviceDateFormat).toDate()).format(ServiceOtherConstant.localDateFormat);
}

export class ServiceError extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }
}

export const serviceError = (response, isCatch, dispatch) => {
  if (isCatch) {
    userServiceFail(new ServiceError(response.status, response.message), dispatch);
  } else {
    userServiceFail(new ServiceError(response[0].status, response[0].msg), dispatch);
  }
}

export const userServiceFail = (error, dispatch) => {
  dispatch({
    type: SERVICE_FAIL,
    payload: error
  });
};

export const userServiceSuccess = (dispatch, userData, type) => {

  dispatch({
    type: SERVICE_SUCCESS
  });
  dispatch({
    type: type,
    payload: userData
  });
};

//Status code meaning
// https://restfulapi.net/http-status-codes/
export function Fetch(url, options, timeout = 15000) {
  OtherConstant.showConsoleLog('------------------------------service start-----------------------');
  OtherConstant.showConsoleLog('url:', url);
  OtherConstant.showConsoleLog('options:', options);
  OtherConstant.showConsoleLog('-----------------------------service end-----------------------');
  return Promise.race([

    new Promise(function (resolve, reject) {

      fetch(url, options).then((response) => {
        // you'll get the response in responseJson
        var promise1 = new Promise(function (tempResolve) {
          OtherConstant.showConsoleLog("--------------------response:", response);
          tempResolve(response.text());
        });
        var promise2 = response;
        Promise.all([promise1, promise2]).then(function (tempValue) {

          OtherConstant.showConsoleLog("------service--->>", tempValue);
          if (IsJsonString(tempValue[0])) {
            let values = [
              JSON.parse(tempValue[0]),
              tempValue[1]
            ]
            if (values[1].status != 200 && values[1].status != 201) {
              OtherConstant.showConsoleLog("------service error--->>", values[0]);
              reject({
                status: 404,
                message: values[0].message ? values[0].message : Messages.somethingWrongText
              });
            } else {
              OtherConstant.showConsoleLog("------service success--->>", values[0]);
              let response = values[0];
              resolve(response)
            }
          } else {
            if (tempValue[1].status == 204) {
              let response = {
                status: tempValue[1].status,
                message: 'Please add own message'
              };
              resolve(response)
            } else {
              reject({
                status: 404,
                message: Messages.somethingWrongText
              });
            }

          }
        });
      })
        .catch((error) => {
          OtherConstant.showConsoleLog("--------------------error:", error);
          reject(error);

        })
    })
  ]);
}

export function IsJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

export const jsonCopy = item => JSON.parse(JSON.stringify(item))
