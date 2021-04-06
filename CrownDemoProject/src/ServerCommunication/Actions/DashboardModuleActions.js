import {
    SONGSLISTTYPE, OtherConstant,
    serviceError,
    ServiceMethod, ServiceType,
    SERVICE_INPROGRESS,
    userServiceSuccess,
    OtherMessages,
    Fetch,
    Messages
} from "../../Resources/Constants";

export const fetchAllSongsService = ({ uniqueNo = null }) => {
    return (dispatch) => {
        dispatch({
            type: SERVICE_INPROGRESS,
            payload: uniqueNo
        });
        let service = `${ServiceMethod.baseUrl}`;
        OtherConstant.showConsoleLog(service);
        OtherConstant.showConsoleLog(OtherConstant.getServiceHeaderData(0));
        Fetch(service, {
            method: ServiceType.get,
            ...OtherConstant.getServiceHeaderData(0),
            body: null,
        }).then((response) => {
            // you'll get the response in responseJson
            OtherConstant.showConsoleLog('fetchAllSongsService final response:', response);
            if (response == null) {
                let error = {
                    status: 404,
                    message: response.message ? response.message : Messages.somethingWrongText
                };
                serviceError(error, true, dispatch);
            } else {
                userServiceSuccess(dispatch, {
                    data: response,
                    uniqueNo
                }, SONGSLISTTYPE)
            }
        })
            .catch((error) => {
                OtherConstant.showConsoleLog("-------------------- main error:", error);
                serviceError(error, true, dispatch);

            });
    };
};
