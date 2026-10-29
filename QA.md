# Validação do ecossistema Bravo BR

Revisão final em 30/09/2026. Prévia local em `http://127.0.0.1:4173`, navegador Chromium integrado.

## Escopo da reestruturação

- `/`: Bravo BR Consultoria, institucional completo e provas sociais do conjunto.
- `/foods`: conteúdo e case gastronômicos, cardápio, delivery e operação.
- `/empresarial`: comércio, serviços, jornada comercial e cases correspondentes.
- Contatos unificados: `consultoria@bravobr.com.br`, `@bravobrconsultoria` e WhatsApp existente.

## Verificações concluídas

- `node check.mjs`: cinco páginas, um H1 por página, IDs únicos, arquivos e imagens responsivas existentes, dimensões/alt, âncoras dentro da página e entre rotas, JSON-LD, destinos ARIA, ausência dos contatos descontinuados, canonicals e seleção de cases por vertical.
- Sintaxe de `app.js` e `server.mjs`; `git diff --check`.
- HTTP 200 nas três rotas e nos recursos referenciados (21 URLs na principal, 17 em cada vertical na auditoria). Redirecionamento 301 das variantes com barra final/extensão e HTTP 404 para endereço inexistente.
- Desktop: entradas da Consultoria e Empresarial, navegação entre marcas, cartões das especializações e cases. Tablet: cartões das especializações a 768 px, jornada comercial a 768 e 1024 px, cardápio Foods a 1024 px. Mobile: páginas a 320 px e navegação a 390 px. Nenhum transbordamento horizontal de página observado nesses testes.
- Menu móvel abre as três experiências e fecha após navegação. Tabs de soluções aceitam teclado, incluindo End. Método mantém seus controles e painéis associados.
- Carrossel Empresarial alterna entre os IDs corretos, abre detalhes da WS Rocha e permite fechar por Escape. Foods abre o case Rosendo/Jambalaya, sem controles de carrossel desnecessários para um único destaque. Controles e logos de clientes apontam apenas para cases presentes em cada página.
- Atualização de 29/10: vídeo de abertura com autoplay mudo, sem botão de reprodução, cores naturais e preenchimento de tela. Reprodução automática confirmada no navegador em 1366 × 768 e 390 × 844.
- Versões sem áudio: Consultoria 1.121.425 bytes; Empresarial 1.115.956 bytes; Foods 1.307.534 bytes. Fontes WOFF2 locais compartilhadas.
- WhatsApp usa mensagem específica da página de origem. E-mail e Instagram estão atualizados. Nenhuma mensagem foi enviada durante a validação.
- Depoimentos mantêm os textos originais e contexto histórico. PDF institucional permanece indisponível de forma explícita. Não foram adicionados resultados ou avaliações numéricas.
- Nenhum erro ou aviso de console observado nos testes das páginas.

## Limites

Os tamanhos foram emulados; não houve teste em aparelhos físicos, Safari ou leitor de tela. O gesto de swipe não foi validado em hardware touch; os botões continuam sendo alternativa acessível. A abertura agora tenta autoplay mudo em todos os tamanhos, conforme solicitado; o poster permanece se o navegador impedir a reprodução. Animações de interface continuam respeitando movimento reduzido.

Não foram atribuídas notas Lighthouse nem métricas reais de Core Web Vitals. Hospedagem, DNS, TLS e regras de produção precisam ser configurados no provedor; o push ao GitHub não publica automaticamente o domínio. As regras Apache estão preparadas em `.htaccess`, mas não foram executadas em um servidor Apache nesta revisão.

A revisão visual final está salva localmente em `.qa/consultoria-final.png`, ignorada no Git.

## Ajuste de direção visual — 29/10

Abertura principal com menos texto, menu único da Consultoria com Foods e Empresarial agrupadas em Especializações. Removidas numerações decorativas, contagens visuais dos carrosséis e traços vermelhos. Indicadores dos cases usam pontos com nomes acessíveis. Verificados menu desktop, menu mobile, estrutura, links locais e ausência de overflow na abertura.
