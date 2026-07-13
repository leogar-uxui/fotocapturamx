// ---------- CONFIGURACIÓN DE SUPABASE ----------
// Pega aquí los dos valores de tu proyecto (Project Settings → Data API / API Keys)
const SUPABASE_URL = "https://bbapnekkmqqkdgyzrymk.supabase.co";        // ej. https://bbapnekkmqqkdgyzrymk.supabase.co
const SUPABASE_ANON_KEY = "sb_publishable_Xh7PeDl8mDo0aYV9QhUUaQ_WbENM0Kq"; // empieza con sb_publishable_...
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ---------- CONFIGURACIÓN DE EMAILJS (notificación por correo de nuevas reservas) ----------
// Crea una cuenta gratis en emailjs.com y pega aquí tus 3 valores
const EMAILJS_PUBLIC_KEY = "C1Rx-8AIW57ZgaOdo";
const EMAILJS_SERVICE_ID = "service_tnszfdv";
const EMAILJS_TEMPLATE_ID = "template_vf5sicz";
const EMAILJS_CONTACT_TEMPLATE_ID = "template_nbc171c";
if(window.emailjs && EMAILJS_PUBLIC_KEY.indexOf('PEGA_AQUI') === -1){
  emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
}

// ---------- DATA ----------
const FEATURED = [
  {
    id:'boda', name:'Boda', price:'$10,500', featured:true,
    features:['150 fotos', 'Sesión preboda', 'Video completo', 'Cuadro 16x20"', 'Baúl de madera con USB']
  },
  {
    id:'xv-anos', name:'XV Años', price:'$7,400',
    features:['120 fotos', 'Cobertura en video', 'Sesión individual', 'Cuadro 16x20"', 'Caja personalizada y USB']
  },
  {
    id:'sesion-individual', name:'Sesión Individual', price:'$3,200',
    features:['Sesión en estudio', '1 hora de sesión', '1 color de fondo a elegir', '10-15 fotos', 'Edición completa']
  }
];

const MORE = [
  {
    id:'boda-civil', name:'Boda Civil', price:'$6,400',
    features:['50 fotografías', 'Sesión preboda', 'Cortometraje', 'Cuadro 16x20"', 'Baúl de madera con USB']
  },
  {
    id:'cumpleanos', name:'Cumpleaños', price:'$3,500',
    features:['Sesión en estudio', '1 hora de sesión', '1 color de fondo', '10-15 fotos', 'Edición completa']
  },
  {
    id:'individual-exterior', name:'Individual/Exterior', price:'$2,200',
    features:['Sesión en exterior', '1 hora de sesión', '10-15 fotos', 'Edición completa']
  },
  {
    id:'sesion-pareja', name:'Sesión en Pareja', price:'$2,600',
    features:['Sesión en exterior', '1 hora de sesión', '20 fotos', 'Edición completa', 'Entrega digital']
  },
  {
    id:'producto', name:'Producto', price:'$3,200',
    features:['Sesión en locación o estudio', 'Hasta 12 productos', '24 fotos (2 por producto)', 'Formato para redes', '1 reel de Instagram']
  }
];

const ALL_PACKAGES = [...FEATURED, ...MORE];

function renderFeatured(){
  const grid = document.getElementById('featuredGrid');
  grid.innerHTML = FEATURED.map(p => `
    <div class="paquete-card ${p.featured ? 'featured' : ''}">
      ${p.featured ? '<span class="ribbon">Más elegido</span>' : ''}
      <h3>${p.name}</h3>
      <!--<div class="paquete-price"><span class="desde">Desde</span>${p.price} MXN</div>-->
      <ul class="lista-detalles">${p.features.map(f => `<li>${f}</li>`).join('')}</ul>
      <button class="btn-choose" onclick="choosePackage('${p.id}')">Elegir ${p.name}</button>
    </div>
  `).join('');
}

