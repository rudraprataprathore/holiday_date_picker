import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import ReactCalenderReducer, { initialState as initialadBuilderState } from '../Components/ReactCalender/store/ReactCalenderReducer';

const combinedReducers = combineReducers({
    reactCalender: ReactCalenderReducer,
});
export const initialState = {
    reactCalender: { ...initialadBuilderState },
};

// export function* rootSaga() {
//     yield all();
// }
export const rootReducer = combinedReducers;
