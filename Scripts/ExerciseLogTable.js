/*
--------------------------------------------------------------------------------
SCRIPT: ExerciseLogTable_Combined.js
VERSIONE: 1.1 (17 Maggio 2025)
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
// Esempio di chiamata allo script
await dv.view("percorso/del/tuo/script/ExerciseLogTable_Combined.js", {
    input: {
        exercise: "Nome Esercizio", // Obbligatorio o lasciare NO_EXERCISE_SPECIFIED
        // Altri parametri opzionali qui sotto
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
   await dv.view("theGYM/Scripts/ExerciseLogTable_Combined.js", {
       input: { exercise: dv.current().file.name }
   });
   ```

2. VISUALIZZARE TUTTI I LOG DELL'ALLENAMENTO CORRENTE:
   ```dataviewjs
   await dv.view("theGYM/Scripts/ExerciseLogTable_Combined.js", {
       input: { workout: dv.current().file.path } // o dv.current().file.name
   });
   ```

3. VISUALIZZARE I LOG PER "PANCA PIANA" CON DEBUG ATTIVO E LIMITE 10:
   ```dataviewjs
   await dv.view("theGYM/Scripts/ExerciseLogTable_Combined.js", {
       input: {
           exercise: "Panca Piana",
           limit: 10,
           debug: true
       }
   });
   ```
--------------------------------------------------------------------------------
*/

// PARTE 1: Contenuto da exerciseLogConfig.js (Costanti e Funzioni di Configurazione)
// ---------------------------------------------------------------------------------

const DEFAULT_LIMIT = 50;
const DEFAULT_TEMPLATE_PATH = "theGYM/Log/Data"; // Assicurati che questo percorso sia corretto
const DEFAULT_TIMESTAMP_FORMAT = "MMDD-HHmmss";
const DEFAULT_BUTTON_TEXT = "➕ Aggiungi Log";
const DEFAULT_FIELDS = ["Rep", "Weight", "Volume"]; // Campi base per il template di un nuovo log
const DEFAULT_COLUMNS = [ // Intestazioni di colonna per la tabella visualizzata
  "Data",
  "Esercizio",
  "Ripetizioni",
  "Peso (kg)",
  "Volume",
  "Link",
];
const PATH_MATCH_THRESHOLD = 70; // Soglia per il matching del nome esercizio
const NO_EXERCISE_SPECIFIED = "Esercizio Non Specificato"; // Placeholder se nessun esercizio è specificato

/**
 * Normalizza i parametri di input, gestendo il possibile annidamento.
 * @param {object} inputParams - Parametri di input grezzi da dv.view.
 * @returns {object} Parametri normalizzati.
 */
function normalizeInputParams(inputParams) {
  if (inputParams && Object.prototype.hasOwnProperty.call(inputParams, "input")) {
    return inputParams.input || {};
  }
  return inputParams || {};
}

/**
 * Inizializza l'oggetto di configurazione con i default e i parametri forniti dall'utente.
 * @param {object} params - Parametri di input normalizzati.
 * @returns {object} L'oggetto di configurazione.
 */
function initializeConfig(params) {
  const debug = params.debug || false;
  if (debug) {
    console.log("Raw parameters received for config:", params);
  }
  return {
    limit: params.limit || DEFAULT_LIMIT,
    templatePath: params.templatePath || DEFAULT_TEMPLATE_PATH,
    timestampFormat: params.timestampFormat || DEFAULT_TIMESTAMP_FORMAT,
    showAddButton: params.showAddButton !== false, // Default true
    buttonText: params.buttonText || DEFAULT_BUTTON_TEXT,
    searchByName: params.searchByName || false, // Per compatibilità, la logica di match è più complessa
    exactMatch: params.exactMatch || false, // Usato per il match del nome file
    debug: debug,
    template: {
      fields: params.fields || [...DEFAULT_FIELDS],
      additionalFields:
        params.additionalFields ||
        ((exercise, currentPageLink, dateHour) => [ // Funzione per generare campi addizionali
          `Esercizio::[[${exercise}]]`,
          `Origine:: ${currentPageLink}`,
          `DataOra:: ${dateHour}`,
        ]),
    },
    columns: params.columns || [...DEFAULT_COLUMNS],
  };
}

