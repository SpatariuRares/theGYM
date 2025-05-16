---
nome_esercizio: Hip thrust
tags:
  - glutei
  - hamstring
  - compound
  - macchina
---

Macchina:: [[theGYM/macchine/data/hip trust machine.md|hip trust machine]]

# Descrizione

L'Hip Thrust Machine è un attrezzo specializzato progettato per eseguire l'hip thrust, un esercizio focalizzato principalmente sul grande gluteo. A differenza dell'hip thrust tradizionale con bilanciere, la versione alla macchina offre un movimento guidato e un supporto ottimale per schiena e spalle, facilitando un'esecuzione corretta e riducendo il rischio di infortuni. Questo esercizio è considerato uno dei più efficaci per lo sviluppo della forza e dell'ipertrofia dei glutei, coinvolgendo anche secondariamente i muscoli ischiocrurali (hamstring), gli adduttori e gli stabilizzatori del core. La macchina permette un'esecuzione precisa del movimento di estensione dell'anca, consentendo di utilizzare carichi significativi in sicurezza senza la necessità di preparare e posizionare bilancieri e pesi.

# Tecnica di Esecuzione

1. **Posizione iniziale**:

   - Siediti sulla macchina con la schiena appoggiata sul supporto imbottito
   - Posiziona i piedi a terra, a larghezza spalle o leggermente più larghi
   - Allinea le ginocchia piegate a circa 90 gradi quando sei nella posizione di partenza
   - Afferra le maniglie laterali (se presenti) per stabilità
   - Posiziona il cuscinetto imbottito della macchina sulla parte bassa dell'addome/alta delle cosce

2. **Fase di spinta (concentrica)**:

   - Espira mentre spingi attraverso i talloni
   - Contrai i glutei con forza mentre sollevi il bacino
   - Estendi le anche fino a quando il corpo forma una linea retta dalle spalle alle ginocchia
   - Raggiungi una contrazione massimale dei glutei nel punto più alto
   - Mantieni l'addome contratto per stabilizzare la parte bassa della schiena

3. **Fase di ritorno (eccentrica)**:

   - Inspira mentre abbassi il bacino in modo controllato
   - Mantieni la tensione sui glutei durante la discesa
   - Abbassa fino a tornare alla posizione iniziale senza toccare il fondo della macchina
   - Evita di "rimbalzare" nella posizione bassa

4. **Varianti di esecuzione**:
   - Posizionamento dei piedi: più avanti per un maggiore coinvolgimento degli hamstring, più indietro per un'enfasi sui quadricipiti
   - Larghezza dei piedi: più stretta per il grande gluteo, più larga per un maggiore coinvolgimento degli abduttori
   - Rotazione dei piedi: leggermente ruotati verso l'esterno per un migliore allineamento con l'articolazione dell'anca
   - Tempo sotto tensione: rallentare la fase eccentrica o mantenere la posizione alta per 1-3 secondi

# Note di Sicurezza

- Regola correttamente la macchina in base alla tua altezza e struttura corporea prima di iniziare
- Evita di iperestendere la colonna vertebrale nel punto più alto del movimento
- Mantieni la testa in posizione neutra, evitando di spingerla in avanti o di estenderla eccessivamente
- Non utilizzare un carico che comprometta la corretta tecnica di esecuzione
- Assicurati che i piedi rimangano ben piantati a terra durante tutto il movimento
- Evita di utilizzare lo slancio o di "rimbalzare" dal fondo per facilitare il movimento
- Mantieni le ginocchia allineate con i piedi durante l'esecuzione
- Se avverti dolore alla schiena o alle ginocchia, interrompi immediatamente l'esercizio
- Non bloccare le ginocchia nella fase di estensione
- Se sei un principiante, inizia con carichi leggeri per padroneggiare la tecnica corretta prima di aumentare il peso

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
