import {
    SONGSLISTTYPE} from "../../Resources/Constants";
import { HomeParser } from "../Parser/Parser";

const INITIAL_STATE = {
    serviceDashboardResponseData: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SONGSLISTTYPE:
            return {
                serviceDashboardResponseData: HomeParser(action.payload)
            };
        default:
            return state;
    }
};
