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
].map(([source,id,title,description])=>({source:`${source}.html`,id,title,description,route:`${source==='index'?'':'/'+source}/${id}`,file:`section-${source}-${id}.html`}));
const origin='https://bravobrconsultoria.com.br';
export function generate(page) {
 const html=readFileSync(page.source,'utf8');
 assert(html.includes(`id="${page.id}"`), `Missing section ${page.route}`);
 const end=html.indexOf('</head>');
 let head=html.slice(0,end);
 const title=`${page.title} | ${page.source==='foods.html'?'Bravo BR Foods':page.source==='empresarial.html'?'Bravo BR Empresarial':'Bravo BR Consultoria'}`;
 head=head.replace(/<title>[\s\S]*?<\/title>/,`<title>${title}</title>`);
 for(const [name,value] of Object.entries({'description':page.description,'og:title':title,'og:description':page.description,'og:url':origin+page.route,'twitter:title':title,'twitter:description':page.description})) {
  head=head.replace(new RegExp(`(<meta\\s+(?:name|property)="${name}"\\s+content=")[^"]*("\\s*\\/>)`),`$1${value}$2`);
 }
 head=head.replace(/(<link\s+rel="canonical"\s+href=")[^"]*("\s*\/>)/,`$1${origin+page.route}$2`);
 head=head.replace(/(<script type="application\/ld\+json">)([\s\S]*?)(<\/script>)/g,(all,open,text,close)=>{
  const data=JSON.parse(text); if(data['@type']!=='WebPage')return all;
  data.name=title;data.url=origin+page.route;data.description=page.description;
  return open+'\n'+JSON.stringify(data,null,2)+'\n'+close;
 });
 head+=`<script>\nwindow.addEventListener('load', function () {\n  if (location.hash) return;\n  document.getElementById('${page.id}')?.scrollIntoView({ behavior: 'instant', block: 'start' });\n}, { once: true });\n</script>\n`;
 return head+html.slice(end);
}
if(process.argv[1]?.endsWith('generate-section-pages.mjs')) {
 for(const page of sections)writeFileSync(page.file,generate(page));
 console.log(`PASS: generated ${sections.length} section pages.`);
}
