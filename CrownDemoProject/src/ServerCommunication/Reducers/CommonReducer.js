import { SERVICE_INPROGRESS, SERVICE_FAIL, SERVICE_SUCCESS, CATEGORYTYPE, GETCMSPAGETYPE, BANNERTYPE } from "../../Resources/Constants/ActionType";
import { OtherConstant } from "../../Resources/Constants";

const INITIAL_STATE = {
    serviceError: '',
    serviceLoading: false,
    serviceType: ''
};

export default (state = INITIAL_STATE, action) => {
    console.log('common:',action.type);
    switch (action.type) {
        case SERVICE_INPROGRESS:
            OtherConstant.getMainAppThis().showLoader();
            return {
                ...INITIAL_STATE,
                serviceLoading: true,
                serviceType: SERVICE_INPROGRESS
            };
        case SERVICE_FAIL:
            OtherConstant.getMainAppThis().stopLoader();
            return {
                ...INITIAL_STATE,
                serviceError: action.payload.message,
                serviceType: SERVICE_FAIL
            };
        case SERVICE_SUCCESS:
            // if (
            //     global.serviceType != BANNERTYPE &&
            //     global.serviceType != GETCMSPAGETYPE &&
            //     global.serviceType != ''
            // ) {
                OtherConstant.getMainAppThis().stopLoader();
            // }

            return {
                ...INITIAL_STATE,
                serviceType: action.type
            };
        default:
            return state;
    }
};
