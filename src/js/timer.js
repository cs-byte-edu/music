const MS_PER_DAY = 8.64e7;
const MS_PER_HOUR = 3.6e6;
const MS_PER_MINUTE = 60000;
const MS_PER_SECOND = 1000;

function renderTimer(time, container) {
  const { days, hours, minutes, seconds } = time;

  container.innerHTML = `
    <div class="timer__item">
      <div class="timer__value">
        ${days}
      </div><div class="timer__label">d</div>
    </div>
    <div class="timer__item">
      <div class="timer__value">
        ${`${hours}`.padStart(2, "0")}
      </div><div class="timer__label">h</div>
    </div>
    <div class="timer__item">
      <div class="timer__value">
        ${`${minutes}`.padStart(2, "0")}
      </div><div class="timer__label timer__label_lg">m</div>
    </div>
    <div class="timer__item">
      <div class="timer__value timer__seconds">
        ${`${seconds}`.padStart(2, "0")}
      </div><div class="timer__label">s</div>
    </div>
  `;
}

function calculateElapsedTime(endTime) {
  const distance = endTime - new Date().getTime();

  return {
    days: Math.floor(distance / MS_PER_DAY),
    hours: Math.floor((distance % MS_PER_DAY) / MS_PER_HOUR),
    minutes: Math.floor((distance % MS_PER_HOUR) / MS_PER_MINUTE),
    seconds: Math.floor((distance % MS_PER_MINUTE) / MS_PER_SECOND),
  };
}

export function initTimer(endDate, container) {
  const { days, hours, minutes, seconds } = endDate;

  const endTime =
    new Date().getTime() +
    days * MS_PER_DAY +
    hours * MS_PER_HOUR +
    minutes * MS_PER_MINUTE +
    seconds * MS_PER_SECOND;

  function updateTimer() {
    const distance = calculateElapsedTime(endTime);

    if (distance < 0) {
      clearInterval(intervalID);
      return;
    }

    renderTimer(distance, container);
  }

  updateTimer();

  const intervalID = setInterval(updateTimer, 1000);
}
