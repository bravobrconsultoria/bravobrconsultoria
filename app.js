const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];
const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
const currentBrand =
  {
    consultoria: "Bravo BR Consultoria",
    foods: "Bravo BR Foods",
    empresarial: "Bravo BR Empresarial",
  }[document.body.dataset.brand] || "Bravo BR Consultoria";
const whatsapp =
  "https://wa.me/5519981198188?text=" +
  encodeURIComponent(
    `Olá! Conheci a ${currentBrand} pelo site e gostaria de entender como vocês podem ajudar meu negócio.`,
  );
$$("[data-whatsapp]").forEach((a) => (a.href = whatsapp));
const header = $("#header"),
  menu = $(".menu-toggle"),
  nav = $("#mobile-nav");
function closeMenu() {
  nav.hidden = true;
  menu.setAttribute("aria-expanded", "false");
}
menu?.addEventListener("click", () => {
  const open = menu.getAttribute("aria-expanded") === "true";
  nav.hidden = open;
  menu.setAttribute("aria-expanded", String(!open));
});
$$("a", nav).forEach((a) => a.addEventListener("click", closeMenu));
document.addEventListener("click", (e) => {
  if (!nav.hidden && !header.contains(e.target)) closeMenu();
});
window.matchMedia("(min-width: 851px)").addEventListener("change", closeMenu);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !nav.hidden) {
    closeMenu();
    menu.focus();
  }
});
const hero = $(".hero");
if (hero) {
  const updateHeader = () => {
    const visible = window.scrollY > 80;
    header.classList.toggle("scrolled", visible);
    header.inert = !visible;
    if (!visible) {
      closeMenu();
      $(".specialties-menu")?.removeAttribute("open");
    }
    $(".whatsapp-float").hidden = !visible;
  };
  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();
}
const video = $(".hero-video");
// Muted inline playback; the poster remains if browser policy blocks autoplay.
if (video) {
  const play = () => {
    if (document.hidden || hero.getBoundingClientRect().bottom <= 0) return;
    video.muted = true;
    if (!video.getAttribute("src")) video.src = video.dataset.src;
    video.play().catch(() => {});
  };
  video.addEventListener("playing", () => video.classList.add("ready"));
  video.addEventListener("error", () => video.classList.remove("ready"));
  new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) play();
    else video.pause();
  }).observe(hero);
  document.addEventListener("visibilitychange", () =>
    document.hidden ? video.pause() : play(),
  );
  play();
}
const topics = {
  Oferta:
    "organizar produtos, serviços e apresentação para facilitar a decisão de compra.",
  Canais:
    "conectar presença digital, pontos de contato e atendimento à realidade do negócio.",
  Marketing: "atrair o público certo com uma comunicação conectada à venda.",
  Vendas:
    "transformar interesse em pedidos com uma jornada comercial bem estruturada.",
  Posicionamento: "deixar claro por que o cliente deve escolher o seu negócio.",
  Cardápio:
    "organizar produtos, fotos e descrições para facilitar boas escolhas.",
  Preço: "considerar custos, margem e percepção de valor em cada produto.",
  Delivery: "conectar catálogo, canais e atendimento à realidade da operação.",
  Operação: "organizar processos para entregar o que a comunicação promete.",
  Fidelização: "criar motivos para o cliente voltar e comprar de novo.",
  Tecnologia:
    "simplificar tarefas e apoiar as pessoas no atendimento e na gestão.",
};
$$("[data-topic]").forEach((b) =>
  b.addEventListener("click", () => {
    $$("[data-topic]").forEach((x) => {
      x.classList.toggle("active", x === b);
      x.setAttribute("aria-pressed", String(x === b));
    });
    $(".map-detail").textContent =
      b.dataset.topic + ": " + topics[b.dataset.topic];
  }),
);

