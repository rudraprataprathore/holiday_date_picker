import { actionTypes } from './ReactCalenderActions';

export const initialState = {
    holidayDates: {
        '15 August': 'Independence Day',
        '16 August': 'Parsi New Year',
        '29 August': 'Onam',
        '30 August': 'Raksha Bandhan',
        '06 September': 'Janmashtami'
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
        /**
         * Reset to the initial State
         */
        case actionTypes.UpdateHolidayDates: {
            return {
                ...state,
                holidayDates: action.payload
            };
        }

        default:
            return state;
    }
};
