/*
--------------------------------------------------------------------------------
SCRIPT: VolumeChartTemplate.js
VERSIONE: 1.3 (17 Maggio 2025)
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

STRUTTURA DEI FILE DI LOG (nella cartella "theGYM/Log/Data"):
-------------------------------------------------------------
Ogni file di log dovrebbe contenere almeno i seguenti campi nel frontmatter YAML o come campi inline di Dataview:

- Volume: (Numero) Il volume calcolato per quella sessione/set (es. Peso * Reps).
          Esempio: `Volume: 675`

- Per `chartType: "exercise"`:
  - Esercizio: (Link Obsidian) Un link al file .md dell'esercizio.
               Esempio: `Esercizio:: [[Reverse Pec Deck]]`

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
           limit: 100 // Mostra più dati storici
       }
   });
   ```
--------------------------------------------------------------------------------
*/

// Utility function to safely get dv API, params and container
function getScriptEnvironment(inputFromView, dvGlobal) {
  const container = Object.prototype.hasOwnProperty.call(this, "container")
    ? this.container // For dv.script
    : inputFromView && inputFromView.container
    ? inputFromView.container // For dv.view from JS
    : dvGlobal.container; // For dv.view from markdown

  if (container) {
      container.innerHTML = ''; // Explicitly clear container
  } else {
      console.error("Errore critico: 'container' non è disponibile. Impossibile eseguire lo script.");
      return null;
  }

  const userProvidedParams = (inputFromView && inputFromView.input) ? inputFromView.input : (inputFromView || {});
  
  console.log("--- CARICAMENTO VolumeChartTemplate.js - VERSIONE 1.3 (17 Maggio 2025 - Refactored) ---");
  console.log("Parametri ricevuti da dv.view (variabile 'input' grezza):", inputFromView);
  console.log("Parametri EFFETTIVI dell'utente:", userProvidedParams);

  return { dv: dvGlobal, params: userProvidedParams, container };
}

/**
* Initializes configuration based on user parameters.
* @param {object} params - User-provided parameters.
* @param {object} dv - Dataview API.
* @returns {object} Configuration object.
*/
function initializeConfig(params, dv) {
  const config = {};
  config.chartType = params.chartType || "exercise";
  config.specificExercisePath = params.exercisePath;
  config.specificWorkoutPath = params.workoutPath;
  config.limitPages = params.limit;
  config.currentPagePath = dv.current()?.file?.path;
  config.logFolderPath = `"theGYM/Log/Data"`; // Make sure this path is correct for your vault

  config.chartTitle = params.title; // Will be completed later
  config.customHeight = params.height || "250px";
  config.showTrendHeader = params.showTrend !== false;
  config.showStatsBox = params.showStats !== false;
  
  console.log(`Modalità Chart Type Selezionata: ${config.chartType}`);
  return config;
}

/**
* Fetches and filters log data based on the chart type.
* @param {object} dv - Dataview API.
* @param {object} config - Configuration object.
* @returns {{pages: Array, titlePrefix: string}} Filtered pages and title prefix.
*/
function fetchData(dv, config) {
  let pages;
  let titlePrefix = "";
  let targetPath;

  if (config.chartType === "workout") {
      targetPath = config.specificWorkoutPath || config.currentPagePath;
      if (!targetPath) {
          console.error("Errore: Impossibile determinare targetPath per il workout.");
          return { pages: [], titlePrefix: "Errore Workout" };
      }
      const workoutPage = dv.page(targetPath);
      titlePrefix = workoutPage?.file?.name?.replace(/\.md$/, "") || "Allenamento Corrente";
      pages = dv
          .pages(config.logFolderPath)
          .where((p) => p.Origine?.path === targetPath)
          .sort((p) => (p.DataOra || p.file.ctime), "asc")
          .limit(config.limitPages || 200);
      console.log(`Chart Type: Workout. Target Path: ${targetPath}. Titolo Prefix: ${titlePrefix}. Pagine di log trovate: ${pages.length}`);
  } else { // Default to "exercise"
      targetPath = config.specificExercisePath || config.currentPagePath;
      if (!targetPath) {
          console.error("Errore: Impossibile determinare targetPath per l'esercizio.");
          return { pages: [], titlePrefix: "Errore Esercizio" };
      }
      const exercisePage = dv.page(targetPath);
      titlePrefix = exercisePage?.nome_esercizio || exercisePage?.file?.name?.replace(/\.md$/, "") || "Esercizio Corrente";
      pages = dv
          .pages(config.logFolderPath)
          .where((p) => p.Esercizio?.path === targetPath)
          .sort((p) => (p.DataOra || p.file.ctime), "asc")
          .limit(config.limitPages || 50);
      console.log(`Chart Type: Exercise. Target Path: ${targetPath}. Titolo Prefix: ${titlePrefix}. Pagine di log trovate: ${pages.length}`);
  }
  return { pages, titlePrefix, targetPath }; // Added targetPath to return
}

