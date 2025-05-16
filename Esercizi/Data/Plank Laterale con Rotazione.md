---
nome_esercizio: Plank Laterale con Rotazione
tags:
  - core
  - obliqui
  - stabilità
  - rotazione
  - isometrico
  - dinamico
  - corpo libero
---

# Descrizione

Il Plank Laterale con Rotazione è una variante dinamica del plank laterale che aggiunge una componente di rotazione del tronco. Questo esercizio sfida ulteriormente gli obliqui, migliora la stabilità del core e la mobilità toracica.

# Tecnica di Esecuzione

1.  **Posizione iniziale (Plank Laterale)**: Sdraiati su un fianco con le gambe dritte e sovrapposte. Appoggia l'avambraccio a terra, con il gomito direttamente sotto la spalla. Solleva i fianchi dal pavimento fino a formare una linea retta dalla testa ai piedi. Contrai il core e i glutei. Estendi il braccio superiore verso il soffitto.
2.  **Movimento (Rotazione)**: Inspirando, ruota lentamente il busto verso il pavimento, portando il braccio superiore sotto il corpo, come se volessi raggiungere lo spazio dietro di te.
3.  **Ritorno**: Espirando, inverti il movimento tornando alla posizione iniziale del plank laterale, ruotando il busto e riportando il braccio superiore verso il soffitto.
4.  **Controllo**: Mantieni i fianchi sollevati e stabili durante tutta la rotazione. Il movimento deve essere controllato e originare dal tronco.
5.  **Ripetizioni**: Completa le ripetizioni previste per un lato prima di cambiare fianco.

# Note di Sicurezza

- Mantieni sempre il core e i glutei contratti per stabilizzare il corpo ed evitare che i fianchi cedano verso il basso.
- Assicurati che il gomito di appoggio sia direttamente sotto la spalla per proteggere l'articolazione.
- Il movimento di rotazione deve essere controllato; evita movimenti bruschi.
- Mantieni il collo in linea con la colonna vertebrale.
- Se senti dolore alla spalla o alla schiena, interrompi l'esercizio.
- Per una versione più facile, puoi eseguire l'esercizio appoggiandoti sul ginocchio inferiore invece che sui piedi.

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
