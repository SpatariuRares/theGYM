/*
--------------------------------------------------------------------------------
SCRIPT: VolumeChartTemplate.js
VERSIONE: 1.5 (17 Maggio 2025) - Enhanced Search System
AUTORE: Gemini & Rares
DESCRIZIONE:
Questo script DataviewJS genera un grafico dell'andamento del volume per un singolo
esercizio o per l'intero volume di un allenamento, basandosi sui dati di log
presenti nella cartella "theGYM/Log/Data".

REQUISITI:
1. Plugin Dataview installato e abilitato.
2. Plugin Obsidian Charts (o un'altra libreria che fornisca window.renderChart)
   installato e abilitato per la visualizzazione dei grafici. In caso contrario,
   verrà mostrata una tabella di fallback.

SISTEMA DI RICERCA AVANZATO:
Lo script utilizza un sistema di ricerca intelligente che:
- Calcola punteggi di corrispondenza tra nomi di esercizi
- Cerca sia per nome file che per campo Esercizio nei log
- Usa strategie multiple (field vs filename matching)
- Supporta matching esatto e flessibile
- Determina automaticamente la migliore strategia di ricerca

COME USARLO:
Incorporare questo script in una nota utilizzando un blocco di codice DataviewJS:

```dataviewjs
// Esempio di chiamata allo script
await dv.view("theGYM/Scripts/VolumeChartTemplate", {
    input: {
        chartType: "exercise", // o "workout"
        // Altri parametri opzionali qui sotto
    }
});
```

PARAMETRI DISPONIBILI (da passare nell'oggetto 'input'):
---------------------------------------------------------
- chartType (Stringa, opzionale): Determina il tipo di grafico.
    - "exercise": (Default) Mostra il volume per un singolo esercizio.
                   Lo script cercherà il campo 'Esercizio::' nei log.
    - "workout": Mostra il volume totale per un intero allenamento.
                 Lo script cercherà il campo 'Origine::' nei log.

- exercisePath (Stringa, opzionale): Da usare con `chartType: "exercise"`.
    Specifica il percorso del file .md dell'esercizio di cui visualizzare il volume.
    Esempio: "theGYM/Esercizi/Panca Piana.md"
    Se omesso e chartType è "exercise", lo script usa `dv.current().file.path`
    (utile se il grafico è nella nota stessa dell'esercizio).

- workoutPath (Stringa, opzionale): Da usare con `chartType: "workout"`.
    Specifica il percorso del file .md dell'allenamento di cui visualizzare il volume totale.
    Esempio: "theGYM/Workouts/Allenamento A.md"
    Se omesso e chartType è "workout", lo script usa `dv.current().file.path`
    (utile se il grafico è nella nota stessa dell'allenamento).

- title (Stringa, opzionale): Titolo personalizzato per il grafico.
    Se omesso, viene generato un titolo automatico (es. "Trend Volume: Nome Esercizio").

- height (Stringa, opzionale): Altezza del contenitore del grafico.
    Esempio: "300px" (default: "250px").

- showTrend (Booleano, opzionale): Mostra/nasconde il box con l'analisi del trend.
    Default: true (mostra). Impostare a `false` per nascondere.

- showStats (Booleano, opzionale): Mostra/nasconde il box con le statistiche aggiuntive.
    Default: true (mostra). Impostare a `false` per nascondere.

- limit (Numero, opzionale): Numero massimo di pagine di log da recuperare e processare.
    Default: 50 per "exercise", 200 per "workout".

- debug (Booleano, opzionale): Abilita/disabilita i messaggi di debug nella console.
    Default: false (debug disabilitato). Impostare a `true` per vedere log dettagliati.

- exactMatch (Booleano, opzionale): Se attivo, richiede una corrispondenza più stringente
    per il nome del file durante la ricerca degli esercizi.
    Default: false. Impostare a `true` per matching più preciso.

STRUTTURA DEI FILE DI LOG (nella cartella "theGYM/Log/Data"):
-------------------------------------------------------------
Ogni file di log dovrebbe contenere almeno i seguenti campi nel frontmatter YAML o come campi inline di Dataview:

- Volume: (Numero) Il volume calcolato per quella sessione/set (es. Peso * Reps).
          Esempio: `Volume: 675`

- Per `chartType: "exercise"`:
  - Esercizio: (Link Obsidian o testo) Un link al file .md dell'esercizio o il nome dell'esercizio.
               Esempio: `Esercizio:: [[Reverse Pec Deck]]` oppure `Esercizio:: Reverse Pec Deck`
               Lo script usa ricerca flessibile per trovare i log corrispondenti.

- Per `chartType: "workout"`:
  - Origine: (Link Obsidian) Un link al file .md dell'allenamento a cui questo log appartiene.
             Esempio: `Origine:: [[Allenamento D – Deltoidi + Core + Richiamo Glutei]]`

- DataOra (Stringa, opzionale ma raccomandato): Data e ora della registrazione del log
           in formato ISO 8601 (es. "AAAA-MM-GGTHH:mm:ss").
           Esempio: `DataOra: 2025-05-02T15:26:49+02:00`
           Se `DataOra` non è presente o non è valido, lo script userà `file.ctime` (data di creazione del file di log)
           per l'asse temporale del grafico. `DataOra` è preferibile per una maggiore precisione.

ESEMPI DI UTILIZZO:
-------------------
1. GRAFICO PER UN ESERCIZIO SPECIFICO (da inserire nella nota dell'esercizio stesso):
   ```dataviewjs
   await dv.view("theGYM/Scripts/VolumeChartTemplate", {
       input: {
           // chartType: "exercise", // Opzionale, è il default
           // exercisePath: dv.current().file.path, // Opzionale, preso automaticamente
           title: "Mio Trend Panca Piana",
           height: "280px"
       }
   });
   ```

2. GRAFICO PER IL VOLUME TOTALE DI UN ALLENAMENTO (da inserire nella nota dell'allenamento):
   ```dataviewjs
   await dv.view("theGYM/Scripts/VolumeChartTemplate", {
       input: {
           chartType: "workout",
           // workoutPath: dv.current().file.path, // Opzionale, preso automaticamente
           title: "Volume Totale Allenamento Pettorali-Tricipiti",
           showStats: false // Nasconde le statistiche extra
       }
   });
   ```

3. GRAFICO PER UN ESERCIZIO SPECIFICO, MA CHIAMATO DA UN'ALTRA NOTA:
   ```dataviewjs
   await dv.view("theGYM/Scripts/VolumeChartTemplate", {
       input: {
           chartType: "exercise",
           exercisePath: "theGYM/Esercizi/Squat.md", // Percorso esplicito
           limit: 100, // Mostra più dati storici
           debug: true // Opzionale: per vedere i dettagli
       }
   });
   ```

4. GRAFICO CON DEBUG ATTIVATO (per troubleshooting):
   ```dataviewjs
   await dv.view("theGYM/Scripts/VolumeChartTemplate", {
       input: {
           chartType: "exercise",
           exercisePath: "theGYM/Esercizi/Panca Piana.md",
           debug: true, // Abilita log dettagliati nella console
           title: "Debug Test"
       }
   });
   ```

5. GRAFICO CON RICERCA AVANZATA E MATCHING ESATTO:
   ```dataviewjs
   await dv.view("theGYM/Scripts/VolumeChartTemplate", {
       input: {
           chartType: "exercise",
           exercisePath: "theGYM/Esercizi/Panca Piana.md",
           exactMatch: true, // Matching più stringente
           debug: true, // Per vedere i dettagli della ricerca
           title: "Panca Piana - Ricerca Avanzata"
       }
   });
   ```


--------------------------------------------------------------------------------
*/

