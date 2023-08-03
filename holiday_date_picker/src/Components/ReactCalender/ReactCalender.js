import React, { useEffect, useState } from "react";
import styles from './ReactCalender.module.scss';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ChevronLeft, ChevronRight, Done } from '@mui/icons-material';
import moment from 'moment';
import HolidayEventTag from "../HolidayEventTag/HolidayEventTag";
import { Popover, Typography } from "@mui/material";
import HolidayDetailPopover from "../HolidayDetailPopover/HolidayDetailPopover";
import { connect, useDispatch } from "react-redux";
import { actions as ReactCalenderActions } from "./store/ReactCalenderActions";

const ReactCalender = ({ holidayDates }) => {
    const months = {
        '01': 'January',
        '02': 'February',
        '03': 'March',
        '04': 'April',
        '05': 'May',
        '06': 'June',
        '07': 'July',
        '08': 'August',
        '09': 'September',
        '10': 'October',
        '11': 'November',
        '12': 'December',
    };
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedEvent, setSelectedEvent] = useState({});
    const [createNewHolidayEvent, setCreateNewHolidayEvent] = useState('');
    const [festivalDatePopup, setFestivalDatePopup] = useState();
    const dispatch = useDispatch();

    const handleDeleteHoliday = (holidayDate) => {
        if(holidayDates.hasOwnProperty(holidayDate)){
            const newHolidayDates = {...holidayDates};
            delete newHolidayDates[holidayDate]
            dispatch(ReactCalenderActions.updateHolidayDates(newHolidayDates))
            setFestivalDatePopup(null)
            setSelectedEvent({})
            setCreateNewHolidayEvent('');
        }
    }

    const handleAddHoliday = (date, e) => {
        if(date?.length){
            const newDate = String(moment.utc(date[0]).local().format('DD/MM'));
            const stringDate = `${newDate.split('/')[0]} ${months[newDate.split('/')[1]]}`
            setCreateNewHolidayEvent(stringDate)
            setCurrentDate(date[0])
            setFestivalDatePopup(e.currentTarget)
        }
    }

    const isCustomDate = (date) => {
        const newDate = String(moment.utc(date).local().format('DD/MM'));
        const stringDate = `${newDate.split('/')[0]} ${months[newDate.split('/')[1]]}`
        if(holidayDates.hasOwnProperty(stringDate)){
            return {
                date: stringDate,
                event: holidayDates[stringDate]
            };
        }
        return false;
    };

    const renderCustomDayContents = (day, date) => {
        const customStyle = isCustomDate(date) ? { backgroundColor: '#FFA500', color: 'white', width: '85px', height: '80px', cursor: 'pointer'} : {}; // Custom style object for the specific day
    
        return (
            <>
                {
                    customStyle &&
                    <>
                        <div
                            onMouseEnter={e => {
                                if(isCustomDate(date)){
                                    setFestivalDatePopup(e.currentTarget)
                                    setSelectedEvent(isCustomDate(date))
                                }
                            }}
                            style={customStyle}
                        >
                            {date.getDate()}
                            {
                                isCustomDate(date) ?
                                    <HolidayEventTag
                                        tagData={isCustomDate(date)}
                                    /> :
                                    <div style={{ opacity: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>.</div>
                            }
                        </div>                       
                    </>
                }
            </>
        );
    };

    return(
        <>
            <div
                className={styles.datePickerContainer}
            >
                <div className={styles.customDatePickerWrapper}>
                    <DatePicker
                        renderDayContents={renderCustomDayContents}
                        renderCustomHeader={({ monthDate, customHeaderCount, decreaseMonth, increaseMonth }) => (
                            <div>
                                <button
                                    aria-label="Previous Month"
                                    className={
                                        'react-datepicker__navigation react-datepicker__navigation--previous'
                                    }
                                    style={customHeaderCount === 1 ? { visibility: 'hidden' } : null}
                                    onClick={decreaseMonth}
                                >
                                    <ChevronLeft
                                        className={
                                            'react-datepicker__navigation-icon react-datepicker__navigation-icon--previous'
                                        }
                                    />
                                </button>
                                <span className="react-datepicker__current-month">
                                    {monthDate.toLocaleString('en-US', {
                                        month: 'long',
                                        year: 'numeric'
                                    })}
                                </span>
                                <button
                                    aria-label="Next Month"
                                    className={'react-datepicker__navigation react-datepicker__navigation--next'}
                                    style={customHeaderCount === 0 ? { visibility: 'hidden' } : null}
                                    onClick={increaseMonth}
                                >
                                    <ChevronRight
                                        className={
                                            'react-datepicker__navigation-icon react-datepicker__navigation-icon--previous'
                                        }
                                    />
                                </button>
                            </div>
                        )}
                        inline
                        selectsRange
                        focusSelectedMonth={false}
                        monthsShown={2}
                        onChange={(date, e) => {handleAddHoliday(date, e)}}
                        selected={currentDate}
                        // startDate={startDate}
                        // endDate={endDate}
                        // maxDate={endDate > new Date() ? endDate : new Date()}
                    />
                </div>
            </div>
            {
                (selectedEvent || createNewHolidayEvent) && festivalDatePopup &&
                <HolidayDetailPopover
                    handleClose={e => {
                        setFestivalDatePopup(null);
                        setSelectedEvent({})
                        setCreateNewHolidayEvent('');
                    }}
                    holiday={selectedEvent}
                    createNewHolidayEvent={createNewHolidayEvent}
                    handleDeleteHoliday={handleDeleteHoliday}
                    festivalDatePopup={festivalDatePopup}
                    addNewEvent={(event, date) => {
                        if(event){
                            const newHolidayDates = {...holidayDates};
                            newHolidayDates[date] = event;
                            dispatch(ReactCalenderActions.updateHolidayDates(newHolidayDates));
                        }
                        setFestivalDatePopup(null);
                        setSelectedEvent({})
                        setCreateNewHolidayEvent('');
                    }}
                />
            }
        </>
    )
}

export default connect(({ reactCalender }) => {
    return {
        holidayDates: reactCalender.holidayDates
    };
})(ReactCalender);