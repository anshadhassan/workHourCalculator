document.addEventListener('DOMContentLoaded', function () {
  const entryTimeInput = document.getElementById('entryTime');
  const calculateExitTimeBtn = document.getElementById('calculateExitTime');
  const exitTimeResult = document.getElementById('exitTimeResult');
  const spentTimeResult = document.getElementById('spentTimeResult');
  const remainingTimeResult = document.getElementById('remainingTimeResult');

  calculateExitTimeBtn.addEventListener('click', function () {
    const entryTime = entryTimeInput.value;
    if (entryTime) {
      const { exitTime, hoursRemaining, hoursSpent, isCompleted } = calculateExitTime(entryTime);
      exitTimeResult.textContent = `Exit Time: ${exitTime}`;
      spentTimeResult.textContent = `Spent Time: ${hoursSpent}`;
      remainingTimeResult.textContent = isCompleted ?   `Turn off your system and RUN!!!` : `Remaining Time: ${hoursRemaining}`;
      console.log('isCompleted', isCompleted)
      if (isCompleted) {
        document.getElementById('animatedElement').classList.add('animation-triggered');
        console.log('is completed 8:30 hours')
      }
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
    const hoursSpent = Math.abs(currentTime.getHours() - entryTimeObj.getHours());
    const minutesSpent = Math.abs(currentTime.getMinutes() - entryTimeObj.getMinutes());
    const finalMinutesSpent = String(minutesSpent).length < 2 ? '0' + minutesSpent : minutesSpent 
    const finalHoursSpent = String(hoursSpent).length < 2 ? '0' + hoursSpent : hoursSpent
    
    const hoursRemaining = Math.abs(exitTimeObj.getHours() - currentTime.getHours());
    const minuteRemaining = Math.abs(exitTimeObj.getMinutes() - currentTime.getMinutes());
    const finalMinutesRemaining = String(minuteRemaining).length < 2 ? '0' + minuteRemaining : minuteRemaining 
    const finalHoursRemaining = String(hoursRemaining).length < 2 ? '0' + hoursRemaining : hoursRemaining



    // Format exit time as HH:mm AM/PM
    const formattedExitTime = exitTimeObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

    let isCompleted = false
    if(hoursSpent >= 8) {
      let minute = hoursSpent*60
      isCompleted = minutesSpent + minute > 510  ? true : false
    }

    return { 
      exitTime: formattedExitTime, 
      hoursRemaining: `${finalHoursRemaining}:${finalMinutesRemaining}`, 
      hoursSpent: `${finalHoursSpent}:${finalMinutesSpent}`,
      isCompleted
    };
  }
});