// Manual tabs: native buttons, one tab stop, arrows/Home/End and complete panel labels.
function setupTabs(selector) {
  const list = $(selector);
  if (!list) return;
  const buttons = $$("[role=tab]", list);
  function activate(index, focus = false) {
    buttons.forEach((b, i) => {
      b.setAttribute("aria-selected", String(i === index));
      b.tabIndex = i === index ? 0 : -1;
      document.getElementById(b.getAttribute("aria-controls")).hidden =
        i !== index;
    });
    if (focus) buttons[index].focus();
  }
  buttons.forEach((b, i) => {
    b.addEventListener("click", () => activate(i));
    b.addEventListener("keydown", (e) => {
      let next = i;
      if (["ArrowRight", "ArrowDown"].includes(e.key))
        next = (i + 1) % buttons.length;
      else if (["ArrowLeft", "ArrowUp"].includes(e.key))
        next = (i - 1 + buttons.length) % buttons.length;
      else if (e.key === "Home") next = 0;
      else if (e.key === "End") next = buttons.length - 1;
      else return;
      e.preventDefault();
      activate(next, true);
    });
  });
}
setupTabs(".method-tabs");
setupTabs(".solution-tabs");
const methodLayout = window.matchMedia("(max-width: 850px)");
function updateMethodOrientation() {
  $(".method-tabs")?.setAttribute(
    "aria-orientation",
    methodLayout.matches ? "horizontal" : "vertical",
  );
}
updateMethodOrientation();
methodLayout.addEventListener("change", updateMethodOrientation);
const matrix = {
  Estrela:
    "Produto estrela: valorizar a apresentação e manter consistência para sustentar a preferência.",
  Margem:
    "Ajustar a margem: revisar custos, porções, adicionais e preço sem perder o valor percebido.",
  Visibilidade:
    "Dar visibilidade: melhorar fotos, descrições e posição no cardápio para apresentar produtos rentáveis.",
  Reavaliar:
    "Reavaliar o mix: entender o papel do produto, testar ajustes e decidir se ele deve permanecer.",
};
$$("[data-matrix]").forEach((b) =>
  b.addEventListener("click", () => {
    $$("[data-matrix]").forEach((x) =>
      x.setAttribute("aria-pressed", String(x === b)),
    );
    $("#matrix-detail").textContent = matrix[b.dataset.matrix];
  }),
);
const flows = {
  orcamento:
    "Vamos entender sua necessidade e organizar as informações para uma pessoa da equipe preparar o atendimento.",
  informacao:
    "Vamos apresentar as informações do negócio e encaminhar sua dúvida para a equipe responsável.",
  delivery:
    "Para delivery, vamos confirmar a região de entrega. Depois, uma pessoa da equipe acompanha seu pedido.",
  retirada:
    "Para retirada, vamos organizar seu pedido e confirmar o horário com a equipe. Assim, você sabe quando buscar.",
  pessoa:
    "Vamos encaminhar sua conversa para uma pessoa da equipe. Automação também precisa saber a hora de passar o atendimento.",
};
$$("[data-flow]").forEach((b) =>
  b.addEventListener("click", () => {
    $$("[data-flow]").forEach((x) =>
      x.setAttribute("aria-pressed", String(x === b)),
    );
    $(".response").textContent = flows[b.dataset.flow];
  }),
);

const caseData = [
  {
    name: "Farmácia Mogi Guaçu",
    category: "Varejo & saúde",
    image: "farmacia-atendimento",
    alt: "Atendimento real no balcão da Farmácia Mogi Guaçu",
    before: "Estrutura digital fragmentada.",
    after:
      "Ecossistema digital mais organizado, conectado e preparado para vendas e atendimento.",
    actions: [
      "Implementação da operação no iFood.",
      "Revisão da segurança das redes sociais e integração no Meta.",
      "Criação e melhoria de publicações, foto de perfil e banner.",
      "Conteúdo em vídeo para a TV interna.",
      "Implantação do WhatsApp Business e recursos de atendimento automático.",
      "Organização comercial e digital, com melhorias de presença da operação.",
    ],
    ongoing:
      "Um trabalho que conecta presença, comunicação, atendimento e novos canais de venda.",
  },
  {
    name: "Restaurante Rosendo / Jambalaya",
    category: "Gastronomia",
    image: "jambalaya",
    alt: "Fachada do Restaurante Jambalaya, registro fornecido pelo cliente",
    before: "Negócio com a estrutura digital ainda por construir.",
    after: "Presença estruturada em marketplaces, Google e delivery próprio.",
    actions: [
      "Implantação no iFood, 99Food e Keeta.",
      "Criação e estruturação no Google Maps / Google Business.",
      "Digitalização do negócio e automação de WhatsApp.",
      "Implantação de delivery próprio, com estrutura criada do zero.",
      "Acompanhamento de cardápios, presença digital e atualizações das plataformas.",
      "Suporte estratégico contínuo.",
    ],
    ongoing:
      "A Bravo acompanha atualmente a parte digital, os cardápios e as mudanças dos marketplaces.",
  },
  {
    name: "WS Rocha Manutenção",
    category: "Manutenção para restaurantes",
    image: "manutencao",
    alt: "Serviço real de manutenção de equipamento registrado pela WS Rocha",
    before: "Negócio com baixa presença digital.",
    after: "Estrutura digital com site próprio, Google e presença local.",
    actions: [
      "Desenvolvimento de site próprio para a operação de manutenção.",
      "Criação e estruturação do perfil no Google.",
      "Organização da presença local para facilitar a descoberta dos serviços.",
    ],
    ongoing:
      "A presença no Google trouxe aumento de visibilidade e novas oportunidades comerciais. A evolução das redes sociais está prevista para uma etapa posterior.",
  },
  {
    name: "Chaveiro WS Rocha",
    category: "Serviços locais",
    image: "chaveiro",
    alt: "Equipamento para corte de chaves do material institucional do Chaveiro WS Rocha",
    before: "Negócio com baixa presença digital.",
    after: "Site próprio e perfil no Google como novos pontos de contato.",
    actions: [
      "Desenvolvimento de site próprio para a operação de chaveiro.",
      "Criação e estruturação do perfil no Google.",
      "Organização da presença local e dos canais de contato.",
    ],
    ongoing:
      "A presença no Google trouxe aumento de visibilidade e novas oportunidades comerciais. O trabalho com redes sociais está previsto como evolução posterior.",
  },
];
let caseIndex = 0,
  reviewIndex = 0;
