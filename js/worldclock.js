export class WorldClock {
  constructor(display) {
    this.display = display;
    this.timezone = "America/Sao_Paulo";
    this.interval = null;

    // Mostra a hora local imediatamente
    const now = new Date();
    this.display.innerText = now.toLocaleTimeString("pt-BR");

    // Inicia a atualização do display local a cada segundo
    this.interval = setInterval(() => {
      const now = new Date();
      this.display.innerText = now.toLocaleTimeString("pt-BR");
    }, 1000);

    // Tenta sincronizar com API em background
    this.syncWithAPI();
  }

  async syncWithAPI() {
    try {
      const response = await fetch(`https://worldtimeapi.org/api/timezone/${this.timezone}`);
      const data = await response.json();
      const apiTime = new Date(data.datetime);

      // Atualiza a hora exibida para Brasília
      clearInterval(this.interval); // remove o update local
      this.display.innerText = apiTime.toLocaleTimeString("pt-BR");

      // Atualiza de segundo em segundo com a API
      this.interval = setInterval(async () => {
        try {
          const res = await fetch(`https://worldtimeapi.org/api/timezone/${this.timezone}`);
          const d = await res.json();
          const t = new Date(d.datetime);
          this.display.innerText = t.toLocaleTimeString("pt-BR");
        } catch {
          // Se falhar, mantém a última hora conhecida
        }
      }, 1000);

    } catch {
      // Se falhar, continua mostrando hora local e evita erro
    }
  }

  start() {}
  pause() {}
  reset() {}
  lap() {}
}
