---
nome_esercizio: Row
tags:
  - granDorsale
---
# Descrizione
Il Row (Rematore) è un esercizio fondamentale per lo sviluppo dei muscoli della schiena e può essere eseguito con diversi attrezzi: macchina specifica, bilanciere, manubri o cavi. Questo movimento compound coinvolge principalmente il dorsale ampio (latissimus dorsi), i romboidi, il trapezio medio e inferiore, i deltoidi posteriori, gli erettori spinali e, come muscoli secondari, i bicipiti e gli avambracci. Il rematore simula il movimento di remare, tirando un peso verso il corpo mentre si mantiene una postura stabile. È un esercizio essenziale per costruire una schiena forte e bilanciata, migliorare la postura e sviluppare la forza funzionale della catena posteriore. La sua versatilità lo rende adatto sia agli atleti principianti che a quelli avanzati, con numerose varianti che permettono di enfatizzare diverse aree muscolari.

# Tecnica di Esecuzione
1. **Posizione iniziale** (descritta per il rematore su macchina, adattabile alle altre varianti):
   - Siediti sulla macchina con il petto appoggiato contro il supporto imbottito (se presente)
   - Regola il sedile in modo che le impugnature siano raggiungibili con le braccia quasi completamente distese
   - Afferra le maniglie con una presa salda, palmi rivolti l'uno verso l'altro (presa neutra) o verso il basso
   - Mantieni la schiena dritta, le spalle leggermente indietro e il core attivato
   - I piedi devono essere ben appoggiati sui supporti o a terra per garantire stabilità

2. **Fase di trazione (concentrica)**:
   - Espira mentre tiri le maniglie verso il corpo
   - Inizia il movimento portando le scapole insieme (retrazione) prima di piegare i gomiti
   - Tira finché le maniglie non raggiungono la zona addominale o la parte bassa del petto
   - Mantieni i gomiti vicini al corpo e dirigili all'indietro, non verso l'alto
   - Contrai la schiena al massimo nel punto di massima contrazione

3. **Fase di ritorno (eccentrica)**:
   - Inspira mentre riporti le maniglie in avanti in modo controllato
   - Estendi le braccia gradualmente, mantenendo sempre una leggera tensione sui muscoli dorsali
   - Permetti alle scapole di allungarsi in avanti nella posizione finale
   - Evita di "lanciare" il peso o perdere il controllo del movimento

4. **Varianti di esecuzione**:
   - Presa larga: maggiore enfasi su trapezio e romboidi
   - Presa stretta: maggiore attivazione del dorsale e dei bicipiti
   - Rematore inclinato con manubri: maggiore richiesta di stabilizzazione del core
   - Rematore con bilanciere: permette di utilizzare carichi maggiori
   - Rematore su cavi bassi: offre una tensione costante durante tutto il movimento

# Note di Sicurezza
- Mantieni sempre la schiena in posizione neutra, evitando di inarcarla o arrotondarla eccessivamente
- Non utilizzare lo slancio o il movimento del busto per sollevare il peso
- Regola l'attrezzatura in base alle tue proporzioni corporee prima di iniziare
- Evita di alzare le spalle verso le orecchie durante il movimento
- Non estendere completamente i gomiti nella fase di ritorno per mantenere tensione sui muscoli
- Esegui il movimento in modo controllato, evitando strattoni o movimenti bruschi
- Concentrati sulla contrazione e sul movimento delle scapole, non solo sul movimento delle braccia
- Se avverti dolore alla schiena bassa o alle spalle, interrompi l'esercizio e verifica la tecnica
- Per le varianti a corpo libero (come il bent-over row), fai particolare attenzione alla posizione della schiena
- Inizia sempre con un peso gestibile per padroneggiare la tecnica corretta prima di aumentare il carico
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