// ===================== COSTANTI E CONFIGURAZIONE =====================

const PATH_MATCH_THRESHOLD = 70;
const NO_EXERCISE_SPECIFIED = "Esercizio Non Specificato";

// ===================== UTILITY FUNCTIONS =====================

/**
 * Ottiene l'ambiente di esecuzione dello script (container, parametri, dv)
 */
function getScriptEnvironment(inputFromView, dvGlobal) {
  const container = Object.prototype.hasOwnProperty.call(this, "container")
    ? this.container // For dv.script
    : inputFromView && inputFromView.container
    ? inputFromView.container // For dv.view from JS
    : dvGlobal.container; // For dv.view from markdown

  if (!container) {
    console.error(
      "Errore critico: 'container' non è disponibile. Impossibile eseguire lo script."
    );
    return null;
  }

  container.innerHTML = ""; // Explicitly clear container

  const userProvidedParams =
    inputFromView && inputFromView.input
      ? inputFromView.input
      : inputFromView || {};

  console.log(
    "--- CARICAMENTO VolumeChartTemplate.js - VERSIONE 1.5 (17 Maggio 2025 - Enhanced Search System) ---"
  );
  console.log(
    "Parametri ricevuti da dv.view (variabile 'input' grezza):",
    inputFromView
  );
  console.log("Parametri EFFETTIVI dell'utente:", userProvidedParams);

  return { dv: dvGlobal, params: userProvidedParams, container };
}

/**
 * Calcola un punteggio di corrispondenza tra due stringhe (ottimizzato)
 */
function getMatchScore(name, searchTerm) {
  if (!name || !searchTerm) return 0;

  const nameLower = name.toLowerCase();
  const searchLower = searchTerm.toLowerCase();

  if (nameLower === searchLower) return 100;
  if (nameLower.startsWith(searchLower + " ")) return 90;
  if (nameLower.endsWith(" " + searchLower)) return 80;
  if (nameLower.includes(" " + searchLower + " ")) return 70;
  if (nameLower.includes(searchLower)) return 60;

  return 0;
}

/**
 * Analizza le pagine per trovare corrispondenze per un nome di esercizio (ottimizzato)
 */
function findExerciseMatches(
  pagesToSearchIn,
  exerciseNameToSearch,
  dvApi,
  debug
) {
  const fileNameMatchesFound = [];
  const allExPaths = new Map(); // Usa Map per performance migliore

  pagesToSearchIn.forEach((p) => {
    if (!p || !p.file) return;

    // Match per nome file
    const fileName = p.file.name;
    const fileMatchScore = getMatchScore(fileName, exerciseNameToSearch);
    if (fileMatchScore > 0) {
      fileNameMatchesFound.push({
        page: p,
        score: fileMatchScore,
        name: fileName,
      });
    }

    // Match per campo Esercizio
    let exFieldPath = null,
      exFieldName = null,
      exFieldScore = 0;

    if (p.Esercizio) {
      if (p.Esercizio.path) {
        exFieldPath = p.Esercizio.path;
        const exPage = dvApi.page(exFieldPath);
        exFieldName =
          p.Esercizio.display ||
          (exPage ? exPage.file.name : exFieldPath.split("/").pop());
        exFieldScore = getMatchScore(
          exPage ? exPage.file.name : exFieldName,
          exerciseNameToSearch
        );
      } else if (typeof p.Esercizio === "string") {
        exFieldName = p.Esercizio;
        exFieldScore = getMatchScore(exFieldName, exerciseNameToSearch);
        exFieldPath = `string:${exFieldName}`;
      }
    }

    if (exFieldPath && exFieldName) {
      if (!allExPaths.has(exFieldPath)) {
        allExPaths.set(exFieldPath, { count: 0, name: exFieldName, score: 0 });
      }
      const info = allExPaths.get(exFieldPath);
      info.count++;
      if (exFieldScore > info.score) info.score = exFieldScore;
    }
  });

  if (debug) {
    console.log("Filename Matches:", fileNameMatchesFound);
    console.log(
      "Found Esercizio:: Paths/Strings & Scores:",
      Object.fromEntries(allExPaths)
    );
  }

  return {
    fileNameMatches: fileNameMatchesFound,
    allExercisePathsAndScores: Object.fromEntries(allExPaths),
  };
}

/**
 * Determina la migliore strategia di filtraggio (ottimizzato)
 */
