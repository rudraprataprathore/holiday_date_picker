import React, { useState } from "react";
import styles from './ReactCalender.module.scss';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ChevronLeft, ChevronRight, Done } from '@mui/icons-material';
import moment from 'moment';

const ReactCalender = () => {
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
    const holidayDates = {
        '15 August': 'Independence Day',
        '16 August': 'Parsi New Year',
        '29 August': 'Onam',
        '30 August': 'Raksha Bandhan',
        '06 September': 'Janmashtami'
    }
    const [currentDate, setCurrentDate] = useState(new Date());

    const dateClassName = (date) => {
        const newDate = String(moment.utc(date).local().format('DD/MM'));
        const stringDate = `${newDate.split('/')[0]} ${months[newDate.split('/')[1]]}`
        if(Object.keys(holidayDates).includes(stringDate)){
            return 'test-custom-date'
        }
        return 'regular-date';
    };

    return(
        <>
            <div
                className={styles.datePickerContainer}
                // style={{ height: currentTable === 'brandreports' ? '400px' : '400px' }}
            >
                <div className={styles.customDatePickerWrapper}>
                    <DatePicker
                        dayClassName={dateClassName}
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
                        // onChange={onChange}
                        selected={currentDate}
                        // startDate={startDate}
                        // endDate={endDate}
                        // maxDate={endDate > new Date() ? endDate : new Date()}
                    />
                </div>
            </div>
        </>
    )
}

export default ReactCalender