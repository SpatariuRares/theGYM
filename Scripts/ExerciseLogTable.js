/*
--------------------------------------------------------------------------------
SCRIPT: ExerciseLogTable.js
VERSIONE: 1.2 (17 Maggio 2025)
AUTORE: Gemini & Rares
DESCRIZIONE:
Questo script DataviewJS visualizza una tabella dei log di esercizi e permette
di aggiungerne di nuovi. È una combinazione delle funzionalità precedentemente
distribuite in exerciseLogConfig.js, exerciseLogUtils.js, e ExerciseLogTable.js.

REQUISITI:
1. Plugin Dataview installato e abilitato.
2. Moment.js (generalmente disponibile globalmente in DataviewJS).
3. API di Obsidian (app, Notice) per la creazione di file e notifiche.

COME USARLO:
Incorporare questo script in una nota utilizzando un blocco di codice DataviewJS:

```dataviewjs
Esempio di chiamata allo script
await dv.view("theGYM/Scripts/ExerciseLogTable.js", {
    input: {
        exercise: "Nome Esercizio", // Obbligatorio o lasciare NO_EXERCISE_SPECIFIED
        Altri parametri opzionali qui sotto
    }
});
```

PARAMETRI DISPONIBILI (da passare nell'oggetto 'input'):
---------------------------------------------------------
- exercise (Stringa, opzionale): Il nome dell'esercizio da filtrare.
    Se omesso o impostato su NO_EXERCISE_SPECIFIED (valore di default interno),
    mostra i log per tutti gli esercizi (a meno che non sia specificato `workout`).
    Esempio: "Panca Piana"

- workout (Stringa, opzionale): Il percorso o il nome del file di allenamento
    da usare per filtrare i log. I log devono avere un campo `Origine:: [[Nome Allenamento]]`
    che corrisponda.
    Esempio: "Allenamenti/Scheda A.md" o "Scheda A"

- limit (Numero, opzionale): Numero massimo di log da visualizzare nella tabella.
    Default: 50 (vedi DEFAULT_LIMIT).

- templatePath (Stringa, opzionale): Percorso della cartella dove verranno creati
    i nuovi file di log.
    Default: "theGYM/Log/Data" (vedi DEFAULT_TEMPLATE_PATH).

- timestampFormat (Stringa, opzionale): Formato per il timestamp nel nome del file
    del nuovo log (usa la formattazione di Moment.js).
    Default: "MMDD-HHmmss" (vedi DEFAULT_TIMESTAMP_FORMAT).

- showAddButton (Booleano, opzionale): Mostra/nasconde il bottone "➕ Aggiungi Log".
    Default: true. Impostare a `false` per nascondere.

- buttonText (Stringa, opzionale): Testo per il bottone "Aggiungi Log".
    Default: "➕ Aggiungi Log" (vedi DEFAULT_BUTTON_TEXT).

- searchByName (Booleano, opzionale): Attiva una logica di matching più flessibile
    per il nome dell'esercizio basata anche sui nomi dei file di log.
    Default: false. La logica di matching ora considera sia `Esercizio::` che il nome file.

- exactMatch (Booleano, opzionale): Se `searchByName` è attivo, richiede una
    corrispondenza più stringente per il nome del file.
    Default: false.

- debug (Booleano, opzionale): Attiva messaggi di debug nella console.
    Default: false.

- fields (Array<Stringa>, opzionale): Array di nomi di campi da includere nel
    frontmatter del template per un nuovo log.
    Default: ["Rep", "Weight", "Volume"] (vedi DEFAULT_FIELDS).

- additionalFields (Funzione, opzionale): Una funzione che restituisce un array
    di stringhe da aggiungere al template del nuovo log (dopo il frontmatter).
    La funzione riceve (exerciseName, currentPageLink, dateHourISO).
    Default: genera i campi `Esercizio::`, `Origine::`, `DataOra::`.

- columns (Array<Stringa>, opzionale): Array di stringhe per le intestazioni
    della tabella visualizzata. L'ordine deve corrispondere ai dati mappati.
    Default: ["Data", "Esercizio", "Ripetizioni", "Peso (kg)", "Volume", "Link"]
             (vedi DEFAULT_COLUMNS).

STRUTTURA DEI FILE DI LOG (nella cartella specificata da `templatePath`):
-----------------------------------------------------------------------
Ogni file di log dovrebbe contenere i seguenti campi (frontmatter o inline):

- Esercizio: (Link Obsidian o Stringa) Nome o link all'esercizio.
             Esempio: `Esercizio:: [[Panca Piana]]` o `Esercizio: Panca Piana`
- Origine: (Link Obsidian o Stringa) Link o nome dell'allenamento da cui il log è stato generato.
           Esempio: `Origine:: [[Allenamento A]]` (usato se si filtra per `workout`)
- DataOra: (Stringa) Data e ora in formato ISO (raccomandato per ordinamento preciso).
           Esempio: `DataOra: 2025-05-17T10:30:00`
           Se assente, verrà usato `file.ctime` (data creazione file).
- Rep: (Numero) Numero di ripetizioni.
- Weight: (Numero) Peso utilizzato.
- Volume: (Numero) Volume calcolato (es. Reps * Peso).

ESEMPI DI UTILIZZO:
-------------------
1. VISUALIZZARE I LOG PER "SQUAT" DALLA NOTA DELLO SQUAT:
   ```dataviewjs
   await dv.view("theGYM/Scripts/ExerciseLogTable.js", {
       input: { exercise: dv.current().file.name }
   });
   ```

2. VISUALIZZARE TUTTI I LOG DELL'ALLENAMENTO CORRENTE:
   ```dataviewjs
   await dv.view("theGYM/Scripts/ExerciseLogTable.js", {
       input: { workout: dv.current().file.path } // o dv.current().file.name
   });
   ```

3. VISUALIZZARE I LOG PER "PANCA PIANA" CON DEBUG ATTIVO E LIMITE 10:
   ```dataviewjs
   await dv.view("theGYM/Scripts/ExerciseLogTable.js", {
       input: {
           exercise: "Panca Piana",
           limit: 10,
           debug: true
       }
   });
   ```
--------------------------------------------------------------------------------
*/

