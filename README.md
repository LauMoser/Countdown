# Countdown
This project was developed with the goal of creating a countdown. It is being developed as part of our Dynamic Application Development classes, under the guidance of Professor Rodolfo.

# Integrantes:
- Laura Melges Moser
- Seu nome
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