/**
* Formats a date input into DD/MM string.
* @param {object|string} luxonDateInput - Date input (Luxon DateTime, ISO string, ctime object, JS Date).
* @param {object} dv - Dataview API (for dv.luxon).
* @returns {string} Formatted date string or "Invalid Date"/"No Date".
*/
function formatDate(luxonDateInput, dv) {
  if (!luxonDateInput) return "No Date";
  let luxonDate;
  if (luxonDateInput.isLuxonDateTime) {
      luxonDate = luxonDateInput;
  } else if (typeof luxonDateInput === 'string') {
      luxonDate = dv.luxon.DateTime.fromISO(luxonDateInput);
      if (!luxonDate.isValid) luxonDate = dv.luxon.DateTime.fromRFC2822(luxonDateInput);
      if (!luxonDate.isValid) {
          try {
              const jsDate = new Date(luxonDateInput);
              if (!isNaN(jsDate.valueOf())) luxonDate = dv.luxon.DateTime.fromJSDate(jsDate);
          } catch (e) { /* ignore */ }
      }
  } else if (luxonDateInput.ts && typeof luxonDateInput.ts === 'number') {
      luxonDate = dv.luxon.DateTime.fromMillis(luxonDateInput.ts);
  } else if (luxonDateInput instanceof Date) {
      luxonDate = dv.luxon.DateTime.fromJSDate(luxonDateInput);
  }

  if (luxonDate && luxonDate.isValid) {
      return luxonDate.toFormat("dd/MM");
  } else {
      console.warn("Data non valida o formato non riconosciuto per la formattazione:", luxonDateInput);
      return "Invalid Date";
  }
}

/**
* Aggregates volumes by day.
* @param {Array} logPages - Array of log page objects from Dataview.
* @param {object} dv - Dataview API (for dv.luxon).
* @returns {{labels: Array<string>, volumeData: Array<number>}} Sorted labels and corresponding volume data.
*/
function aggregateDailyVolumes(logPages, dv) {
  const dailyVolumes = {};
  logPages.forEach((page) => {
      const volumeValue = page.Volume;
      if (volumeValue === undefined || volumeValue === null || volumeValue === '' || isNaN(parseFloat(String(volumeValue).replace(",", ".")))) {
          console.warn(`Pagina ${page.file.path} saltata: Volume mancante, vuoto o non numerico (Volume: '${volumeValue}').`);
          return;
      }
      const numericVolume = parseFloat(String(volumeValue).replace(",", "."));

      const dateKeySource = page.DataOra || page.file.ctime;
      if (!dateKeySource) {
          console.warn(`Pagina ${page.file.path} saltata: DataOra e file.ctime mancanti.`);
          return;
      }
      const dateKey = formatDate(dateKeySource, dv);
      if (dateKey === "Invalid Date" || dateKey === "No Date") {
          console.warn(`Pagina ${page.file.path} saltata: data non valida ('${dateKeySource}') per l'aggregazione del volume.`);
          return;
      }
      dailyVolumes[dateKey] = (dailyVolumes[dateKey] || 0) + numericVolume;
  });
  console.log("Volumi giornalieri aggregati:", dailyVolumes);

  const labels = Object.keys(dailyVolumes).sort((a, b) => {
      const [dayA, monthA] = a.split("/").map(Number);
      const [dayB, monthB] = b.split("/").map(Number);
      if (monthA !== monthB) return monthA - monthB;
      return dayA - dayB;
  });
  const volumeData = labels.map((date) => dailyVolumes[date]);
  return { labels, volumeData };
}