// ===================== COSTANTI E CONFIGURAZIONE =====================

const DEFAULT_LIMIT = 50;
const DEFAULT_TEMPLATE_PATH = "theGYM/Log/Data";
const DEFAULT_TIMESTAMP_FORMAT = "MMDD-HHmmss";
const DEFAULT_BUTTON_TEXT = "➕ Aggiungi Log";
const DEFAULT_FIELDS = ["Rep", "Weight", "Volume"];
const DEFAULT_COLUMNS = [
  "Data",
  "Esercizio",
  "Ripetizioni",
  "Peso (kg)",
  "Volume",
  "Link",
];
const PATH_MATCH_THRESHOLD = 70;
const NO_EXERCISE_SPECIFIED = "Esercizio Non Specificato";

// ===================== VALIDAZIONE E GESTIONE ERRORI =====================

/**
 * Valida i parametri utente e restituisce errori se presenti
 */
function validateUserParams(params) {
  const errors = [];

  // Validazione limit
  if (params.limit !== undefined) {
    const limit = parseInt(params.limit);
    if (isNaN(limit) || limit < 1 || limit > 1000) {
      errors.push(
        `limit deve essere un numero tra 1 e 1000, ricevuto: "${params.limit}"`
      );
    }
  }

  // Validazione templatePath
  if (params.templatePath && typeof params.templatePath !== "string") {
    errors.push(
      `templatePath deve essere una stringa, ricevuto: ${typeof params.templatePath}`
    );
  }

  // Validazione timestampFormat
  if (params.timestampFormat && typeof params.timestampFormat !== "string") {
    errors.push(
      `timestampFormat deve essere una stringa, ricevuto: ${typeof params.timestampFormat}`
    );
  }

  // Validazione fields
  if (
    params.fields &&
    (!Array.isArray(params.fields) ||
      !params.fields.every((f) => typeof f === "string"))
  ) {
    errors.push(`fields deve essere un array di stringhe`);
  }

  // Validazione columns
  if (
    params.columns &&
    (!Array.isArray(params.columns) ||
      !params.columns.every((c) => typeof c === "string"))
  ) {
    errors.push(`columns deve essere un array di stringhe`);
  }

  return errors;
}

/**
 * Normalizza i parametri di input, gestendo il possibile annidamento
 */
function normalizeInputParams(inputParams) {
  if (
    inputParams &&
    Object.prototype.hasOwnProperty.call(inputParams, "input")
  ) {
    return inputParams.input || {};
  }
  return inputParams || {};
}

