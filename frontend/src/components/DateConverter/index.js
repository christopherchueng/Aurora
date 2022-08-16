const DateConverter = ({date}) => {

    const dateDifference = (start, end) => {
        return +start - +end
    }

    const convertDate = (date) => {
        const [todaysMonth, todaysDay, todaysYear, todaysHour, todaysMin, todaysSec] = new Date().toLocaleDateString('en-US', {hour12: false, hour: 'numeric', minute: 'numeric', second: 'numeric'}).split(/[,/:]/)
        const [creationMonth, creationDay, creationYear, creationHour, creationMin, creationSec] = new Date(date).toLocaleDateString('en-US', {hour12: false, hour: 'numeric', minute: 'numeric', second: 'numeric'}).split(/[,/:]/)

        // Same year, same month, same day, same hour, same minutes
        if (todaysYear === creationYear &&
            todaysMonth === creationMonth &&
            todaysDay === creationDay &&
            todaysHour === creationHour &&
            dateDifference(todaysMin, creationMin) === 0 ||
            todaysYear === creationYear &&
            todaysMonth === creationMonth &&
            todaysDay === creationDay &&
            todaysHour === creationHour &&
            (dateDifference(creationMin, todaysMin) < 60)) {
                return '<1 minute ago'
        }
        // Same year, same month, same day, same hour, same minutes
        if (todaysYear === creationYear &&
            todaysMonth === creationMonth &&
            todaysDay === creationDay &&
            todaysHour === creationHour &&
            dateDifference(todaysMin, creationMin) === 1) {
                return '1 minute ago'
        }
        // Same year, same month, same day, same hour, different minutes (Ex: creation: 7:30, today: 7:45)
        if ((todaysYear === creationYear &&
            todaysMonth === creationMonth &&
            todaysDay === creationDay &&
            todaysHour === creationHour &&
            dateDifference(todaysMin, creationMin) > 1) ||
            // Ex: creation: 7:59 PM, today: 8:01 PM
            (todaysYear === creationYear &&
            todaysMonth === creationMonth &&
            todaysDay === creationDay &&
            dateDifference(todaysHour, creationHour) === 1) &&
            (dateDifference(creationMin, todaysMin) < 60)) {
                return `${dateDifference(creationMin, todaysMin)} minutes ago`
        }
        // Same year, same month, same day, different hour
        if (todaysYear === creationYear &&
            todaysMonth === creationMonth &&
            todaysDay === creationDay &&
            dateDifference(todaysHour, creationHour) === 1 &&
            todaysMin >= creationMin) {
                return '1 hour ago'
            }
        // Same year, same month, same day, different hour
        if (todaysYear === creationYear &&
            todaysMonth === creationMonth &&
            todaysDay === creationDay &&
            dateDifference(todaysHour, creationHour) > 1 ||
            todaysYear === creationYear &&
            todaysMonth === creationMonth &&
            dateDifference(todaysDay, creationDay) === 1 &&
            (dateDifference(creationHour, todaysHour) < 24)) {
                return `${dateDifference(creationHour, todaysHour)} hours ago`
        }
        // One day ago
        if (Math.floor(((new Date()) - (new Date(date))) / (1000 * 60 * 60 * 24)) === 1) {
                return `1 day ago`
        }
        // Days ago
        if (Math.floor(((new Date()) - (new Date(date))) / (1000 * 60 * 60 * 24)) < 30) {
                return `${Math.floor(((new Date()) - (new Date(date))) / (1000 * 60 * 60 * 24))} days ago`
        }
        // Same year, same month OR different year, one month apart (Dec 2022 and Jan 2023)
        if (todaysYear === creationYear &&
            dateDifference(todaysMonth, creationMonth) === 1 ||
            dateDifference(todaysYear, creationYear) === 1 &&
            dateDifference(creationMonth, todaysMonth) === 1) {
            return '1 month ago'
        }
        // Same year, different month
        // Edge case of Jan 2022 and Dec 2021
        // If years are one year apart and month difference is less than 12, then return months.
        if (todaysYear === creationYear && (dateDifference(todaysMonth, creationMonth) < 12) ||
            dateDifference(todaysYear, creationYear) === 1 &&
            (dateDifference(creationMonth, todaysMonth)) < 12) {
                return `${dateDifference(creationMonth, todaysMonth)} months ago`
        }
        // One year apart
        if (dateDifference(todaysYear, creationYear) === 1 && todaysMonth === creationMonth) {
            return '1 year ago'
        }
        // If track was created more than a year ago, return year difference
        if (dateDifference(todaysYear, creationYear) > 1) {
            return `${dateDifference(todaysYear, creationYear)} years ago`
        }
    }

    return (
        <>
            {convertDate(date)}
        </>
    )

}

export default DateConverter