/**
* Calculates trendline data using linear regression.
* @param {Array<number>} volumeData - Array of volume data.
* @returns {{trendlineData: Array<number>, slope: number, intercept: number}}
*/
function calculateTrend(volumeData) {
  if (volumeData.length < 2) {
      return { trendlineData: [...volumeData], slope: 0, intercept: volumeData.length === 1 ? volumeData[0] : 0 };
  }
  const n = volumeData.length;
  const indices = Array.from({ length: n }, (_, i) => i);
  const sumX = indices.reduce((a, b) => a + b, 0);
  const sumY = volumeData.reduce((a, b) => a + b, 0);
  const sumXY = indices.reduce((a, i) => a + i * volumeData[i], 0);
  const sumXX = indices.reduce((a, i) => a + i * i, 0);
  const denominator = (n * sumXX - sumX * sumX);

  let slope = 0;
  let intercept = 0;
  if (denominator !== 0) {
      slope = (n * sumXY - sumX * sumY) / denominator;
      intercept = (sumY - slope * sumX) / n;
  } else { // Degenerate case (e.g., all x values are the same, unlikely here)
      intercept = n > 0 ? sumY / n : 0; // Average if n > 0
  }
  const trendlineData = indices.map((i) => intercept + slope * i);
  return { trendlineData, slope, intercept };
}

/**
* Determines trend direction, color, and icon.
* @param {number} slope - The slope of the trendline.
* @param {Array<number>} volumeData - Array of volume data.
* @returns {{trendDirection: string, trendColor: string, trendIcon: string}}
*/
function getTrendIndicators(slope, volumeData) {
  const averageVolume = volumeData.length > 0 ? volumeData.reduce((a, b) => a + b, 0) / volumeData.length : 1;
  const slopeThreshold = 0.05 * averageVolume; // Dynamic threshold (5% of average volume)

  if (volumeData.length < 2) {
      return { trendDirection: "dati insuff.", trendColor: "var(--text-muted)", trendIcon: "·" };
  }
  if (slope > slopeThreshold) {
      return { trendDirection: "in aumento", trendColor: "var(--color-green)", trendIcon: "↗️" };
  } else if (slope < -slopeThreshold) {
      return { trendDirection: "in diminuzione", trendColor: "var(--color-red)", trendIcon: "↘️" };
  } else {
      return { trendDirection: "stabile", trendColor: "var(--color-orange)", trendIcon: "→" };
  }
}

/**
* Renders the trend header.
* @param {HTMLElement} parentDiv - The parent div to append the header to.
* @param {object} trendIndicators - Object with trendDirection, trendColor, trendIcon.
* @param {Array<number>} volumeData - Array of volume data for calculating percentage change.
*/
function renderTrendHeader(parentDiv, trendIndicators, volumeData) {
  const trendHeader = parentDiv.createEl("div", { cls: "volume-chart-trend-header" });
  Object.assign(trendHeader.style, { padding: "10px", marginBottom: "15px", backgroundColor: "var(--background-secondary)", borderRadius: "5px", textAlign: "center" });

  let firstValue, lastValue, percentChange = "N/A";
  if (volumeData.length >= 2) {
      firstValue = volumeData[0];
      lastValue = volumeData[volumeData.length - 1];
      percentChange = firstValue !== 0 ? (((lastValue - firstValue) / Math.abs(firstValue)) * 100).toFixed(1) : (lastValue > 0 ? "Infinity" : "0.0");
  } else if (volumeData.length === 1) {
      firstValue = volumeData[0]; percentChange = "0.0";
  }

  let variationText = "N/A";
  if (volumeData.length >= 2) {
      variationText = `<span style="color:${trendIndicators.trendColor};font-weight:bold">${percentChange === "Infinity" ? "Aumento signif." : (parseFloat(percentChange) > 0 ? "+" : "") + percentChange + "%"}</span> (da ${firstValue.toFixed(1)} kg a ${lastValue.toFixed(1)} kg)`;
  } else if (volumeData.length === 1) {
      variationText = `(Volume: ${firstValue.toFixed(1)} kg)`;
  }
  trendHeader.innerHTML = `<h3 style="margin:0;color:${trendIndicators.trendColor};font-size:1.1em;">${trendIndicators.trendIcon} Trend Volume: <strong>${trendIndicators.trendDirection}</strong></h3><p style="margin:5px 0 0 0;font-size:0.9em;">Variazione Complessiva: ${variationText}</p>`;
}

