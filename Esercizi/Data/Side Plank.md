---
nome_esercizio: Side Plank
tags:
  - core
  - obliqui
  - stabilità
  - isometrico
  - bodyweight
---

# Descrizione

Il Side Plank (o Plank Laterale) è un esercizio isometrico fondamentale per rafforzare i muscoli obliqui (interni ed esterni), il quadrato dei lombi e migliorare la stabilità laterale del core e dell'anca. Consiste nel mantenere una posizione rigida appoggiandosi su un avambraccio e sul lato del piede.

# Tecnica di Esecuzione

1.  **Posizione iniziale**: Sdraiati su un fianco con le gambe dritte e i piedi sovrapposti o uno davanti all'altro (posizione sfalsata per maggiore stabilità).
2.  **Appoggio**: Posiziona l'avambraccio inferiore a terra con il gomito direttamente sotto la spalla. L'avambraccio dovrebbe essere perpendicolare al corpo.
3.  **Sollevamento**: Contrai il core e i glutei e solleva i fianchi dal pavimento fino a formare una linea retta dalla testa ai piedi. Il peso è supportato dall'avambraccio e dal lato del piede inferiore.
4.  **Allineamento**: Mantieni il corpo in linea retta, evitando che i fianchi cedano verso il basso o si sollevino eccessivamente. La testa deve rimanere in linea con la colonna vertebrale.
5.  **Braccio Superiore**: Puoi tenere il braccio superiore lungo il fianco, appoggiato sull'anca, o esteso verso il soffitto per aumentare leggermente la difficoltà.
6.  **Mantenimento**: Mantieni la posizione per il tempo desiderato, respirando normalmente.
7.  **Cambio Lato**: Abbassa lentamente i fianchi, girati sull'altro lato e ripeti.

# Note di Sicurezza

- Assicurati che il gomito di appoggio sia direttamente sotto la spalla per evitare stress eccessivo sull'articolazione.
- Mantieni il core e i glutei costantemente contratti per sostenere i fianchi ed evitare che cedano.
- Evita di trattenere il respiro; respira in modo controllato durante il mantenimento.
- Mantieni il collo in una posizione neutra, allineato con la colonna.
- Se senti dolore alla spalla o alla schiena, interrompi l'esercizio.
- Per una versione più facile, puoi eseguire il side plank appoggiandoti sul ginocchio inferiore piegato invece che sui piedi.
- Assicurati che il corpo non ruoti in avanti o indietro; mantieni il petto aperto.

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
