

const dateHelpers = () => {
    const isPastDate = (date) => {
        return new Date().toLocaleDateString() > new Date(date).toLocaleDateString();
    }

    const isPastDateObject = (date) => {
        const currentDate = new Date();
        return currentDate > date;
    }


    const dateToISOFormat = (date) => {
        const dateObject = new Date(date);

        const year = dateObject.getFullYear();
        const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Місяці в JS нумеруються з 0
        const day = String(dateObject.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    const getMonthName = (monthIndex) => {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return months[monthIndex];
    }

    function formatDate(dateString) {
        const date = new Date(dateString);

        const options = { weekday: 'long', month: 'long', day: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-GB', options);

        return formattedDate;
    }

    function addMinutesToTime(time, minutesToAdd) {
        const [hoursStr, minutesStr] = time.split(":");
        const hours = parseInt(hoursStr);
        const minutes = parseInt(minutesStr);

        let newMinutes = minutes + minutesToAdd;
        let newHours = hours;

        if (newMinutes >= 60) {
            newHours += Math.floor(newMinutes / 60);
            newMinutes %= 60;
        }

        const formattedHours = (newHours < 10 ? "0" : "") + newHours;
        const formattedMinutes = (newMinutes < 10 ? "0" : "") + newMinutes;

        return `${formattedHours}:${formattedMinutes}`;
    }

    return {
        isPastDate,
        dateToISOFormat,
        getMonthName,
        formatDate,
        addMinutesToTime,
        isPastDateObject
    }

}

export default dateHelpers();