/**
 * Inizializza l'oggetto di configurazione con validazione
 */
function initializeConfig(params) {
  // Validazione parametri
  const validationErrors = validateUserParams(params);
  if (validationErrors.length > 0) {
    throw new Error(`Parametri non validi:\n${validationErrors.join("\n")}`);
  }

  const debug = params.debug || false;
  if (debug) {
    console.log("Raw parameters received for config:", params);
  }

  return {
    limit: params.limit || DEFAULT_LIMIT,
    templatePath: params.templatePath || DEFAULT_TEMPLATE_PATH,
    timestampFormat: params.timestampFormat || DEFAULT_TIMESTAMP_FORMAT,
    showAddButton: params.showAddButton !== false,
    buttonText: params.buttonText || DEFAULT_BUTTON_TEXT,
    searchByName: params.searchByName || false,
    exactMatch: params.exactMatch || false,
    debug: debug,
    template: {
      fields: params.fields || [...DEFAULT_FIELDS],
      additionalFields:
        params.additionalFields ||
        ((exercise, currentPageLink, dateHour) => [
          `Esercizio::[[${exercise}]]`,
          `Origine:: ${currentPageLink}`,
          `DataOra:: ${dateHour}`,
        ]),
    },
    columns: params.columns || [...DEFAULT_COLUMNS],
  };
}

// ===================== UTILITY FUNCTIONS =====================

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
 * Genera il contenuto per un nuovo template di nota di log
 */
function generateTemplateContent(
  exercise,
  currentPageLink,
  config,
  dependencies
) {
  const { moment } = dependencies;
  const originLink = currentPageLink || "[[Link Mancante]]";
  const fields = config.template.fields.map((field) => `${field}:`);
  const nowISO = moment().format();
  const additionalFields = config.template.additionalFields(
    exercise,
    originLink,
    nowISO
  );

  return ["---", ...fields, "---", ...additionalFields].join("\n");
}

// ===================== UI COMPONENTS =====================

/**
 * Renderizza un messaggio di errore con stile
 */
function renderErrorMessage(container, message, details = null) {
  const errorDiv = container.createEl("div", { cls: "exercise-log-error" });
  Object.assign(errorDiv.style, {
    padding: "15px",
    margin: "10px 0",
    backgroundColor: "var(--background-modifier-error)",
    border: "1px solid var(--color-red)",
    borderRadius: "6px",
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
  const infoDiv = container.createEl("div", { cls: "exercise-log-info" });
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
    padding: "12px",
    margin: "8px 0",
    backgroundColor: colorScheme.bg,
    border: `1px solid ${colorScheme.border}`,
    borderRadius: "6px",
    textAlign: "center",
    fontSize: "0.9em",
  });

  infoDiv.innerHTML = `<strong>${colorScheme.icon}</strong> ${message}`;
}

/**
 * Renderizza un indicatore di caricamento
 */
function renderLoadingIndicator(container) {
  const loadingDiv = container.createEl("div", { cls: "exercise-log-loading" });
  Object.assign(loadingDiv.style, {
    padding: "20px",
    textAlign: "center",
    color: "var(--text-muted)",
  });
  loadingDiv.innerHTML = "⏳ Caricamento dati...";
  return loadingDiv;
}

/**
 * Crea e configura il bottone "Aggiungi Log" (migliorato)
 */