function renderMore(){
  const wrap = document.getElementById('morePackages');
  wrap.innerHTML = MORE.map(p => `
    <div class="paquete-card compact">
      <h3>${p.name}</h3>
      <!--<div class="paquete-price"><span class="desde">Desde</span>${p.price} MXN</div>-->
      <ul class="lista-detalles">${p.features.map(f => `<li>${f}</li>`).join('')}</ul>
      <button class="btn-choose" onclick="choosePackage('${p.id}')">Elegir ${p.name}</button>
    </div>
  `).join('');
}

function choosePackage(id){
  document.getElementById('bPackage').value = id;
  document.getElementById('agendar').scrollIntoView({behavior:'smooth'});
}

renderFeatured();
renderMore();

document.getElementById('toggleMoreBtn').addEventListener('click', () => {
  const panel = document.getElementById('morePackages');
  const btn = document.getElementById('toggleMoreBtn');
  panel.classList.toggle('open');
  btn.textContent = panel.classList.contains('open') ? 'Ver menos paquetes ▴' : 'Ver más paquetes ▾';
});

const select = document.getElementById('bPackage');
// Versión original con precio (comentada correctamente, con // porque esto es JavaScript, no HTML):
// select.innerHTML = ALL_PACKAGES.map(p => `<option value="${p.id}">${p.name} — Desde ${p.price} MXN</option>`).join('');
select.innerHTML = ALL_PACKAGES.map(p => `<option value="${p.id}">${p.name}</option>`).join('');
select.innerHTML += `<option value="otro">Otro / Sesión personalizada</option>`;

// ---------- ESPECIALIDADES: carrusel centrado ----------
const CAROUSELS = [
  { key:'retrato', label:'Retrato', images:[
    'images/carrusel-retrato-1.jpg','images/carrusel-retrato-2.jpg','images/carrusel-retrato-3.jpg',
    'images/carrusel-retrato-4.jpg','images/carrusel-retrato-5.jpg','images/carrusel-retrato-6.jpg',
    'images/carrusel-retrato-7.jpg','images/carrusel-retrato-8.jpg','images/carrusel-retrato-9.jpg'
  ]},
  { key:'producto', label:'Producto', images:[
    'images/carrusel-producto-1.jpg','images/carrusel-producto-2.jpg','images/carrusel-producto-3.jpg',
    'images/carrusel-producto-4.jpg','images/carrusel-producto-5.jpg','images/carrusel-producto-6.jpg'
  ]},
  { key:'eventos', label:'Eventos', images:[
    'images/carrusel-eventos-1.jpg','images/carrusel-eventos-2.jpg','images/carrusel-eventos-3.jpg',
    'images/carrusel-eventos-4.jpg','images/carrusel-eventos-5.jpg','images/carrusel-eventos-6.jpg',
    'images/carrusel-eventos-7.jpg'
  ]}
];
const carouselState = {}; // key -> displayIndex (1..total = posición real; 0 y total+1 son los clones)

function renderCarousels(){
  const container = document.getElementById('carouselsContainer');
  container.innerHTML = CAROUSELS.map(c => {
    const total = c.images.length;
    carouselState[c.key] = 1; // arranca en la primera foto real
    // Clonamos la última imagen al inicio y la primera al final, para que
    // siempre haya algo que "asome" a los lados, sin importar en qué foto estés.
    const displayList = [c.images[total - 1], ...c.images, c.images[0]];
    return `
      <div class="carousel-block">
        <div class="carousel-label">${c.label}</div>
        <div class="carousel">
          <button class="carousel-btn" data-key="${c.key}" data-dir="-1" aria-label="Anterior">‹</button>
          <div class="carousel-viewport">
            <div class="carousel-track" id="track-${c.key}">
              ${displayList.map((src, dispIdx) => `<div class="carousel-card" data-key="${c.key}" data-display="${dispIdx}"><img src="${src}" alt="${c.label} — FotoCaptura.Mx" loading="lazy"></div>`).join('')}
            </div>
          </div>
          <button class="carousel-btn" data-key="${c.key}" data-dir="1" aria-label="Siguiente">›</button>
        </div>
      </div>`;
  }).join('');

  CAROUSELS.forEach(c => {
    updateCarousel(c.key, true);
    const track = document.getElementById(`track-${c.key}`);
    track.addEventListener('transitionend', () => handleLoopTeleport(c.key));
  });

  container.querySelectorAll('.carousel-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.key;
      const dir = parseInt(btn.dataset.dir, 10);
      carouselState[key] += dir; // puede pisar momentáneamente un clon (0 o total+1)
      updateCarousel(key);
    });
  });
  container.querySelectorAll('.carousel-card').forEach(card => {
    card.addEventListener('click', () => {
      const total = CAROUSELS.find(c => c.key === card.dataset.key).images.length;
      const clickedDisplay = parseInt(card.dataset.display, 10);
      // Si se hace click en uno de los clones de las puntas, saltamos a su versión real
      const target = clickedDisplay === 0 ? total : (clickedDisplay === total + 1 ? 1 : clickedDisplay);
      carouselState[card.dataset.key] = target;
      updateCarousel(card.dataset.key);
    });
  });
}