function determineExerciseFilterStrategy(
  fileNameMatchesArr,
  allExercisePathsObj,
  useExactMatch,
  debug,
  pathMatchThresholdConst
) {
  // Trova il miglior match per campo Esercizio
  let bestPathKeyFound = null;
  let bestPathScoreFound = -1;

  Object.entries(allExercisePathsObj).forEach(([pathKey, info]) => {
    if (info.score > bestPathScoreFound) {
      bestPathScoreFound = info.score;
      bestPathKeyFound = pathKey;
    }
  });

  // Strategia campo Esercizio
  if (bestPathKeyFound && bestPathScoreFound >= pathMatchThresholdConst) {
    if (debug) {
      console.log(
        `Strategy: Use Esercizio:: field "${allExercisePathsObj[bestPathKeyFound]?.name}" (Score: ${bestPathScoreFound})`
      );
    }
    return {
      bestStrategy: "field",
      bestPathKey: bestPathKeyFound,
      bestFileMatchesList: [],
    };
  }

  // Strategia nome file
  if (fileNameMatchesArr.length > 0) {
    fileNameMatchesArr.sort((a, b) => b.score - a.score);
    let targetMatches = fileNameMatchesArr;

    if (useExactMatch) {
      const exactFileMatches = fileNameMatchesArr.filter((m) => m.score >= 90);
      if (exactFileMatches.length > 0) {
        targetMatches = exactFileMatches;
      } else if (debug) {
        console.log("exactMatch for filename: no matches >= 90.");
      }
    }

    if (targetMatches.length > 0) {
      const bestFileScore = targetMatches[0].score;
      const bestFileMatchesFiltered = targetMatches.filter(
        (m) => m.score === bestFileScore
      );

      if (debug) {
        console.log(
          `Strategy: Use Filename matching (Best Score: ${bestFileScore})`
        );
      }

      return {
        bestStrategy: "filename",
        bestPathKey: null,
        bestFileMatchesList: bestFileMatchesFiltered,
      };
    }
  }

  if (debug) {
    console.log("Strategy: No suitable exercise matches found.");
  }

  return {
    bestStrategy: "none",
    bestPathKey: null,
    bestFileMatchesList: [],
  };
}

/**
 * Filtra le pagine in base alla strategia scelta (ottimizzato)
 */
function filterPagesByExercise(
  pagesToFilterFrom,
  strategyToUse,
  bestPathKeyForField,
  bestFileMatchesForFilename
) {
  if (strategyToUse === "field" && bestPathKeyForField) {
    return pagesToFilterFrom.filter((p) => {
      if (!p.Esercizio) return false;

      if (p.Esercizio.path) {
        return p.Esercizio.path === bestPathKeyForField;
      }

      if (typeof p.Esercizio === "string") {
        return `string:${p.Esercizio}` === bestPathKeyForField;
      }

      return false;
    });
  } else if (
    strategyToUse === "filename" &&
    bestFileMatchesForFilename.length > 0
  ) {
    return bestFileMatchesForFilename.map((m) => m.page);
  }

  return [];
}

/**
 * Valida i parametri utente e restituisce errori se presenti
 */
function validateUserParams(params) {
  const errors = [];

  // Validazione chartType
  if (params.chartType && !["exercise", "workout"].includes(params.chartType)) {
    errors.push(
      `chartType deve essere "exercise" o "workout", ricevuto: "${params.chartType}"`
    );
  }

  // Validazione limit
  if (params.limit !== undefined) {
    const limit = parseInt(params.limit);
    if (isNaN(limit) || limit < 1 || limit > 1000) {
      errors.push(
        `limit deve essere un numero tra 1 e 1000, ricevuto: "${params.limit}"`
      );
    }
  }

  // Validazione height
  if (params.height && !/^\d+px$/.test(params.height)) {
    errors.push(
      `height deve essere nel formato "XXXpx", ricevuto: "${params.height}"`
    );
  }

  return errors;
}

/**
 * Inizializza la configurazione a partire dai parametri utente
 */
function initializeConfig(params, dv) {
  // Validazione parametri
  const validationErrors = validateUserParams(params);
  if (validationErrors.length > 0) {
    throw new Error(`Parametri non validi:\n${validationErrors.join("\n")}`);
  }

  const config = {};
  config.chartType = params.chartType || "exercise";
  config.specificExercisePath = params.exercisePath;
  config.specificWorkoutPath = params.workoutPath;
  config.limitPages = params.limit;
  config.currentPagePath = dv.current()?.file?.path;
  config.logFolderPath = `"theGYM/Log/Data"`; // Make sure this path is correct for your vault
  config.exactMatch = params.exactMatch || false; // Aggiunto per il nuovo sistema di ricerca

  config.chartTitle = params.title; // Will be completed later
  config.customHeight = params.height || "250px";
  config.showTrendHeader = params.showTrend !== false;
  config.showStatsBox = params.showStats !== false;
  config.debug = params.debug === true; // Debug mode

  if (config.debug) {
    console.log(`Modalità Chart Type Selezionata: ${config.chartType}`);
    console.log("Configurazione completa:", config);
  }
  return config;
}

// ===================== DATA FETCHING =====================

/**
 * Recupera e filtra i dati di log in base al tipo di grafico richiesto
 */
