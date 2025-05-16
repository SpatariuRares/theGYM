---
nome_esercizio: Cable Kickback
tags:
  - glutei
  - isolamento
  - unilaterale
  - cavi
---

# Descrizione

Il Cable Kickback è un esercizio di isolamento mirato principalmente al grande gluteo. Utilizzando una macchina a cavi con una cavigliera, permette di concentrare la tensione sul gluteo durante l'estensione dell'anca, favorendo lo sviluppo e la definizione muscolare.

# Tecnica di Esecuzione

1.  **Setup**: Attacca una cavigliera alla puleggia bassa di una macchina a cavi. Indossa la cavigliera attorno a una caviglia.
2.  **Posizione iniziale**: Posizionati di fronte alla macchina, a una distanza tale da sentire una leggera tensione sul cavo quando la gamba con la cavigliera è leggermente indietro. Appoggiati alla macchina con le mani per stabilità. Mantieni il busto leggermente inclinato in avanti, la schiena dritta e il core contratto. La gamba di appoggio deve essere leggermente piegata.
3.  **Movimento (Kickback)**: Espirando, estendi l'anca portando la gamba con la cavigliera all'indietro e leggermente verso l'alto. Concentrati sulla contrazione del gluteo della gamba che si muove. Mantieni la gamba quasi tesa (una leggera flessione al ginocchio è accettabile) e il movimento controllato, evitando di inarcare eccessivamente la schiena.
4.  **Picco di Contrazione**: Mantieni la posizione di massima estensione per un istante, contraendo intensamente il gluteo.
5.  **Ritorno**: Inspirando, riporta lentamente la gamba alla posizione iniziale in modo controllato, resistendo alla trazione del cavo.
6.  **Ripetizioni**: Completa le ripetizioni previste per una gamba prima di passare all'altra.

# Note di Sicurezza

- Mantieni il core contratto per stabilizzare il busto ed evitare un eccessivo inarcamento della schiena lombare.
- Il movimento deve originare dall'anca; evita di usare lo slancio o di muovere il busto.
- Controlla il movimento in entrambe le fasi (andata e ritorno) per massimizzare l'attivazione muscolare e prevenire infortuni.
- Non estendere eccessivamente la gamba all'indietro al punto da causare disagio alla schiena.
- Usa un peso che ti permetta di eseguire l'esercizio con una tecnica corretta e sentire la contrazione del gluteo.
- Assicurati che la cavigliera sia ben fissata.

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
