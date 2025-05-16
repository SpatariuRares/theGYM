### grafico
```dataviewjs
// All'interno della tua nota di Allenamento
await dv.view("theGYM/Scripts/VolumeChartTemplate", {
    input: {
        chartType: "workout",  
        workoutPath: dv.current().file.path, 
    }
});
```
## Hack Squat Machine:

### 3-4 serie x 10-15 ripetizioni (Recupero: 90s)

```dataviewjs
await dv.view("theGYM/Scripts/ExerciseLogTable", {
    input: {
        exercise: "Hack Squat Machine",
        limit: 12,
        searchByName: true,
        workout: dv.current().file.path,
    }
});
```

## Hip Thrust:

### 4 serie x 10-15 ripetizioni (Recupero: 90 s)

```dataviewjs
// Utilizzo corretto per Leg Press
await dv.view("theGYM/Scripts/ExerciseLogTable", {
    input: {
        exercise: "Hip Thrust",
        limit: 12,
        searchByName: true,
        workout: dv.current().file.path,
    }
});
```
