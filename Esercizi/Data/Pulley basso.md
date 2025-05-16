---
nome_esercizio: Pulley basso
tags:
  - schiena
  - gran dorsale
  - romboidi
  - trapezio
  - bicipiti
  - compound
  - cavi
---

# Descrizione

Il Pulley Basso (o Low Row) è un esercizio fondamentale per lo sviluppo della muscolatura posteriore del tronco, eseguito utilizzando una macchina con cavo e puleggia posizionata in basso. Questo movimento compound coinvolge principalmente i muscoli dorsali (gran dorsale e romboidi), i muscoli del trapezio inferiore, i deltoidi posteriori e secondariamente i bicipiti e gli avambracci. A differenza degli esercizi a corpo libero come le trazioni, il pulley basso permette di modulare con precisione il carico e adattare l'esercizio a qualsiasi livello di forza. L'utilizzo del cavo garantisce una tensione costante durante tutto il movimento, ottimizzando l'attivazione muscolare e riducendo i punti morti. È un esercizio particolarmente efficace per migliorare la postura, bilanciare lo sviluppo muscolare del tronco e potenziare la capacità di trazione orizzontale.

# Tecnica di Esecuzione

1. **Posizione iniziale**:

   - Siediti sulla panca del pulley con i piedi ben appoggiati sulle pedane o sul pavimento
   - Afferra la barra o le maniglie con una presa salda
   - Mantieni la schiena dritta, le spalle indietro e il petto leggermente in fuori
   - Estendi leggermente le braccia in avanti mantenendo una leggera flessione dei gomiti
   - Contrai leggermente il core per stabilizzare il tronco

2. **Fase di trazione (concentrica)**:

   - Espira mentre tiri la barra/maniglie verso l'addome
   - Inizia il movimento avvicinando le scapole tra loro (retrazione scapolare)
   - Continua tirando con i gomiti che si muovono all'indietro e leggermente verso il basso
   - Porta la barra/maniglie a contatto con la parte bassa dell'addome o il punto di massima contrazione
   - Mantieni i gomiti vicino al corpo durante tutta la fase di trazione

3. **Fase di ritorno (eccentrica)**:

   - Inspira mentre riporti le braccia in estensione controllata
   - Permetti alle scapole di allungarsi in avanti (protrazione) alla fine del movimento
   - Mantieni sempre un minimo di tensione, evitando di rilasciare completamente il carico
   - Controlla il movimento senza permettere al peso di guidare le braccia in avanti

4. **Varianti di esecuzione**:
   - Presa larga: maggiore enfasi sui dorsali esterni e spalle posteriori
   - Presa stretta: maggiore coinvolgimento della parte centrale della schiena e dei bicipiti
   - Presa supina (palmi verso l'alto): maggiore attivazione dei bicipiti
   - Presa neutra (palmi uno verso l'altro): maggiore comfort per spalle e polsi
   - Utilizzo di maniglie singole: per l'esecuzione unilaterale o alternata

# Note di Sicurezza

- Mantieni sempre la schiena in posizione neutra, evitando di inarcarla eccessivamente
- Non utilizzare lo slancio del busto per completare la ripetizione
- Evita di tirare la barra/maniglie troppo in alto (verso il petto), il che potrebbe sovraccaricare le spalle
- Regola il sedile in modo che le ginocchia siano leggermente piegate quando i piedi sono appoggiati
- Nei carichi pesanti, assicurati che i piedi siano ben ancorati sui supporti per evitare di essere trascinato in avanti
- Evita di sollevare le spalle verso le orecchie durante il movimento
- Non iperestendere la schiena nella fase di trazione
- Controlla il movimento nella fase di ritorno, evitando movimenti bruschi
- Se avverti dolore alla schiena bassa o alle spalle, interrompi immediatamente l'esercizio
- Al termine della serie, accompagna sempre il peso al ritorno piuttosto che rilasciarlo bruscamente

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
