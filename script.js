document.addEventListener('DOMContentLoaded', function() {
    const currentDayEl = document.getElementById('currentDay');
    const timeBlocksEl = document.getElementById('timeBlocks');

    // Display current day
    currentDayEl.textContent = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    // Create time blocks
    for (let hour = 9; hour <= 17; hour++) {
        const timeBlock = document.createElement('div');
        timeBlock.classList.add('time-block');

        const hourEl = document.createElement('div');
        hourEl.classList.add('hour');
        hourEl.textContent = `${hour > 12 ? hour - 12 : hour} ${hour >= 12 ? 'PM' : 'AM'}`;
        timeBlock.appendChild(hourEl);

        const eventEl = document.createElement('input');
        eventEl.type = 'text';
        eventEl.classList.add('event');
        eventEl.value = localStorage.getItem('event-' + hour) || '';
        timeBlock.appendChild(eventEl);

        const saveBtn = document.createElement('button');
        saveBtn.classList.add('saveBtn');
        saveBtn.textContent = 'Save';
        saveBtn.onclick = function() {
            localStorage.setItem('event-' + hour, eventEl.value);
        };
        timeBlock.appendChild(saveBtn);

        // Color coding
        const currentHour = new Date().getHours();
        if (hour < currentHour) {
            eventEl.classList.add('past');
        } else if (hour === currentHour) {
            eventEl.classList.add('present');
        } else {
            eventEl.classList.add('future');
        }

        timeBlocksEl.appendChild(timeBlock);
    }
});
