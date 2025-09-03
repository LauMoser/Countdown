export class WorldClock {
  constructor(display) {
    this.display = display;
    this.timezone = "America/Sao_Paulo";
    this.interval = null;

    const now = new Date();
    this.display.innerText = now.toLocaleTimeString("pt-BR");

    this.interval = setInterval(() => {
      const now = new Date();
      this.display.innerText = now.toLocaleTimeString("pt-BR");
    }, 1000);

    this.syncWithAPI();
  }

  async syncWithAPI() {
    try {
      const response = await fetch(`https://worldtimeapi.org/api/timezone/${this.timezone}`);
      const data = await response.json();
      const apiTime = new Date(data.datetime);

      clearInterval(this.interval); 
      this.display.innerText = apiTime.toLocaleTimeString("pt-BR");

      this.interval = setInterval(async () => {
        try {
          const res = await fetch(`https://worldtimeapi.org/api/timezone/${this.timezone}`);
          const d = await res.json();
          const t = new Date(d.datetime);
          this.display.innerText = t.toLocaleTimeString("pt-BR");
        } catch {
        }
      }, 1000);
    } catch {
    }
  }

  start() {}
  pause() {}
  reset() {}
  lap() {}
}
