document.addEventListener('DOMContentLoaded', function () {
  const entryTimeInput = document.getElementById('entryTime');
  const calculateExitTimeBtn = document.getElementById('calculateExitTime');
  const exitTimeResult = document.getElementById('exitTimeResult');
  const spentTimeResult = document.getElementById('spentTimeResult');
  const remainingTimeResult = document.getElementById('remainingTimeResult');

  calculateExitTimeBtn.addEventListener('click', function () {
    const entryTime = entryTimeInput.value;
    if (entryTime) {
      const { exitTime, hoursRemaining, hoursSpent } = calculateExitTime(entryTime);
      exitTimeResult.textContent = `Exit Time: ${exitTime}`;
      spentTimeResult.textContent = `Spent Time: ${hoursSpent}`;
      remainingTimeResult.textContent = `Remaining Time: ${hoursRemaining}`;
    } else {
      exitTimeResult.textContent = 'Please enter the entry time.';
    }
  });

  function calculateExitTime(entryTime) {
    // Parse entry time and add 8 hours and 30 minutes
    const currentTime = new Date();
    const date = currentTime.getDate();
    const month = currentTime.getMonth();
    const year = currentTime.getFullYear();

    console.log(date, month, year)

    const entryTimeObj = new Date(`${year}-${month}-${date} ${entryTime}`);

    console.log(entryTimeObj)
    const exitTimeObj = new Date(entryTimeObj.getTime() + 8 * 60 * 60 * 1000 + 30 * 60 * 1000);
   
    // Calculate hours remaining and hours spent
    const hoursRemaining = Math.abs(exitTimeObj.getHours() - currentTime.getHours());
    const minuteRemaining = Math.abs(exitTimeObj.getMinutes() - currentTime.getMinutes());
    const finalMinutesRemaining = String(minuteRemaining).length < 2 ? '0' + minuteRemaining : minuteRemaining 
    const finalHoursRemaining = String(hoursRemaining).length < 2 ? '0' + hoursRemaining : hoursRemaining

    const hoursSpent = Math.abs(currentTime.getHours() - entryTimeObj.getHours());
    const minutesSpent = Math.abs(currentTime.getMinutes() - entryTimeObj.getMinutes());
    const finalMinutesSpent = String(minutesSpent).length < 2 ? '0' + minutesSpent : minutesSpent 
    const finalHoursSpent = String(hoursSpent).length < 2 ? '0' + hoursSpent : hoursSpent

    // Format exit time as HH:mm AM/PM
    const formattedExitTime = exitTimeObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    console.log('hoursRemaining', `${hoursSpent}:${minutesSpent}`)

    return { 
      exitTime: formattedExitTime, 
      hoursRemaining: `${finalHoursRemaining}:${finalMinutesRemaining}`, 
      hoursSpent: `${finalHoursSpent}:${finalMinutesSpent}`
    };
  }
});