function fetchLogPagesAndTitle(dv, config) {
  let pages;
  let titlePrefix = "";
  let targetPath;
  let filterMethodUsed = "N/A";

  if (config.chartType === "workout") {
    targetPath = config.specificWorkoutPath || config.currentPagePath;
    if (!targetPath) {
      throw new Error(
        "Impossibile determinare il percorso del workout. Specifica 'workoutPath' o esegui lo script da una nota di allenamento."
      );
    }
    const workoutPage = dv.page(targetPath);
    if (!workoutPage) {
      throw new Error(
        `Workout non trovato: "${targetPath}". Verifica che il file esista.`
      );
    }
    titlePrefix =
      workoutPage?.file?.name?.replace(/\.md$/, "") || "Allenamento Corrente";
    pages = dv
      .pages(config.logFolderPath)
      .where((p) => p.Origine?.path === targetPath)
      .sort((p) => p.DataOra || p.file.ctime, "asc")
      .limit(config.limitPages || 200);

    filterMethodUsed = `campo Origine:: "${titlePrefix}"`;

    if (config.debug) {
      console.log(
        `Chart Type: Workout. Target Path: ${targetPath}. Titolo Prefix: ${titlePrefix}. Pagine di log trovate: ${pages.length}`
      );
      console.log(
        "Prime 3 pagine di log trovate:",
        pages.slice(0, 3).map((p) => ({
          path: p.file.path,
          volume: p.Volume,
          dataOra: p.DataOra,
        }))
      );
    } else {
      console.log(
        `Chart Type: Workout. Target Path: ${targetPath}. Titolo Prefix: ${titlePrefix}. Pagine di log trovate: ${pages.length}`
      );
    }
  } else {
    // Default to "exercise" - USANDO IL SISTEMA AVANZATO DI RICERCA
    targetPath = config.specificExercisePath || config.currentPagePath;
    if (!targetPath) {
      throw new Error(
        "Impossibile determinare il percorso dell'esercizio. Specifica 'exercisePath' o esegui lo script da una nota di esercizio."
      );
    }
    const exercisePage = dv.page(targetPath);
    if (!exercisePage) {
      throw new Error(
        `Esercizio non trovato: "${targetPath}". Verifica che il file esista.`
      );
    }
    titlePrefix =
      exercisePage?.nome_esercizio ||
      exercisePage?.file?.name?.replace(/\.md$/, "") ||
      "Esercizio Corrente";

    const exerciseName = titlePrefix;

    // Recupera tutte le pagine di log
    const allLogPages = dv.pages(config.logFolderPath);

    if (config.debug) {
      console.log(
        `Chart Type: Exercise. Target Path: ${targetPath}. Titolo Prefix: ${titlePrefix}.`
      );
      console.log(
        `Totale pagine in ${config.logFolderPath}: ${allLogPages.length}`
      );
    }

    // Usa il sistema di ricerca avanzato
    const matchesResult = findExerciseMatches(
      allLogPages,
      exerciseName,
      dv,
      config.debug
    );

    const { bestStrategy, bestPathKey, bestFileMatchesList } =
      determineExerciseFilterStrategy(
        matchesResult.fileNameMatches,
        matchesResult.allExercisePathsAndScores,
        config.exactMatch || false,
        config.debug,
        PATH_MATCH_THRESHOLD
      );

    pages = filterPagesByExercise(
      allLogPages,
      bestStrategy,
      bestPathKey,
      bestFileMatchesList
    );

    // Ordina e limita i risultati
    pages = pages
      .sort((p) => p.DataOra || p.file.ctime, "asc")
      .limit(config.limitPages || 50);

    // Determina il metodo di filtraggio usato
    if (bestStrategy === "field") {
      const bestPathName =
        matchesResult.allExercisePathsAndScores[bestPathKey]?.name ||
        bestPathKey;
      filterMethodUsed = `campo Esercizio:: "${bestPathName}" (score: ${matchesResult.allExercisePathsAndScores[bestPathKey]?.score})`;
    } else if (bestStrategy === "filename") {
      filterMethodUsed = `nome file (miglior score: ${
        bestFileMatchesList[0]?.score || "N/D"
      })`;
    } else {
      filterMethodUsed = "Nessuna corrispondenza trovata per l'esercizio";
    }

    if (config.debug) {
      console.log(
        `Metodo ricerca: ${filterMethodUsed}. Pagine di log trovate: ${pages.length}`
      );
      console.log(
        "Prime 3 pagine di log trovate:",
        pages.slice(0, 3).map((p) => ({
          path: p.file.path,
          volume: p.Volume,
          dataOra: p.DataOra,
          esercizioField: p.Esercizio?.path || p.Esercizio || "N/A",
        }))
      );

      // Debug: mostra TUTTI i file che verranno usati per i calcoli
      console.log("=== FILE CHE VERRANNO USATI PER I CALCOLI ===");
      console.log(`Numero totale di file: ${pages.length}`);
      pages.forEach((page, index) => {
        console.log(`File ${index + 1}:`, {
          path: page.file.path,
          volume: page.Volume,
          dataOra: page.DataOra,
          ctime: page.file.ctime,
          esercizioField: page.Esercizio?.path || page.Esercizio || "N/A",
        });
      });
      console.log("=== FINE FILE PER CALCOLI ===");
    } else {
      console.log(
        `Chart Type: Exercise. Target Path: ${targetPath}. Titolo Prefix: ${titlePrefix}. Metodo ricerca: ${filterMethodUsed}. Pagine di log trovate: ${pages.length}`
      );
    }
  }
  return { pages, titlePrefix, targetPath, filterMethodUsed };
}

// ===================== DATA PROCESSING =====================

/**
 * Formatta una data in stringa GG/MM
 */
function formatDate(luxonDateInput, dv) {
  if (!luxonDateInput) return "No Date";
  let luxonDate;
  if (luxonDateInput.isLuxonDateTime) {
    luxonDate = luxonDateInput;
  } else if (typeof luxonDateInput === "string") {
    luxonDate = dv.luxon.DateTime.fromISO(luxonDateInput);
    if (!luxonDate.isValid)
      luxonDate = dv.luxon.DateTime.fromRFC2822(luxonDateInput);
    if (!luxonDate.isValid) {
      try {
        const jsDate = new Date(luxonDateInput);
        if (!isNaN(jsDate.valueOf()))
          luxonDate = dv.luxon.DateTime.fromJSDate(jsDate);
      } catch (e) {
        /* ignore */
      }
    }
  } else if (luxonDateInput.ts && typeof luxonDateInput.ts === "number") {
    luxonDate = dv.luxon.DateTime.fromMillis(luxonDateInput.ts);
  } else if (luxonDateInput instanceof Date) {
    luxonDate = dv.luxon.DateTime.fromJSDate(luxonDateInput);
  }

  if (luxonDate && luxonDate.isValid) {
    return luxonDate.toFormat("dd/MM");
  } else {
    console.warn(
      "Data non valida o formato non riconosciuto per la formattazione:",
      luxonDateInput
    );
    return "Invalid Date";
  }
}

/**
 * Aggrega i volumi per giorno (ottimizzato)
 */
