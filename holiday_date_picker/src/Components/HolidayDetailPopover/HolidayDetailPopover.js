import React, { useState } from "react";
import styles from './HolidayDetailPopover.module.scss';
import { Card, CardHeader, CardContent, Popover, Typography, TextField, Button } from "@mui/material";
import { Delete } from '@mui/icons-material';

const HolidayDetailPopover = ({
    festivalDatePopup,
    holiday,
    createNewHolidayEvent,
    handleDeleteHoliday,
    handleClose,
    addNewEvent
}) => {
    const { date, event } = holiday;
    const [eventTargetValue, setEventTargetValue] = useState('');

    return(
        <>
            <Popover
                classes={{
                    paper: styles.popoverContainer
                }}
                open={festivalDatePopup}
                anchorEl={festivalDatePopup}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'center',
                    horizontal: 'left',
                }}
            >
                <div className={styles.popoverContentBox}>
                    <div className={styles.holidayHeadingContainer}>
                        {
                            !createNewHolidayEvent ?
                            <>
                                <div className={styles.holidayHeading}>{event}</div>
                                <Delete
                                    classes={{
                                        root: styles.icon
                                    }}
                                    onClick={e => {
                                        handleDeleteHoliday(date)
                                    }}
                                />
                            </>
                            :
                            <TextField
                                id="outlined-basic"
                                value={eventTargetValue}
                                label="Add New Event"
                                variant="outlined"
                                onChange={e => {
                                    setEventTargetValue(e.target.value)
                                }}
                            />
                        }
                    </div>
                    <div className={styles.lineBreak}></div>
                    <div className={styles.holidayDateContent}>
                        <div className={styles.holidayDate}>{date || createNewHolidayEvent}</div>
                        <div className={styles.holidayDescription}>{createNewHolidayEvent ? `Event` : `Repeats Yearly`}</div>
                    </div>
                    {
                        createNewHolidayEvent &&
                        <div className={styles.btnContainer}>
                            <Button
                                variant="contained"
                                color='primary'
                                classes={{
                                    root: styles.btn
                                }}
                                onClick={e => {addNewEvent(eventTargetValue, createNewHolidayEvent)}}
                            >
                                Save
                            </Button>
                        </div>
                    }
                </div>
            </Popover>
        </>
    )
}

export default HolidayDetailPopover;