const defaults = {
  siteName: 'Miley Hair Salon', heroTitle: 'Révélez votre talent en cosmétologie.',
  heroText: 'Apprenez les gestes, les techniques et la confiance nécessaires pour bâtir votre avenir dans la beauté.',
  startDate: 'Prochaine session : bientôt', registrationPrice: '2 000 pesos', participationPrice: '6 000 pesos',
  registrationUrl: '', participationUrl: '', logoUrl: '', flyerUrl: ''
};
const email = 'ezechieldestine8@gmail.com';
const whatsapp = '18297670244';
let settings = {...defaults, ...JSON.parse(localStorage.getItem('eclat-settings') || '{}')};

function text(selector, value) { document.querySelectorAll(selector).forEach(el => el.textContent = value); }
function applySettings() {
  text('[data-site-name]', settings.siteName); text('[data-hero-text]', settings.heroText); text('[data-start-date]', settings.startDate);
  text('[data-registration-price]', settings.registrationPrice); text('[data-participation-price]', settings.participationPrice);
  const title = document.querySelector('[data-hero-title]');
  const words = settings.heroTitle.split(/(cosmétologie)/i);
  title.innerHTML = words.map(w => /cosmétologie/i.test(w) ? `<em>${w}</em>` : w).join('').replace(' en ', ' en<br>');
  const flyer = document.querySelector('#flyerImage');
  flyer.src = settings.flyerUrl; flyer.hidden = !settings.flyerUrl;
  document.querySelector('#registrationPayment').href = settings.registrationUrl || '#inscription';
  document.querySelector('#participationPayment').href = settings.participationUrl || '#inscription';
  document.querySelector('.brand-mark').style.backgroundImage = settings.logoUrl ? `url("${settings.logoUrl}")` : '';
  document.querySelector('.brand-mark').style.backgroundSize = 'cover';
}
applySettings();

const dialog = document.querySelector('#editorDialog'); const editorForm = document.querySelector('#editorForm');
document.querySelector('#customizeButton').onclick = () => { Object.keys(defaults).forEach(key => editorForm.elements[key].value = settings[key]); dialog.showModal(); };
editorForm.addEventListener('submit', () => { const values = Object.fromEntries(new FormData(editorForm)); settings = {...settings, ...values}; localStorage.setItem('eclat-settings', JSON.stringify(settings)); applySettings(); });
document.querySelector('#resetButton').onclick = () => { settings = {...defaults}; localStorage.removeItem('eclat-settings'); applySettings(); dialog.close(); };

function formMessage() { const data = Object.fromEntries(new FormData(document.querySelector('#registrationForm'))); return `Nouvelle demande d'inscription – ${settings.siteName}\n\nNom : ${data.name}\nTéléphone : ${data.phone}\nE-mail : ${data.email}\nVille / quartier : ${data.location}\nFormation choisie : ${data.training}\nÉtape de paiement : ${data.payment}\nMéthode de paiement : ${data.paymentMethod}\nMessage : ${data.message || '—'}`; }
document.querySelector('#registrationForm').addEventListener('submit', event => { event.preventDefault(); if (!event.currentTarget.reportValidity()) return; window.location.href = `mailto:${email}?subject=${encodeURIComponent('Nouvelle inscription – ' + settings.siteName)}&body=${encodeURIComponent(formMessage())}`; });
document.querySelector('#whatsappButton').onclick = () => { const form = document.querySelector('#registrationForm'); if (!form.reportValidity()) return; window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(formMessage())}`, '_blank', 'noopener'); };
