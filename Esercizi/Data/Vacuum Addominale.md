---
nome_esercizio: Vacuum Addominale
tags:
  - core
  - trasverso addominale
  - isometrico
  - controllo respiratorio
---

# Descrizione

Il Vacuum Addominale è un esercizio isometrico di respirazione che mira a rafforzare il muscolo trasverso dell'addome, il muscolo più profondo della parete addominale. Questo esercizio aiuta a migliorare la stabilità del core, a ridurre il girovita e a migliorare il controllo posturale. Non coinvolge movimenti dinamici ma una contrazione sostenuta.

# Tecnica di Esecuzione

1.  **Posizione**: Può essere eseguito in diverse posizioni: in piedi, seduto, a quattro zampe (la più comune per iniziare), o sdraiato sulla schiena con le ginocchia piegate.
2.  **Respirazione Iniziale**: Inspira profondamente attraverso il naso.
3.  **Espirazione Completa**: Espira completamente tutta l'aria dai polmoni attraverso la bocca. Svuota completamente i polmoni.
4.  **Contrazione (Vacuum)**: Dopo l'espirazione completa, tira l'ombelico il più possibile verso la colonna vertebrale, come se volessi farlo toccare internamente. Immagina di "risucchiare" lo stomaco verso l'alto e verso l'interno, sotto la gabbia toracica. Non trattenere il respiro bloccando la gola, ma mantieni la contrazione addominale.
5.  **Mantenimento**: Mantieni questa contrazione isometrica per un determinato periodo (es. 15-30 secondi per iniziare), respirando superficialmente se necessario, senza rilasciare la contrazione del trasverso.
6.  **Rilascio**: Rilascia lentamente la contrazione e inspira normalmente.
7.  **Ripetizioni**: Ripeti per il numero desiderato di ripetizioni o per un tempo totale.

# Note di Sicurezza

- Questo esercizio si basa sul controllo muscolare e respiratorio, non sulla forza bruta. Concentrati sulla sensazione di tirare l'ombelico verso la colonna.
- Non trattenere il respiro forzatamente durante la contrazione; cerca di eseguire piccole respirazioni superficiali se devi mantenere la contrazione a lungo.
- Evita di eseguire questo esercizio subito dopo i pasti.
- Se soffri di ipertensione, ernia iatale o altri problemi cardiovascolari o addominali, consulta il tuo medico prima di provare questo esercizio.
- Inizia con tempi di mantenimento brevi e aumenta gradualmente man mano che acquisisci controllo.
- Non confondere il vacuum con il semplice "tirare in dentro la pancia"; il focus è sul muscolo trasverso profondo.

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
