---
nome_esercizio: Shoulder Press
tags:
  - spalle
  - deltoidi
  - tricipiti
  - compound
  - macchina
---
Macchina:: [[theGYM/macchine/data/shoulder press Tecnogym.md|shoulder press Tecnogym]]

# Descrizione

La Shoulder Press (o pressa per spalle) è un esercizio fondamentale per lo sviluppo della parte superiore del corpo, eseguito su una macchina appositamente progettata che guida il movimento verticale. Questo esercizio compound coinvolge principalmente il deltoide anteriore e il deltoide laterale, con un coinvolgimento significativo dei trapezi e dei tricipiti come muscoli secondari. A differenza della Military Press con bilanciere, la Shoulder Press su macchina offre un percorso di movimento guidato che riduce il rischio di infortuni e permette di concentrarsi esclusivamente sull'intensità del lavoro muscolare. È un esercizio eccellente per costruire forza e volume nelle spalle, migliorare la stabilità dell'articolazione scapolo-omerale e sviluppare una silhouette a V nella parte superiore del corpo.

# Tecnica di Esecuzione

1. **Posizione iniziale**:

   - Siediti sulla macchina con la schiena ben appoggiata allo schienale
   - Regola l'altezza del sedile in modo che le impugnature siano approssimativamente all'altezza delle spalle
   - Afferra le maniglie con una presa salda, palmi rivolti in avanti o in posizione neutra (dipende dal design della macchina)
   - I gomiti dovrebbero essere piegati e allineati con il corpo, formando un angolo di circa 90 gradi
   - Mantieni i piedi ben appoggiati a terra per assicurare stabilità

2. **Fase di spinta (concentrica)**:

   - Espira mentre spingi le maniglie verso l'alto in modo controllato
   - Estendi le braccia senza bloccare completamente i gomiti al punto più alto
   - Mantieni il collo in posizione neutra, evitando di spingerlo in avanti
   - Contrai i muscoli delle spalle durante tutta la fase di spinta
   - Evita di inarcare la schiena durante il movimento

3. **Fase di ritorno (eccentrica)**:

   - Inspira mentre abbassi le maniglie lentamente verso la posizione di partenza
   - Controlla il movimento durante tutta la fase di discesa
   - Non permettere al peso di "cadere" o di rimbalzare nella posizione più bassa
   - Fermati quando i gomiti raggiungono un angolo di circa 90 gradi, evitando di scendere troppo in basso

4. **Varianti di esecuzione**:
   - Esecuzione unilaterale: utilizzo di un braccio alla volta per correggere squilibri
   - Variazione della presa: più stretta per maggiore attivazione dei tricipiti
   - Tempi di esecuzione: rallentare la fase eccentrica per aumentare il tempo sotto tensione
   - Pause isometriche: mantenere brevemente la contrazione al punto più alto del movimento

# Note di Sicurezza

- Regola sempre la macchina in base alla tua anatomia individuale prima di iniziare
- Evita di utilizzare carichi eccessivi che compromettano la corretta tecnica di esecuzione
- Mantieni sempre il controllo del movimento, evitando movimenti bruschi o scattosi
- Non bloccare completamente i gomiti nella fase di estensione per ridurre lo stress sulle articolazioni
- Mantieni la parte bassa della schiena appoggiata allo schienale durante tutto l'esercizio
- Evita di sollevare le spalle verso le orecchie durante il movimento
- Non spingere la testa in avanti durante la fase di spinta
- Se avverti dolore alle spalle o ai gomiti, interrompi immediatamente l'esercizio
- Non trattenere il respiro durante l'esecuzione, segui il pattern respiratorio consigliato
- Al termine della serie, riporta le maniglie alla posizione iniziale in modo controllato o utilizza i fermi di sicurezza

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