function aggregateDailyVolumes(logPages, dv, config) {
  const dailyVolumes = new Map(); // Usa Map per performance migliore
  let skippedPages = 0;
  let invalidVolumePages = 0;
  let invalidDatePages = 0;

  logPages.forEach((page) => {
    const volumeValue = page.Volume;

    if (config.debug) {
      console.log(`Processando file: ${page.file.path}`);
      console.log(
        `  - Volume raw: '${volumeValue}' (tipo: ${typeof volumeValue})`
      );
    }

    if (
      volumeValue === undefined ||
      volumeValue === null ||
      volumeValue === "" ||
      isNaN(parseFloat(String(volumeValue).replace(",", ".")))
    ) {
      console.warn(
        `Pagina ${page.file.path} saltata: Volume mancante, vuoto o non numerico (Volume: '${volumeValue}').`
      );
      invalidVolumePages++;
      return;
    }
    const numericVolume = parseFloat(String(volumeValue).replace(",", "."));

    if (config.debug) {
      console.log(`  - Volume numerico: ${numericVolume}`);
    }

    const dateKeySource = page.DataOra || page.file.ctime;
    if (config.debug) {
      console.log(`  - DataOra: '${page.DataOra}'`);
      console.log(`  - file.ctime: '${page.file.ctime}'`);
      console.log(`  - DataKeySource usata: '${dateKeySource}'`);
    }

    if (!dateKeySource) {
      console.warn(
        `Pagina ${page.file.path} saltata: DataOra e file.ctime mancanti.`
      );
      invalidDatePages++;
      return;
    }
    const dateKey = formatDate(dateKeySource, dv);

    if (config.debug) {
      console.log(`  - DateKey formattata: '${dateKey}'`);
    }

    if (dateKey === "Invalid Date" || dateKey === "No Date") {
      console.warn(
        `Pagina ${page.file.path} saltata: data non valida ('${dateKeySource}') per l'aggregazione del volume.`
      );
      invalidDatePages++;
      return;
    }

    const previousVolume = dailyVolumes.get(dateKey) || 0;
    const newVolume = previousVolume + numericVolume;
    dailyVolumes.set(dateKey, newVolume);

    if (config.debug) {
      console.log(`  - Volume precedente per ${dateKey}: ${previousVolume}`);
      console.log(`  - Volume nuovo per ${dateKey}: ${newVolume}`);
      console.log(`  - ✓ File processato con successo`);
    }
  });

  // Log statistiche di elaborazione
  if (skippedPages > 0 || invalidVolumePages > 0 || invalidDatePages > 0) {
    console.log(
      `Statistiche elaborazione: ${logPages.length} pagine totali, ${invalidVolumePages} con volume invalido, ${invalidDatePages} con data invalida`
    );
  }

  if (config.debug) {
    console.log("=== RISULTATO AGGREGAZIONE ===");
    console.log(
      "Volumi giornalieri aggregati (debug):",
      Object.fromEntries(dailyVolumes)
    );
    console.log("Dettagli elaborazione:", {
      totalPages: logPages.length,
      skippedPages,
      invalidVolumePages,
      invalidDatePages,
      validEntries: dailyVolumes.size,
    });

    // Debug: mostra ogni entry dell'aggregazione
    console.log("=== DETTAGLIO AGGREGAZIONE PER GIORNO ===");
    dailyVolumes.forEach((volume, date) => {
      console.log(`Giorno ${date}: ${volume} kg`);
    });
    console.log("=== FINE DETTAGLIO AGGREGAZIONE ===");
  } else {
    console.log(
      "Volumi giornalieri aggregati:",
      Object.fromEntries(dailyVolumes)
    );
  }

  const labels = Array.from(dailyVolumes.keys()).sort((a, b) => {
    const [dayA, monthA] = a.split("/").map(Number);
    const [dayB, monthB] = b.split("/").map(Number);
    if (monthA !== monthB) return monthA - monthB;
    return dayA - dayB;
  });
  const volumeData = labels.map((date) => dailyVolumes.get(date));
  return { labels, volumeData };
}

/**
 * Calcola la trendline tramite regressione lineare (ottimizzato)
 */
function calculateTrend(volumeData, config) {
  if (volumeData.length < 2) {
    return {
      trendlineData: [...volumeData],
      slope: 0,
      intercept: volumeData.length === 1 ? volumeData[0] : 0,
    };
  }

  const n = volumeData.length;
  const indices = Array.from({ length: n }, (_, i) => i);

  // Calcoli ottimizzati con reduce
  const { sumX, sumY, sumXY, sumXX } = indices.reduce(
    (acc, i) => {
      acc.sumX += i;
      acc.sumY += volumeData[i];
      acc.sumXY += i * volumeData[i];
      acc.sumXX += i * i;
      return acc;
    },
    { sumX: 0, sumY: 0, sumXY: 0, sumXX: 0 }
  );

  const denominator = n * sumXX - sumX * sumX;

  let slope = 0;
  let intercept = 0;
  if (Math.abs(denominator) > 1e-10) {
    // Evita divisione per zero con tolleranza numerica
    slope = (n * sumXY - sumX * sumY) / denominator;
    intercept = (sumY - slope * sumX) / n;
  } else {
    intercept = sumY / n; // Media se tutti i valori x sono uguali
  }

  const trendlineData = indices.map((i) => intercept + slope * i);

  if (config && config.debug) {
    console.log("Calcolo trend (debug):", {
      dataPoints: volumeData.length,
      slope,
      intercept,
      firstTrendValue: trendlineData[0],
      lastTrendValue: trendlineData[trendlineData.length - 1],
    });
  }

  return { trendlineData, slope, intercept };
}

/**
 * Restituisce indicatori di trend (direzione, colore, icona)
 */
