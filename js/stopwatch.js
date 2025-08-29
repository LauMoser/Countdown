export class Stopwatch {
  constructor(display, laps, playBtn, pauseBtn) {
    this.display = display;
    this.laps = laps;
    this.playBtn = playBtn;
    this.pauseBtn = pauseBtn;

    this.startTime = 0;
    this.updatedTime = 0;
    this.difference = 0;
    this.tInterval = null;
    this.running = false;
    this.lapCount = 0;
  }

  updateDisplay() {
    this.updatedTime = new Date().getTime() - this.startTime;
    let minutes = Math.floor((this.updatedTime % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((this.updatedTime % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((this.updatedTime % 1000) / 10);

    this.display.innerText =
      (minutes < 10 ? "0" : "") + minutes + ":" +
      (seconds < 10 ? "0" : "") + seconds + "." +
      (milliseconds < 10 ? "0" : "") + milliseconds;
  }

  start() {
    if (!this.running) {
      this.startTime = new Date().getTime() - this.difference;
      this.tInterval = setInterval(() => this.updateDisplay(), 10);
      this.running = true;

      this.playBtn.classList.add("active");
      this.pauseBtn.classList.remove("active");
    }
  }

  pause() {
    if (this.running) {
      clearInterval(this.tInterval);
      this.difference = new Date().getTime() - this.startTime;
      this.running = false;

      this.pauseBtn.classList.add("active");
      this.playBtn.classList.remove("active");
    }
  }

  reset() {
    clearInterval(this.tInterval);
    this.running = false;
    this.difference = 0;
    this.display.innerText = "00:00.00";
    this.laps.innerHTML = "";
    this.lapCount = 0;

    this.playBtn.classList.remove("active");
    this.pauseBtn.classList.remove("active");
  }

  lap() {
    this.lapCount++;
    const lapTime = this.display.innerText;
    const lapElement = document.createElement("div");
    lapElement.className = "lap";
    lapElement.innerText = "⚑ " + this.lapCount + ": " + lapTime;
    this.laps.prepend(lapElement);
  }
}

