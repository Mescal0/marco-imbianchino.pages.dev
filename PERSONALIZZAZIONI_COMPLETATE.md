# Personalizzazioni Completate

## Progetto: Marco Baldi - Imbianchino
**Dominio:** https://marco-imbianchino.pages.dev

---

## Miglioramenti Implementati

### SEO e Metadata
- **JSON-LD LocalBusiness**: Schema markup strutturato aggiunto in `index.html` per il SEO locale
- **Open Graph**: Meta tag og:title, og:description, og:url, og:type, og:locale su tutte le pagine
- **Canonical links**: Tag `<link rel="canonical">` su tutte le pagine
- **sitemap.xml**: File sitemap con tutte le pagine del sito
- **robots.txt**: File robots.txt per i crawler dei motori di ricerca

### Accessibilità (WCAG 2.1)
- **Skip-to-content link**: Collegamento nascosto per saltare la navigazione (visibile con Tab)
- **aria-label** su nav toggle, nav element, form fields, link e bottoni
- **aria-expanded** sul bottone hamburger del menu mobile
- **aria-current="page"** sul link attivo nella navigazione
- **aria-pressed** sui bottoni filtro del portfolio
- **aria-live** sulle aree di messaggio successo/errore
- **role="region"**, **role="group"**, **role="list"** su sezioni appropriate
- **aria-hidden="true"** sulle emoji decorative

### Performance
- **Caricamento GTM differito**: Google Tag Manager caricato con `window addEventListener('load')` invece di bloccare il rendering
- **defer** su script Google Analytics
- **loading="lazy"** su tutte le immagini del portfolio
- **width/height** su tutte le immagini per evitare layout shift (CLS)
- **link rel="preconnect"** per Google Tag Manager, Google Analytics e Unsplash

### UX e Design
- **Sezione Testimonianze**: Aggiunta sezione recensioni clienti in `index.html`
- **Sezione FAQ**: FAQ accordion accessibile in `index.html` con 5 domande frequenti
- **Tap target**: Bottone hamburger allargato a min 48x48px per usabilità mobile
- **aria-label** su tutti i link WhatsApp e tel: per chiarezza

### Formulari e Funzionalità
- **FormSubmit.co integrato**: Entrambi i form (preventivo e contatti) inviano email reali a marco.baldi.24@gmail.com
- **URL WhatsApp corretto**: Sostituito placeholder `393XXXXXXXXX` con numero reale `393384531102`
- **Redirect post-invio**: Parametro `?inviato=1` per mostrare messaggio di conferma
- **GA4 tracking**: Evento `generate_lead` su submit dei form
- **autocomplete**: Attributi autocomplete su tutti i campi form per usabilità

### Manutenzione
- **.gitignore**: File creato con pattern standard per escludere .env, node_modules, build artifacts
- **PERSONALIZZAZIONI_COMPLETATE.md**: Aggiornato con documentazione reale (questo file)

---

## Note Tecniche
- Il sito è statico (HTML/CSS/JS) ospitato su Cloudflare Pages
- FormSubmit.co non richiede backend: invia le email tramite il loro servizio gratuito
- Per attivare FormSubmit, il primo invio richiede conferma email all'indirizzo destinatario
