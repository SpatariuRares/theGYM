---
nome_esercizio: Standing Leg Curl
tags:
  - gambe
  - hamstring
  - ischio-crurali
  - isolamento
  - unilaterale
  - macchina
---

Macchina:: [[theGYM/macchine/data/Leg curl in piedi.md|Leg curl in piedi]]

# Descrizione

Lo Standing Leg Curl (curl per le gambe in piedi) è un esercizio di isolamento che si concentra specificamente sui muscoli posteriori della coscia (hamstring) e, in misura minore, sui gastrocnemi (polpacci). Eseguito su una macchina apposita che consente di flettere il ginocchio contro resistenza mentre si è in posizione eretta, questo esercizio offre un'alternativa efficace al tradizionale leg curl sdraiato o seduto. A differenza di altre varianti, lo standing leg curl consente di lavorare su una gamba alla volta in posizione funzionale, migliorando l'equilibrio e la stabilità unilaterale. È particolarmente utile per atleti di sport che richiedono potenza e forza degli hamstring come sprint, salti e calci, oltre a contribuire all'estetica della parte posteriore della coscia e alla prevenzione degli infortuni.

# Tecnica di Esecuzione

1. **Posizione iniziale**:

   - Posizionati di fronte alla macchina, rivolto verso il supporto imbottito
   - Afferra le maniglie o il supporto frontale per stabilità
   - Posiziona la parte posteriore della caviglia (tendine d'Achille) sotto il cuscinetto della macchina
   - Mantieni la gamba di supporto leggermente flessa, non bloccata
   - Attiva il core e mantieni la schiena in posizione neutra

2. **Fase di flessione (concentrica)**:

   - Espira mentre fletti il ginocchio, sollevando il tallone verso il gluteo
   - Contrai attivamente i muscoli hamstring durante il movimento
   - Solleva il peso fino a quando il ginocchio è piegato a circa 90 gradi o leggermente oltre
   - Mantieni la posizione superiore per 1-2 secondi per massimizzare la contrazione
   - Evita di utilizzare slancio o di compensare con altri muscoli

3. **Fase di ritorno (eccentrica)**:

   - Inspira mentre abbassi lentamente la gamba alla posizione di partenza
   - Controlla il movimento di ritorno, resistendo alla trazione del peso
   - Mantieni una leggera tensione nei muscoli posteriori della coscia anche nel punto più basso
   - Non tornare alla completa estensione del ginocchio per mantenere tensione costante

4. **Varianti di esecuzione**:
   - Tempo sotto tensione: rallentare deliberatamente la fase eccentrica (3-4 secondi)
   - Pausa isometrica: mantenere la contrazione nel punto più alto per 2-3 secondi
   - Range parziale: lavorare solo nella porzione più difficile del movimento per intensificare lo stimolo
   - Metodo 21: eseguire 7 ripetizioni nella metà inferiore, 7 nella metà superiore e 7 complete

# Note di Sicurezza

- Regola accuratamente l'altezza del cuscinetto in base alla tua statura prima di iniziare
- Mantieni sempre una presa salda sulle maniglie per stabilità durante tutto l'esercizio
- Evita di inarcare eccessivamente la schiena durante l'esecuzione
- Non utilizzare slancio o movimenti bruschi per sollevare il peso
- Controlla il movimento sia nella fase concentrica che in quella eccentrica
- Inizia con carichi leggeri per padroneggiare la corretta tecnica prima di aumentare il peso
- Se avverti dolore al ginocchio o dietro la coscia (diverso dal normale "bruciore" muscolare), interrompi l'esercizio
- Evita questo esercizio se hai recenti infortuni al ginocchio o agli hamstring
- Mantieni il busto in posizione verticale, evitando di piegarti in avanti
- Assicurati che l'imbottitura della macchina sia posizionata correttamente sulla parte posteriore della caviglia, non sul tendine d'Achille

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
