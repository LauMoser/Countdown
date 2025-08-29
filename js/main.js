import { Stopwatch } from "./stopwatch.js";
import { Timer } from "./timer.js";
import { WorldClock } from "./worldclock.js";

let mode = null;
let instance = null;

const display = document.getElementById("display");
const laps = document.getElementById("laps");
const playBtn = document.querySelector('[onclick="action(\'start\')"]');
const pauseBtn = document.querySelector('[onclick="action(\'pause\')"]');
const timerInputBox = document.getElementById("timer-input-box");
const timerInput = document.getElementById("timer-input");

const alarm = new Audio("alarme.mp4");

// Converte HH:MM:SS em segundos
function parseTimeInput(value) {
  const parts = value.split(":").map(Number);
  let h = parts[0] || 0;
  let m = parts[1] || 0;
  let s = parts[2] || 0;
  return h * 3600 + m * 60 + s;
}

// Reseta visual dos botões
function resetButtons() {
  const buttons = document.querySelectorAll(".buttons .btn");
  buttons.forEach(btn => {
    btn.style.backgroundColor = "";
    btn.style.cursor = "pointer";
    btn.disabled = false;
  });
}

// Seleção do modo
function setMode(newMode) {
  // Limpa instância anterior
  if (instance) {
    if (instance.interval) clearInterval(instance.interval);
    if (instance.reset) instance.reset();
  }

  resetButtons(); // remove cinza dos botões
  mode = newMode;

  if (mode === "stopwatch") {
    timerInputBox.style.display = "none";
    instance = new Stopwatch(display, laps, playBtn, pauseBtn);

  } else if (mode === "timer") {
    timerInputBox.style.display = "block";
    const value = timerInput.value.trim();
    if (!/^\d{2}:\d{2}:\d{2}$/.test(value)) {
      alert("Por favor, preencha o tempo no formato HH:MM:SS.");
      instance = null;
      return;
    }
    const totalSeconds = parseTimeInput(value);
    if (totalSeconds <= 0) {
      alert("O tempo precisa ser maior que zero!");
      instance = null;
      return;
    }
    instance = new Timer(display, playBtn, pauseBtn, totalSeconds, alarm, laps);

  } else if (mode === "worldclock") {
    timerInputBox.style.display = "none";
    instance = new WorldClock(display);

    // Deixa os botões cinza e desativados
    const buttons = document.querySelectorAll(".buttons .btn");
    buttons.forEach(btn => {
      btn.style.backgroundColor = "#ccc";
      btn.style.cursor = "not-allowed";
      btn.disabled = true;
    });
  }
}

// Atualiza Timer imediatamente ao alterar input
timerInput.addEventListener("input", () => {
  if (mode !== "timer" || !instance) return;

  const value = timerInput.value.trim();
  const regex = /^\d{2}:\d{2}:\d{2}$/;
  if (!regex.test(value)) return;

  const totalSeconds = parseTimeInput(value);
  if (totalSeconds <= 0) return;

  instance.updateTime(totalSeconds);
});

// Funções globais para os botões
function action(type) {
  if (!mode) {
    alert("Selecione um dos modos primeiro: Cronômetro, Timer ou Relógio.");
    return;
  }

  if (!instance) return;

  if (type === "start") instance.start();
  if (type === "pause") instance.pause();
  if (type === "reset") instance.reset();
  if (type === "lap") instance.lap();
}


// Torna funções acessíveis no HTML
window.setMode = setMode;
window.action = action;
