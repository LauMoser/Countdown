let startTime, updatedTime, difference = 0, tInterval;
let running = false;
let lapCount = 0;

const playBtn = document.querySelector('[onclick="startStop()"]');
const pauseBtn = document.querySelector('[onclick="pause()"]');

function updateDisplay() {
  updatedTime = new Date().getTime() - startTime;
  let minutes = Math.floor((updatedTime % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((updatedTime % (1000 * 60)) / 1000);
  let milliseconds = Math.floor((updatedTime % 1000) / 10);

  document.getElementById('display').innerText =
    (minutes < 10 ? "0" : "") + minutes + ":" +
    (seconds < 10 ? "0" : "") + seconds + "." +
    (milliseconds < 10 ? "0" : "") + milliseconds;
}

function startStop() {
  if (!running) {
    startTime = new Date().getTime() - difference;
    tInterval = setInterval(updateDisplay, 10);
    running = true;
    
    playBtn.classList.add("active");
    pauseBtn.classList.remove("active");
  }
}

function pause() {
  if (running) {
    clearInterval(tInterval);
    difference = new Date().getTime() - startTime;
    running = false;

    pauseBtn.classList.add("active");
    playBtn.classList.remove("active");
  }
}

function reset() {
  clearInterval(tInterval);
  running = false;
  difference = 0;
  document.getElementById('display').innerText = "00:00.00";
  document.getElementById('laps').innerHTML = "";
  lapCount = 0;

  // limpa estado de todos os botões
  playBtn.classList.remove("active");
  pauseBtn.classList.remove("active");
}

function lap() {
  if (running) {
    lapCount++;
    const lapTime = document.getElementById('display').innerText;
    const lapElement = document.createElement("div");
    lapElement.className = "lap";
    lapElement.innerText = "⚑ " + lapCount + ": " + lapTime;
    document.getElementById('laps').prepend(lapElement);
  }
}
