---
nome_esercizio: Hack squat
tags:
  - gambe
  - quadricipiti
  - glutei
  - compound
  - macchina
---

Macchina:: [[theGYM/macchine/data/Hack squat machine.md|Hack squat machine]]

# Descrizione

L'Hack Squat è un esercizio eseguito su una macchina specifica che permette di simulare il movimento dello squat, ma con un supporto per la schiena e una traiettoria guidata. Questo riduce lo stress sulla colonna vertebrale e permette di concentrarsi maggiormente sui muscoli delle gambe, principalmente quadricipiti e glutei.

# Tecnica di Esecuzione

1. **Posizione iniziale**:
   - Posizionati sulla macchina con le spalle sotto i cuscinetti imbottiti e la schiena ben appoggiata al supporto.
   - Posiziona i piedi sulla piattaforma alla larghezza delle spalle o leggermente più larghi, con le punte leggermente rivolte verso l'esterno.
   - Sblocca i fermi di sicurezza della macchina.
   - Mantieni la schiena dritta e il core contratto.
2. **Fase eccentrica (discesa)**:
   - Inspira e piega lentamente le ginocchia, abbassando il corpo come se stessi sedendo su una sedia.
   - Scendi finché le cosce sono parallele alla piattaforma o leggermente sotto, mantenendo la schiena sempre appoggiata.
   - Assicurati che le ginocchia seguano la linea dei piedi e non collassino verso l'interno.
   - Evita di rimbalzare nella posizione bassa.
3. **Fase concentrica (risalita)**:
   - Espira mentre spingi attraverso i talloni e la parte centrale del piede per estendere le gambe e tornare alla posizione iniziale.
   - Concentrati sulla contrazione di quadricipiti e glutei.
   - Mantieni le ginocchia leggermente flesse nel punto più alto per evitare blocchi articolari e mantenere tensione muscolare.
4. **Varianti di posizionamento dei piedi**:
   - Piedi più avanti sulla piattaforma: maggiore attivazione dei glutei e dei bicipiti femorali.
   - Piedi più indietro (più bassi) sulla piattaforma: maggiore attivazione dei quadricipiti.
   - Piedi larghi: maggiore coinvolgimento degli adduttori e parte interna delle cosce.
   - Piedi stretti: maggiore attivazione del vasto laterale (parte esterna del quadricipite).

# Note di Sicurezza

- Mantieni sempre la schiena ben appoggiata al supporto durante tutto il movimento per proteggere la zona lombare.
- Non bloccare mai completamente le ginocchia nella fase di estensione.
- Assicurati che i fermi di sicurezza siano correttamente posizionati prima di iniziare e riagganciali alla fine del set.
- Inizia con pesi leggeri per padroneggiare la tecnica prima di aumentare il carico.
- Evita questo esercizio se hai problemi preesistenti alle ginocchia o alla schiena senza prima consultare un professionista.
- Non eseguire il movimento con una profondità eccessiva se causa dolore o se hai problemi di mobilità alle anche o alle caviglie.
- Assicurati che la macchina sia regolata correttamente per la tua altezza e conformazione fisica.
- Controlla il movimento in entrambe le fasi, specialmente la discesa.

# Log Esercizio

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
