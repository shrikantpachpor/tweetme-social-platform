import "regenerator-runtime/runtime";
import { takeEvery, put } from "redux-saga/effects";
import { delay } from "redux-saga/effects";
import { GET_DISTANCE_PROCESSED, SET_DISTANCE_PROCESSED } from "../types.js";

async function* setDistanceProcessed(action) {
  yield await put({ type: SET_DISTANCE_PROCESSED, payload: action.payload });
}

function* getDistanceProcessed() {
  yield takeEvery(GET_DISTANCE_PROCESSED, setDistanceProcessed);
}

export default getDistanceProcessed;
