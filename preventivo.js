document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('preventivoForm');
    const estimateBox = document.getElementById('estimateBox');
    const successMessage = document.getElementById('successMessage');

    if (!form) return;

    // Listener submit con validazione
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        let isValid = true;

        // Reset errori
        document.querySelectorAll('.error-message').forEach(err => {
            err.style.display = 'none';
        });

        // Valida nome
        const nome = document.getElementById('nome').value.trim();
        if (nome.length < 2) {
            document.getElementById('nomeError').style.display = 'block';
            isValid = false;
        }

        // Valida email
        const email = document.getElementById('email').value.trim();
        if (typeof validateEmail === 'function' && !validateEmail(email)) {
            document.getElementById('emailError').style.display = 'block';
            isValid = false;
        }

        // Valida telefono
        const telefono = document.getElementById('telefono').value.trim();
        if (typeof validatePhone === 'function' && !validatePhone(telefono)) {
            document.getElementById('telefonoError').style.display = 'block';
            isValid = false;
        }

        // Valida città
        const citta = document.getElementById('citta').value.trim();
        if (citta.length < 2) {
            document.getElementById('cittaError').style.display = 'block';
            isValid = false;
        }

        // Valida privacy
        const privacy = document.getElementById('privacy').checked;
        if (!privacy) {
            document.getElementById('privacyError').style.display = 'block';
            isValid = false;
        }

        if (!isValid) {
            const firstError = document.querySelector('.error-message[style*="block"]');
            if (firstError) {
                firstError.parentElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }

        inviaPreventivo();
    });

    function inviaPreventivo() {
        // 1. Raccolta dati form
        const formData = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            telefono: document.getElementById('telefono').value,
            citta: document.getElementById('citta').value,
            servizio: document.querySelector('input[name="servizio"]:checked')?.value,
            tipologia: document.getElementById('tipologia').value,
            metratura: document.getElementById('metratura').value,
            stanze: document.getElementById('stanze').value,
            lavori: Array.from(document.querySelectorAll('input[name="lavori[]"]:checked')).map(cb => cb.value),
            urgenza: document.getElementById('urgenza').value,
            note: document.getElementById('note').value
        };

        // 2. Tracciamento Conversione GA4
        if (typeof gtag === 'function') {
            const amountText = estimateBox && estimateBox.style.display !== 'none'
                ? document.getElementById('estimateAmount').textContent
                : '0';
            const value = parseFloat(amountText.replace(/[^0-9.]/g, '')) || 0;

            gtag('event', 'generate_lead', {
                'currency': 'EUR',
                'value': value,
                'item_category': formData.servizio
            });
        }

        // 3. Gestione visiva successo
        form.style.display = 'none';
        if (estimateBox) estimateBox.style.display = 'none';
        successMessage.style.display = 'block';
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // 4. Opzione WhatsApp
        const messaggioWA = creaMessaggioWhatsApp(formData);
        setTimeout(() => {
            if (confirm('Vuoi inviare la richiesta anche su WhatsApp per una risposta immediata?')) {
                window.open('https://wa.me/393384531102?text=' + encodeURIComponent(messaggioWA), '_blank');
            }
        }, 1500);
    }

    function creaMessaggioWhatsApp(data) {
        const lavori = data.lavori.length > 0 ? data.lavori.join(', ') : 'Non specificati';
        return 'Ciao Marco! Ti invio la mia richiesta di preventivo:\n\n' +
            '👤 Nome: ' + data.nome + '\n' +
            '📧 Email: ' + data.email + '\n' +
            '📱 Telefono: ' + data.telefono + '\n' +
            '📍 Città: ' + data.citta + '\n\n' +
            '🎯 Servizio: ' + (data.servizio || 'Non specificato') + '\n' +
            '🏠 Tipologia: ' + (data.tipologia || 'Non specificata') + '\n' +
            '📐 Metratura: ' + (data.metratura || 'N/D') + ' mq\n' +
            '🚪 Stanze: ' + (data.stanze || 'N/D') + '\n' +
            '🔧 Lavori inclusi: ' + lavori + '\n' +
            '⏰ Urgenza: ' + (data.urgenza || 'Flessibile') + '\n\n' +
            '📝 Note: ' + (data.note || 'Nessuna');
    }
});
