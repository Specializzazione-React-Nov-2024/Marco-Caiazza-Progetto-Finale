# Proposta di Consegna

## Descrizione
BestMovies è una piattaforma sviluppata con React, Supabase per il backend e l'autenticazione, e Bootstrap CSS per lo stile. Permette agli utenti di scoprire i film più popolari in uscita o di effettuare ricerche mirate, visualizzare i dettagli di ogni titolo, aggiungerli ai preferiti e lasciare recensioni, creando un'esperienza interattiva e personalizzata per gli amanti del cinema.

## API
Ho utilizzato le seguenti API:
- **THEMOVIEDB API**: [https://www.themoviedb.org/](https://www.themoviedb.org)(per recuperare i dettagli dei film).
- **Supabase**: [https://supabase.com](https://supabase.com) (per autenticazione e gestione del backend).

## Stile
Ho utilizzato Bootstrap CSS per garantire un design elegante e responsive.

## Pagine
1. **Home Page**: Elenco dei film con funzionalità di ricerca e filtro.
2. **Pagina Dettaglio Film**: Informazioni dettagliate su un film selezionato.
3. **Pagina Registrazione/Login**: Permette agli utenti di registrarsi e accedere.
4. **Pagina Account (Preferiti/Reviews)**: Mostra la lista personalizzata di film preferiti e recensioni per un utente autenticato.


## User Interactions
### Utente non autenticato:
1. Può scorrere tra la lista dei film più popolari al momento.
2. Può filtrare i film più popolari ed utilizzare la barra di ricerca per un film mirato.
3. Può visualizzare i dettagli dei film.
4. Può registrarsi e accedere alla piattaforma.

### Utente autenticato:
1. Può aggiungere film alla lista dei preferiti.
2. Può rimuovere film dalla lista dei preferiti.
3. Può aggiungere un commento ai film.
4. Può accedere alla pagina "Account" e visualizzare i propri film preferiti.
5. Può accedere alla pagina "Account" e visualizzare i commenti rilasciati.
6. Può visualizzare la propria pagina "Profilo".

## Context

1. **AuthContext**:
   - Stato autenticazione utente
   - Dati profilo utente
   - Dati account utente
   - Metodi di login/logout
   - Gestione sessione

## Deployment
L'applicazione non è ancora stata pubblicata.