// PARTE 2: Contenuto da exerciseLogUtils.js (Funzioni di Utilità)
// -----------------------------------------------------------------

// --- String Matching ---
/**
 * Calcola un punteggio di corrispondenza semplice tra due stringhe (case-insensitive).
 * @param {string} name - La stringa da controllare.
 * @param {string} searchTerm - La stringa da cercare.
 * @returns {number} Punteggio di corrispondenza (0-100).
 */
function getMatchScore(name, searchTerm) {
  if (!name || !searchTerm) return 0;
  name = name.toLowerCase();
  searchTerm = searchTerm.toLowerCase();
  if (name === searchTerm) return 100;
  if (name.startsWith(searchTerm + " ")) return 90;
  if (name.endsWith(" " + searchTerm)) return 80;
  if (name.includes(" " + searchTerm + " ")) return 70;
  if (name.includes(searchTerm)) return 60;
  return 0;
}

// --- Template Generation ---
/**
 * Genera il contenuto per un nuovo template di nota di log.
 * @param {string} exercise - Il nome dell'esercizio.
 * @param {string} currentPageLink - Link Markdown alla pagina corrente (allenamento).
 * @param {object} config - L'oggetto di configurazione.
 * @param {object} dependencies - Oggetto contenente { moment }.
 * @returns {string} Il contenuto del template.
 */
function generateTemplateContent(exercise, currentPageLink, config, dependencies) {
  const { moment } = dependencies;
  const originLink = currentPageLink ? currentPageLink : "[[Link Mancante]]";
  const fields = config.template.fields.map((field) => `${field}:`);
  const nowISO = moment().format(); // Formato ISO 8601
  const additionalFields = config.template.additionalFields(
    exercise,
    originLink,
    nowISO
  );
  return ["---", ...fields, "---", ...additionalFields].join("\n");
}

// --- UI Elements ---
/**
 * Crea e configura il bottone "Aggiungi Log".
 * @param {HTMLElement} parentContainer - L'elemento genitore per il bottone.
 * @param {object} config - L'oggetto di configurazione.
 * @param {string} exerciseName - Il nome specifico dell'esercizio.
 * @param {string} currentPageLink - Link Markdown alla pagina corrente.
 * @param {object} dependencies - Oggetto contenente { moment, app, Notice, NO_EXERCISE_SPECIFIED }.
 */
