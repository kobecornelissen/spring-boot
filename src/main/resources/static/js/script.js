window.addEventListener('DOMContentLoaded', () => {
    const dateBox = document.getElementById('date-box');
    if (dateBox) {
        const today = new Date();
        const formatter = new Intl.DateTimeFormat('nl-BE', {
            year: '2-digit',
            month: '2-digit',
            day: 'numeric'
        });
        dateBox.textContent = formatter.format(today);
    }

    const clickableImages = document.querySelectorAll('.clickable');
    const lijst = document.getElementById('lijstItems');
    const bevestigKnop = document.getElementById('bevestigKnop');
    const checkbox = document.getElementById('geenWasCheckbox'); // Zorg dat dit ID bestaat in je HTML

    clickableImages.forEach(function (img) {
        img.addEventListener('click', function () {
            const bestaandGeenWasItem = document.getElementById('geenWasItem');

            if (checkbox.checked || bestaandGeenWasItem) {
                checkbox.checked = false;
                if (bestaandGeenWasItem) {
                    bestaandGeenWasItem.remove();
                }
            }

            const itemNaam = img.getAttribute('data-item');
            const bestaandItem = Array.from(lijst.children).find(li => li.dataset.item === itemNaam);

            if (bestaandItem) {
                const countSpan = bestaandItem.querySelector('.aantal');
                countSpan.textContent = parseInt(countSpan.textContent) + 1;
            } else {
                const nieuwItem = document.createElement('li');
                nieuwItem.dataset.item = itemNaam;
                nieuwItem.innerHTML = `
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span>${itemNaam} (<span class="aantal">1</span>)</span>
                        <div style="display: flex; justify-content: flex-end; gap: 10px; align-items: center; padding-right: 10px;">
                            <button class="plus" style="color: white; background-color: green; border: 1.5px solid black; padding: 2px 10px; border-radius: 5px; cursor: pointer;">+</button>
                            <button class="min" style="color: white; background-color: red; border: 1.5px solid black; padding: 2px 10px; border-radius: 5px; cursor: pointer;">−</button>
                        </div>
                    </div>
                `;
                lijst.appendChild(nieuwItem);

                const plusBtn = nieuwItem.querySelector('.plus');
                const minBtn = nieuwItem.querySelector('.min');
                const countSpan = nieuwItem.querySelector('.aantal');

                plusBtn.addEventListener('click', function () {
                    countSpan.textContent = parseInt(countSpan.textContent) + 1;
                });

                minBtn.addEventListener('click', function () {
                    let huidigeAantal = parseInt(countSpan.textContent);
                    if (huidigeAantal > 1) {
                        countSpan.textContent = huidigeAantal - 1;
                    } else {
                        nieuwItem.remove();
                    }
                });
            }
        });
    });
});


