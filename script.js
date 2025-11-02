
// Basic site JS: navigation toggle, courses data, course detail rendering, and calculator logic
const NAV_TOGGLE = document.querySelector('.nav-toggle');
if (NAV_TOGGLE) {
  NAV_TOGGLE.addEventListener('click', () => {
    const list = document.querySelector('.nav-list');
    const expanded = NAV_TOGGLE.getAttribute('aria-expanded') === 'true';
    NAV_TOGGLE.setAttribute('aria-expanded', !expanded);
    list.style.display = expanded ? 'none' : 'flex';
  });
}

// Course data shared across pages
const COURSES = [
  { id: 'first-aid', title: 'First Aid', type: 'six-month', price: 4500, duration: '6 months', desc: 'Comprehensive first aid training with practical assessments.' },
  { id: 'sewing', title: 'Sewing', type: 'six-month', price: 3800, duration: '6 months', desc: 'Sewing, tailoring and garment construction skills.' },
  { id: 'life-skills', title: 'Life Skills', type: 'six-month', price: 3200, duration: '6 months', desc: 'Personal development, goal setting and employability skills.' },
  { id: 'landscaping', title: 'Landscaping', type: 'six-month', price: 4100, duration: '6 months', desc: 'Garden design, planting and maintenance.' },
  { id: 'child-minding', title: 'Child Minding', type: 'six-month', price: 2900, duration: '6 months', desc: 'Childcare practices and early learning basics.' },
  { id: 'garden-maintenance', title: 'Garden Maintenance', type: 'six-month', price: 2700, duration: '6 months', desc: 'Horticulture and garden upkeep.' },
  { id: 'cooking', title: 'Cooking', type: 'six-week', price: 1200, duration: '6 weeks', desc: 'Fundamentals of cooking and food safety.' },
  { id: 'computer', title: 'Computer Literacy', type: 'six-week', price: 900, duration: '6 weeks', desc: 'Basic computer and MS Office skills.' },
  { id: 'baking', title: 'Baking', type: 'six-week', price: 1100, duration: '6 weeks', desc: 'Introduction to bread and pastry.' },
  { id: 'communication', title: 'Communication Skills', type: 'six-week', price: 800, duration: '6 weeks', desc: 'Workplace communication and customer care.' },
  { id: 'time-management', title: 'Time Management', type: 'six-week', price: 700, duration: '6 weeks', desc: 'Productivity and planning techniques.' }
];

function populateCoursesOnCalculatePage() {
  const container = document.getElementById('courses-container');
  if (!container) return;
  COURSES.forEach(c => {
    const id = 'chk_' + c.id;
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `<label><input type="checkbox" id="${id}" data-id="${c.id}"> ${c.title} — R${c.price}</label>`;
    container.appendChild(wrapper);
  });
}

function cents(zar){ return Math.round(zar*100); }
function zarf(cents){ return (cents/100).toFixed(2); }

function calculateQuote() {
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const email = document.getElementById('email').value.trim();
  const checked = Array.from(document.querySelectorAll('#courses-container input[type="checkbox"]:checked')).map(i=>i.dataset.id);

  const errors = [];
  if (!name) errors.push('Name is required.');
  if (!/^\d{7,15}$/.test(phone)) errors.push('Enter a valid phone number (7–15 digits).');
  if (!/^\S+@\S+\.\S+$/.test(email)) errors.push('Enter a valid email address.');
  if (checked.length === 0) errors.push('Select at least one course.');

  const resultArea = document.getElementById('quote-result');
  resultArea.hidden = true;
  resultArea.innerHTML = '';

  if (errors.length) {
    resultArea.hidden = false;
    resultArea.innerHTML = '<div class="quote-error"><strong>Errors:</strong><ul>' + errors.map(e => '<li>'+e+'</li>').join('') + '</ul></div>';
    return;
  }

  // Sum in cents for accuracy
  const subtotalCents = checked.reduce((acc, id) => {
    const course = COURSES.find(c=>c.id===id);
    return acc + cents(course.price);
  }, 0);

  const discountPercent = checked.length >= 3 ? 10 : 0;
  const discountCents = Math.round(subtotalCents * discountPercent / 100);
  const afterDiscount = subtotalCents - discountCents;
  const vatCents = Math.round(afterDiscount * 15 / 100);
  const totalCents = afterDiscount + vatCents;

  resultArea.hidden = false;
  resultArea.innerHTML = `
    <h3>Quote</h3>
    <p>Subtotal: R${zarf(subtotalCents)}</p>
    <p>Discount (${discountPercent}%): -R${zarf(discountCents)}</p>
    <p>After discount: R${zarf(afterDiscount)}</p>
    <p>VAT (15%): R${zarf(vatCents)}</p>
    <h4>Total (quoted): R${zarf(totalCents)}</h4>
    <p class="small">This is a quoted amount only and not a formal invoice.</p>
    <button class="btn primary" onclick="requestConsultant()">Request a consultant</button>
  `;
}

function requestConsultant(){
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const email = document.getElementById('email').value.trim();
  alert(`Thanks ${name}. A consultant will contact you at ${phone} / ${email}.`);
}

function renderCourseDetailFromQuery() {
  const el = document.getElementById('course-area');
  if (!el) return;
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  const course = COURSES.find(c=>c.id===id);
  if (!course) {
    el.innerHTML = '<h2>Course not found</h2><p>Return to the courses list.</p>';
    return;
  }
  el.innerHTML = `<h2>${course.title}</h2>
    <p>${course.desc}</p>
    <ul><li>Duration: ${course.duration}</li><li>Fee: R${course.price}</li></ul>`;
}

document.addEventListener('DOMContentLoaded', ()=>{
  populateCoursesOnCalculatePage();
  renderCourseDetailFromQuery();
  const calcBtn = document.getElementById('calculate-btn');
  if (calcBtn) calcBtn.addEventListener('click', calculateQuote);
});