const caseSlides = $$("[data-case]"),
  reviews = $$("[data-review]");
function showCase(n) {
  if (!caseSlides.length) return;
  caseIndex = (n + caseSlides.length) % caseSlides.length;
  caseSlides.forEach((s, i) => (s.hidden = i !== caseIndex));
  const caseId = Number(caseSlides[caseIndex].dataset.case);
  $$("[data-case-go]").forEach((b) =>
    b.setAttribute("aria-pressed", String(Number(b.dataset.caseGo) === caseId)),
  );
  $(".case-status").textContent = caseData[caseId].name;
}
function selectCase(id) {
  const index = caseSlides.findIndex(
    (slide) => Number(slide.dataset.case) === id,
  );
  if (index >= 0) showCase(index);
}
$$("[data-case-go]").forEach((b) =>
  b.addEventListener("click", () => selectCase(Number(b.dataset.caseGo))),
);
$$("[data-client]").forEach((a) =>
  a.addEventListener("click", () => selectCase(Number(a.dataset.client))),
);
$("[data-case-prev]")?.addEventListener("click", () => showCase(caseIndex - 1));
$("[data-case-next]")?.addEventListener("click", () => showCase(caseIndex + 1));
function showReview(n) {
  reviewIndex = (n + reviews.length) % reviews.length;
  reviews.forEach((s, i) => (s.hidden = i !== reviewIndex));
  $(".review-status").textContent = reviews[reviewIndex]
    .querySelector("figcaption b")
    .textContent.trim();
}
$("[data-review-prev]")?.addEventListener("click", () =>
  showReview(reviewIndex - 1),
);
$("[data-review-next]")?.addEventListener("click", () =>
  showReview(reviewIndex + 1),
);
// Swipe is an additional input: visible previous/next buttons remain available.
function swipe(el, previous, next) {
  if (!el) return;
  let start = null;
  el.addEventListener(
    "pointerdown",
    (e) => {
      if (e.pointerType === "mouse" || e.target.closest("button,a")) return;
      start = { x: e.clientX, y: e.clientY };
    },
    { passive: true },
  );
  el.addEventListener(
    "pointerup",
    (e) => {
      if (!start) return;
      const dx = e.clientX - start.x,
        dy = e.clientY - start.y;
      start = null;
      if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.5)
        (dx < 0 ? next : previous)();
    },
    { passive: true },
  );
  el.addEventListener("pointercancel", () => (start = null), { passive: true });
}
swipe(
  $(".case-showcase"),
  () => showCase(caseIndex - 1),
  () => showCase(caseIndex + 1),
);
swipe(
  $(".testimonial-carousel"),
  () => showReview(reviewIndex - 1),
  () => showReview(reviewIndex + 1),
);
const dialog = $("#case-dialog");
let dialogTrigger = null;
$$("[data-case-detail]").forEach((b) =>
  b.addEventListener("click", () => {
    const c = caseData[Number(b.dataset.caseDetail)];
    dialogTrigger = b;
    $("#dialog-content").innerHTML =
      `<div class="dialog-body"><p class="eyebrow">Case real / ${c.category}</p><h2 id="dialog-title">${c.name}</h2><img src="/assets/web/${c.image}-1280.webp" alt="${c.alt}" width="1280" height="720"><div class="before-after"><div><span>ANTES</span><p>${c.before}</p></div><div><span>DEPOIS</span><p>${c.after}</p></div></div><h3>O QUE FOI FEITO</h3><ul>${c.actions.map((a) => `<li>${a}</li>`).join("")}</ul><p>${c.ongoing}</p><a class="button" href="${whatsapp}">Conversar sobre meu negócio <span aria-hidden="true">↗</span></a></div>`;
    dialog.showModal();
    document.body.classList.add("modal-open");
    $(".dialog-close").focus();
  }),
);
$(".dialog-close")?.addEventListener("click", () => dialog.close());
dialog?.addEventListener("close", () => {
  document.body.classList.remove("modal-open");
  dialogTrigger?.focus();
});
dialog?.addEventListener("click", (e) => {
  if (e.target === dialog) {
    const r = dialog.getBoundingClientRect();
    if (
      e.clientX < r.left ||
      e.clientX > r.right ||
      e.clientY < r.top ||
      e.clientY > r.bottom
    )
      dialog.close();
  }
});
if ($("#year")) $("#year").textContent = new Date().getFullYear();
