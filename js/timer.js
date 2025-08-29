export class Timer {
  constructor(display, playBtn, pauseBtn, totalSeconds = 60, alarm = null, lapsDiv = null) {
    this.display = display;
    this.playBtn = playBtn;
    this.pauseBtn = pauseBtn;
    this.alarm = alarm;
    this.lapsDiv = lapsDiv;

    this.initialTime = totalSeconds;  // tempo definido pelo usuário
    this.time = totalSeconds; 
    this.interval = null;
    this.running = false;
    this.lapCount = 0;

    this.updateDisplay();
  }

  updateDisplay() {
    let h = String(Math.floor(this.time / 3600)).padStart(2, "0");
    let m = String(Math.floor((this.time % 3600) / 60)).padStart(2, "0");
    let s = String(this.time % 60).padStart(2, "0");
    this.display.innerText = `${h}:${m}:${s}`;
  }

  start() {
    if (this.running) return; // impede múltiplos intervalos
    if (this.time <= 0) return; // não inicia se o tempo acabou

    this.running = true;
    this.interval = setInterval(() => {
      if (this.time <= 0) {
        clearInterval(this.interval);
        this.running = false;
        this.updateDisplay();
        if (this.alarm) {
          this.alarm.currentTime = 0;
          this.alarm.play();
        }
        alert("Tempo esgotado!");
      } else {
        this.time--;
        this.updateDisplay();
      }
    }, 1000);

    this.playBtn.classList.add("active");
    this.pauseBtn.classList.remove("active");
  }

  pause() {
    if (!this.running) return;
    clearInterval(this.interval);
    this.running = false;

    this.pauseBtn.classList.add("active");
    this.playBtn.classList.remove("active");
  }

 reset() {
  clearInterval(this.interval);
  this.running = false;
  this.lapCount = 0;          // limpa contagem de laps
  this.time = this.initialTime;
  this.updateDisplay();

  this.playBtn.classList.remove("active");
  this.pauseBtn.classList.remove("active");

  if (this.lapsDiv) this.lapsDiv.innerHTML = ""; // limpa laps
}


  lap() {
    if (!this.running || !this.lapsDiv) return;

    this.lapCount++;
    const lapElement = document.createElement("div");
    lapElement.className = "lap";
    lapElement.innerText = `⚑ ${this.lapCount}: ${this.display.innerText}`;
    this.lapsDiv.prepend(lapElement);
  }

  // Método para atualizar o tempo quando o usuário altera o input
  updateTime(newTotalSeconds) {
    this.initialTime = newTotalSeconds; // redefine o tempo inicial
    this.time = newTotalSeconds;        // atualiza o tempo atual
    this.updateDisplay();
  }
}