function createAddLogButton(
  parentContainer,
  config,
  exerciseName,
  currentPageLink,
  dependencies
) {
  const {
    moment,
    app,
    Notice,
    NO_EXERCISE_SPECIFIED: NO_EX_SPEC,
  } = dependencies;

  if (!config.showAddButton || !currentPageLink) {
    if (config.debug && !currentPageLink) {
      console.warn("'Add Log' button not created: currentPageLink is missing.");
    }
    return;
  }

  const buttonExerciseName =
    exerciseName !== NO_EX_SPEC ? exerciseName : "Log Allenamento";
  const buttonMaker = parentContainer.createEl("button", {
    text: `${config.buttonText} per ${buttonExerciseName}`,
    cls: "add-log-button",
  });

  // Stili migliorati
  Object.assign(buttonMaker.style, {
    backgroundColor: "var(--interactive-accent)",
    color: "var(--text-on-accent)",
    border: "none",
    padding: "10px 18px",
    borderRadius: "6px",
    fontSize: "14px",
    cursor: "pointer",
    marginBottom: "16px",
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    transition: "all 0.2s ease",
    fontWeight: "500",
  });

  // Event handlers migliorati
  buttonMaker.addEventListener("mouseover", () => {
    buttonMaker.style.backgroundColor = "var(--interactive-accent-hover)";
    buttonMaker.style.transform = "translateY(-1px)";
  });

  buttonMaker.addEventListener("mouseout", () => {
    buttonMaker.style.backgroundColor = "var(--interactive-accent)";
    buttonMaker.style.transform = "translateY(0)";
  });

  buttonMaker.addEventListener("click", async () => {
    try {
      // Disabilita bottone durante creazione
      buttonMaker.disabled = true;
      buttonMaker.textContent = "⏳ Creazione...";

      const timestamp = moment().format(config.timestampFormat);
      const safeExerciseName = buttonExerciseName.replace(/[\\/:"*?<>|]/g, "_");
      const newFileName = `${config.templatePath}/${safeExerciseName}-${timestamp}.md`;

      const templateContent = generateTemplateContent(
        buttonExerciseName,
        currentPageLink,
        config,
        dependencies
      );

      const createdFile = await app.vault.create(newFileName, templateContent);

      if (createdFile) {
        app.workspace.openLinkText(newFileName, "", true);
        new Notice(`✅ Log creato: ${safeExerciseName}`);
      } else {
        throw new Error(`Impossibile creare il file: ${newFileName}`);
      }
    } catch (error) {
      console.error("Error creating log:", error);
      new Notice(`❌ Errore creazione log: ${error.message}`);
    } finally {
      // Ripristina bottone
      buttonMaker.disabled = false;
      buttonMaker.textContent = `${config.buttonText} per ${buttonExerciseName}`;
    }
  });
}

// ===================== DATA PROCESSING =====================

/**
 * Normalizza una stringa di percorso di allenamento (ottimizzato)
 */
function normalizeWorkoutPath(workoutPathStr) {
  if (!workoutPathStr || typeof workoutPathStr !== "string") return null;
  return workoutPathStr
    .replace(/\|.*$/, "")
    .replace(/^\[\[|\]\]$/g, "")
    .trim();
}

/**
 * Filtra le pagine in base al percorso dell'allenamento (ottimizzato)
 */
function filterPagesByWorkout(allDvPages, rawWorkoutPath, debug) {
  const targetWorkoutPathNorm = normalizeWorkoutPath(rawWorkoutPath);

  if (debug) {
    console.log(`Requested Workout Filter: ${rawWorkoutPath}`);
    console.log(`Normalized Workout Path: ${targetWorkoutPathNorm}`);
  }

  if (!targetWorkoutPathNorm) {
    if (debug && rawWorkoutPath) {
      console.warn(`Provided workout path ("${rawWorkoutPath}") is invalid.`);
    }
    return { filteredPages: allDvPages, targetWorkoutPath: null };
  }

  const filtered = allDvPages.filter((p) => {
    if (!p.Origine) return false;

    if (p.Origine.path) {
      return p.Origine.path === targetWorkoutPathNorm;
    }

    if (typeof p.Origine === "string") {
      return normalizeWorkoutPath(p.Origine) === targetWorkoutPathNorm;
    }

    return false;
  });

  if (debug) {
    console.log(
      `After workout filter ("${targetWorkoutPathNorm}"), ${filtered.length} pages remain.`
    );
  }

  return { filteredPages: filtered, targetWorkoutPath: targetWorkoutPathNorm };
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
 * Recupera e filtra le pagine di log (migliorato con gestione errori)
 */
function fetchAndFilterLogPages(
  dvApi,
  configObj,
  exerciseNameToFilter,
  workoutPathToFilter,
  dependenciesObj
) {
  const {
    NO_EXERCISE_SPECIFIED: NO_EX_SPEC,
    PATH_MATCH_THRESHOLD: PM_THRESHOLD,
  } = dependenciesObj;

  try {
    // Recupera tutte le pagine con gestione errori
    const logPath = configObj.templatePath.startsWith('"')
      ? configObj.templatePath
      : `"${configObj.templatePath}"`;

    let allDvPages = dvApi.pages(logPath);

    if (!allDvPages || !Array.isArray(allDvPages)) {
      throw new Error(
        `Impossibile recuperare pagine da: ${configObj.templatePath}`
      );
    }

    let initialPageCount = allDvPages.length;
    if (configObj.debug) {
      console.log(
        `Found ${initialPageCount} total pages in ${configObj.templatePath}`
      );
    }

    // Filtro per workout
    const {
      filteredPages: pagesAfterWorkoutFilter,
      targetWorkoutPath: normWorkoutPath,
    } = filterPagesByWorkout(allDvPages, workoutPathToFilter, configObj.debug);

    const wasFilteredByWorkout =
      !!normWorkoutPath && pagesAfterWorkoutFilter.length < initialPageCount;

    let pagesToSearchFurther = pagesAfterWorkoutFilter;
    let finalFilteredPages = [];
    let filterMethodUsed = "N/A";
    let allFoundExercisePaths = {};

    const isExerciseFilterActive =
      exerciseNameToFilter && exerciseNameToFilter !== NO_EX_SPEC;

    if (!isExerciseFilterActive) {
      finalFilteredPages = pagesToSearchFurther;
      filterMethodUsed = wasFilteredByWorkout
        ? "solo per workout"
        : `nessun filtro specifico (tutti i log in ${configObj.templatePath})`;

      if (configObj.debug) {
        console.log(
          `No specific exercise. Method: ${filterMethodUsed}. Returning ${finalFilteredPages.length} pages.`
        );
      }
    } else {
      if (configObj.debug) {
        console.log(
          `Applying exercise filter "${exerciseNameToFilter}" to ${pagesToSearchFurther.length} pages.`
        );
        if (pagesToSearchFurther.length === 0 && wasFilteredByWorkout) {
          console.log(
            "No pages remained after workout filter, exercise search yields no results."
          );
        }
      }

      const matchesResult = findExerciseMatches(
        pagesToSearchFurther,
        exerciseNameToFilter,
        dvApi,
        configObj.debug
      );
      allFoundExercisePaths = matchesResult.allExercisePathsAndScores;

      const { bestStrategy, bestPathKey, bestFileMatchesList } =
        determineExerciseFilterStrategy(
          matchesResult.fileNameMatches,
          allFoundExercisePaths,
          configObj.exactMatch,
          configObj.debug,
          PM_THRESHOLD
        );

      finalFilteredPages = filterPagesByExercise(
        pagesToSearchFurther,
        bestStrategy,
        bestPathKey,
        bestFileMatchesList
      );

      if (bestStrategy === "field") {
        const bestPathName =
          allFoundExercisePaths[bestPathKey]?.name || bestPathKey;
        filterMethodUsed = `campo Esercizio:: "${bestPathName}" (score: ${allFoundExercisePaths[bestPathKey]?.score})`;
      } else if (bestStrategy === "filename") {
        filterMethodUsed = `nome file (miglior score: ${
          bestFileMatchesList[0]?.score || "N/D"
        })`;
      } else {
        filterMethodUsed = "Nessuna corrispondenza trovata per l'esercizio";
      }

      if (configObj.debug) {
        console.log(
          `Final exercise filter. Method: ${filterMethodUsed}. Found ${finalFilteredPages.length} pages.`
        );
      }
    }

    let fullMethodDescription = filterMethodUsed;
    if (wasFilteredByWorkout && normWorkoutPath) {
      const workoutFilename = normWorkoutPath.split("/").pop();
      fullMethodDescription += ` (filtrato per workout: ${workoutFilename})`;
    }

    return {
      pages: finalFilteredPages,
      method: fullMethodDescription,
      allExercisePaths: allFoundExercisePaths,
    };
  } catch (error) {
    console.error("Error in fetchAndFilterLogPages:", error);
    throw new Error(`Errore nel recupero dei dati: ${error.message}`);
  }
}

// ===================== RENDERING =====================

/**
 * Applica stili CSS per raggruppare visivamente le righe per data (migliorato)
 */
function applyRowStyling(
  tableHtmlContainer,
  sortedLogPages,
  configObj,
  ctimeUsedForSort
) {
  setTimeout(() => {
    try {
      const tableBody = tableHtmlContainer.querySelector("table > tbody");
      if (!tableBody) {
        if (configObj.debug) {
          console.warn("applyRowStyling: Table body not found.");
        }
        return;
      }

      const rows = tableBody.querySelectorAll("tr");
      let previousDateStr = null;

      rows.forEach((row, index) => {
        if (index >= sortedLogPages.length) return;

        const page = sortedLogPages[index];
        let primaryDateField;

        if (!ctimeUsedForSort && page?.DataOra?.isLuxonDateTime) {
          primaryDateField = page.DataOra;
        } else if (page?.file?.ctime?.isLuxonDateTime) {
          primaryDateField = page.file.ctime;
        } else {
          if (configObj.debug) {
            console.warn(
              "Skipping row styling: No valid primary date.",
              index,
              page
            );
          }
          return;
        }

        const currentDateStr = primaryDateField.toISODate();
        row.classList.remove("same-day-log", "new-day-log");

        if (previousDateStr && currentDateStr === previousDateStr) {
          row.classList.add("same-day-log");
        } else {
          row.classList.add("new-day-log");
        }

        previousDateStr = currentDateStr;
      });
    } catch (error) {
      console.error("Error applying row styling:", error);
    }
  }, 150);
}

/**
 * Renderizza la tabella Dataview con le pagine di log filtrate e ordinate (migliorato)
 */
function renderLogTable(
  dvApi,
  tableParentContainer,
  logPagesToRender,
  configObj,
  dependenciesObj
) {
  const { DEFAULT_COLUMNS: DEF_COLUMNS } = dependenciesObj;

  try {
    let ctimeUsedForPrimarySort = false;

    // Prepara dati per ordinamento con gestione errori
    const pagesWithSortKey = logPagesToRender.map((p) => {
      try {
        if (p?.DataOra?.isLuxonDateTime) {
          return { page: p, sortKey: p.DataOra, usedCtime: false };
        }
        if (p?.file?.ctime?.isLuxonDateTime) {
          return { page: p, sortKey: p.file.ctime, usedCtime: true };
        }
        return {
          page: p,
          sortKey: dvApi.luxon.DateTime.fromMillis(0),
          usedCtime: true,
        };
      } catch (error) {
        console.warn(
          "Error processing page for sorting:",
          p?.file?.path,
          error
        );
        return {
          page: p,
          sortKey: dvApi.luxon.DateTime.fromMillis(0),
          usedCtime: true,
        };
      }
    });

    const sortedPageInfos = pagesWithSortKey.sort(
      (a, b) => (b.sortKey?.valueOf() ?? 0) - (a.sortKey?.valueOf() ?? 0)
    );

    ctimeUsedForPrimarySort =
      sortedPageInfos.length > 0 ? sortedPageInfos[0].usedCtime : false;
    let sortedFinalPages = sortedPageInfos.map((info) => info.page);

    if (sortedFinalPages.length === 0) {
      if (configObj.debug) {
        console.log("renderLogTable: 0 pages after sort key prep.");
      }
      tableParentContainer.setText("Nessun log valido da visualizzare.");
      return;
    }

    const limitedSortedPages = sortedFinalPages.limit(configObj.limit);

    // Prepara dati tabella con gestione errori
    const tableRowsData = limitedSortedPages.map((p) => {
      try {
        let formattedDate = "Data non valida";
        let dateSourceField = p?.DataOra?.isLuxonDateTime
          ? p.DataOra
          : p?.file?.ctime?.isLuxonDateTime
          ? p.file.ctime
          : null;

        if (dateSourceField) {
          formattedDate = dateSourceField.toFormat("HH:mm - MM/dd");
        } else if (configObj.debug) {
          console.warn("No valid date for formatting:", p?.file?.path);
        }

        let exerciseDisplay = "N/D";
        if (p.Esercizio) {
          if (p.Esercizio.display) {
            exerciseDisplay = p.Esercizio.display;
          } else if (p.Esercizio.path) {
            exerciseDisplay = p.Esercizio.path
              .split("/")
              .pop()
              .replace(/\.md$/i, "");
          } else if (typeof p.Esercizio === "string") {
            exerciseDisplay = p.Esercizio;
          }
        }

        return [
          formattedDate,
          exerciseDisplay,
          p.Rep || "N/D",
          p.Weight || "N/D",
          p.Volume || "N/D",
          p?.file?.link ?? "Link non disp.",
        ];
      } catch (error) {
        console.error("Error processing row data:", p?.file?.path, error);
        return ["Errore", "Errore", "N/D", "N/D", "N/D", "N/D"];
      }
    });

    // Validazione colonne
    let tableColumnHeaders = configObj.columns;
    if (
      !Array.isArray(tableColumnHeaders) ||
      tableColumnHeaders.some((col) => typeof col !== "string")
    ) {
      console.error(
        "Invalid config.columns:",
        tableColumnHeaders,
        "Falling back to DEFAULT_COLUMNS."
      );
      tableColumnHeaders = [...DEF_COLUMNS];
    }

    // Renderizza tabella
    dvApi.table(tableColumnHeaders, tableRowsData, tableParentContainer);
    applyRowStyling(
      tableParentContainer,
      limitedSortedPages,
      configObj,
      ctimeUsedForPrimarySort
    );
  } catch (error) {
    console.error("Error rendering log table:", error);
    tableParentContainer.innerHTML = `<p style="color: var(--text-error); text-align: center;">Errore nel rendering della tabella: ${error.message}</p>`;
  }
}

/**
 * Renderizza un messaggio che indica che non sono stati trovati log (migliorato)
 */
function renderEmptyState(
  messageContainer,
  mainMessage,
  allFoundExPaths,
  searchedExerciseName,
  dependenciesObj
) {
  const { NO_EXERCISE_SPECIFIED: NO_EX_SPEC } = dependenciesObj;

  try {
    const errorMsgEl = messageContainer.createEl("div", { text: mainMessage });
    Object.assign(errorMsgEl.style, {
      color: "var(--text-error)",
      padding: "15px",
      textAlign: "center",
      fontWeight: "bold",
    });

    const wasExSearched = searchedExerciseName !== NO_EX_SPEC;
    const hasSimilarEx = Object.keys(allFoundExPaths).length > 0;

    if (wasExSearched && hasSimilarEx) {
      const detailsEl = messageContainer.createEl("details");
      detailsEl.createEl("summary", {
        text: "Mostra esercizi simili trovati nei log",
      });

      const contentEl = detailsEl.createEl("div");
      Object.assign(contentEl.style, {
        padding: "10px",
        marginTop: "5px",
        backgroundColor: "var(--background-secondary)",
        borderRadius: "5px",
        textAlign: "left",
        fontSize: "0.9em",
      });

      contentEl.createEl("strong", {
        text: "Esercizi trovati (ordinati per numero di log):",
      });
      const listEl = contentEl.createEl("ul");

      Object.entries(allFoundExPaths)
        .sort(([, infoA], [, infoB]) => infoB.count - infoA.count)
        .forEach(([pathKey, info]) => {
          const displayName = pathKey.startsWith("string:")
            ? pathKey.substring(7)
            : info.name;
          listEl.createEl("li", { text: `${displayName} (${info.count} log)` });
        });
    } else if (wasExSearched && !hasSimilarEx) {
      messageContainer.createEl("p", {
        text: "Non sono stati trovati riferimenti ad esercizi simili.",
        attr: { style: "text-align:center; font-size:0.9em; margin-top:5px;" },
      });
    } else {
      messageContainer.createEl("p", {
        text: "Nessun log trovato per i criteri specificati.",
        attr: { style: "text-align:center; font-size:0.9em; margin-top:5px;" },
      });
    }
  } catch (error) {
    console.error("Error rendering empty state:", error);
    messageContainer.innerHTML = `<p style="color: var(--text-error); text-align: center;">Errore nel rendering del messaggio: ${error.message}</p>`;
  }
}

// ===================== MAIN SCRIPT EXECUTION =====================

try {
  // 1. Ottieni il Contenitore Target e Inizializza
  const targetContainer = dv.container;
  if (!targetContainer) {
    throw new Error(
      "dv.container non è disponibile. Impossibile eseguire lo script."
    );
  }

  targetContainer.innerHTML = ""; // Pulisci il container

  // 2. Normalizza Input e Inizializza Config
  const normalizedUserParams = normalizeInputParams(input);
  const currentConfig = initializeConfig(normalizedUserParams);
  const currentExerciseName =
    normalizedUserParams.exercise || NO_EXERCISE_SPECIFIED;
  const currentWorkoutPath = normalizedUserParams.workout || null;
  const currentFileLink = dv.current()?.file?.link?.toString() || "";

  if (currentConfig.debug) {
    console.log("--- ExerciseLogTable Start ---");
    console.log("Config:", currentConfig);
    console.log("Exercise Filter:", currentExerciseName);
    console.log("Workout Filter:", currentWorkoutPath);
    console.log("Current Page Link:", currentFileLink);
  }

  // 3. Prepara Dipendenze
  const localDependencies = {
    moment: moment,
    app: app,
    Notice: Notice,
    NO_EXERCISE_SPECIFIED: NO_EXERCISE_SPECIFIED,
    DEFAULT_COLUMNS: DEFAULT_COLUMNS,
    PATH_MATCH_THRESHOLD: PATH_MATCH_THRESHOLD,
  };

  // 4. Crea Elementi UI
  const mainUiContainer = targetContainer.createEl("div");
  mainUiContainer.style.width = "100%";

  // Mostra loading indicator
  const loadingDiv = renderLoadingIndicator(mainUiContainer);

  createAddLogButton(
    mainUiContainer,
    currentConfig,
    currentExerciseName,
    currentFileLink,
    localDependencies
  );

  // 5. Recupera e Filtra Dati di Log
  const {
    pages: finalFilteredLogPages,
    method: filterMethodDescription,
    allExercisePaths: allExPathsFound,
  } = fetchAndFilterLogPages(
    dv,
    currentConfig,
    currentExerciseName,
    currentWorkoutPath,
    localDependencies
  );

  // Rimuovi loading indicator
  loadingDiv.remove();

  // 6. Renderizza Risultati
  const tableDisplayContainer = mainUiContainer.createEl("div");
  Object.assign(tableDisplayContainer.style, {
    width: "100%",
    overflowX: "auto",
  });

  if (finalFilteredLogPages.length > 0) {
    renderLogTable(
      dv,
      tableDisplayContainer,
      finalFilteredLogPages,
      currentConfig,
      localDependencies
    );

    // Footer informativo migliorato
    const infoFooterDiv = mainUiContainer.createEl("div");
    Object.assign(infoFooterDiv.style, {
      fontSize: "0.8em",
      color: "var(--text-muted)",
      marginTop: "10px",
      padding: "8px",
      backgroundColor: "var(--background-secondary)",
      borderRadius: "4px",
    });

    let infoFooterText = `📊 Trovati ${finalFilteredLogPages.length} log`;
    if (currentExerciseName !== NO_EXERCISE_SPECIFIED) {
      infoFooterText += ` per "${currentExerciseName}"`;
    }
    if (currentWorkoutPath) {
      const workoutFilename = currentWorkoutPath
        .split("/")
        .pop()
        .replace(/\.md$/i, "");
      infoFooterText += ` nell'allenamento "${workoutFilename}"`;
    } else if (currentExerciseName === NO_EXERCISE_SPECIFIED) {
      infoFooterText += ` in totale`;
    }
    infoFooterText += `. (Metodo: ${filterMethodDescription}). Visualizzati max ${currentConfig.limit}.`;
    infoFooterDiv.innerHTML = infoFooterText;

    // Messaggio di successo
    renderInfoMessage(
      mainUiContainer,
      `Tabella generata con successo! ${finalFilteredLogPages.length} log elaborati.`,
      "success"
    );
  } else {
    let emptyStateMessage = `Nessun log trovato`;
    if (currentExerciseName !== NO_EXERCISE_SPECIFIED) {
      emptyStateMessage += ` per l'esercizio "${currentExerciseName}"`;
    }
    if (currentWorkoutPath) {
      const workoutFilename = currentWorkoutPath
        .split("/")
        .pop()
        .replace(/\.md$/i, "");
      emptyStateMessage += ` nell'allenamento "${workoutFilename}"`;
    }
    emptyStateMessage += ".";

    renderEmptyState(
      tableDisplayContainer,
      emptyStateMessage,
      allExPathsFound,
      currentExerciseName,
      localDependencies
    );
  }

  if (currentConfig.debug) {
    console.log("--- ExerciseLogTable End ---");
  }
} catch (error) {
  console.error("Errore critico durante l'esecuzione dello script:", error);

  // Renderizza errore nel container se disponibile
  if (dv.container) {
    renderErrorMessage(
      dv.container,
      "Errore critico durante l'esecuzione dello script.",
      error.message
    );
  }
}
