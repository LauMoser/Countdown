# Countdown
This project was developed with the goal of creating a countdown. It is being developed as part of our Dynamic Application Development classes, under the guidance of Professor Rodolfo.

# Integrantes:
- Laura Melges Moser
- Gustavo Munhoz Adario Jovelli
- Seu nome

# Stopwatch
  - Constructor Parameters:
    - **display** → Element where the stopwatch time will be shown.  
    - **laps** → Container for lap records.  
    - **playBtn** → Button that starts the stopwatch.  
    - **pauseBtn** → Button that pauses the stopwatch.  

  - Properties:
    - **startTime** → Timestamp when the stopwatch starts.  
    - **updatedTime** → Elapsed time since start.  
    - **difference** → Accumulated time between pauses.  
    - **tInterval** → Interval ID used for updating the display.  
    - **running** → Indicates if the stopwatch is active.  
    - **lapCount** → Counter for the number of recorded laps.  

  - Methods:
    - **updateDisplay()** → Updates the stopwatch display (minutes, seconds, milliseconds).  
    - **start()** → Starts or resumes the stopwatch.  
    - **pause()** → Pauses the stopwatch and saves elapsed time.  
    - **reset()** → Resets the stopwatch to initial state (`00:00.00`).  
    - **lap()** → Records the current time as a lap.

# WorldClock
  - Constructor Parameters:
    - **display** → HTML element where the current time will be displayed.

  - Properties:
    - **display** → Reference to the HTML element showing the time.
    - **timezone** → Timezone used for fetching accurate time. *(Default: `"America/Sao_Paulo"`)*.
    - **interval** → ID of the interval used to update the clock periodically.

  - Methods:
    - **constructor(display)**:
      - Initializes the clock with the local system time.
      - Updates the time every second using `setInterval`.
      - Calls **`syncWithAPI()`** to synchronize with the World Time API.
    - **syncWithAPI()**: 
      - Synchronizes the clock with the [World Time API](https://worldtimeapi.org/).
      - Sends a `fetch` request to get the accurate time based on the configured timezone.
      - Updates the display with the fetched time.
      - Restarts the interval to keep updating the display every second using API data.
      - If the API request fails, the clock keeps showing the local system time.
