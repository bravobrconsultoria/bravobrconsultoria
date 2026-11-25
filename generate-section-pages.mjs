import { readFileSync, writeFileSync } from 'node:fs';
import assert from 'node:assert/strict';
export const sections = [
 ['index','sobre','Sobre a Bravo BR Consultoria','Conheça a Bravo BR Consultoria, assessoria para empresas em Campinas, com atuação em vendas, marketing e gestão de restaurantes, comércio e serviços.'],
 ['index','metodo','Método de assessoria empresarial','Diagnóstico, planejamento, implementação e acompanhamento: conheça o método de trabalho da Bravo BR Consultoria.'],
 ['index','solucoes','Assessoria para negócios em Campinas','Assessoria para empresas em Campinas: soluções de marketing, vendas, gestão, atendimento e presença digital da Bravo BR Consultoria.'],
 ['index','cases','Cases de consultoria','Conheça trabalhos reais da Bravo BR Consultoria em digitalização, presença local, delivery e organização comercial.'],
 ['index','contato','Contato com a Bravo BR Consultoria','Converse com a Bravo BR Consultoria em Campinas sobre as necessidades do seu negócio. Confira telefone, WhatsApp e e-mail.'],
 ['index','visao','Nossa visão de negócios','Entenda como a Bravo BR Consultoria conecta marketing, vendas e operação para identificar oportunidades no negócio inteiro.'],
 ['index','especializacoes','Foods e Empresarial','Conheça as especializações Bravo BR Foods, para gastronomia, e Bravo BR Empresarial, para comércio e prestadores de serviços.'],
 ['foods','cardapio','Engenharia de cardápio em Campinas','Engenharia de cardápio para restaurantes em Campinas: mix de produtos, popularidade, rentabilidade, preços e ticket médio com a Bravo BR Foods.'],
 ['foods','delivery','Gestão de delivery em Campinas','Assessoria de delivery para restaurantes em Campinas: gestão de iFood, 99Food, Keeta, delivery próprio e WhatsApp com a Bravo BR Foods.'],
 ['foods','desafios','Desafios de restaurantes','Vendas, margem, cardápio e operação: conheça os desafios gastronômicos que orientam o trabalho da Bravo BR Foods.'],
 ['foods','cases','Cases gastronômicos','Conheça o trabalho da Bravo BR Foods na estruturação digital, delivery e acompanhamento de restaurantes.'],
 ['foods','sobre','Sobre a Bravo BR Foods','Conheça a Bravo BR Foods: assessoria gastronômica em Campinas, com consultoria para restaurantes em vendas, marketing e gestão operacional.'],
 ['empresarial','jornada','Assessoria comercial em Campinas','Assessoria comercial para empresas e prestadores de serviços em Campinas: presença digital, atendimento e oportunidades de venda na jornada do cliente.'],
 ['empresarial','desafios','Desafios de comércio e serviços','Conheça os desafios de presença digital, atendimento e organização comercial trabalhados pela Bravo BR Empresarial.'],
 ['empresarial','cases','Cases de comércio e serviços','Conheça cases reais da Bravo BR Empresarial em sites, Google Business, presença local e organização digital.'],
 ['empresarial','sobre','Sobre a Bravo BR Empresarial','Conheça a Bravo BR Empresarial: assessoria para prestadores de serviços, empresas e comércio em Campinas, com foco em marketing e vendas.'],
 ["index","apresentacoes","Apresentações e planos da Bravo","Consulte as apresentações da Foods e da Empresarial para entender a atuação de cada especialização e preparar suas dúvidas."],
 ["index","marketing","Assessoria de marketing em Campinas","Planejamento, presença local e campanhas precisam conversar com a oferta e o atendimento. A Bravo organiza essas conexões para empresas em Campinas."],
 ["index","tecnologia","Automação de atendimento para negócios","WhatsApp Business, organização de contatos e automação podem apoiar o atendimento sem afastar o cliente da equipe."],
 ["index","clientes","Clientes da Bravo BR Consultoria","Conheça empresas que fazem parte da trajetória da Bravo em gastronomia, varejo e serviços locais."],
 ["index","depoimentos","Depoimentos sobre a Bravo BR Consultoria","Leia os relatos de Farmácia Mogi Guaçu, Gabriel Giovanini e Beatriz Morato sobre o atendimento e a abordagem da Bravo."],
 ["foods","apresentacoes","Apresentação comercial da Bravo BR Foods","Veja o material comercial da Foods e leve para a conversa as dúvidas sobre cardápio, delivery, marketing e operação."],
 ["foods","solucoes","Assessoria para restaurantes em Campinas","A Foods conecta cardápio, precificação, delivery, marketing e operação conforme as prioridades do restaurante."],
 ["foods","marketing","Marketing para restaurantes em Campinas","Fotos, oferta, presença local e campanhas devem ajudar o cliente a entender o que pedir e como comprar."],
 ["foods","tecnologia","Automação para restaurantes e delivery","A Foods trabalha automação e canais digitais como apoio à escolha do pedido e à continuidade do atendimento."],
 ["foods","operacao","Gestão operacional para restaurantes","Processos, padronização e capacidade de atendimento ajudam a sustentar a experiência prometida pelo restaurante."],
 ["foods","clientes","Restaurantes atendidos pela Bravo BR Foods","Jambalaya e Rosendo fazem parte da atuação gastronômica da Bravo, com trabalho de digitalização e acompanhamento dos canais."],
 ["foods","contato","Contato com a Bravo BR Foods","Fale com a Bravo sobre pedidos, cardápio, margem, delivery ou organização operacional. O primeiro passo é entender o cenário."],
 ["empresarial","apresentacoes","Apresentação comercial da Bravo BR Empresarial","Consulte a proposta comercial para empresas, comércio e prestadores de serviços e conheça as frentes de atuação."],
 ["empresarial","solucoes","Soluções para comércio e prestadores de serviços","Presença digital, atendimento, campanhas e processos comerciais precisam ajudar o cliente a avançar com clareza."],
 ["empresarial","marketing","Marketing para empresas e serviços em Campinas","A comunicação de uma empresa de serviços precisa responder às dúvidas do cliente e facilitar o próximo contato."],
 ["empresarial","tecnologia","Automação comercial para empresas","WhatsApp Business e automações podem apoiar o pré-atendimento e a organização das demandas de comércio e serviços."],
 ["empresarial","clientes","Clientes da Bravo BR Empresarial","Conheça negócios atendidos em organização digital e presença local, como Farmácia Mogi Guaçu e as operações WS Rocha."],
 ["empresarial","contato","Contato com a Bravo BR Empresarial","Conte como sua empresa é encontrada, como recebe contatos e em quais etapas encontra dificuldades para avançar."],
].map(([source,id,title,description])=>({source:`${source}.html`,id,title,description,route:`${source==='index'?'':'/'+source}/${id}`,file:`section-${source}-${id}.html`}));
import { sectionContent } from './section-content.mjs';
const origin = 'https://bravobrconsultoria.com.br';
const escape = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');
export function extractSection(html, id) {
 const tags = [...html.matchAll(/<\/?section\b[^>]*>/g)];
 const start = tags.findIndex(match => match[0].includes(`id="${id}"`));
 assert(start >= 0, `Missing section ${id}`);
 let depth = 0;
 for (let i = start; i < tags.length; i++) {
  depth += tags[i][0].startsWith('</') ? -1 : 1;
  if (!depth) return html.slice(tags[start].index, tags[i].index + tags[i][0].length);
 }
 throw Error(`Unclosed section ${id}`);
}
export function generate(page) {
 const html = readFileSync(page.source, 'utf8');
 const content = sectionContent[page.route];
 assert(content, `Missing editorial content ${page.route}`);
 const parent = page.source === 'index.html' ? '/' : '/' + page.source.replace('.html', '');
 const brand = page.source === 'foods.html' ? 'Bravo BR Foods' : page.source === 'empresarial.html' ? 'Bravo BR Empresarial' : 'Bravo BR Consultoria';
 const title = page.title.includes(brand) ? page.title : `${page.title} | ${brand}`;
 const url = origin + page.route;
 let head = html.slice(0, html.indexOf('</head>'));
 head = head.replace(/<title>[\s\S]*?<\/title>/, `<title>${escape(title)}</title>`);
 for (const [name, value] of Object.entries({ description: page.description, 'og:title': title, 'og:description': page.description, 'og:url': url, 'twitter:title': title, 'twitter:description': page.description })) {
  head = head.replace(new RegExp(`(<meta\\s+(?:name|property)="${name}"\\s+content=")[^"]*("\\s*\\/>)`), `$1${escape(value)}$2`);
 }
 head = head.replace(/(<link\s+rel="canonical"\s+href=")[^"]*("\s*\/>)/, `$1${url}$2`);
 // Standalone pages have no background video: do not preload a hero poster.
 head = head.replace(/<link\s+rel="preload"\s+as="image"[\s\S]*?\/>/, '');
 head = head.replace(/(<script type="application\/ld\+json">)([\s\S]*?)(<\/script>)/g, (all, open, text, close) => {
  const data = JSON.parse(text);
  if (data['@type'] !== 'WebPage') return all;
  data.name = title; data.url = url; data.description = page.description;
  return open + '\n' + JSON.stringify(data, null, 2) + '\n' + close;
 });
 head += '\n<link rel="stylesheet" href="/assets/web/section-pages.css" />\n</head>\n';
 let header = html.slice(html.indexOf('<body'), html.indexOf('<main'));
 header = header.replace('<body ', '<body class="section-page" ');
 header = header.replace('site-header ecosystem-header', 'site-header ecosystem-header scrolled');
 const whatsapp = 'https://wa.me/5519981198188?text=' + encodeURIComponent(`Olá! Vim pelo site da ${brand} e gostaria de conversar a respeito deste assunto: ${page.title.toLowerCase()}.`);
 const illustration = content.image ? `<figure class="topic-photo"><img src="/assets/web/${content.image}-1280.webp" width="1280" height="720" alt="${escape(content.alt)}" fetchpriority="high" /><figcaption>${escape(content.caption)}</figcaption></figure>` : `<aside class="topic-summary"><p>O que você encontra aqui</p><ul>${content.points.map(point => `<li>${escape(point)}</li>`).join('')}</ul><a href="#${page.id}">Explorar este assunto <span aria-hidden="true">↓</span></a></aside>`;
 const related = sections.filter(p => p.source === page.source && p.route !== page.route);
 const body = `<main id="conteudo">
 <section class="topic-intro" id="inicio"><div class="wrap">
 <nav class="topic-breadcrumb" aria-label="Caminho da página"><a href="/">Bravo BR Consultoria</a>${parent !== '/' ? `<span aria-hidden="true">/</span><a href="${parent}">${brand}</a>` : ''}<span aria-hidden="true">/</span><span aria-current="page">${escape(page.title)}</span></nav>
 <div class="topic-intro-grid"><div><p class="topic-label">${escape(content.label)}</p><h1>${escape(content.headline)}</h1><p class="topic-lead">${escape(content.intro)}</p><a class="button" href="${whatsapp}">Vamos conversar <span aria-hidden="true">↗</span></a></div>${illustration}</div>
 </div></section>
 ${extractSection(html, page.id)}
 <section class="topic-depth"><div class="wrap topic-depth-grid"><div><p class="topic-label">Na prática</p><h2>${escape(content.heading)}</h2></div><div>${content.paragraphs.map(p => `<p>${escape(p)}</p>`).join('')}<details class="topic-question"><summary>${escape(content.question)}</summary><p>${escape(content.answer)}</p></details></div></div></section>
 <section class="topic-next"><div class="wrap"><div><p class="topic-label">Continue a conversa</p><h2>Como isso se aplica ao seu negócio?</h2></div><a class="button" href="${whatsapp}">Conversar com a Bravo <span aria-hidden="true">↗</span></a></div></section>
 <nav class="topic-related wrap" aria-label="Outros assuntos de ${brand}"><p>Conheça também</p><div>${related.map(p => `<a href="${p.route}">${escape(p.title)} <span aria-hidden="true">↗</span></a>`).join('')}<a href="${parent}">Conheça a ${brand} <span aria-hidden="true">↗</span></a></div></nav>
 </main>`;
 const footer = html.slice(html.indexOf('</main>') + '</main>'.length);
 let output = head + header + body + footer;
 // Keep existing controls local; route absent sections to their source or standalone URL.
 const ids = new Set([...output.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]));
 output = output.replace(/href="([^"#]*)#([^"]+)"/g, (all, path, id) => {
  if (!path && ids.has(id)) return all;
  const source = path === '/' ? 'index.html' : path === '/foods' ? 'foods.html' : path === '/empresarial' ? 'empresarial.html' : !path ? page.source : null;
  const target = sections.find(p => p.source === source && p.id === id);
  return target ? `href="${target.route}"` : !path ? `href="${parent}#${id}"` : all;
 });
 if (page.id === 'clientes') output = output.replace(/\sdata-client="[^"]+"/g, '');
 return output.replace(/[ \t]+(?=\r?$)/gm, "");
}
if (process.argv[1]?.endsWith('generate-section-pages.mjs')) {
 for (const page of sections) writeFileSync(page.file, generate(page));
 console.log(`PASS: generated ${sections.length} independent editorial pages.`);
}
