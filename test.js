const hours = [
    '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00',
    '18:00', '19:00', '20:00', '21:00', '22:00',
];

const bookingData = [
    { ssn: '$2b$12$9iaTpieDniVt3kfTUeqQ0.SoM1kHwOym8L5bHAi4JT4yurSmUsJdm', fId: 21, isCancelled: false, bookTime: '2024-12-07T22:43:10.000Z' }
    // More booking records could go here...
];

const testfunction = () => {
    
}

const transformBookingData = (bookings) => {
    return hours.map((hour) => {
        const booking = bookings.find((booking) => {
            // Parse the booking time and the reference hour
            const bookingTime = new Date(booking.bookTime);
            const [bookingHour] = hour.split(':');

            // Compare hours and ensure the booking time is for the same day
            return bookingTime.getUTCHours() === parseInt(bookingHour, 10) && 
                   bookingTime.getUTCFullYear() === new Date(booking.bookTime).getUTCFullYear() &&
                   bookingTime.getUTCMonth() === new Date(booking.bookTime).getUTCMonth() &&
                   bookingTime.getUTCDate() === new Date(booking.bookTime).getUTCDate();
        });

        return {
            time: hour,
            status: booking ? 'Reserved' : 'Available',
        };
    });
};

// Example usage:
const transformedTimeSlots = transformBookingData(bookingData);
console.log(transformedTimeSlots);