function createAddLogButton( parentContainer, config, exerciseName, currentPageLink, dependencies ) {
  const { moment, app, Notice, NO_EXERCISE_SPECIFIED: NO_EX_SPEC } = dependencies; // Alias per NO_EXERCISE_SPECIFIED

  if (!config.showAddButton || !currentPageLink) {
    if (config.debug && !currentPageLink) {
      console.warn( "'Add Log' button not created: currentPageLink is missing." );
    }
    return;
  }

  const buttonExerciseName = exerciseName !== NO_EX_SPEC ? exerciseName : "Log Allenamento";
  const buttonMaker = parentContainer.createEl("button", {
    text: `${config.buttonText} per ${buttonExerciseName}`,
    cls: "add-log-button",
  });

  buttonMaker.style.cssText = `
        background-color: var(--interactive-accent); color: var(--text-on-accent);
        border: none; padding: 8px 16px; border-radius: 4px; font-size: 14px;
        cursor: pointer; margin-bottom: 16px; display: inline-flex;
        align-items: center; gap: 4px; transition: background-color 0.2s ease;`;
  buttonMaker.addEventListener("mouseover", () => buttonMaker.style.backgroundColor = "var(--interactive-accent-hover)");
  buttonMaker.addEventListener("mouseout", () => buttonMaker.style.backgroundColor = "var(--interactive-accent)");

  buttonMaker.addEventListener("click", async () => {
    try {
      const timestamp = moment().format(config.timestampFormat);
      const safeExerciseName = buttonExerciseName.replace(/[\\/:"*?<>|]/g, "_");
      const newFileName = `${config.templatePath}/${safeExerciseName}-${timestamp}.md`;
      const templateContent = generateTemplateContent( buttonExerciseName, currentPageLink, config, dependencies );
      const createdFile = await app.vault.create(newFileName, templateContent);
      if (createdFile) {
        app.workspace.openLinkText(newFileName, "", true);
      } else {
        console.error("Error: Could not create file:", newFileName);
        new Notice(`Error creating file: ${newFileName}`);
      }
    } catch (error) {
      console.error("Error creating log:", error);
      new Notice(`Error creating log: ${error.message}`);
    }
  });
}

// --- Data Fetching and Filtering ---
/**
 * Normalizza una stringa di percorso di allenamento.
 * @param {string} workoutPathStr - La stringa del percorso grezzo.
 * @returns {string|null} Il percorso normalizzato o null.
 */
function normalizeWorkoutPath(workoutPathStr) {
  if (!workoutPathStr) return null;
  return workoutPathStr.replace(/\|.*$/, "").replace(/^\[\[|\]\]$/g, "").trim();
}

/**
 * Filtra le pagine in base al percorso opzionale dell'allenamento.
 * @param {Array} allDvPages - Array di pagine Dataview.
 * @param {string|null} rawWorkoutPath - Il percorso grezzo dell'allenamento.
 * @param {boolean} debug - Flag di debug.
 * @returns {{filteredPages: Array, targetWorkoutPath: string|null}} Pagine filtrate e percorso normalizzato.
 */
function filterPagesByWorkout(allDvPages, rawWorkoutPath, debug) {
  const targetWorkoutPathNorm = normalizeWorkoutPath(rawWorkoutPath);
  if (debug) {
    console.log(`Requested Workout Filter: ${rawWorkoutPath}`);
    console.log(`Normalized Workout Path for filtering: ${targetWorkoutPathNorm}`);
  }
  if (!targetWorkoutPathNorm) {
    if (debug && rawWorkoutPath) console.warn(`Provided workout path ("${rawWorkoutPath}") is invalid.`);
    return { filteredPages: allDvPages, targetWorkoutPath: null };
  }
  const filtered = allDvPages.filter((p) => {
    if (!p.Origine) return false;
    if (p.Origine.path) return p.Origine.path === targetWorkoutPathNorm;
    if (typeof p.Origine === "string") return normalizeWorkoutPath(p.Origine) === targetWorkoutPathNorm;
    return false;
  });
  if (debug) console.log(`After workout filter ("${targetWorkoutPathNorm}"), ${filtered.length} pages remain.`);
  return { filteredPages: filtered, targetWorkoutPath: targetWorkoutPathNorm };
}

/**
 * Analizza le pagine per trovare corrispondenze per un nome di esercizio specifico.
 * @param {Array} pagesToSearchIn - Pagine (potenzialmente pre-filtrate per allenamento).
 * @param {string} exerciseNameToSearch - Il nome dell'esercizio da cercare.
 * @param {object} dvApi - Oggetto API Dataview.
 * @param {boolean} debug - Flag di debug.
 * @returns {{fileNameMatches: Array, allExercisePathsAndScores: object}} Corrispondenze e percorsi trovati.
 */
function findExerciseMatches(pagesToSearchIn, exerciseNameToSearch, dvApi, debug) {
  const fileNameMatchesFound = [];
  const allExPaths = {}; // Stores { pathOrString: { count, name, score } }

  pagesToSearchIn.forEach((p) => {
    if (!p || !p.file) return;
    const fileName = p.file.name;
    const fileMatchScore = getMatchScore(fileName, exerciseNameToSearch);
    if (fileMatchScore > 0) fileNameMatchesFound.push({ page: p, score: fileMatchScore, name: fileName });

    let exFieldPath = null, exFieldName = null, exFieldScore = 0;
    if (p.Esercizio) {
      if (p.Esercizio.path) {
        exFieldPath = p.Esercizio.path;
        const exPage = dvApi.page(exFieldPath);
        exFieldName = p.Esercizio.display || (exPage ? exPage.file.name : exFieldPath.split("/").pop());
        exFieldScore = getMatchScore(exPage ? exPage.file.name : exFieldName, exerciseNameToSearch);
      } else if (typeof p.Esercizio === "string") {
        exFieldName = p.Esercizio;
        exFieldScore = getMatchScore(exFieldName, exerciseNameToSearch);
        exFieldPath = `string:${exFieldName}`; // Prefix to distinguish from paths
      }
    }
    if (exFieldPath && exFieldName) {
      if (!allExPaths[exFieldPath]) allExPaths[exFieldPath] = { count: 0, name: exFieldName, score: 0 };
      allExPaths[exFieldPath].count++;
      if (exFieldScore > allExPaths[exFieldPath].score) allExPaths[exFieldPath].score = exFieldScore;
    }
  });
  if (debug) {
    console.log("Filename Matches:", fileNameMatchesFound);
    console.log("Found Esercizio:: Paths/Strings & Scores:", allExPaths);
  }
  return { fileNameMatches: fileNameMatchesFound, allExercisePathsAndScores: allExPaths };
}

/**
 * Determina la migliore strategia di filtraggio basata sulle corrispondenze dell'esercizio.
 * @param {Array} fileNameMatchesArr - Corrispondenze trovate nei nomi dei file.
 * @param {object} allExercisePathsObj - Corrispondenze trovate nei campi Esercizio::.
 * @param {boolean} useExactMatch - Se richiedere un punteggio alto per i nomi dei file.
 * @param {boolean} debug - Flag di debug.
 * @param {number} pathMatchThresholdConst - Costante soglia punteggio.
 * @returns {{bestStrategy: string, bestPathKey: string|null, bestFileMatchesList: Array}} Strategia e dati rilevanti.
 */
function determineExerciseFilterStrategy(fileNameMatchesArr, allExercisePathsObj, useExactMatch, debug, pathMatchThresholdConst) {
  let bestPathKeyFound = null;
  let bestPathScoreFound = -1;

  Object.entries(allExercisePathsObj).forEach(([pathKey, info]) => {
    if (info.score > bestPathScoreFound) {
      bestPathScoreFound = info.score;
      bestPathKeyFound = pathKey;
    }
  });

  if (bestPathKeyFound && bestPathScoreFound >= pathMatchThresholdConst) {
    if (debug) console.log(`Strategy: Use Esercizio:: field "${allExercisePathsObj[bestPathKeyFound]?.name}" (Score: ${bestPathScoreFound})`);
    return { bestStrategy: "field", bestPathKey: bestPathKeyFound, bestFileMatchesList: [] };
  }

  if (fileNameMatchesArr.length > 0) {
    fileNameMatchesArr.sort((a, b) => b.score - a.score); // Sort by score desc
    let targetMatches = fileNameMatchesArr;
    if (useExactMatch) {
      const exactFileMatches = fileNameMatchesArr.filter((m) => m.score >= 90);
      if (exactFileMatches.length > 0) targetMatches = exactFileMatches;
      else if (debug) console.log("exactMatch for filename: no matches >= 90.");
    }
    if (targetMatches.length > 0) { // Ensure targetMatches is not empty after exactMatch filter
        const bestFileScore = targetMatches[0].score;
        const bestFileMatchesFiltered = targetMatches.filter((m) => m.score === bestFileScore);
        if (debug) console.log(`Strategy: Use Filename matching (Best Score: ${bestFileScore})`);
        return { bestStrategy: "filename", bestPathKey: null, bestFileMatchesList: bestFileMatchesFiltered };
    }
  }
  if (debug) console.log("Strategy: No suitable exercise matches found.");
  return { bestStrategy: "none", bestPathKey: null, bestFileMatchesList: [] };
}

/**
 * Filtra le pagine in base alla strategia di filtraggio dell'esercizio scelta.
 * @param {Array} pagesToFilterFrom - Pagine (potenzialmente pre-filtrate per allenamento).
 * @param {string} strategyToUse - La strategia scelta ('field', 'filename', 'none').
 * @param {string|null} bestPathKeyForField - La chiave del percorso/identificatore Esercizio::.
 * @param {Array} bestFileMatchesForFilename - Le migliori corrispondenze per nome file.
 * @returns {Array} La lista finale filtrata di pagine.
 */
function filterPagesByExercise(pagesToFilterFrom, strategyToUse, bestPathKeyForField, bestFileMatchesForFilename) {
  if (strategyToUse === "field" && bestPathKeyForField) {
    return pagesToFilterFrom.filter((p) => {
      if (!p.Esercizio) return false;
      if (p.Esercizio.path) return p.Esercizio.path === bestPathKeyForField;
      if (typeof p.Esercizio === "string") return `string:${p.Esercizio}` === bestPathKeyForField;
      return false;
    });
  } else if (strategyToUse === "filename" && bestFileMatchesForFilename.length > 0) {
    return bestFileMatchesForFilename.map((m) => m.page);
  }
  return []; // No match or 'none' strategy
}

/**
 * Recupera e filtra le pagine di log.
 * @param {object} dvApi - Oggetto API Dataview.
 * @param {object} configObj - Oggetto di configurazione.
 * @param {string} exerciseNameToFilter - Nome dell'esercizio.
 * @param {string|null} workoutPathToFilter - Percorso dell'allenamento.
 * @param {object} dependenciesObj - Oggetto dipendenze { NO_EXERCISE_SPECIFIED, PATH_MATCH_THRESHOLD }.
 * @returns {{pages: Array, method: string, allExercisePaths: object}} Pagine filtrate, metodo usato, percorsi trovati.
 */
function fetchAndFilterLogPages(dvApi, configObj, exerciseNameToFilter, workoutPathToFilter, dependenciesObj) {
  const { NO_EXERCISE_SPECIFIED: NO_EX_SPEC, PATH_MATCH_THRESHOLD: PM_THRESHOLD } = dependenciesObj;
  let allDvPages = dvApi.pages(configObj.templatePath.startsWith('"') ? configObj.templatePath : `"${configObj.templatePath}"`); // Ensure path is quoted
  let initialPageCount = allDvPages.length;
  if (configObj.debug) console.log(`Found ${initialPageCount} total pages in ${configObj.templatePath}`);

  const { filteredPages: pagesAfterWorkoutFilter, targetWorkoutPath: normWorkoutPath } =
    filterPagesByWorkout(allDvPages, workoutPathToFilter, configObj.debug);
  const wasFilteredByWorkout = !!normWorkoutPath && pagesAfterWorkoutFilter.length < initialPageCount;

  let pagesToSearchFurther = pagesAfterWorkoutFilter;
  let finalFilteredPages = [];
  let filterMethodUsed = "N/A";
  let allFoundExercisePaths = {};

  const isExerciseFilterActive = exerciseNameToFilter && exerciseNameToFilter !== NO_EX_SPEC;

  if (!isExerciseFilterActive) {
    finalFilteredPages = pagesToSearchFurther;
    filterMethodUsed = wasFilteredByWorkout ? "solo per workout" : `nessun filtro specifico (tutti i log in ${configObj.templatePath})`;
    if (configObj.debug) console.log(`No specific exercise. Method: ${filterMethodUsed}. Returning ${finalFilteredPages.length} pages.`);
  } else {
    if (configObj.debug) {
        console.log(`Applying exercise filter "${exerciseNameToFilter}" to ${pagesToSearchFurther.length} pages.`);
        if (pagesToSearchFurther.length === 0 && wasFilteredByWorkout) console.log("No pages remained after workout filter, exercise search yields no results.");
    }
    const matchesResult = findExerciseMatches(pagesToSearchFurther, exerciseNameToFilter, dvApi, configObj.debug);
    allFoundExercisePaths = matchesResult.allExercisePathsAndScores;

    const { bestStrategy, bestPathKey, bestFileMatchesList } =
      determineExerciseFilterStrategy(matchesResult.fileNameMatches, allFoundExercisePaths, configObj.exactMatch, configObj.debug, PM_THRESHOLD);

    finalFilteredPages = filterPagesByExercise(pagesToSearchFurther, bestStrategy, bestPathKey, bestFileMatchesList);

    if (bestStrategy === "field") {
      const bestPathName = allFoundExercisePaths[bestPathKey]?.name || bestPathKey;
      filterMethodUsed = `campo Esercizio:: "${bestPathName}" (score: ${allFoundExercisePaths[bestPathKey]?.score})`;
    } else if (bestStrategy === "filename") {
      filterMethodUsed = `nome file (miglior score: ${bestFileMatchesList[0]?.score || 'N/D'})`;
    } else {
      filterMethodUsed = "Nessuna corrispondenza trovata per l'esercizio";
    }
    if (configObj.debug) console.log(`Final exercise filter. Method: ${filterMethodUsed}. Found ${finalFilteredPages.length} pages.`);
  }

  let fullMethodDescription = filterMethodUsed;
  if (wasFilteredByWorkout && normWorkoutPath) {
    const workoutFilename = normWorkoutPath.split("/").pop();
    fullMethodDescription += ` (filtrato per workout: ${workoutFilename})`;
  }
  return { pages: finalFilteredPages, method: fullMethodDescription, allExercisePaths: allFoundExercisePaths };
}

// --- Rendering ---
/**
 * Applica stili CSS per raggruppare visivamente le righe per data.
 * @param {HTMLElement} tableHtmlContainer - Il contenitore della tabella.
 * @param {Array} sortedLogPages - Array ordinato delle pagine visualizzate.
 * @param {object} configObj - Oggetto di configurazione.
 * @param {boolean} ctimeUsedForSort - Indica se file.ctime è stato usato per l'ordinamento primario.
 */
function applyRowStyling(tableHtmlContainer, sortedLogPages, configObj, ctimeUsedForSort) {
  setTimeout(() => {
    const tableBody = tableHtmlContainer.querySelector("table > tbody");
    if (!tableBody) {
      if (configObj.debug) console.warn("applyRowStyling: Table body not found.");
      return;
    }
    const rows = tableBody.querySelectorAll("tr");
    let previousDateStr = null;
    rows.forEach((row, index) => {
      if (index >= sortedLogPages.length) return;
      const page = sortedLogPages[index];
      let primaryDateField;
      if (!ctimeUsedForSort && page?.DataOra?.isLuxonDateTime) primaryDateField = page.DataOra;
      else if (page?.file?.ctime?.isLuxonDateTime) primaryDateField = page.file.ctime;
      else {
        if (configObj.debug) console.warn("Skipping row styling: No valid primary date.", index, page);
        return;
      }
      const currentDateStr = primaryDateField.toISODate();
      row.classList.remove("same-day-log", "new-day-log");
      if (previousDateStr && currentDateStr === previousDateStr) row.classList.add("same-day-log");
      else row.classList.add("new-day-log");
      previousDateStr = currentDateStr;
    });
  }, 150);
}

/**
 * Renderizza la tabella Dataview con le pagine di log filtrate e ordinate.
 * @param {object} dvApi - Oggetto API Dataview.
 * @param {HTMLElement} tableParentContainer - Il contenitore per la tabella.
 * @param {Array} logPagesToRender - Array delle pagine di log filtrate.
 * @param {object} configObj - Oggetto di configurazione.
 * @param {object} dependenciesObj - Oggetto dipendenze { DEFAULT_COLUMNS }.
 */
function renderLogTable(dvApi, tableParentContainer, logPagesToRender, configObj, dependenciesObj) {
  const { DEFAULT_COLUMNS: DEF_COLUMNS } = dependenciesObj; // Alias
  let ctimeUsedForPrimarySort = false;
  const pagesWithSortKey = logPagesToRender.map((p) => {
    if (p?.DataOra?.isLuxonDateTime) return { page: p, sortKey: p.DataOra, usedCtime: false };
    if (p?.file?.ctime?.isLuxonDateTime) return { page: p, sortKey: p.file.ctime, usedCtime: true };
    return { page: p, sortKey: dvApi.luxon.DateTime.fromMillis(0), usedCtime: true };
  });

  const sortedPageInfos = pagesWithSortKey.sort((a, b) => (b.sortKey?.valueOf() ?? 0) - (a.sortKey?.valueOf() ?? 0));
  ctimeUsedForPrimarySort = sortedPageInfos.length > 0 ? sortedPageInfos[0].usedCtime : false;
  let sortedFinalPages = sortedPageInfos.map((info) => info.page);

  if (sortedFinalPages.length === 0) {
    if (configObj.debug) console.log("renderLogTable: 0 pages after sort key prep.");
    tableParentContainer.setText("Nessun log valido da visualizzare.");
    return;
  }
  const limitedSortedPages = sortedFinalPages.limit(configObj.limit);

  const tableRowsData = limitedSortedPages.map((p) => {
    let formattedDate = "Data non valida";
    let dateSourceField = p?.DataOra?.isLuxonDateTime ? p.DataOra : (p?.file?.ctime?.isLuxonDateTime ? p.file.ctime : null);
    try {
      if (dateSourceField) formattedDate = dateSourceField.toFormat("HH:mm - MM/dd");
      else if (configObj.debug) console.warn("No valid date for formatting:", p?.file?.path);
    } catch (e) {
      console.error(`Error formatting Luxon date:`, e, dateSourceField, p?.file?.path);
      formattedDate = `Errore Data`;
    }
    let exerciseDisplay = "N/D";
    if (p.Esercizio) {
      if (p.Esercizio.display) exerciseDisplay = p.Esercizio.display;
      else if (p.Esercizio.path) exerciseDisplay = p.Esercizio.path.split("/").pop().replace(/\.md$/i, "");
      else if (typeof p.Esercizio === "string") exerciseDisplay = p.Esercizio;
    }
    return [formattedDate, exerciseDisplay, p.Rep, p.Weight, p.Volume, p?.file?.link ?? "Link non disp."];
  });

  let tableColumnHeaders = configObj.columns;
  if (!Array.isArray(tableColumnHeaders) || tableColumnHeaders.some((col) => typeof col !== "string")) {
    console.error("Invalid config.columns:", tableColumnHeaders, "Falling back to DEFAULT_COLUMNS.");
    tableColumnHeaders = [...DEF_COLUMNS];
  }
  dvApi.table(tableColumnHeaders, tableRowsData, tableParentContainer);
  applyRowStyling(tableParentContainer, limitedSortedPages, configObj, ctimeUsedForPrimarySort);
}

/**
 * Renderizza un messaggio che indica che non sono stati trovati log.
 * @param {HTMLElement} messageContainer - Il contenitore per il messaggio.
 * @param {string} mainMessage - Il messaggio principale.
 * @param {object} allFoundExPaths - Oggetto con info sugli esercizi trovati.
 * @param {string} searchedExerciseName - L'esercizio specifico cercato.
 * @param {object} dependenciesObj - Oggetto dipendenze { NO_EXERCISE_SPECIFIED }.
 */
function renderEmptyState(messageContainer, mainMessage, allFoundExPaths, searchedExerciseName, dependenciesObj) {
  const { NO_EXERCISE_SPECIFIED: NO_EX_SPEC } = dependenciesObj; // Alias
  const errorMsgEl = messageContainer.createEl("div", { text: mainMessage });
  errorMsgEl.style.cssText = `color: var(--text-error); padding: 15px; text-align: center; font-weight: bold;`;

  const wasExSearched = searchedExerciseName !== NO_EX_SPEC;
  const hasSimilarEx = Object.keys(allFoundExPaths).length > 0;

  if (wasExSearched && hasSimilarEx) {
    const detailsEl = messageContainer.createEl("details");
    detailsEl.createEl("summary", { text: "Mostra esercizi simili trovati nei log" });
    const contentEl = detailsEl.createEl("div");
    contentEl.style.cssText = `padding:10px; margin-top:5px; background-color:var(--background-secondary); border-radius:5px; text-align:left; font-size:0.9em;`;
    contentEl.createEl("strong", { text: "Esercizi trovati (ordinati per numero di log):" });
    const listEl = contentEl.createEl("ul");
    Object.entries(allFoundExPaths)
      .sort(([, infoA], [, infoB]) => infoB.count - infoA.count)
      .forEach(([pathKey, info]) => {
        const displayName = pathKey.startsWith("string:") ? pathKey.substring(7) : info.name;
        listEl.createEl("li", { text: `${displayName} (${info.count} log)` });
      });
  } else if (wasExSearched && !hasSimilarEx) {
    messageContainer.createEl("p", { text: "Non sono stati trovati riferimenti ad esercizi simili.", attr: { style: "text-align:center; font-size:0.9em; margin-top:5px;" } });
  } else {
    messageContainer.createEl("p", { text: "Nessun log trovato per i criteri specificati.", attr: { style: "text-align:center; font-size:0.9em; margin-top:5px;" } });
  }
}


// PARTE 3: Logica Principale da ExerciseLogTable.js (Adattata)
// --------------------------------------------------------------
// 'input' e 'dv' sono globali forniti da dv.view()

// 1. Ottieni il Contenitore Target e Inizializza
const targetContainer = dv.container;
if (!targetContainer) {
  console.error("Errore critico: dv.container non è disponibile.");
  // Non possiamo usare dv.paragraph qui se dv.container non c'è.
  // L'errore sarà visibile solo in console.
  return;
}
targetContainer.innerHTML = ''; // Pulisci il container

// 2. Normalizza Input e Inizializza Config
const normalizedUserParams = normalizeInputParams(input); // 'input' è globale da dv.view
const currentConfig = initializeConfig(normalizedUserParams);
const currentExerciseName = normalizedUserParams.exercise || NO_EXERCISE_SPECIFIED;
const currentWorkoutPath = normalizedUserParams.workout || null;
const currentFileLink = dv.current()?.file?.link?.toString() || ""; // Assicura sia una stringa

if (currentConfig.debug) {
  console.log("--- Combined ExerciseLogTable Start ---");
  console.log("Combined Config:", currentConfig);
  console.log("Exercise Filter:", currentExerciseName);
  console.log("Workout Filter:", currentWorkoutPath);
  console.log("Current Page Link (for Origine::):", currentFileLink);
}

// 3. Prepara Dipendenze per le funzioni di utilità (ora locali)
const localDependencies = {
  moment: moment, // Globale da Dataview
  app: app,       // Globale da Obsidian
  Notice: Notice, // Globale da Obsidian
  NO_EXERCISE_SPECIFIED: NO_EXERCISE_SPECIFIED, // Costante locale
  DEFAULT_COLUMNS: DEFAULT_COLUMNS,           // Costante locale
  PATH_MATCH_THRESHOLD: PATH_MATCH_THRESHOLD, // Costante locale
};

// 4. Crea Elementi UI
const mainUiContainer = targetContainer.createEl("div");
mainUiContainer.style.width = "100%";

createAddLogButton( // Chiamata diretta alla funzione locale
  mainUiContainer,
  currentConfig,
  currentExerciseName,
  currentFileLink,
  localDependencies
);

// 5. Recupera e Filtra Dati di Log
const { pages: finalFilteredLogPages, method: filterMethodDescription, allExercisePaths: allExPathsFound } =
  fetchAndFilterLogPages( // Chiamata diretta
    dv,
    currentConfig,
    currentExerciseName,
    currentWorkoutPath,
    localDependencies
  );

// 6. Renderizza Risultati (Tabella o Stato Vuoto)
const tableDisplayContainer = mainUiContainer.createEl("div");
tableDisplayContainer.style.cssText = "width: 100%; overflow-x: auto;";

if (finalFilteredLogPages.length > 0) {
  renderLogTable( // Chiamata diretta
    dv,
    tableDisplayContainer,
    finalFilteredLogPages,
    currentConfig,
    localDependencies
  );

  const infoFooterDiv = mainUiContainer.createEl("div");
  infoFooterDiv.style.cssText = `font-size: 0.8em; color: var(--text-muted); margin-top: 10px;`;
  let infoFooterText = `Trovati ${finalFilteredLogPages.length} log`;
  if (currentExerciseName !== NO_EXERCISE_SPECIFIED) infoFooterText += ` per "${currentExerciseName}"`;
  if (currentWorkoutPath) {
    const workoutFilename = currentWorkoutPath.split("/").pop().replace(/\.md$/i, "");
    infoFooterText += ` nell'allenamento "${workoutFilename}"`;
  } else if (currentExerciseName === NO_EXERCISE_SPECIFIED) {
    infoFooterText += ` in totale`;
  }
  infoFooterText += `. (Metodo: ${filterMethodDescription}). Visualizzati max ${currentConfig.limit}.`;
  infoFooterDiv.innerHTML = infoFooterText;

} else {
  let emptyStateMessage = `Nessun log trovato`;
  if (currentExerciseName !== NO_EXERCISE_SPECIFIED) emptyStateMessage += ` per l'esercizio "${currentExerciseName}"`;
  if (currentWorkoutPath) {
    const workoutFilename = currentWorkoutPath.split("/").pop().replace(/\.md$/i, "");
    emptyStateMessage += ` nell'allenamento "${workoutFilename}"`;
  }
  emptyStateMessage += ".";
  renderEmptyState( // Chiamata diretta
    tableDisplayContainer,
    emptyStateMessage,
    allExPathsFound,
    currentExerciseName,
    localDependencies
  );
}

if (currentConfig.debug) {
  console.log("--- Combined ExerciseLogTable End ---");
}
