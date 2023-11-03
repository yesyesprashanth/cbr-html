  
function updateCountdown() {
    const targetDate = new Date('2023-12-14T00:00:00Z').getTime();
    const now = new Date().getTime();
    const timeRemaining = targetDate - now;
  
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
  
    document.querySelector('.days').textContent = days;
    document.querySelector('.hours').textContent = hours;
    document.querySelector('.minutes').textContent = minutes;
    document.querySelector('.seconds').textContent = seconds;
  }
  
  // Update the countdown initially
  updateCountdown();
  
  // Update the countdown every second (1000 milliseconds)
  setInterval(updateCountdown, 1000);