class Timer {
  constructor() {
    this.hoursInput = null;
    this.minutesInput = null;
    this.secondsInput = null;
    this.runBtn = null;
    this.editBtn = null;
    this.resetBtn = null;
    this.alarm = null;
    this.clockImg = null;
    this.timeInput = null;
    this.start = null;
    this.stop = null;
    this.edit = null;
    this.done = null;

    // this.isStart = true;
    this.isEdit = true;

    this.isCounting = false;

    this.interval = null;

    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;
    this.totalTime = 0;
    this.currentTime = 0;

    this.maxSeconds = 60;
    this.maxMinutes = 60;
    this.maxHours = 24;
    this.maxTime =
      this.maxHours * 3600 + (this.maxMinutes - 1) * 60 + this.maxSeconds - 1;

    this.selectors = {
      hours: "#hours",
      minutes: "#minutes",
      seconds: "#seconds",
      runStop: "[data-start-stop]",
      editBtn: "[data-edit-btn]",
      reset: "[data-reset]",
      alarm: "[data-alarm]",
      clockImg: "[data-clock-img]",
      timeInput: "[data-timer-input]",
      start: "[data-start]",
      stop: "[data-stop]",
      edit: "[data-edit]",
      done: "[data-done]",
    };
  }

  initializeTimer() {
    this.hoursInput = document.querySelector(this.selectors.hours);
    this.minutesInput = document.querySelector(this.selectors.minutes);
    this.secondsInput = document.querySelector(this.selectors.seconds);
    this.runBtn = document.querySelector(this.selectors.runStop);
    this.editBtn = document.querySelector(this.selectors.editBtn);
    this.resetBtn = document.querySelector(this.selectors.reset);
    this.alarm = document.querySelector(this.selectors.alarm);
    this.clockImg = document.querySelector(this.selectors.clockImg);
    this.timeInputs = document.querySelectorAll(this.selectors.timeInput);
    this.start = document.querySelector(this.selectors.start);
    this.stop = document.querySelector(this.selectors.stop);
    this.edit = document.querySelector(this.selectors.edit);
    this.done = document.querySelector(this.selectors.done);

    this.addEventListeners();
  }

  addEventListeners() {
    this.runBtn.addEventListener("click", () => this.runTime());
    this.editBtn.addEventListener("click", () => this.editTime());
    this.resetBtn.addEventListener("click", () => this.resetTimer());

    this.timeInputs.forEach((input) =>
      input.addEventListener(
        "keyup",
        (e) => e.keyCode === 13 && this.editTime()
      )
    );
  }

  runTime() {
    this.isCounting = !this.isCounting;

    if (this.isCounting) {
      this.start.classList.add("hide");
      this.stop.classList.remove("hide");

      this.interval = setInterval(() => this.updateTime(), 1000);
      this.editBtn.setAttribute("disabled", "");
    } else {
      this.start.classList.remove("hide");
      this.stop.classList.add("hide");

      clearInterval(this.interval);
      this.stopAlarm();
    }
  }

  editTime() {
    this.isEdit = !this.isEdit;

    if (this.isEdit) {
      this.isCounting = false;
      clearInterval(this.interval);

      this.done.classList.remove("hide");
      this.edit.classList.add("hide");

      this.timeInputs.forEach((timeInput) => {
        timeInput.removeAttribute("disabled");
      });
      this.runBtn.setAttribute("disabled", "");

      this.getTimerValues();
      this.setTimerValues();
    } else {
      this.done.classList.add("hide");
      this.edit.classList.remove("hide");

      this.timeInputs.forEach((timeInput) => {
        timeInput.setAttribute("disabled", "");
      });
      this.runBtn.removeAttribute("disabled");

      this.getTimerValues();
      this.setTimerValues();
    }
  }

  getTimerValues() {
    this.hours = parseInt(this.hoursInput.value, 10);
    this.minutes = parseInt(this.minutesInput.value, 10);
    this.seconds = parseInt(this.secondsInput.value, 10);

    this.countTotalTime();
  }

  setTimerValues() {
    const seconds = `0${this.currentTime % this.maxSeconds}`;
    const minutes = `0${Math.floor(this.currentTime / 60) % this.maxMinutes}`;
    const hours = `0${Math.floor(this.currentTime / 3660) % this.maxHours}`;

    this.secondsInput.value = seconds.slice(-2);
    this.minutesInput.value = minutes.slice(-2);
    this.hoursInput.value = hours.slice(-2);
  }

  countTotalTime() {
    const timeSum = this.seconds + this.minutes * 60 + this.hours * 3600;
    this.totalTime = timeSum <= this.maxTime ? timeSum : this.maxTime;

    this.currentTime = this.totalTime;
  }

  updateTime() {
    if (this.currentTime) {
      this.currentTime--;
      this.setTimerValues();
      return;
    }
    clearInterval(this.interval);
    this.alarm.play();
    this.clockImg.classList.add("alarm-img");

    this.editBtn.setAttribute("disabled", "");
    this.resetBtn.setAttribute("disabled", "");
  }

  stopAlarm() {
    this.alarm.pause();
    this.clockImg.classList.remove("alarm-img");

    this.editBtn.removeAttribute("disabled");
    this.resetBtn.removeAttribute("disabled");
  }

  resetTimer() {
    this.currentTime = this.totalTime;
    this.setTimerValues();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const timer = new Timer();
  timer.initializeTimer();
});