function getTrendIndicators(slope, volumeData) {
  if (volumeData.length < 2) {
    return {
      trendDirection: "dati insuff.",
      trendColor: "var(--text-muted)",
      trendIcon: "·",
    };
  }

  const averageVolume =
    volumeData.reduce((a, b) => a + b, 0) / volumeData.length;
  const slopeThreshold = Math.max(0.05 * averageVolume, 1); // Minimo 1 kg di soglia

  if (slope > slopeThreshold) {
    return {
      trendDirection: "in aumento",
      trendColor: "var(--color-green)",
      trendIcon: "↗️",
    };
  } else if (slope < -slopeThreshold) {
    return {
      trendDirection: "in diminuzione",
      trendColor: "var(--color-red)",
      trendIcon: "↘️",
    };
  } else {
    return {
      trendDirection: "stabile",
      trendColor: "var(--color-orange)",
      trendIcon: "→",
    };
  }
}

// ===================== RENDERING =====================

/**
 * Renderizza un messaggio di errore con stile
 */
function renderErrorMessage(container, message, details = null) {
  const errorDiv = container.createEl("div", { cls: "volume-chart-error" });
  Object.assign(errorDiv.style, {
    padding: "20px",
    margin: "10px 0",
    backgroundColor: "var(--background-modifier-error)",
    border: "1px solid var(--color-red)",
    borderRadius: "8px",
    color: "var(--text-error)",
    textAlign: "center",
  });

  errorDiv.innerHTML = `<strong>❌ Errore:</strong> ${message}`;

  if (details) {
    const detailsDiv = errorDiv.createEl("div");
    Object.assign(detailsDiv.style, {
      marginTop: "10px",
      fontSize: "0.9em",
      color: "var(--text-muted)",
    });
    detailsDiv.innerHTML = details;
  }
}

/**
 * Renderizza un messaggio informativo con stile
 */
function renderInfoMessage(container, message, type = "info") {
  const infoDiv = container.createEl("div", { cls: "volume-chart-info" });
  const colors = {
    info: {
      bg: "var(--background-modifier-border)",
      border: "var(--text-muted)",
      icon: "ℹ️",
    },
    warning: {
      bg: "var(--background-modifier-warning)",
      border: "var(--color-orange)",
      icon: "⚠️",
    },
    success: {
      bg: "var(--background-modifier-success)",
      border: "var(--color-green)",
      icon: "✅",
    },
  };

  const colorScheme = colors[type] || colors.info;

  Object.assign(infoDiv.style, {
    padding: "15px",
    margin: "10px 0",
    backgroundColor: colorScheme.bg,
    border: `1px solid ${colorScheme.border}`,
    borderRadius: "6px",
    textAlign: "center",
    fontSize: "0.95em",
  });

  infoDiv.innerHTML = `<strong>${colorScheme.icon}</strong> ${message}`;
}

/**
 * Renderizza un indicatore di caricamento
 */
function renderLoadingIndicator(container) {
  const loadingDiv = container.createEl("div", { cls: "volume-chart-loading" });
  Object.assign(loadingDiv.style, {
    padding: "20px",
    textAlign: "center",
    color: "var(--text-muted)",
  });
  loadingDiv.innerHTML = "⏳ Caricamento dati...";
  return loadingDiv;
}

/**
 * Renderizza l'header del trend
 */
function renderTrendHeader(parentDiv, trendIndicators, volumeData) {
  const trendHeader = parentDiv.createEl("div", {
    cls: "volume-chart-trend-header",
  });
  Object.assign(trendHeader.style, {
    padding: "12px",
    marginBottom: "15px",
    backgroundColor: "var(--background-secondary)",
    borderRadius: "8px",
    textAlign: "center",
    border: "1px solid var(--background-modifier-border)",
  });

  let firstValue,
    lastValue,
    percentChange = "N/A";
  if (volumeData.length >= 2) {
    firstValue = volumeData[0];
    lastValue = volumeData[volumeData.length - 1];
    percentChange =
      firstValue !== 0
        ? (((lastValue - firstValue) / Math.abs(firstValue)) * 100).toFixed(1)
        : lastValue > 0
        ? "Infinity"
        : "0.0";
  } else if (volumeData.length === 1) {
    firstValue = volumeData[0];
    percentChange = "0.0";
  }

  let variationText = "N/A";
  if (volumeData.length >= 2) {
    const changeSign = parseFloat(percentChange) > 0 ? "+" : "";
    variationText = `<span style="color:${
      trendIndicators.trendColor
    };font-weight:bold">${
      percentChange === "Infinity"
        ? "Aumento signif."
        : changeSign + percentChange + "%"
    }</span> (da ${firstValue.toFixed(1)} kg a ${lastValue.toFixed(1)} kg)`;
  } else if (volumeData.length === 1) {
    variationText = `(Volume: ${firstValue.toFixed(1)} kg)`;
  }

  trendHeader.innerHTML = `
    <h3 style="margin:0;color:${trendIndicators.trendColor};font-size:1.1em;">
      ${trendIndicators.trendIcon} Trend Volume: <strong>${trendIndicators.trendDirection}</strong>
    </h3>
    <p style="margin:5px 0 0 0;font-size:0.9em;">
      Variazione Complessiva: ${variationText}
    </p>
  `;
}

/**
 * Renderizza il grafico o la tabella di fallback
 */
