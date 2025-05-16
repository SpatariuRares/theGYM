---
nome_esercizio: Leg press 45
tags:
  - gambe
  - quadricipiti
  - glutes
  - hamstring
  - forza
  - compound
  - macchina
---

Macchina:: [[leg press 45 macchine|leg press 45 macchine]], [[theGYM/macchine/data/Leg press 45 Panatta.md|Leg press 45 Panatta]]

# Descrizione

La Leg Press 45° è un esercizio compound per la parte inferiore del corpo eseguito su una macchina inclinata a 45 gradi. A differenza dello squat tradizionale, consente di spingere carichi elevati con un minor stress sulla colonna vertebrale, poiché la schiena rimane appoggiata e supportata durante tutto il movimento. L'esercizio coinvolge principalmente quadricipiti, glutei e hamstring, con un'intensità variabile in base al posizionamento dei piedi sulla piattaforma. La Leg Press 45° è particolarmente efficace per lo sviluppo della forza e dell'ipertrofia degli arti inferiori, rappresentando un esercizio fondamentale nell'allenamento delle gambe per atleti di tutti i livelli.

# Tecnica di Esecuzione

1. **Posizione iniziale**:

   - Siediti sulla macchina con la schiena ben aderente allo schienale imbottito
   - Posiziona i piedi sulla piattaforma a larghezza spalle o leggermente più larghi
   - Le ginocchia dovrebbero essere piegate a circa 90 gradi
   - Impugna le maniglie laterali per maggiore stabilità
   - Assicurati che la parte bassa della schiena rimanga in contatto con lo schienale

2. **Fase di spinta (concentrica)**:

   - Espira mentre spingi con i piedi sulla piattaforma
   - Estendi le gambe in modo controllato senza mai bloccare completamente le ginocchia
   - Mantieni la pressione distribuita uniformemente tra tallone e metatarso
   - Mantieni una leggera flessione delle ginocchia nel punto di massima estensione

3. **Fase di ritorno (eccentrica)**:

   - Inspira mentre permetti alla piattaforma di tornare verso di te
   - Controlla il movimento di discesa, evitando di cedere bruscamente
   - Mantieni i piedi ben saldi sulla piattaforma durante tutto il movimento
   - Scendi fino a quando le ginocchia formano un angolo di circa 90 gradi

4. **Varianti di posizionamento dei piedi**:
   - Piedi alti sulla piattaforma: maggiore attivazione di glutei e hamstring
   - Piedi bassi sulla piattaforma: enfasi sui quadricipiti
   - Piedi larghi: maggiore coinvolgimento degli adduttori e parte interna delle cosce
   - Piedi stretti: maggiore attivazione del vasto laterale (parte esterna del quadricipite)
   - Piedi ruotati leggermente verso l'esterno: adattamento all'anatomia individuale dell'anca

# Note di Sicurezza

- Non bloccare mai completamente le ginocchia nella fase di estensione per evitare stress eccessivo sull'articolazione
- Verifica sempre che i fermi di sicurezza siano correttamente posizionati prima di iniziare
- Evita di avvicinare le ginocchia al petto in modo eccessivo, mantieni un range di movimento sicuro
- Non sollevare le natiche dallo schienale durante l'esecuzione per proteggere la zona lombare
- Evita di spingere con le mani sulle ginocchia durante la fase di spinta
- Non usare carichi eccessivi che compromettano la corretta tecnica di esecuzione
- Esegui sempre un adeguato riscaldamento prima di utilizzare carichi elevati
- Se avverti dolore alle ginocchia o alla schiena, interrompi immediatamente l'esercizio
- Quando carichi o scarichi i dischi dalla macchina, fai attenzione a mantenere una postura corretta
- Rilascia sempre il carico in modo controllato a fine allenamento, utilizzando i fermi di sicurezza

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
