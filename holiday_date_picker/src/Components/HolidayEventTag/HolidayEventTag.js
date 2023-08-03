import React from "react";
import styles from './HolidayEventTag.module.scss';

const HolidayEventTag = ({ tagData }) => {
    return(
        <div className={styles.holidayTagContainer}>
            {tagData?.event}
        </div>
    )
}

export default HolidayEventTag