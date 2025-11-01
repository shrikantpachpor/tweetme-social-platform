import {
  FETCH_SPOT_IMAGES,
  FETCH_SPOT_WHOLE_DATA,
  FETCH_SPOT_PAGE_METADATA,
  FETCH_SPOT_INFO,
  SET_DISTANCES,
  SET_DISTANCE_PROCESSED
} from "../types.js";

const initialSpoInfoState = {
  spotCompleteData: ""
};

const spotReducer = (state = initialSpoInfoState, action) => {
  switch (action.type) {
    case FETCH_SPOT_WHOLE_DATA:
      return { ...state, spotCompleteData: action.payload };
      break;
      return {
        ...state,
        distances: tempDistances
      };
      break;
    default:
      return state;
  }
};

export default spotReducer;
