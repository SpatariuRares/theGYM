# VolumeChartTemplate.js - Aggiornamenti Sistema di Ricerca

## Versione 1.5 (17 Maggio 2025) - Enhanced Search System

### 🎯 Obiettivo

Integrare il sistema di ricerca avanzato di ExerciseLogTable.js nel VolumeChartTemplate.js per migliorare la precisione e l'affidabilità nella ricerca degli esercizi.

### 🔄 Modifiche Principali

#### 1. **Sistema di Ricerca Avanzato**

- **Prima**: Ricerca semplice con `includes()` sul nome dell'esercizio
- **Dopo**: Sistema di ricerca intelligente con punteggi di corrispondenza

#### 2. **Nuove Funzioni Aggiunte**

- `getMatchScore()`: Calcola punteggi di corrispondenza tra stringhe
- `findExerciseMatches()`: Analizza pagine per trovare corrispondenze
- `determineExerciseFilterStrategy()`: Determina la migliore strategia di filtraggio
- `filterPagesByExercise()`: Filtra pagine in base alla strategia scelta

#### 3. **Nuove Costanti**

- `PATH_MATCH_THRESHOLD = 70`: Soglia per il matching del campo Esercizio
- `NO_EXERCISE_SPECIFIED = "Esercizio Non Specificato"`: Valore di default

#### 4. **Nuovi Parametri**

- `exactMatch` (Booleano): Matching più stringente per il nome del file
- `filterMethodUsed`: Informazione sul metodo di ricerca utilizzato

### 🚀 Funzionalità del Nuovo Sistema

#### **Calcolo Punteggi di Corrispondenza**

```javascript
// Esempi di punteggi:
"Panca Piana" vs "Panca Piana" = 100 (match perfetto)
"Panca Piana" vs "Panca Piana Inclinata" = 90 (inizia con)
"Panca Piana" vs "Inclinata Panca Piana" = 80 (finisce con)
"Panca Piana" vs "Panca Piana con Manubri" = 70 (contiene come parola)
"Panca Piana" vs "PancaPiana" = 60 (contiene)
```

#### **Strategie di Ricerca**

1. **Field Strategy**: Cerca nel campo `Esercizio::` dei log
2. **Filename Strategy**: Cerca nel nome dei file di log
3. **Automatic Selection**: Sceglie la strategia migliore in base ai punteggi

#### **Matching Intelligente**

- **Flessibile**: Trova corrispondenze parziali
- **Esatto**: Richiede punteggi ≥ 90 (con `exactMatch: true`)

### 📊 Miglioramenti nella Ricerca

#### **Prima (Sistema Semplice)**

```javascript
// Ricerca con includes() - imprecisa
.where((p) => {
  const esercizioValue = p.Esercizio?.path || p.Esercizio || "";
  return esercizioValue.toLowerCase().includes(exerciseName);
})
```

#### **Dopo (Sistema Avanzato)**

```javascript
// Ricerca con punteggi e strategie multiple
const matchesResult = findExerciseMatches(allLogPages, exerciseName, dv, debug);
const { bestStrategy, bestPathKey, bestFileMatchesList } =
  determineExerciseFilterStrategy(
    matchesResult.fileNameMatches,
    matchesResult.allExercisePathsAndScores,
    exactMatch,
    debug,
    PATH_MATCH_THRESHOLD
  );
pages = filterPagesByExercise(
  allLogPages,
  bestStrategy,
  bestPathKey,
  bestFileMatchesList
);
```

### 🔧 Utilizzo

#### **Ricerca Base**

```dataviewjs
await dv.view("theGYM/Scripts/VolumeChartTemplate", {
    input: {
        chartType: "exercise",
        exercisePath: "theGYM/Esercizi/Data/Panca Piana.md",
        title: "Trend Volume Panca Piana"
    }
});
```

#### **Ricerca con Matching Esatto**

```dataviewjs
await dv.view("theGYM/Scripts/VolumeChartTemplate", {
    input: {
        chartType: "exercise",
        exercisePath: "theGYM/Esercizi/Data/Panca Piana.md",
        exactMatch: true,
        debug: true,
        title: "Panca Piana - Matching Esatto"
    }
});
```

### 📈 Benefici

1. **Maggiore Precisione**: Trova esercizi anche con variazioni nel nome
2. **Migliore Affidabilità**: Riduce falsi positivi e negativi
3. **Trasparenza**: Mostra il metodo di ricerca utilizzato
4. **Flessibilità**: Supporta diversi tipi di matching
5. **Debugging**: Log dettagliati per troubleshooting

### 🧪 Test

Utilizza il file `test_volume_chart_search.md` per testare le nuove funzionalità:

```dataviewjs
// Test con debug attivato
await dv.view("theGYM/Scripts/VolumeChartTemplate", {
    input: {
        chartType: "exercise",
        exercisePath: "theGYM/Esercizi/Data/Panca Piana.md",
        debug: true,
        exactMatch: false
    }
});
```

### 📝 Log di Debug

Con `debug: true`, vedrai nei log della console:

- Punteggi di corrispondenza calcolati
- Strategie di ricerca valutate
- Strategia finale scelta
- Dettagli dei file trovati
- Metodo di ricerca utilizzato

### 🔄 Compatibilità

- ✅ **Retrocompatibile**: Tutti i parametri esistenti funzionano
- ✅ **Workout Charts**: Nessuna modifica per i grafici di allenamento
- ✅ **Esercizio Charts**: Miglioramento significativo per i grafici di esercizi
- ✅ **Parametri Opzionali**: Nuovi parametri sono opzionali

### 📋 Checklist Implementazione

- [x] Integrazione funzioni di ricerca avanzata
- [x] Aggiornamento `fetchLogPagesAndTitle()`
- [x] Aggiunta parametro `exactMatch`
- [x] Aggiunta parametro `filterMethodUsed`
- [x] Aggiornamento documentazione
- [x] Aggiunta esempi di utilizzo
- [x] Creazione file di test
- [x] Aggiornamento versione (1.5)
- [x] Footer informativo con metodo di ricerca
