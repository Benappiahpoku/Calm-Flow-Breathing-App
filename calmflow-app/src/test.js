const dayStartHour = 6; // 6:00 AM
const hoursInRange = 5; // 6:00 AM to 11:00 AM

// Generate a random hour and minute
const randomHour = Math.floor(Math.random() * hoursInRange);
const randomMinute = Math.floor(Math.random() * 60);

// Add the random hour and minute to dayStartHour
const randomTimeHour = dayStartHour + randomHour;
const randomTimeMinute = randomMinute;

console.log(`Random time: ${randomTimeHour}:${randomTimeMinute}`);
