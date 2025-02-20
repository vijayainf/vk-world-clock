function updateClocks() {
    const timeElements = document.querySelectorAll('.digital-time');
    const dateElements = document.querySelectorAll('.date');
    const hourHands = document.querySelectorAll('.hour-hand');
    const minuteHands = document.querySelectorAll('.min-hand');
    const secondHands = document.querySelectorAll('.second-hand');

    function updateAnalogClock(hours, minutes, seconds, hourHand, minuteHand, secondHand) {
        const secondsDegrees = (seconds / 60) * 360 + 90;
        const minutesDegrees = ((minutes + seconds / 60) / 60) * 360 + 90;
        const hoursDegrees = ((hours + minutes / 60) / 12) * 360 + 90;

        secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
        minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;
        hourHand.style.transform = `rotate(${hoursDegrees}deg)`;
    }

    timeElements.forEach((element, index) => {
        const timezone = element.getAttribute('data-timezone');
        const now = new Date();
        
        // Digital Time
        const timeString = now.toLocaleTimeString('en-US', {
            timeZone: timezone,
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        element.textContent = timeString;

        // Date
        const dateString = now.toLocaleDateString('en-US', {
            timeZone: timezone,
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
        dateElements[index].textContent = dateString;

        // Analog Clock
        const timeparts = timeString.split(':');
        const hours = parseInt(timeparts[0]);
        const minutes = parseInt(timeparts[1]);
        const seconds = parseInt(timeparts[2]);

        updateAnalogClock(
            hours,
            minutes,
            seconds,
            hourHands[index],
            minuteHands[index],
            secondHands[index]
        );
    });
}

// Update clocks immediately and then every second
updateClocks();
setInterval(updateClocks, 1000);