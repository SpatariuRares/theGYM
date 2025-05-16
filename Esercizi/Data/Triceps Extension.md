---
nome_esercizio: Triceps Extension
tags:
  - braccia
  - tricipiti
  - isolamento
  - macchina
---

Macchina:: [[tricep machine]]

# Descrizione

La Triceps Extension è un esercizio di isolamento progettato per sviluppare specificamente il muscolo tricipite brachiale, che costituisce circa i due terzi del volume del braccio. Questo esercizio può essere eseguito su una macchina apposita, con cavi, manubri o bilancieri, garantendo un isolamento efficace di tutte e tre le teste del tricipite (lunga, laterale e mediale). A differenza degli esercizi compound come presse o dip, la Triceps Extension elimina il contributo di gruppi muscolari secondari, concentrando il lavoro esclusivamente sui tricipiti. È particolarmente efficace per la definizione e la crescita muscolare della parte posteriore del braccio, ed è fondamentale sia per obiettivi estetici che funzionali, migliorando la forza nei movimenti di spinta e stabilizzando l'articolazione della spalla.

# Tecnica di Esecuzione

1. **Posizione iniziale** (per la versione alla macchina):

   - Siediti sulla macchina con la schiena ben appoggiata contro lo schienale
   - Regola l'altezza del sedile in modo che le articolazioni delle spalle siano allineate con l'asse di rotazione della macchina
   - Afferra le impugnature con i palmi rivolti verso il basso o in posizione neutra
   - Mantieni i gomiti vicini al corpo e allineati con l'asse di rotazione
   - Posiziona i piedi ben appoggiati a terra per maggiore stabilità

2. **Fase di estensione (concentrica)**:

   - Espira mentre spingi le impugnature verso il basso, estendendo completamente i gomiti
   - Contrai i tricipiti al massimo nella posizione di estensione completa
   - Mantieni la parte superiore delle braccia stazionaria (solo l'avambraccio si muove)
   - Evita di utilizzare lo slancio del corpo per completare il movimento
   - Esegui una breve pausa nella posizione di massima contrazione

3. **Fase di ritorno (eccentrica)**:

   - Inspira mentre permetti alle impugnature di risalire in modo controllato
   - Piega i gomiti fino a quando gli avambracci formano circa un angolo di 90 gradi con la parte superiore delle braccia
   - Evita di lasciare che il peso risalga bruscamente
   - Mantieni la tensione nei tricipiti durante tutta la fase di ritorno

4. **Varianti di esecuzione**:
   - Esecuzione unilaterale: utilizzo di un braccio alla volta per correggere squilibri
   - Cambio di impugnatura: presa prona (palmi in giù), supina (palmi in su) o neutra
   - Overhead Triceps Extension: con cavi o manubri, estendendo le braccia sopra la testa
   - Triceps Pushdown: con cavo, spingendo verso il basso con le braccia vicine al corpo

# Note di Sicurezza

- Regola sempre correttamente la macchina in base alla tua antropometria
- Evita di utilizzare carichi eccessivi che compromettano la corretta tecnica di esecuzione
- Mantieni la parte superiore delle braccia ferma durante tutto il movimento
- Non bloccare completamente i gomiti nella fase di estensione, mantenendo una leggera tensione
- Evita movimenti bruschi o a scatti che possono sottoporre i gomiti a stress eccessivo
- Non inarcare la schiena per facilitare il movimento
- Se avverti dolore ai gomiti o alle spalle, interrompi immediatamente l'esercizio
- Non spingere oltre il normale range di movimento articolare
- Esegui sempre un adeguato riscaldamento prima di utilizzare carichi elevati
- Al termine dell'esercizio, riporta sempre il peso alla posizione iniziale in modo controllato

# Log delle Performance

```dataviewjs
// Utilizzo corretto per Leg Press
await dv.view("theGYM/Scripts/ExerciseLogTable", {
    input: {
        exercise: dv.current().nome_esercizio,
        limit: 50,
        searchByName: true,
        debug: true
    }
});
```

### grafico

```dataviewjs
// Definisci i parametri (opzionali)
const input = {
    // title: "Trend Volume Esercizio",
    // height: "250px",
    // showTrend: true,
    // showStats: true,
    // exercisePath: "theGYM/Esercizi/Panca Piana.md" // Solo se vuoi visualizzare un esercizio diverso
};

// Passa il container esplicitamente quando usi dv.view
await dv.view("theGYM/Scripts/VolumeChartTemplate", {
    input: input
});
```
