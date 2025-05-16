---
nome_esercizio: Biceps Curl Machine
tags:
  - braccia
  - bicipiti
  - brachiale
  - isolamento
  - macchina
---

# Descrizione

La Biceps Curl Machine è un attrezzo specializzato progettato per isolare e sviluppare i muscoli bicipiti brachiali in modo efficace e controllato. A differenza dei curl con bilanciere o manubri, questa macchina offre un percorso di movimento guidato che riduce il coinvolgimento dei muscoli stabilizzatori e minimizza le possibilità di barare sulla tecnica. Il supporto per i gomiti mantiene l'articolazione del gomito in una posizione biomeccanicamente corretta, permettendo di concentrare lo sforzo esclusivamente sui bicipiti. L'esercizio coinvolge principalmente il bicipite brachiale e il brachiale anteriore, con un coinvolgimento secondario del brachioradiale. È particolarmente utile per principianti, per la riabilitazione dopo infortuni o per chi desidera perfezionare l'isolamento dei bicipiti senza preoccuparsi del bilanciamento e della stabilizzazione del peso.

# Tecnica di Esecuzione

1. **Posizione iniziale**:

   - Siediti sulla macchina con la schiena ben appoggiata allo schienale
   - Regola il sedile in modo che i gomiti siano correttamente posizionati sui cuscinetti di supporto
   - Le braccia dovrebbero essere completamente distese con i gomiti ben appoggiati
   - Afferra le impugnature con una presa salda, palmi rivolti verso l'alto
   - Mantieni i polsi in posizione neutra, evitando flessioni o estensioni eccessive

2. **Fase di flessione (concentrica)**:

   - Espira mentre pieghi le braccia, portando le impugnature verso le spalle
   - Contrai i bicipiti durante il movimento, concentrandoti sul muscolo target
   - Esegui il movimento in modo fluido e controllato, evitando strappi o movimenti bruschi
   - Piega completamente le braccia fino a raggiungere la massima contrazione dei bicipiti
   - Mantieni gomiti e spalle stabili durante tutto il movimento

3. **Fase di estensione (eccentrica)**:

   - Inspira mentre abbassi lentamente le impugnature tornando alla posizione iniziale
   - Controlla il peso durante la discesa, resistendo alla gravità
   - Estendi le braccia completamente senza sbattere o rilasciare bruscamente il peso
   - Mantieni sempre una leggera tensione sui bicipiti, anche nella posizione di massima estensione

4. **Varianti di esecuzione**:
   - Esecuzione unilaterale: utilizzo di un braccio alla volta per correggere squilibri
   - Presa neutra (se disponibile): impugnature con i palmi rivolti l'uno verso l'altro per maggiore coinvolgimento del brachiale
   - Tempo sotto tensione: rallentare deliberatamente la fase eccentrica per maggiore stimolazione
   - Pause isometriche: mantenere la contrazione al punto più alto per 1-2 secondi

# Note di Sicurezza

- Regola sempre la macchina in base alla tua anatomia individuale prima di iniziare
- Evita di utilizzare carichi eccessivi che compromettano la corretta tecnica di esecuzione
- Mantieni i gomiti ben appoggiati sui cuscinetti di supporto durante tutto il movimento
- Non utilizzare slancio o aiutarti con il corpo per sollevare il peso
- Mantieni il busto fermo e appoggiato allo schienale, evitando di sporgerti in avanti
- Non bloccare completamente i gomiti nella fase di estensione per mantenere tensione sui bicipiti
- Evita movimenti bruschi, specialmente nella transizione tra la fase concentrica ed eccentrica
- Se avverti dolore al gomito, al polso o alla spalla, interrompi immediatamente l'esercizio
- Esegui sempre un adeguato riscaldamento delle articolazioni prima di utilizzare carichi elevati
- Al termine dell'allenamento, rilascia il peso in modo controllato utilizzando i fermi di sicurezza

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