function renderChartOrTable(parentDiv, chartConfig, displaySettings) {
  const chartContainer = parentDiv.createEl("div");
  Object.assign(chartContainer.style, {
    width: "100%",
    height: displaySettings.customHeight,
    marginBottom: "20px",
    border: "1px solid var(--background-modifier-border)",
    borderRadius: "8px",
    overflow: "hidden",
  });

  setTimeout(() => {
    try {
      const chartDataSetup = {
        type: "line",
        data: {
          labels: chartConfig.labels,
          datasets: [
            {
              label: `Volume ${
                displaySettings.chartType === "workout"
                  ? "Totale Allenamento"
                  : "Esercizio"
              } (kg)`,
              data: chartConfig.volumeData,
              borderColor: "rgb(75, 192, 192)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              tension: 0.2,
              fill: true,
              pointRadius: 3,
              pointHoverRadius: 6,
              pointBackgroundColor: "rgb(75, 192, 192)",
              pointBorderColor: "rgb(255, 255, 255)",
              pointHoverBackgroundColor: "rgb(255, 255, 255)",
              pointHoverBorderColor: "rgb(75, 192, 192)",
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: { mode: "index", intersect: false },
          plugins: {
            title: {
              display: true,
              text: displaySettings.finalChartTitle,
              font: { size: 16, weight: "bold" },
              padding: { top: 5, bottom: 15 },
            },
            legend: {
              display: true,
              position: "top",
              labels: { font: { size: 12 } },
            },
            tooltip: {
              displayColors: false,
              backgroundColor: "rgba(0,0,0,0.8)",
              titleFont: { size: 14, weight: "bold" },
              bodyFont: { size: 12 },
              padding: 10,
              cornerRadius: 4,
              callbacks: {
                label: (context) => `Volume: ${context.parsed.y.toFixed(1)} kg`,
              },
            },
          },
          scales: {
            y: {
              beginAtZero: false,
              ticks: { font: { size: 11 } },
              title: {
                display: true,
                text: "Volume (kg)",
                font: { size: 12, weight: "bold" },
              },
            },
            x: {
              ticks: { font: { size: 11 } },
              title: {
                display: true,
                text: "Data Sessione (GG/MM)",
                font: { size: 12, weight: "bold" },
              },
            },
          },
        },
      };

      if (
        displaySettings.showTrendHeader &&
        chartConfig.volumeData.length >= 2 &&
        chartConfig.trendlineData.length === chartConfig.volumeData.length &&
        Math.abs(chartConfig.slope) > 1e-9
      ) {
        chartDataSetup.data.datasets.push({
          label: "Linea di Tendenza",
          data: chartConfig.trendlineData,
          borderColor: chartConfig.trendColor,
          borderWidth: 2,
          borderDash: [5, 5],
          fill: false,
          pointRadius: 0,
          tension: 0,
        });
      }

      if (typeof window.renderChart === "function") {
        window.renderChart(chartDataSetup, chartContainer);
      } else {
        renderFallbackTable(parentDiv, chartConfig, displaySettings);
        chartContainer.style.display = "none";
      }
    } catch (e) {
      console.error("Errore rendering grafico:", e);
      renderErrorMessage(
        parentDiv,
        "Errore durante la visualizzazione del grafico.",
        e.message
      );
    }
  }, 200);
}

/**
 * Renderizza la tabella di fallback quando il plugin Charts non è disponibile
 */
function renderFallbackTable(parentDiv, chartConfig, displaySettings) {
  const tableDiv = parentDiv.createEl("div", {
    cls: "volume-chart-table-fallback",
  });
  Object.assign(tableDiv.style, {
    overflow: "auto",
    border: "1px solid var(--background-modifier-border)",
    borderRadius: "8px",
    padding: "10px",
  });

  const table = tableDiv.createEl("table");
  Object.assign(table.style, {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "0.9em",
  });

  const thead = table.createEl("thead");
  const headerRow = thead.createEl("tr");
  ["Data", "Volume (kg)"].forEach((txt) => {
    const th = headerRow.createEl("th");
    th.textContent = txt;
    Object.assign(th.style, {
      padding: "8px",
      borderBottom: "2px solid var(--background-modifier-border)",
      textAlign: "left",
      fontWeight: "bold",
    });
  });

  const tbody = table.createEl("tbody");
  chartConfig.volumeData.forEach((v, i) => {
    const tr = tbody.createEl("tr");
    [chartConfig.labels[i], v.toFixed(1)].forEach((txt) => {
      const td = tr.createEl("td");
      td.textContent = txt;
      Object.assign(td.style, {
        padding: "8px",
        borderBottom: "1px solid var(--background-modifier-border)",
      });
    });
  });

  const infoDiv = tableDiv.createEl("div");
  Object.assign(infoDiv.style, {
    textAlign: "center",
    color: "var(--text-muted)",
    fontSize: "0.8em",
    marginTop: "10px",
    padding: "5px",
    backgroundColor: "var(--background-secondary)",
    borderRadius: "4px",
  });
  infoDiv.innerHTML =
    "📊 Tabella di fallback (Plugin Charts non disponibile o errore)";
}

/**
 * Renderizza il box delle statistiche
 */
function renderStatsBox(parentDiv, labels, volumeData, chartType) {
  const statsDiv = parentDiv.createEl("div", { cls: "volume-chart-stats" });
  Object.assign(statsDiv.style, {
    marginTop: "20px",
    padding: "15px",
    backgroundColor: "var(--background-secondary)",
    borderRadius: "8px",
    fontSize: "0.9em",
    border: "1px solid var(--background-modifier-border)",
  });

  const avgVolume = (
    volumeData.reduce((s, v) => s + v, 0) / volumeData.length
  ).toFixed(1);
  const maxV = Math.max(...volumeData);
  const maxVolume = maxV.toFixed(1);
  const maxVolumeDate = labels[volumeData.indexOf(maxV)];
  const minV = Math.min(...volumeData);
  const minVolume = minV.toFixed(1);
  const minVolumeDate = labels[volumeData.indexOf(minV)];
  let recentTrendText = "N/A";

  if (volumeData.length >= 3) {
    const recent = volumeData.slice(-3);
    const changeRecent = recent[2] - recent[0];
    const changeRecentAbs = Math.abs(changeRecent).toFixed(1);
    if (changeRecent > 0.05 * recent[0])
      recentTrendText = `<span style="color:var(--color-green)">+${changeRecentAbs} kg</span> (ultime 3)`;
    else if (changeRecent < -0.05 * recent[0])
      recentTrendText = `<span style="color:var(--color-red)">-${changeRecentAbs} kg</span> (ultime 3)`;
    else
      recentTrendText =
        "<span style='color:var(--color-orange)'>Stabile</span> (ultime 3)";
  } else if (volumeData.length === 2) {
    const changeRecent = volumeData[1] - volumeData[0];
    const changeRecentAbs = Math.abs(changeRecent).toFixed(1);
    if (changeRecent > 0)
      recentTrendText = `<span style="color:var(--color-green)">+${changeRecentAbs} kg</span> (vs prec.)`;
    else if (changeRecent < 0)
      recentTrendText = `<span style="color:var(--color-red)">-${changeRecentAbs} kg</span> (vs prec.)`;
    else
      recentTrendText =
        "<span style='color:var(--color-orange)'>Invariato</span> (vs prec.)";
  }

  statsDiv.innerHTML = `
    <strong style="font-size:1.1em;">📈 Statistiche Volume (${
      chartType === "workout" ? "Totale Allenamento" : "Esercizio"
    }):</strong>
    <ul style="margin-top:8px;margin-bottom:5px;list-style-type:square;padding-left:20px;">
      <li>Volume medio: <strong>${avgVolume} kg</strong></li>
      <li>Max: <strong>${maxVolume} kg</strong> (${maxVolumeDate || "N/D"})</li>
      <li>Min: <strong>${minVolume} kg</strong> (${minVolumeDate || "N/D"})</li>
      <li>Sessioni: <strong>${labels.length}</strong></li>
      ${
        recentTrendText !== "N/A"
          ? `<li>Trend Recente: ${recentTrendText}</li>`
          : ""
      }
    </ul>
  `;
}

// ===================== MAIN SCRIPT EXECUTION =====================

const env = getScriptEnvironment(input, dv); // 'input' è globale da dv.view, 'dv' è Dataview API

if (env) {
  const { dv, params, container } = env;

  try {
    // Mostra indicatore di caricamento
    const loadingDiv = renderLoadingIndicator(container);

    const config = initializeConfig(params, dv);

    if (config.debug) {
      console.log("=== DEBUG MODE ATTIVATO ===");
      console.log("Parametri utente:", params);
      console.log("Configurazione inizializzata:", config);
    }

    const {
      pages: logPages,
      titlePrefix,
      targetPath,
      filterMethodUsed,
    } = fetchLogPagesAndTitle(dv, config);

    // Rimuovi loading indicator
    loadingDiv.remove();

    const contentDiv = container.createEl("div"); // Div principale per il contenuto

    // --- Gestione casi senza dati ---
    if (logPages.length === 0) {
      if (config.chartType === "workout" && !config.specificWorkoutPath) {
        renderInfoMessage(
          contentDiv,
          `Nessun dato di volume trovato per l'allenamento <strong>${titlePrefix}</strong>.`,
          "warning"
        );
        renderInfoMessage(
          contentDiv,
          `Assicurati che i tuoi file di log in '${config.logFolderPath}' abbiano un campo <code>Origine:: [[${titlePrefix}]]</code> corretto.`,
          "info"
        );
      } else if (
        config.chartType === "exercise" &&
        !config.specificExercisePath
      ) {
        renderInfoMessage(
          contentDiv,
          `Nessun dato di volume trovato per l'esercizio <strong>${titlePrefix}</strong>.`,
          "warning"
        );
        renderInfoMessage(
          contentDiv,
          `Assicurati che i tuoi file di log in '${config.logFolderPath}' abbiano un campo <code>Esercizio:: [[${titlePrefix}]]</code> corretto.`,
          "info"
        );
      } else {
        renderInfoMessage(
          contentDiv,
          `Nessun dato di volume trovato per <strong>${titlePrefix}</strong>.`,
          "warning"
        );
      }
    } else {
      // --- Elaborazione e rendering dati ---
      const { labels, volumeData } = aggregateDailyVolumes(
        logPages,
        dv,
        config
      );

      if (volumeData.length === 0) {
        renderInfoMessage(
          contentDiv,
          `Nessun dato di volume disponibile per <strong>${titlePrefix}</strong>.`,
          "warning"
        );
        if (logPages.length > 0) {
          renderInfoMessage(
            contentDiv,
            `${logPages.length} log trovati, ma nessuno con volume aggregabile. Controlla i campi DataOra/ctime o Volume.`,
            "info"
          );
        }
      } else {
        const { trendlineData, slope } = calculateTrend(volumeData, config);
        const trendIndicators = getTrendIndicators(slope, volumeData);

        if (config.showTrendHeader) {
          renderTrendHeader(contentDiv, trendIndicators, volumeData);
        }

        const finalChartTitle =
          config.chartTitle || `Trend Volume: ${titlePrefix}`;
        const chartDisplayConfig = {
          labels,
          volumeData,
          trendlineData,
          slope,
          trendColor: trendIndicators.trendColor,
        };
        const generalDisplaySettings = {
          finalChartTitle,
          customHeight: config.customHeight,
          chartType: config.chartType,
          showTrendHeader: config.showTrendHeader,
        };

        renderChartOrTable(
          contentDiv,
          chartDisplayConfig,
          generalDisplaySettings
        );

        if (config.showStatsBox) {
          renderStatsBox(contentDiv, labels, volumeData, config.chartType);
        }

        // Messaggio di successo
        if (config.debug) {
          console.log("=== RENDERING COMPLETATO ===");
          console.log("Dati finali:", {
            labels: labels.length,
            volumeData: volumeData.length,
            trendlineData: trendlineData.length,
            slope,
            finalChartTitle,
            chartType: config.chartType,
          });
        }

        renderInfoMessage(
          contentDiv,
          `Grafico generato con successo! ${volumeData.length} sessioni elaborate.`,
          "success"
        );

        // Footer informativo con metodo di ricerca
        const infoFooterDiv = contentDiv.createEl("div");
        Object.assign(infoFooterDiv.style, {
          fontSize: "0.8em",
          color: "var(--text-muted)",
          marginTop: "10px",
          padding: "8px",
          backgroundColor: "var(--background-secondary)",
          borderRadius: "4px",
        });

        let infoFooterText = `📊 ${volumeData.length} sessioni elaborate`;
        if (config.chartType === "exercise") {
          infoFooterText += ` per "${titlePrefix}"`;
        } else if (config.chartType === "workout") {
          infoFooterText += ` per l'allenamento "${titlePrefix}"`;
        }
        infoFooterText += `. (Metodo ricerca: ${filterMethodUsed})`;
        infoFooterDiv.innerHTML = infoFooterText;
      }
    }
  } catch (error) {
    console.error("Errore durante l'esecuzione dello script:", error);
    renderErrorMessage(
      container,
      "Errore durante l'esecuzione dello script.",
      error.message
    );
  }
}