/**
* Renders the chart or a fallback table.
* @param {HTMLElement} parentDiv - The parent div for the chart.
* @param {object} chartConfig - Configuration for the chart. (labels, volumeData, trendlineData, etc.)
* @param {object} displaySettings - General display settings (finalChartTitle, customHeight, etc.)
*/
function renderChartOrTable(parentDiv, chartConfig, displaySettings) {
  const chartContainer = parentDiv.createEl("div");
  Object.assign(chartContainer.style, { width: "100%", height: displaySettings.customHeight, marginBottom: "20px" });

  setTimeout(() => {
      try {
          const chartDataSetup = {
              type: "line",
              data: {
                  labels: chartConfig.labels,
                  datasets: [{
                      label: `Volume ${displaySettings.chartType === "workout" ? "Totale Allenamento" : "Esercizio"} (kg)`,
                      data: chartConfig.volumeData, borderColor: "rgb(75, 192, 192)", backgroundColor: "rgba(75, 192, 192, 0.2)",
                      tension: 0.2, fill: true, pointRadius: 3, pointHoverRadius: 6,
                      pointBackgroundColor: "rgb(75, 192, 192)", pointBorderColor: "rgb(255, 255, 255)",
                      pointHoverBackgroundColor: "rgb(255, 255, 255)", pointHoverBorderColor: "rgb(75, 192, 192)",
                  }]
              },
              options: {
                  responsive: true, maintainAspectRatio: false, interaction: { mode: 'index', intersect: false },
                  plugins: {
                      title: { display: true, text: displaySettings.finalChartTitle, font: { size: 16, weight: 'bold' }, padding: { top: 5, bottom: 15 } },
                      legend: { display: true, position: "top", labels: { font: { size: 12 } } },
                      tooltip: {
                          displayColors: false, backgroundColor: 'rgba(0,0,0,0.8)', titleFont: { size: 14, weight: 'bold' },
                          bodyFont: { size: 12 }, padding: 10, cornerRadius: 4,
                          callbacks: { label: (context) => `Volume: ${context.parsed.y.toFixed(1)} kg` }
                      }
                  },
                  scales: {
                      y: { beginAtZero: false, ticks: { font: { size: 11 } }, title: { display: true, text: 'Volume (kg)', font: { size: 12, weight: 'bold' } } },
                      x: { ticks: { font: { size: 11 } }, title: { display: true, text: 'Data Sessione (GG/MM)', font: { size: 12, weight: 'bold' } } }
                  }
              }
          };

          if (displaySettings.showTrendHeader && chartConfig.volumeData.length >= 2 && chartConfig.trendlineData.length === chartConfig.volumeData.length && Math.abs(chartConfig.slope) > 1e-9) {
              chartDataSetup.data.datasets.push({
                  label: "Linea di Tendenza", data: chartConfig.trendlineData, borderColor: chartConfig.trendColor, borderWidth: 2,
                  borderDash: [5, 5], fill: false, pointRadius: 0, tension: 0
              });
          }

          if (typeof window.renderChart === "function") {
              window.renderChart(chartDataSetup, chartContainer);
          } else {
              const tableDiv = parentDiv.createEl("div", { cls: "volume-chart-table-fallback" });
              tableDiv.style.overflow = "auto"; const table = tableDiv.createEl("table");
              Object.assign(table.style, { width: "100%", borderCollapse: "collapse" });
              const hr = table.createEl("thead").createEl("tr");
              ["Data", "Volume (kg)"].forEach(txt => { const th = hr.createEl("th"); th.textContent = txt; Object.assign(th.style, { padding: "8px", borderBottom: "1px solid var(--background-modifier-border)", textAlign: "left" }); });
              const tbody = table.createEl("tbody");
              chartConfig.volumeData.forEach((v, i) => { const tr = tbody.createEl("tr"); [chartConfig.labels[i], v.toFixed(1)].forEach(txt => { const td = tr.createEl("td"); td.textContent = txt; Object.assign(td.style, { padding: "8px", borderBottom: "1px solid var(--background-modifier-border)" }); }); });
              chartContainer.style.display = "none";
              tableDiv.createEl("p", { text: "Tabella (Plugin Charts non disp. o errore).", attr: { style: "text-align:center;color:var(--text-muted);font-size:0.8em;margin-top:10px;" } });
          }
      } catch (e) {
          console.error("Errore rendering grafico:", e);
          parentDiv.innerHTML = "<p style='text-align:center;color:var(--text-error)'>Errore visualizzazione grafico.</p>";
      }
  }, 200);
}

