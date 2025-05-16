---
nome_esercizio: Cable Woodchopper
tags:
  - core
  - obliqui
  - addominali
  - rotazione
  - anti-rotazione
  - cavi
---

# Descrizione

Il Cable Woodchopper (taglialegna al cavo) è un esercizio funzionale che simula il movimento di tagliare la legna con un'ascia. Lavora intensamente i muscoli obliqui, il retto addominale e altri muscoli del core, migliorando la forza rotazionale e la stabilità. Può essere eseguito dall'alto verso il basso (high-to-low) o dal basso verso l'alto (low-to-high).

# Tecnica di Esecuzione (High-to-Low)

1.  **Setup**: Regola la puleggia di una macchina a cavi in una posizione alta. Attacca una maniglia a D o una corda.
2.  **Posizione iniziale**: Posizionati lateralmente rispetto alla macchina, afferrando la maniglia con entrambe le mani sopra la spalla più vicina alla macchina. Stai con i piedi alla larghezza delle spalle, ginocchia leggermente flesse, core contratto. Le braccia sono quasi estese.
3.  **Movimento (Chop)**: Espirando, tira la maniglia diagonalmente verso il basso e attraverso il corpo, ruotando il busto. Il movimento dovrebbe assomigliare a un taglio con l'ascia. Mantieni le braccia relativamente dritte e guida il movimento con il core. Il bacino può ruotare leggermente seguendo il movimento del tronco.
4.  **Posizione Finale**: Termina il movimento quando la maniglia raggiunge l'esterno del ginocchio opposto.
5.  **Ritorno**: Inspirando, ritorna lentamente alla posizione iniziale in modo controllato, resistendo alla trazione del cavo.
6.  **Ripetizioni**: Completa le ripetizioni previste per un lato prima di girarti e ripetere dall'altro lato.

# Note di Sicurezza

- Mantieni il core contratto durante tutto l'esercizio per stabilizzare la colonna vertebrale.
- Il movimento deve essere fluido e controllato, non brusco o basato sullo slancio.
- Concentrati sulla rotazione del tronco e sull'attivazione degli obliqui.
- Permetti una rotazione naturale del piede posteriore (quello più lontano dalla macchina nella posizione finale) per ridurre lo stress sulle ginocchia.
- Inizia con un peso leggero per padroneggiare la tecnica.
- Evita di piegare eccessivamente le braccia; dovrebbero agire principalmente come leve.
- Se hai problemi alla schiena, esegui l'esercizio con cautela o consulta un professionista.

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
