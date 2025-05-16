---
nome_esercizio: Glute Ham Raise
tags:
  - gambe
  - hamstring
  - glutei
  - polpacci
  - lombari
  - compound
  - corpo libero
  - macchina
---

# Descrizione

Il Glute Ham Raise (GHR) è un esercizio avanzato per la catena posteriore, considerato uno dei migliori per lo sviluppo simultaneo di glutei, femorali (hamstring) ed erettori spinali. Viene eseguito su un'apposita panca GHR, che blocca i piedi e supporta le ginocchia, permettendo un movimento di estensione e flessione combinato di anca e ginocchio.

# Tecnica di Esecuzione

1.  **Setup**: Regola la panca GHR in modo che le ginocchia siano posizionate comodamente sui cuscinetti e i piedi siano saldamente bloccati contro la piastra posteriore. La distanza tra i cuscinetti per le ginocchia e la piastra per i piedi è cruciale e dipende dalla lunghezza delle tue tibie.
2.  **Posizione iniziale**: Inizia con il busto eretto (perpendicolare al pavimento) o leggermente inclinato in avanti, ginocchia flesse a 90 gradi. Mantieni la schiena dritta e il core contratto.
3.  **Fase di discesa (eccentrica)**: Abbassa lentamente il busto in avanti estendendo le ginocchia, mantenendo una linea retta dalle ginocchia alla testa. Il movimento è controllato principalmente dai femorali. Scendi fino a quando il busto è parallelo al pavimento o fin dove riesci a controllare il movimento.
4.  **Fase di risalita (concentrica)**: Inverti il movimento contraendo potentemente i femorali per flettere le ginocchia e riportare il busto alla posizione iniziale. Contemporaneamente, estendi le anche contraendo i glutei per completare il movimento e tornare alla posizione eretta. Il movimento è una combinazione di flessione del ginocchio (azione dei femorali) ed estensione dell'anca (azione dei glutei).

5.  **Varianti di esecuzione**:
    - Versione assistita: utilizzo delle braccia o di una banda elastica per aiutare la risalita
    - GHR con twist: aggiungere una rotazione nella fase di risalita per coinvolgere gli obliqui

# Note di Sicurezza

- Se sei alle prime armi con questo esercizio, inizia con la versione assistita utilizzando le braccia per aiutarti
- Assicurati che i cuscinetti della panca siano regolati correttamente per la tua altezza
- Verifica che i piedi siano saldamente bloccati prima di iniziare l'esercizio
- Mantieni sempre la colonna vertebrale in posizione neutra, evitando di inarcarne la parte lombare
- Non tentare di scendere oltre il punto in cui puoi mantenere il controllo del movimento
- Se avverti tensione o dolore nella zona lombare, interrompi immediatamente l'esercizio
- Inizia con un numero ridotto di ripetizioni (3-5) per le prime sessioni, anche se ti sembra facile
- Gli hamstring possono essere soggetti a DOMS (dolori muscolari post-allenamento) intensi; introduci gradualmente questo esercizio nella tua routine
- Esegui sempre un adeguato riscaldamento, includendo esercizi di mobilità per anche e ginocchia
- È consigliabile avere un assistente nelle prime fasi di apprendimento dell'esercizio

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
