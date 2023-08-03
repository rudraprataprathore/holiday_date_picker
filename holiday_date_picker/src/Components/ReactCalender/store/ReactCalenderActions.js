export const actionTypes = {
    UpdateHolidayDates: 'adBuilder/updateHolidayDates',
};

export const actions = {
    updateHolidayDates: (config) => ({
        type: actionTypes.UpdateHolidayDates,
        payload: config
    })
};
