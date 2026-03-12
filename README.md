# Sito Web Imbianchino - Guida Completa

## Indice
- [Panoramica](#-panoramica)
- [Personalizzazione Immediata](#-personalizzazione-immediata)
- [Come Usare il Sito](#-come-usare-il-sito)
- [Configurare Invio Email](#-configurare-invio-email)
- [Funzionalità Implementate](#-funzionalità-implementate)
- [Personalizzazioni Avanzate](#-personalizzazioni-avanzate)
- [Checklist Pre-Launch](#️-checklist-pre-launch)
- [Troubleshooting](#-troubleshooting)
- [Prossimi Step Consigliati](#-prossimi-step-consigliati)
- [License](#-license)

## 📋 Panoramica
Sito web professionale multi-pagina per attività di imbiancatura e manutenzione verde, con preventivatore online integrato.

### Struttura File
```
├── index.html          # Homepage
├── servizi.html        # Pagina servizi dettagliata
├── portfolio.html      # Galleria lavori
├── preventivo.html     # Form preventivo con calcolo stima
├── contatti.html       # Pagina contatti
├── style.css           # Stili globali
├── script.js           # Script comuni
├── preventivo.js       # Logica preventivatore
└── README.md          # Questa guida
```

## 🎯 Personalizzazione Immediata

### 1. DATI CONTATTO (PRIORITÀ ALTA)
Sostituisci in TUTTI i file HTML: +393384531102 o email marco.baldi.24@gmail.com

**Telefono:**
- Cerca: `+393000000000`
- Sostituisci con: il tuo numero (es. `+393384531102`)

**Email:**
- Cerca: `esempio.it`
- Sostituisci con: `marco.baldi.24@gmail.com`

**WhatsApp:**
- Cerca: `https://wa.me/393300000000`
- Sostituisci con: `https://wa.me/393384531102`

**Nome/Brand:**
- Cerca: `Marco Imbianchino`
- Sostituisci con: `Imbiancature & Servizi Giardinaggio Marco`

**Zona Operativa:**
- In `contatti.html`, cerca `Roma e provincia`
- Sostituisci con la tua zona `Firenze, Pistoia e Provincia`

### 2. PERSONALIZZA SERVIZI
In `servizi.html` modifica:
- Descrizioni servizi (Imbiancature interne ed esterne, decorazioni, servizi di mantenimento verde)
- Prezzi (Traspirante 5 €/mq, Antimuffa 7 €/mq, Quarzi 10 €/mq, Smalti 15/20 €/mq)
- Lista lavorazioni offerte (Stuccature, Risanamenti, Verniciatura, Velatura, Taglio erba, Siepi, Potature)
- Prodotti utilizzati (Sigma, San Marco)

### 3. PREVENTIVATORE - Prezzi Base
In `preventivo.js` (righe 8-13):
```javascript
const prezziBase = {
    imbiancatura: 5,    // Modifica con tuo prezzo €/mq
    decorazioni: 15,    // Modifica con tuo prezzo €/mq
    verde: 50,          // Modifica prezzo base intervento
    multiplo: 10        // Prezzo medio
};
```

### 4. PORTFOLIO - Aggiungi Tue Foto
In `portfolio.html`:
1. Sostituisci i placeholder emoji con le tue immagini
2. Modifica questa riga per ogni foto:
```html
<!-- DA: -->
<div class="portfolio-image">🎨</div>

<!-- A: -->
<img src="percorso/tua-foto.jpg" alt="Descrizione" class="portfolio-image">
```

3. Aggiungi questo CSS in `style.css`:
```css
.portfolio-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
```

### 5. COLORI BRAND
In `style.css` (righe 8-15), modifica i colori:
```css
:root {
    --primary-color: #2563eb;      /* Blu principale */
    --secondary-color: #10b981;    /* Verde secondario */
    --dark: #1f2937;               /* Testo scuro */
    --light: #f9fafb;              /* Sfondo chiaro */
    --gray: #6b7280;               /* Testo grigio */
}
```

## 🚀 Come Usare il Sito

### Opzione 1: Test Locale (Subito)
1. Apri `index.html` direttamente nel browser
2. Naviga tra le pagine
3. Testa il preventivatore

### Opzione 2: Deploy su Cloudflare Pages (GRATIS)

#### Passo 1: Prepara i File
1. Crea account su [Cloudflare](https://dash.cloudflare.com)
2. Tutti i file sono già pronti in `/home/claude/`

#### Passo 2: Deploy
1. Vai su Cloudflare Dashboard → Pages
2. Clicca "Create a project"
3. Scegli "Upload assets"
4. Carica TUTTI i file (.html, .css, .js)
5. Nome progetto: `tuo-nome-imbianchino`
6. Clicca "Deploy"

#### Passo 3: Dominio
Avrai subito un URL tipo:
`tuo-nome-imbianchino.pages.dev`

Opzionale: Collega dominio personalizzato (tipo `tuonome.it`)

### Opzione 3: Hosting Alternativo
- **Netlify**: Drop dei file, deploy istantaneo
- **GitHub Pages**: Gratis con repository
- **Vercel**: Ottimo per progetti semplici

## 📧 Configurare Invio Email (Form Contatti/Preventivo)

### Soluzione 1: FormSubmit.co (FACILE)
1. Vai su [formsubmit.co](https://formsubmit.co)
2. In `preventivo.html` e `contatti.html`, aggiungi al form:
```html
<form action="https://formsubmit.co/TUA_EMAIL" method="POST">
```
3. Riceverai email ad ogni submission

### Soluzione 2: EmailJS (AVANZATO)
1. Crea account su [emailjs.com](https://www.emailjs.com)
2. Configura servizio email
3. Sostituisci logica invio in `preventivo.js` e `contatti.html`

### Soluzione 3: Cloudflare Workers
Usa il sistema che già conosci da SpeseSmart!

## 🔧 Funzionalità Implementate

### Preventivatore
✅ Calcolo stima automatico in base a:
- Tipo servizio
- Metratura
- Numero stanze  
- Lavori extra (soffitti, porte, etc.)
✅ Range prezzo min/max
✅ Messaggio WhatsApp pre-compilato
✅ Validazione form completa

### Form Contatti
✅ Validazione email/telefono
✅ Invio messaggio
✅ Conferma visiva

### Design
✅ Responsive (mobile-first)
✅ Menu hamburger mobile
✅ Animazioni smooth
✅ Accessibilità
✅ SEO-friendly

## 📱 WhatsApp Integration

Il sistema crea automaticamente messaggi formattati:
```
*Richiesta Preventivo*

👤 Nome: Marco Baldi    
📧 Email: marco.baldi.24@gmail.com
📱 Tel: +393384531102
📍 Città: Monsummano Terme Pistoia

🎯 Servizio: imbiancatura&Giardinaggio
🏠 Tipologia: appartamento
📐 Metratura: 80 mq
...
```

## 🎨 Personalizzazioni Avanzate

### Aggiungere Google Analytics
In `<head>` di ogni pagina:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=TUO-ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'TUO-ID');
</script>
```

### Aggiungere Facebook Pixel
```html
<!-- Facebook Pixel -->
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'TUO-PIXEL-ID');
  fbq('track', 'PageView');
</script>
```

### Aggiungere Recensioni Google
Puoi integrare widget recensioni usando Google Places API

### Cookie Banner
Per GDPR, aggiungi banner cookies usando:
- [Cookiebot](https://www.cookiebot.com)
- [Iubenda](https://www.iubenda.com)

## ⚠️ Checklist Pre-Launch

- [ ] Sostituiti TUTTI i numeri telefono
- [ ] Sostituita email
- [ ] Link WhatsApp funzionanti
- [ ] Nome/brand personalizzato
- [ ] Prezzi preventivatore aggiornati
- [ ] Zona operativa corretta
- [ ] Foto portfolio (se disponibili)
- [ ] Testato su mobile
- [ ] Form contatti funzionante
- [ ] Link interni funzionanti

## 🐛 Troubleshooting

**Form non invia:**
- Controlla console browser (F12)
- Verifica configurazione email service
- Testa validazione campi

**Menu mobile non si apre:**
- Verifica che `script.js` sia caricato
- Controlla console per errori JS

**Stile non carica:**
- Verifica path `style.css` corretto
- Controlla permessi file
- Cache browser (Ctrl+F5)

## 💡 Prossimi Step Consigliati

1. **P.IVA e Brand**: Quando attivi P.IVA, aggiorna nome e dati fiscali
2. **Dominio Personalizzato**: Acquista `tuonome.it` (10€/anno)
3. **Foto Professionali**: Investi in foto lavori reali
4. **SEO Local**: Ottimizza per ricerche locali
5. **Google My Business**: Crea profilo aziendale
6. **Social Media**: Collega Instagram/Facebook

## 📞 393384531102

Hai creato questo sito con Claude. Per modifiche:
- HTML/CSS basic: puoi modificare tu stesso
- Funzionalità avanzate: contatta sviluppatore
- Hosting issues: supporto Cloudflare

## 📄 License

Questo sito è tuo. Puoi modificarlo, distribuirlo, venderlo come preferisci.

---

**Creato il:** 2025-01-18  
**Aggiornato il:** 2026-03-12  
**Versione:** 1.1  
**Stack:** HTML5, CSS3, Vanilla JavaScript  
**Hosting consigliato:** Cloudflare Pages (gratis)