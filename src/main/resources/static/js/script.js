window.addEventListener('DOMContentLoaded', () => {
    const dateBox = document.getElementById('date-box');
    const lijst = document.getElementById('lijstItems');
    const wasItems = document.querySelectorAll('.was-item');
    const bevestigKnop = document.getElementById('bevestigKnop'); // Correcte ID

    // Datum invullen
    if (dateBox) {
        const today = new Date();
        const formatter = new Intl.DateTimeFormat('nl-BE', {
            year: '2-digit',
            month: '2-digit',
            day: 'numeric'
        });

        const datumElement = document.createElement('p');
        datumElement.textContent = formatter.format(today);
        dateBox.appendChild(datumElement);
    }

    function updateTotaalAantal() {
        const lijstItems = document.querySelectorAll('#lijstItems li');
        let totaal = 0;

        lijstItems.forEach(li => {
            const aantal = parseInt(li.querySelector('.aantal').textContent);
            totaal += isNaN(aantal) ? 0 : aantal;
        });

        const totaalElement = document.getElementById('totaalAantal');
        if (totaalElement) {
            totaalElement.textContent = totaal;
        }
    }

    wasItems.forEach(img => {
        img.addEventListener('click', () => {
            const itemNaam = img.dataset.item;
            let bestaandItem = [...lijst.children].find(li => li.dataset.item === itemNaam);

            if (bestaandItem) {
                const aantalSpan = bestaandItem.querySelector('.aantal');
                aantalSpan.textContent = parseInt(aantalSpan.textContent) + 1;
            } else {
                const nieuwLi = document.createElement('li');
                nieuwLi.dataset.item = itemNaam;
                nieuwLi.innerHTML = `
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span>${itemNaam}</span>
                        <div style="display: flex; gap: 8px; align-items: center;">
                            <button class="plus" style="color: green;">+</button>
                            <button class="min" style="color: red;">−</button>
                            <span class="aantal">1</span>
                        </div>
                    </div>
                `;
                lijst.appendChild(nieuwLi);

                const plusBtn = nieuwLi.querySelector('.plus');
                const minBtn = nieuwLi.querySelector('.min');
                const aantalSpan = nieuwLi.querySelector('.aantal');

                plusBtn.addEventListener('click', () => {
                    aantalSpan.textContent = parseInt(aantalSpan.textContent) + 1;
                    updateTotaalAantal();
                });

                minBtn.addEventListener('click', () => {
                    const huidigeAantal = parseInt(aantalSpan.textContent);
                    if (huidigeAantal > 1) {
                        aantalSpan.textContent = huidigeAantal - 1;
                    } else {
                        nieuwLi.remove();
                    }
                    updateTotaalAantal();
                });
            }

            updateTotaalAantal();

            img.classList.add('klik-animatie');
            setTimeout(() => img.classList.remove('klik-animatie'), 150);
        });
    });

    if (bevestigKnop) {
        bevestigKnop.addEventListener('click', () => {
            const naam = document.querySelector('textarea[placeholder="Naam:"]').value.trim();
            const opmerkingen = document.querySelector('.opmerkingen-textarea').value.trim();
            const lijstItems = document.querySelectorAll('#lijstItems li');

            const vandaag = new Date();
            const datumFormatter = new Intl.DateTimeFormat('nl-BE', {
                year: '2-digit',
                month: '2-digit',
                day: '2-digit'
            });
            const datum = datumFormatter.format(vandaag).replaceAll('/', '-');

            let inhoud = `Naam klant: ${naam}\nDatum: ${datum}\n\nWaslijst:\n`;

            let totaalAantal = 0;
            lijstItems.forEach(li => {
                const itemNaam = li.dataset.item;
                const aantal = parseInt(li.querySelector('.aantal').textContent, 10);
                totaalAantal += aantal;
                inhoud += `${itemNaam}: ${aantal}\n`;
            });

            inhoud += `\nTotaal aantal stuks: ${totaalAantal}\n`;
            inhoud += `\nOpmerkingen:\n${opmerkingen}\n`;

            const blob = new Blob([inhoud], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${naam || 'onbekend'}_${datum}.txt`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            // Optionele redirect na downloaden
            setTimeout(() => {
                window.location.href = '/';
            }, 500);
        });
    }
});

