import {
  FETCH_DESTINATION_DATA,
  FETCH_DESTINATION_GALLERY_IMAGES
} from "../types.js";

const destinationInitialState = {
  destinationData: ""
};
const destinationReducer = (state = destinationInitialState, action) => {
  switch (action.type) {
    case FETCH_DESTINATION_DATA:
      return { ...state, destinationData: action.payload };
      break;
    case FETCH_DESTINATION_GALLERY_IMAGES:
      return { ...state, destinationGalleryImages: action.payload };
      break;
    default:
      return state;
  }
};

export default destinationReducer;
