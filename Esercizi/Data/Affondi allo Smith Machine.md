---
nome_esercizio: Affondi allo Smith Machine
tags:
  - gambe
  - quadricipiti
  - glutei
  - equilibrio
  - compound
  - macchina
  - smith machine
---

Macchina:: [[theGYM/macchine/data/Multi power.md|Multi power]]

# Descrizione

Gli affondi allo Smith Machine sono una variante dell'affondo tradizionale che utilizza il supporto guidato della Smith Machine per facilitare l'equilibrio e l'esecuzione del movimento. Questo esercizio compound coinvolge principalmente quadricipiti, glutei e hamstring, oltre a sollecitare secondariamente i muscoli stabilizzatori del core. A differenza degli affondi liberi, la versione alla Smith Machine permette di concentrarsi maggiormente sull'intensità e sul carico, riducendo la necessità di bilanciamento laterale. L'escursione verticale guidata consente di mantenere una traiettoria costante durante l'esecuzione, rendendolo un esercizio eccellente per lo sviluppo della forza e dell'ipertrofia degli arti inferiori, particolarmente utile per chi desidera aumentare il carico in sicurezza o è in fase di apprendimento della tecnica dell'affondo.

# Tecnica di Esecuzione

1. **Posizione iniziale**:
   - Posizionati sotto la barra della Smith Machine con la schiena dritta
   - Appoggia la barra sulla parte superiore delle spalle/trapezi (posizione alta) o sulle scapole (posizione bassa)
   - Assumi una posizione eretta con i piedi paralleli e alla larghezza delle spalle
   - Sblocca la barra ruotandola leggermente
   - Fai un passo in avanti con una gamba, mantenendo l'altra ferma
2. **Fase di discesa (eccentrica)**:
   - Inspira mentre abbassi il corpo in modo controllato
   - Piega entrambe le ginocchia simultaneamente
   - La gamba anteriore dovrebbe formare un angolo di circa 90° al ginocchio
   - La gamba posteriore scende verso il pavimento, con il ginocchio che quasi lo sfiora
   - Mantieni il busto eretto e il core attivato durante tutto il movimento
3. **Fase di risalita (concentrica)**:
   - Espira mentre spingi attraverso il tallone della gamba anteriore
   - Estendi entrambe le gambe per tornare alla posizione di partenza
   - Utilizza i glutei e i quadricipiti per generare la forza necessaria
   - Mantieni la schiena neutra e le spalle indietro durante la risalita
4. **Varianti di esecuzione**:
   - Affondi stazionari: mantenendo sempre lo stesso piede avanti per tutte le ripetizioni
   - Affondi alternati: cambiando la gamba avanzata ad ogni ripetizione
   - Posizionamento del piede: più avanzato per maggiore attivazione dei glutei, più arretrato per i quadricipiti
   - Distanza dal macchinario: variando la distanza dei piedi dalla Smith Machine per modificare l'angolo di lavoro

# Note di Sicurezza

- Regola correttamente l'altezza dei fermi di sicurezza prima di iniziare l'esercizio
- Mantieni sempre la schiena dritta e il core attivato per proteggere la zona lombare
- Evita di spingere il ginocchio della gamba anteriore oltre la punta del piede
- Assicurati che il piede anteriore sia completamente appoggiato a terra e non solo sulla punta
- Inizia con carichi leggeri per padroneggiare la corretta tecnica di esecuzione
- Non bloccare completamente il ginocchio nella fase di estensione
- Se hai problemi di equilibrio, posiziona il piede posteriore leggermente più largo per una base più stabile
- Fai attenzione all'allineamento del ginocchio della gamba anteriore, che deve rimanere in linea con il piede
- Evita movimenti bruschi, specialmente nella transizione tra la fase eccentrica e concentrica
- Se avverti dolore acuto alle ginocchia o alla schiena, interrompi immediatamente l'esercizio

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
