(() => {
  'use strict';
  const key = 'bravo-cookie-consent-v1';
  const lifetime = 180 * 24 * 60 * 60 * 1000;
  let saved = null;
  try { saved = JSON.parse(localStorage.getItem(key)); } catch {}
  if (!saved || saved.version !== 1 || !['accepted', 'rejected'].includes(saved.choice) || !Number.isFinite(saved.at) || Date.now() - saved.at >= lifetime || saved.at > Date.now()) saved = null;
  let loaded = false;
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  const denied = { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' };
  window.gtag('consent', 'default', denied);
  function enable() {
    if (loaded) return;
    loaded = true;
    window.gtag('consent', 'update', { analytics_storage: 'granted', ad_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'granted' });
    window.gtag('js', new Date());
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-P23LSXJZ';
    document.head.append(script);
  }
  function clearGoogleCookies() {
    const parts = location.hostname.split('.');
    const domains = ['', ...parts.map((_, i) => '.' + parts.slice(i).join('.'))];
    const paths = ['/', ...location.pathname.split('/').filter(Boolean).map((_, i, a) => '/' + a.slice(0, i + 1).join('/'))];
    document.cookie.split(';').forEach(cookie => {
      const name = cookie.split('=')[0].trim();
      if (!/^(_ga|_gid|_gat|_gcl_|_gac_)/.test(name)) return;
      for (const domain of domains) for (const path of paths) document.cookie = `${name}=; Max-Age=0; Path=${path};${domain ? ' Domain=' + domain + ';' : ''} SameSite=Lax`;
    });
  }
  const panel = document.createElement('section');
  panel.className = 'cookie-panel';
  panel.setAttribute('aria-label', 'Preferências de cookies');
  panel.innerHTML = `<h2>Sua privacidade importa</h2><p>Com sua autorização, usamos ferramentas do Google para medir visitas e campanhas e apoiar publicidade. Você pode recusar os cookies opcionais e continuar navegando normalmente.</p><p><a href="/privacidade.html">Política de Privacidade</a> · Altere sua escolha a qualquer momento em “Cookies”.</p><div class="cookie-actions"><button type="button" data-cookie="rejected">Recusar opcionais</button><button type="button" data-cookie="accepted">Aceitar opcionais</button></div><p class="cookie-status" role="status"></p>`;
  const reopen = document.createElement('button');
  reopen.type = 'button'; reopen.className = 'cookie-preferences'; reopen.textContent = 'Cookies';
  reopen.setAttribute('aria-label', 'Alterar preferências de cookies');
  document.body.append(panel, reopen);
  function show(open, focus = false) {
    panel.hidden = !open; reopen.hidden = open;
    if (focus) (open ? panel.querySelector('button') : reopen).focus();
  }
  reopen.addEventListener('click', () => show(true, true));
  panel.querySelectorAll('[data-cookie]').forEach(button => button.addEventListener('click', () => {
    const choice = button.dataset.cookie;
    const previous = loaded;
    saved = { choice, at: Date.now(), version: 1 };
    let persisted = true;
    try { localStorage.setItem(key, JSON.stringify(saved)); } catch { persisted = false; }
    if (choice === 'accepted') enable();
    else {
      window.gtag('consent', 'update', denied);
      clearGoogleCookies();
      if (previous) {
        // Stop already executed tags by unloading this document. The new load is blocked.
        if (!persisted) { window.alert('Não foi possível salvar sua escolha. Bloqueie cookies nas configurações do navegador e feche esta aba para interromper as ferramentas já carregadas.'); return; }
        location.reload(); return;
      }
    }
    show(false, true);
  }));
  window.addEventListener('storage', event => { if (event.key === key) location.reload(); });
  show(!saved);
  if (saved?.choice === 'accepted') enable();
  else clearGoogleCookies();
})();
