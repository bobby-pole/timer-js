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

    this.isStart = true;

    this.selectors = {
      hours: "hours",
      minutes: " minutes",
      seconds: "seconds",
      runStop: "[data-start-stop]",
      edit: "[data-edit]",
      reset: "[data-reset]",
      alarm: "[data-alarm]",
      clockImg: "[data-clock-img]",
      timeInput: "[data-timer-input]",
      start: "[data-start]",
      stop: "[data-stop]",
    };
  }

  initializeTimer() {
    this.hoursInput = document.querySelector(this.selectors.hours);
    this.minutesInput = document.querySelector(this.selectors.minutes);
    this.secondsInput = document.querySelector(this.selectors.seconds);
    this.runBtn = document.querySelector(this.selectors.runStop);
    this.editBtn = document.querySelector(this.selectors.edit);
    this.resetBtn = document.querySelector(this.selectors.reset);
    this.alarm = document.querySelector(this.selectors.alarm);
    this.clockImg = document.querySelector(this.selectors.clockImg);
    // this.timeInputs = document.querySelectorALL(this.selectors.timeInput);
    this.start = document.querySelector(this.selectors.start);
    this.stop = document.querySelector(this.selectors.stop);

    this.addEventListeners();
  }

  addEventListeners() {
    this.runBtn.addEventListener("click", () => this.runTime());
  }

  runTime() {
    this.isStart = !this.isStart;

    if (this.isStart) {
      this.start.classList.remove("hide");
      this.stop.classList.add("hide");
    } else {
      this.start.classList.add("hide");
      this.stop.classList.remove("hide");
    }
  }
}
