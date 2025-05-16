---
nome_esercizio: Incline Cable Y-Raises
tags:
  - spalle
  - deltoidi laterali
  - deltoidi posteriori
  - trapezio superiore
  - cuffia dei rotatori
  - isolamento
  - cavi
---

# Descrizione

Le Incline Cable Y-Raises sono un esercizio eseguito su una panca inclinata utilizzando i cavi bassi, mirato a rafforzare i deltoidi (in particolare laterali e posteriori), i trapezi superiori e i muscoli della cuffia dei rotatori. La posizione inclinata e l'uso dei cavi forniscono una tensione costante e aiutano a isolare i muscoli target, promuovendo la salute e la stabilità delle spalle.

# Tecnica di Esecuzione

1.  **Setup**: Posiziona una panca inclinata (circa 30-45 gradi) al centro di una stazione a cavi doppia, con le pulegge impostate nella posizione più bassa. Attacca delle maniglie singole (D-handles) ai cavi.
2.  **Posizione iniziale**: Sdraiati prono (a pancia in giù) sulla panca inclinata. Afferra la maniglia sinistra con la mano destra e la maniglia destra con la mano sinistra (i cavi si incrociano sotto la panca). Lascia che le braccia pendano dritte verso il pavimento, con i palmi rivolti l'uno verso l'altro o verso il corpo. Mantieni il petto appoggiato alla panca e il core contratto.
3.  **Movimento (Sollevamento a Y)**: Espira mentre sollevi le braccia contemporaneamente verso l'alto e leggermente verso l'esterno, formando una "Y" con il corpo e le braccia. Mantieni i gomiti quasi completamente estesi (una leggera flessione è accettabile). Il movimento dovrebbe avvenire principalmente a livello delle spalle.
4.  **Picco di Contrazione**: Solleva le braccia finché non sono all'incirca all'altezza delle orecchie o fin dove la tua mobilità lo consente senza compensare con la schiena. Contrai i muscoli delle spalle e della parte alta della schiena per un istante.
5.  **Ritorno**: Inspira mentre abbassi lentamente e in modo controllato le braccia alla posizione iniziale, resistendo alla trazione dei cavi.
6.  **Ripetizioni**: Completa il numero di ripetizioni desiderato.

# Note di Sicurezza

- Mantieni il petto sempre appoggiato alla panca per evitare di usare lo slancio o di inarcare la schiena.
- Il movimento deve essere lento e controllato, concentrandosi sulla contrazione muscolare piuttosto che sul sollevare pesi elevati.
- Mantieni i gomiti solo leggermente flessi; non trasformare l'esercizio in un rematore.
- Evita di alzare le spalle verso le orecchie; cerca di mantenere le spalle basse e indietro.
- Usa un peso leggero; questo è un esercizio di isolamento che richiede controllo e precisione.
- Se senti dolore alle spalle, interrompi l'esercizio e verifica la tecnica o consulta un professionista.
- Assicurati che la panca sia stabile e posizionata correttamente tra i cavi.

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
