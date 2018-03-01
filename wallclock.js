/**
 * Calculates the difference in angles between the minute and hour hands of a clock face
 * given a 12 hour time string.
 * @param {string} time_str A 12 hour formatted time string - 12:30, 5:56, etc.
 * @returns {number} Returns the absolute difference between the angles of the minute and hour hand.
 */
function wallclock(time_str) {
    let degree = 6;

    let parsed_time = time_str.split(":");

    let hour = parseInt(parsed_time[0]);
    if (hour === 12)
        hour = 0;

    let minute = parseInt(parsed_time[1]);

    let minute_degrees = minute * degree;

    // Get the percentage of the hour that has elapsed thusfar
    let percentage_of_hour_elapsed = (minute / 60).toFixed(2);

    // Turn the hour into minutes and add the percentage of the hour that has elapsed, as minutes
    let hour_as_minutes = ((hour * 5) + (percentage_of_hour_elapsed * 5)).toFixed(2);

    let hour_degrees = (hour_as_minutes * degree).toFixed(2);

    return Math.abs(hour_degrees - minute_degrees);
}

module.exports = wallclock;