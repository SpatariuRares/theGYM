---
nome_esercizio: Plank
tags:
  - core
  - addominali
  - stabilità
  - isometrico
  - bodyweight
---

# Descrizione

Il Plank (o Front Plank) è un esercizio isometrico fondamentale per il rafforzamento del core, che coinvolge principalmente il retto addominale, il trasverso dell'addome, gli obliqui, ma anche i muscoli della schiena, i glutei e le spalle. Consiste nel mantenere una posizione simile a quella di un push-up, ma appoggiandosi sugli avambracci.

# Tecnica di Esecuzione

1.  **Posizione iniziale**: Posizionati a terra a pancia in giù.
2.  **Appoggio**: Solleva il corpo appoggiandoti sugli avambracci e sulle punte dei piedi. I gomiti devono essere direttamente sotto le spalle e gli avambracci paralleli tra loro (o con le mani unite).
3.  **Allineamento**: Forma una linea retta dalla testa ai talloni. Contrai attivamente gli addominali e i glutei per evitare che i fianchi cedano verso il basso o si sollevino troppo in alto.
4.  **Testa e Collo**: Mantieni la testa in una posizione neutra, guardando verso il pavimento, in linea con la colonna vertebrale.
5.  **Mantenimento**: Mantieni la posizione per il tempo desiderato, respirando in modo costante e controllato. Non trattenere il respiro.

# Note di Sicurezza

- La chiave è mantenere l'allineamento corretto del corpo. Evita di far cadere i fianchi o di alzarli eccessivamente.
- Contrai attivamente il core e i glutei durante tutto l'esercizio.
- Assicurati che i gomiti siano direttamente sotto le spalle per proteggere le articolazioni.
- Respira costantemente; trattenere il respiro può aumentare la pressione sanguigna.
- Se senti dolore nella zona lombare, interrompi l'esercizio e controlla la forma. Potrebbe essere necessario ridurre il tempo di mantenimento o rafforzare ulteriormente il core.
- Inizia con tempi di mantenimento brevi (es. 20-30 secondi) e aumenta gradualmente.

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
