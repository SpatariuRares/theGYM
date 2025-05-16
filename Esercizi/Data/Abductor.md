---
nome_esercizio: Abductor
tags:
  - macchina
  - isolamento
  - gambe
  - glutei
  - abduttori
---

Macchina:: [[theGYM/macchine/data/Leg abductor.md|Leg abductor]]

# Descrizione

L'esercizio alla macchina Abductor è specificamente progettato per isolare e rafforzare i muscoli abduttori dell'anca. Questi includono principalmente il medio gluteo, il piccolo gluteo e il tensore della fascia lata (TFL). Viene eseguito da seduti su un'apposita macchina che fornisce resistenza durante il movimento di allontanamento delle gambe dal corpo (abduzione).

# Tecnica di Esecuzione

1.  **Posizionamento:** Siediti sulla macchina Abductor assicurandoti che la schiena sia ben appoggiata allo schienale. Posiziona la parte esterna delle cosce o delle ginocchia (a seconda del design della macchina) contro i cuscinetti imbottiti.
2.  **Regolazioni:** Seleziona un peso adeguato. Regola l'ampiezza di partenza in modo che le gambe siano unite o leggermente divaricate, a seconda della tua flessibilità e del comfort. Afferra le maniglie laterali per una maggiore stabilità.
3.  **Movimento di Abduzione:** Espirando, spingi lentamente e in modo controllato le gambe verso l'esterno contro la resistenza dei cuscinetti. Concentrati sulla contrazione dei muscoli esterni dell'anca e dei glutei.
4.  **Picco di Contrazione:** Mantieni la posizione di massima apertura per un breve istante, massimizzando la contrazione muscolare.
5.  **Movimento di Adduzione (Ritorno):** Inspirando, ritorna lentamente e con controllo alla posizione iniziale, resistendo alla forza del peso. Non lasciare che le piastre del peso sbattano.
6.  **Controllo:** Mantieni il controllo per tutto l'arco del movimento, evitando slanci o movimenti troppo rapidi. Il busto deve rimanere fermo e la schiena appoggiata.

# Note di Sicurezza

- **Carico Appropriato:** Inizia con un peso leggero per imparare la tecnica corretta. Aumenta il carico gradualmente, assicurandoti di poter mantenere sempre una buona forma. Un carico eccessivo può stressare le articolazioni dell'anca.
- **Controllo del Movimento:** Evita movimenti bruschi o l'uso dello slancio, specialmente nella fase di ritorno. Il controllo è fondamentale per l'efficacia e la sicurezza dell'esercizio.
- **Postura:** Mantieni la schiena dritta e ben aderente allo schienale per tutta la durata dell'esercizio per proteggere la colonna vertebrale.
- **Range di Movimento (ROM):** Non forzare un'apertura eccessiva se senti disagio o limitazioni nella flessibilità. Lavora entro un range di movimento confortevole e controllato.
- **Dolore:** Interrompi immediatamente l'esercizio se avverti dolore acuto all'anca, alle ginocchia o alla schiena e consulta un professionista.

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
