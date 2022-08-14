

const DateConverter = ({date}) => {

    const dateDifference = (today, creation) => {
        return +today - +creation
    }

    const convertDate = (date) => {
        const [todaysMonth, todaysDay, todaysYear, todaysHour, todaysMin, todaysSec] = new Date().toLocaleDateString('en-US', {hour12: false, hour: 'numeric', minute: 'numeric', second: 'numeric'}).split(/[,/:]/)
        const [creationMonth, creationDay, creationYear, creationHour, creationMin, creationSec] = new Date(date).toLocaleDateString('en-US', {hour12: false, hour: 'numeric', minute: 'numeric', second: 'numeric'}).split(/[,/:]/)

        // Same year, same month, same day, same hour, same minutes
        if (todaysYear === creationYear &&
            todaysMonth === creationMonth &&
            todaysDay === creationDay &&
            todaysHour === creationHour &&
            dateDifference(todaysMin, creationMin) === 0 &&
            todaysSec !== creationSec) {
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
        // Same year, same month, same day, same hour, different minutes
        if (todaysYear === creationYear &&
            todaysMonth === creationMonth &&
            todaysDay === creationDay &&
            todaysHour === creationHour &&
            dateDifference(todaysMin, creationMin) > 1) {
                return `${dateDifference(todaysMin, creationMin)} minutes ago`
        }
        // Same year, same month, same day, different hour
        if (todaysYear === creationYear &&
            todaysMonth === creationMonth &&
            todaysDay === creationDay &&
            dateDifference(todaysHour, creationHour) !== 0) {
                return `${dateDifference(todaysHour, creationHour)} hours ago`
        }
        // Same year, same month, different day
        if (todaysYear === creationYear &&
            todaysMonth === creationMonth &&
            dateDifference(todaysDay, creationDay) !== 0) {
                return `${dateDifference(todaysDay, creationDay)} days ago`
        }
        // Same year, different month
        if (todaysYear === creationYear && (dateDifference(todaysMonth, creationMonth) !== 0)) {
            return `${dateDifference(todaysMonth, creationMonth)} months ago`
        }
        // Edge case of Jan 2022 and Dec 2021
        // If years are one year apart and month difference is less than 12, then return months.
        if (dateDifference(todaysYear, creationYear) === 1
            && ((dateDifference(todaysMonth, creationMonth) > 0 ?
                dateDifference(todaysMonth, creationMonth) :
                (dateDifference(todaysMonth, creationMonth) + 12)) < 12)) {
                    return `${dateDifference(todaysMonth, creationMonth)} months ago`
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