/**
* Renders the statistics box.
* @param {HTMLElement} parentDiv - The parent div to append the stats to.
* @param {Array<string>} labels - Array of date labels.
* @param {Array<number>} volumeData - Array of volume data.
* @param {string} chartType - Type of chart ("exercise" or "workout").
*/
function renderStatsBox(parentDiv, labels, volumeData, chartType) {
  const statsDiv = parentDiv.createEl("div", { cls: "volume-chart-stats" });
  Object.assign(statsDiv.style, { marginTop: "20px", padding: "15px", backgroundColor: "var(--background-secondary)", borderRadius: "5px", fontSize: "0.9em" });

  const avgVolume = (volumeData.reduce((s, v) => s + v, 0) / volumeData.length).toFixed(1);
  const maxV = Math.max(...volumeData); const maxVolume = maxV.toFixed(1); const maxVolumeDate = labels[volumeData.indexOf(maxV)];
  const minV = Math.min(...volumeData); const minVolume = minV.toFixed(1); const minVolumeDate = labels[volumeData.indexOf(minV)];
  let recentTrendText = "N/A";

  if (volumeData.length >= 3) {
      const recent = volumeData.slice(-3); const changeRecent = recent[2] - recent[0]; const changeRecentAbs = Math.abs(changeRecent).toFixed(1);
      if (changeRecent > 0.05 * recent[0]) recentTrendText = `<span style="color:var(--color-green)">+${changeRecentAbs} kg</span> (ultime 3)`;
      else if (changeRecent < -0.05 * recent[0]) recentTrendText = `<span style="color:var(--color-red)">-${changeRecentAbs} kg</span> (ultime 3)`;
      else recentTrendText = "<span style='color:var(--color-orange)'>Stabile</span> (ultime 3)";
  } else if (volumeData.length === 2) {
      const changeRecent = volumeData[1] - volumeData[0]; const changeRecentAbs = Math.abs(changeRecent).toFixed(1);
      if (changeRecent > 0) recentTrendText = `<span style="color:var(--color-green)">+${changeRecentAbs} kg</span> (vs prec.)`;
      else if (changeRecent < 0) recentTrendText = `<span style="color:var(--color-red)">-${changeRecentAbs} kg</span> (vs prec.)`;
      else recentTrendText = "<span style='color:var(--color-orange)'>Invariato</span> (vs prec.)";
  }
  statsDiv.innerHTML = `<strong style="font-size:1.1em;">Statistiche Volume (${chartType === "workout" ? "Totale Allenamento" : "Esercizio"}):</strong><ul style="margin-top:8px;margin-bottom:5px;list-style-type:square;padding-left:20px;"><li>Volume medio: <strong>${avgVolume} kg</strong></li><li>Max: <strong>${maxVolume} kg</strong> (${maxVolumeDate || 'N/D'})</li><li>Min: <strong>${minVolume} kg</strong> (${minVolumeDate || 'N/D'})</li><li>Sessioni: <strong>${labels.length}</strong></li>${recentTrendText !== "N/A" ? `<li>Trend Recente: ${recentTrendText}</li>` : ""}</ul>`;
}