function handleLoopTeleport(key){
  const total = CAROUSELS.find(c => c.key === key).images.length;
  const display = carouselState[key];
  if(display === 0){
    carouselState[key] = total;
    updateCarousel(key, true);
  } else if(display === total + 1){
    carouselState[key] = 1;
    updateCarousel(key, true);
  }
}

function updateCarousel(key, immediate){
  const track = document.getElementById(`track-${key}`);
  if(!track) return;
  const cards = Array.from(track.querySelectorAll('.carousel-card'));
  const activeDisplayIndex = carouselState[key];
  cards.forEach((card, dispIdx) => card.classList.toggle('active', dispIdx === activeDisplayIndex));

  const viewport = track.parentElement;
  const cardEl = cards[activeDisplayIndex];
  if(!cardEl) return;
  const cardWidth = cardEl.offsetWidth + (parseFloat(getComputedStyle(cardEl).marginLeft) * 2);
  const offset = (viewport.clientWidth / 2) - (activeDisplayIndex * cardWidth) - (cardWidth / 2);

  if(immediate){
    track.style.transition = 'none';
    track.style.transform = `translateX(${offset}px)`;
    track.offsetHeight; // reflow
    track.style.transition = '';
  } else {
    track.style.transform = `translateX(${offset}px)`;
  }
}

renderCarousels();
let carouselResizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(carouselResizeTimer);
  carouselResizeTimer = setTimeout(() => {
    CAROUSELS.forEach(c => updateCarousel(c.key, true));
  }, 150);
});

// ---------- DRAWER NAV ----------
const hamburgerBtn = document.getElementById('hamburgerBtn');
const navDrawer = document.getElementById('navDrawer');
const drawerOverlay = document.getElementById('drawerOverlay');
function openDrawer(){ navDrawer.classList.add('open'); drawerOverlay.classList.add('open'); hamburgerBtn.classList.add('open'); }
function closeDrawer(){ navDrawer.classList.remove('open'); drawerOverlay.classList.remove('open'); hamburgerBtn.classList.remove('open'); }
hamburgerBtn.addEventListener('click', () => navDrawer.classList.contains('open') ? closeDrawer() : openDrawer());
drawerOverlay.addEventListener('click', closeDrawer);
navDrawer.querySelectorAll('a').forEach(a => a.addEventListener('click', closeDrawer));

// ---------- HELPERS ----------
function genCode(){
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = 'FC-';
  for(let i=0;i<6;i++) code += chars[Math.floor(Math.random()*chars.length)];
  return code;
}

