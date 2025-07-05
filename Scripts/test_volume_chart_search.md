# Test Volume Chart Search System

Questo file serve per testare il nuovo sistema di ricerca avanzato del VolumeChartTemplate.js.

## Test 1: Ricerca Base per Esercizio

```dataviewjs
await dv.view("theGYM/Scripts/VolumeChartTemplate", {
    input: {
        chartType: "exercise",
        exercisePath: "theGYM/Esercizi/Data/Cable Kickback.md",
        title: "Test Ricerca Base - Panca Piana",
        debug: true
    }
});
```

## Test 2: Ricerca con Matching Esatto

```dataviewjs
await dv.view("theGYM/Scripts/VolumeChartTemplate", {
    input: {
        chartType: "exercise",
        exercisePath: "theGYM/Esercizi/Data/Cable Kickback.md",
        exactMatch: true,
        title: "Test Matching Esatto - Panca Piana",
        debug: true
    }
});
```

## Test 3: Ricerca per Workout

```dataviewjs
await dv.view("theGYM/Scripts/VolumeChartTemplate", {
    input: {
        chartType: "workout",
        workoutPath: "theGYM/Workouts/esempio/esempio.md",
        title: "Test Ricerca Workout",
        debug: true
    }
});
```

## Test 4: Ricerca con Parametri Avanzati

```dataviewjs
await dv.view("theGYM/Scripts/VolumeChartTemplate", {
    input: {
        chartType: "exercise",
        exercisePath: "theGYM/Esercizi/Data/Cable Kickback.md",
        exactMatch: false,
        limit: 100,
        showTrend: true,
        showStats: true,
        title: "Test Parametri Avanzati - Squat",
        debug: true
    }
});
```

## Note di Test

Il nuovo sistema di ricerca dovrebbe:

1. **Calcolare punteggi di corrispondenza** tra nomi di esercizi
2. **Cercare sia per nome file che per campo Esercizio** nei log
3. **Usare strategie multiple** (field vs filename matching)
4. **Supportare matching esatto e flessibile**
5. **Determinare automaticamente** la migliore strategia di ricerca
6. **Mostrare il metodo di ricerca utilizzato** nel footer

Con `debug: true`, dovresti vedere nei log della console:

- I punteggi di corrispondenza calcolati
- Le strategie di ricerca valutate
- La strategia finale scelta
- I dettagli dei file trovati
