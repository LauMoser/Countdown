export class WorldClock {
  constructor(display) {
    this.display = display;
    this.timezone = "America/Sao_Paulo"; // fuso de Brasília
    this.interval = null;

    alert("Exibindo o horário do fuso de Brasília.");

    // Atualiza a hora imediatamente e depois a cada segundo
    this.updateDisplay();
    this.interval = setInterval(() => this.updateDisplay(), 1000);
  }

  async updateDisplay() {
    try {
      const response = await fetch(`https://worldtimeapi.org/api/timezone/${this.timezone}`);
      const data = await response.json();
      const time = new Date(data.datetime);
      this.display.innerText = time.toLocaleTimeString("pt-BR");
    } catch {
      this.display.innerText = "Erro ao carregar horário";
    }
  }

  // Botões não fazem nada
  start() {}
  pause() {}
  reset() {}
  lap() {}
}