// ---------- BOOKING FORM ----------
document.getElementById('bookingForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const msg = document.getElementById('bookingMsg');
  const revealBox = document.getElementById('codeReveal');
  msg.className = 'form-message'; revealBox.classList.remove('show');

  const baseBooking = {
    name: document.getElementById('bName').value.trim(),
    email: document.getElementById('bEmail').value.trim(),
    phone: document.getElementById('bPhone').value.trim(),
    package_id: document.getElementById('bPackage').value,
    session_date: document.getElementById('bDate').value || null,
    notes: document.getElementById('bNotes').value.trim()
  };

  // Intenta guardar; si el código generado ya existiera (muy raro), reintenta hasta 3 veces
  let finalCode = null;
  let lastError = null;
  for(let attempt = 0; attempt < 3; attempt++){
    const code = genCode();
    const { error } = await supabaseClient.from('bookings').insert({ code, ...baseBooking });
    if(!error){ finalCode = code; break; }
    lastError = error;
    if(error.code !== '23505') break; // solo reintenta si fue choque de código único
  }

  if(!finalCode){
    console.error('booking insert error', lastError);
    msg.textContent = 'Hubo un problema guardando tu reserva. Intenta de nuevo en un momento.';
    msg.className = 'form-message error show';
    return;
  }
  msg.textContent = '¡Solicitud recibida! Te contactaré por WhatsApp o correo para confirmar.';
  msg.className = 'form-message success show';
  document.getElementById('revealedCode').textContent = finalCode;
  revealBox.classList.add('show');

  // Notificación por correo a Leo (no bloquea la confirmación al cliente si falla)
  if(window.emailjs && EMAILJS_PUBLIC_KEY.indexOf('PEGA_AQUI') === -1){
    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      codigo: finalCode,
      nombre: baseBooking.name,
      correo: baseBooking.email,
      telefono: baseBooking.phone,
      paquete: baseBooking.package_id,
      fecha: baseBooking.session_date || 'No especificada',
      notas: baseBooking.notes || '—'
    }).catch(err => console.error('emailjs error', err));
  }
  e.target.reset();
});

// ---------- GALLERY ACCESS ----------
async function accessGallery(){
  const input = document.getElementById('galleryCodeInput');
  const resultBox = document.getElementById('galleryResult');
  let code = input.value.trim().toUpperCase();
  if(!code) return;
  if(!code.startsWith('FC-')) code = 'FC-' + code.replace('FC-','');

  resultBox.innerHTML = `<div class="empty-state">Buscando tu galería…</div>`;

  const { data: statusRows, error: statusError } = await supabaseClient.rpc('get_booking_status', { p_code: code });
  const booking = (!statusError && statusRows && statusRows.length) ? statusRows[0] : null;

  const { data: files, error: listError } = await supabaseClient.storage.from('client-photos').list(code, { limit: 200 });
  const validFiles = (files || []).filter(f => f.name && !f.name.startsWith('.'));

  if(!booking && validFiles.length === 0){
    resultBox.innerHTML = `<div class="empty-state">No encontramos ninguna reserva con el código <strong>${code}</strong>. Revisa que esté bien escrito o contáctame por WhatsApp si crees que es un error.</div>`;
    return;
  }
  if(validFiles.length === 0){
    resultBox.innerHTML = `
      <div class="empty-state">
        Tu sesión (código <strong>${code}</strong>) está registrada, pero tu galería todavía no está lista.
        En cuanto termine la edición de tus fotos, aparecerá aquí con este mismo código. ¡Gracias por tu paciencia!
      </div>`;
    return;
  }

  const paths = validFiles.map(f => `${code}/${f.name}`);

  // Si el fotógrafo subió un .zip con toda la sesión, mostramos un solo botón de descarga
  // en vez de la cuadrícula de fotos (mucho más ligero para sesiones grandes).
  const zipFile = validFiles.find(f => f.name.toLowerCase().endsWith('.zip'));
  if(zipFile){
    const zipPath = `${code}/${zipFile.name}`;
    const { data: zipSigned, error: zipSignError } = await supabaseClient.storage.from('client-photos').createSignedUrl(zipPath, 3600);
    if(zipSignError || !zipSigned){
      resultBox.innerHTML = `<div class="empty-state">Tu galería está lista, pero hubo un problema generando el enlace de descarga. Intenta de nuevo en un momento.</div>`;
      return;
    }
    resultBox.innerHTML = `
      <div class="gr-head">
        <h4>Galería de ${booking ? booking.name : code}</h4>
        <span>código ${code}</span>
      </div>
      <div class="zip-ready">
        <i class="fa-solid fa-circle-check"></i>
        <p>¡Tu sesión está lista! Descarga aquí todas tus fotos en tamaño completo, en una sola carpeta comprimida.</p>
        <button type="button" class="btn-primary" onclick="downloadImage('${zipSigned.signedUrl.replace(/'/g,"\\'")}','${code}-galeria-completa.zip')">
          <i class="fa-solid fa-file-zipper"></i> Descargar galería completa (.zip)
        </button>
      </div>
    `;
    return;
  }

  const { data: signedUrls, error: signError } = await supabaseClient.storage.from('client-photos').createSignedUrls(paths, 3600);
  if(signError || !signedUrls){
    resultBox.innerHTML = `<div class="empty-state">Tus fotos están listas, pero hubo un problema generando los enlaces. Intenta de nuevo en un momento.</div>`;
    return;
  }

  const images = signedUrls.filter(s => s.signedUrl).map(s => s.signedUrl);
  resultBox.innerHTML = `
    <div class="gr-head">
      <h4>Galería de ${booking ? booking.name : code}</h4>
      <span>${images.length} fotos · código ${code}</span>
    </div>
    <div class="contact-sheet" id="contactSheet"></div>
  `;
  const sheet = document.getElementById('contactSheet');
  sheet.innerHTML = images.map((url, i) => `
    <div class="cell" onclick="openLightbox('${url.replace(/'/g,"\\'")}')">
      <img src="${url}" alt="Foto ${i+1} de la sesión" loading="lazy">
      <button type="button" class="cell-download" onclick="event.stopPropagation(); downloadImage('${url.replace(/'/g,"\\'")}','${code}-foto-${i+1}.jpg')" title="Descargar en tamaño completo"><i class="fa-solid fa-download"></i></button>
    </div>
  `).join('');
}
document.getElementById('galleryAccessBtn').addEventListener('click', accessGallery);
document.getElementById('galleryCodeInput').addEventListener('keydown', (e) => { if(e.key === 'Enter') accessGallery(); });