// --- Main Script Execution ---
const env = getScriptEnvironment(input, dv); // 'input' is global from dv.view, 'dv' is global Dataview API

if (env) {
  const { dv, params, container } = env;
  const config = initializeConfig(params, dv);
  const { pages: logPages, titlePrefix, targetPath } = fetchData(dv, config); // targetPath is returned but not directly used below, good for debugging

  const contentDiv = container.createEl("div"); // Main div for all content

  if (logPages.length === 0 && config.chartType === "workout" && !config.specificWorkoutPath) {
      // Special message if it's a workout chart on the current page and no logs found for THIS workout page
       contentDiv.innerHTML =
          `<p style='text-align:center;padding:20px;color:var(--text-muted)'>Nessun dato di volume trovato specificamente per le sessioni registrate come originate da <i>${titlePrefix}</i>.</p>` +
          `<p style='text-align:center;font-size:0.8em;color:var(--text-muted)'>Assicurati che i tuoi file di log in '${config.logFolderPath}' abbiano un campo <code>Origine:: [[${titlePrefix}]]</code> corretto.</p>`;
  } else if (logPages.length === 0 && config.chartType === "exercise" && !config.specificExercisePath) {
      contentDiv.innerHTML =
          `<p style='text-align:center;padding:20px;color:var(--text-muted)'>Nessun dato di volume trovato per l'esercizio <i>${titlePrefix}</i>.</p>` +
          `<p style='text-align:center;font-size:0.8em;color:var(--text-muted)'>Assicurati che i tuoi file di log in '${config.logFolderPath}' abbiano un campo <code>Esercizio:: [[${titlePrefix}]]</code> corretto.</p>`;
  } else {
      const { labels, volumeData } = aggregateDailyVolumes(logPages, dv);

      if (volumeData.length === 0) {
          contentDiv.innerHTML =
              `<p style='text-align:center;padding:20px;color:var(--text-muted)'>Nessun dato di volume disponibile per ${titlePrefix}.</p>`;
          if (logPages.length > 0) {
              contentDiv.innerHTML += `<p style='text-align:center;font-size:0.8em;color:var(--text-warning)'>(${logPages.length} log trovati, ma nessuno con volume aggregabile. Controlla i campi DataOra/ctime o Volume.)</p>`;
          }
      } else {
          const { trendlineData, slope } = calculateTrend(volumeData);
          const trendIndicators = getTrendIndicators(slope, volumeData);

          if (config.showTrendHeader) {
              renderTrendHeader(contentDiv, trendIndicators, volumeData);
          }

          const finalChartTitle = config.chartTitle || `Trend Volume: ${titlePrefix}`;
          const chartDisplayConfig = {
              labels, volumeData, trendlineData, slope,
              trendColor: trendIndicators.trendColor // Pass trendColor for the trendline dataset
          };
          const generalDisplaySettings = {
              finalChartTitle,
              customHeight: config.customHeight,
              chartType: config.chartType,
              showTrendHeader: config.showTrendHeader // To decide if trendline dataset is added
          };

          renderChartOrTable(contentDiv, chartDisplayConfig, generalDisplaySettings);

          if (config.showStatsBox) {
              renderStatsBox(contentDiv, labels, volumeData, config.chartType);
          }
      }
  }
}
