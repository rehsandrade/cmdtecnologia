'use strict';

/* CONFIGURAÇÃO EDITÁVEL
 * As imagens exibidas no chat não vieram como arquivos para o ambiente.
 * Depois de copiá-las para assets/, preencha os caminhos abaixo.
 * Campos vazios mantêm os fundos vetoriais e nomes em texto, sem simular logos oficiais.
 * Foto 1 = heroDesktop; foto 2 = logo; fotos 3–7 = clientes; foto 8 = heroMobile.
 */
const CMD_CONFIG = {
  whatsapp: '553138681251', // Confirmar se o telefone comercial possui WhatsApp ativo.
  message: 'Olá! Conheci a CMD Tecnologia & Infraestrutura pelo site e gostaria de solicitar um orçamento para um projeto.',
  images: {
    logo: '',              // 'assets/logo-cmd.png'
    heroDesktop: '',       // 'assets/hero-desktop.png'
    heroMobile: '',        // 'assets/hero-mobile.png'
    favicon: '',           // Preencher somente com favicon oficial disponível.
    clients: {
      bizz: '',            // 'assets/cliente-bizz.png'
      'anglo-american': '', // 'assets/cliente-anglo-american.png'
      north: '',           // 'assets/cliente-north.png'
      komatsu: '',         // 'assets/cliente-komatsu.png'
      a3: ''               // 'assets/cliente-a3.png'
    }
  }
};

(() => {
  const header = document.querySelector('.header');
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.menu-toggle');
  const topButton = document.querySelector('.back-top');
  const mobileQuery = window.matchMedia('(max-width: 768px)');
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const navLinks = [...nav.querySelectorAll('a')];
  const sections = navLinks.map(link => document.querySelector(link.getAttribute('href')));

  // Os dois CTAs compartilham destino e mensagem, inclusive ao abrir index.html diretamente.
  const whatsappUrl = `https://wa.me/${CMD_CONFIG.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(CMD_CONFIG.message)}`;
  document.querySelectorAll('[data-whatsapp]').forEach(link => { link.href = whatsappUrl; });

  // Aplica imagens somente quando caminhos reais forem configurados.
  // O texto alternativo/fallback permanece se um arquivo configurado falhar.
  function applyImage(parent, path, alt, width, height, fallback) {
    if (!path) return;
    const image = new Image(width, height);
    image.alt = alt;
    image.hidden = true;
    image.decoding = 'async';
    image.addEventListener('load', () => {
      image.hidden = false;
      if (fallback) fallback.hidden = true;
    }, { once: true });
    image.addEventListener('error', () => image.remove(), { once: true });
    parent.append(image);
    image.src = path;
  }

  document.querySelectorAll('[data-brand]').forEach(brand => {
    applyImage(brand, CMD_CONFIG.images.logo, 'CMD Tecnologia & Infraestrutura', 1920, 650, brand.querySelector('[data-brand-fallback]'));
  });
  Object.entries(CMD_CONFIG.images.clients).forEach(([key, path]) => {
    const fallback = document.querySelector(`[data-client-fallback="${key}"]`);
    applyImage(fallback.parentElement, path, fallback.textContent, 500, 500, fallback);
  });

  const heroMedia = document.querySelector('#hero-media');
  if (CMD_CONFIG.images.heroDesktop || CMD_CONFIG.images.heroMobile) {
    const picture = document.createElement('picture');
    if (CMD_CONFIG.images.heroMobile) {
      const source = document.createElement('source');
      source.media = '(max-width: 768px)';
      source.srcset = CMD_CONFIG.images.heroMobile;
      picture.append(source);
    }
    const heroImage = new Image(1920, 650);
    heroImage.alt = ''; // Banner decorativo, com conteúdo expresso no texto do Hero.
    heroImage.fetchPriority = 'high';
    heroImage.addEventListener('load', () => { heroMedia.hidden = false; });
    heroImage.addEventListener('error', () => { heroMedia.hidden = true; });
    picture.append(heroImage);
    heroMedia.append(picture);
    heroImage.src = CMD_CONFIG.images.heroDesktop || CMD_CONFIG.images.heroMobile;
  }
  if (CMD_CONFIG.images.favicon) document.querySelector('link[rel="icon"]').href = CMD_CONFIG.images.favicon;

  // Menu mobile: Escape, clique externo, foco contido e fechamento após navegação.
  function setMenu(open, returnFocus = false) {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    nav.classList.toggle('open', open);
    document.body.classList.toggle('menu-open', open);
    if (returnFocus) toggle.focus();
  }
  toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  navLinks.forEach(link => link.addEventListener('click', () => {
    setMenu(false);
    const target = document.querySelector(link.getAttribute('href'));
    if (mobileQuery.matches && target) {
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
      target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
    }
  }));
  document.addEventListener('click', event => {
    if (!header.contains(event.target) && toggle.getAttribute('aria-expanded') === 'true') setMenu(false);
  });
  document.addEventListener('keydown', event => {
    if (toggle.getAttribute('aria-expanded') !== 'true') return;
    if (event.key === 'Escape') setMenu(false, true);
    if (event.key === 'Tab') {
      const first = toggle;
      const last = navLinks[navLinks.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault(); last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault(); first.focus();
      }
    }
  });
  mobileQuery.addEventListener('change', () => setMenu(false));

  // Uma atualização por frame para cabeçalho, seção ativa e utilitário de voltar ao topo.
  let scrollPending = false;
  function updateScroll() {
    const offset = header.offsetHeight + 120;
    header.classList.toggle('scrolled', window.scrollY > 12);
    topButton.hidden = window.scrollY < 650;
    let active = sections[0];
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= offset) active = section;
    }
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 10) active = sections[sections.length - 1];
    navLinks.forEach(link => {
      if (link.hash === `#${active.id}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    scrollPending = false;
  }
  window.addEventListener('scroll', () => {
    if (!scrollPending) { scrollPending = true; requestAnimationFrame(updateScroll); }
  }, { passive: true });
  window.addEventListener('resize', updateScroll, { passive: true });
  window.addEventListener('load', updateScroll);
  topButton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: motionQuery.matches ? 'instant' : 'smooth' }));
  updateScroll();

  // Conteúdo permanece visível sem JS, sem suporte ao observer ou com movimento reduzido.
  let revealObserver;
  if ('IntersectionObserver' in window && !motionQuery.matches) {
    document.documentElement.classList.add('motion-enabled');
    revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.06 });
    document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));
  }
  motionQuery.addEventListener('change', () => {
    if (motionQuery.matches) {
      document.documentElement.classList.remove('motion-enabled');
      if (revealObserver) revealObserver.disconnect();
    }
  });

  // Os valores finais existem no HTML. A animação é decorativa e não altera a leitura assistiva.
  const counters = [...document.querySelectorAll('[data-count]')];
  function finishCounters() { counters.forEach(counter => { counter.textContent = counter.dataset.count; }); }
  if ('IntersectionObserver' in window && !motionQuery.matches) {
    const counterObserver = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      counterObserver.disconnect();
      let started;
      function count(timestamp) {
        if (motionQuery.matches) { finishCounters(); return; }
        if (!started) started = timestamp;
        const progress = Math.min((timestamp - started) / 1200, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        counters.forEach(counter => { counter.textContent = String(Math.round(Number(counter.dataset.count) * eased)); });
        if (progress < 1) requestAnimationFrame(count);
        else finishCounters();
      }
      requestAnimationFrame(count);
    }, { threshold: 0.25 });
    counterObserver.observe(document.querySelector('.stats'));
  }
})();