async function downloadImage(url, filename){
  try{
    const response = await fetch(url);
    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = objectUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(objectUrl);
  }catch(err){
    console.error('download error', err);
    window.open(url, '_blank');
  }
}

function openLightbox(url){
  document.getElementById('lightboxImg').src = url;
  document.getElementById('lightbox').classList.add('show');
}
document.getElementById('closeLightbox').addEventListener('click', () => document.getElementById('lightbox').classList.remove('show'));
document.getElementById('lightbox').addEventListener('click', (e) => { if(e.target.id === 'lightbox') e.target.classList.remove('show'); });

// ---------- CONTACT FORM ----------
document.getElementById('contactForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const msg = document.getElementById('contactMsg');
  const entry = {
    name: document.getElementById('cName').value.trim(),
    email: document.getElementById('cEmail').value.trim(),
    message: document.getElementById('cMsg').value.trim()
  };
  const { error } = await supabaseClient.from('contacts').insert(entry);
  if(error){
    console.error('contact insert error', error);
    msg.textContent = 'No se pudo enviar tu mensaje. Intenta de nuevo.';
    msg.className = 'form-message error show';
    return;
  }
  msg.textContent = '¡Mensaje enviado! Te responderé pronto.';
  msg.className = 'form-message success show';

  // Notificación por correo a Leo (no bloquea la confirmación al visitante si falla)
  if(window.emailjs && EMAILJS_CONTACT_TEMPLATE_ID.indexOf('PEGA_AQUI') === -1){
    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_CONTACT_TEMPLATE_ID, {
      nombre: entry.name,
      correo: entry.email,
      mensaje: entry.message
    }).catch(err => console.error('emailjs contacto error', err));
  }
  e.target.reset();
});

// ---------- ADMIN (ahora solo abre la guía hacia el dashboard de Supabase) ----------
document.getElementById('openAdmin').addEventListener('click', () => document.getElementById('adminOverlay').classList.add('show'));
document.getElementById('closeAdmin').addEventListener('click', () => document.getElementById('adminOverlay').classList.remove('show'));
