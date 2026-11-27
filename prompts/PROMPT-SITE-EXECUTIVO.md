# PROMPT — SITE EXECUTIVO BRAVO BR

> Prompt padrão da Bravo BR Consultoria para **sites comerciais de alto padrão**, feitos no Claude (Claude Code).
> **Como usar:** cole este arquivo na pasta do cliente e preencha só o **BRIEFING**. O resto é fixo e vale para todo site executivo.
> Se faltar algo do briefing que mude o resultado, pergunte antes de começar. Se for detalhe pequeno, decida com bom senso e diga o que assumiu.

---

## BRIEFING (preencher)

### 1. Empresa
- **Nome comercial:** [ex.: Studio Exemplo]
- **Ramo:** [ex.: salão de beleza de alto padrão]
- **Bairro e cidade:** [ex.: Cambuí, Campinas/SP]
- **Público:** [quem compra e como chega no site. Ex.: mulheres de 25 a 50 anos, pelo Instagram, no celular]
- **Tom de voz:** [ex.: sofisticado e acolhedor / direto e técnico]
- **Ação principal do site:** [WhatsApp / agendar / ver cardápio / delivery / ligar / rota]
- **Ideia para o momento uau (opcional):** [ex.: antes e depois arrastável / o prato se montando / "surpreenda"]

### 2. Cores da marca (usar exatamente estas)
- **Principal:** [ex.: #B5651D]
- **Secundária:** [ex.: #2F4A3A ou "não tem"]
- **Fundo:** [claro ou escuro]

### 3. Materiais (pasta `materiais/`)
- **Logo:** [ex.: `materiais/logo.png`]
- **Fotos:** [ex.: `materiais/fotos/fachada.jpg`, `materiais/fotos/ambiente/`, `materiais/fotos/equipe.jpg`]
- **Produtos com foto:** [ex.: `materiais/fotos/produtos/` — nome do arquivo = nome do produto]
- **Vídeos:** [ex.: `materiais/videos/bastidores.mp4` ou "não tem"]
- **Cardápio / serviços / preços:** [ex.: `materiais/servicos.xlsx` com nome, categoria, descrição, preço, foto]
- **Ficha da empresa:** [ex.: `materiais/informacoes.txt`]

### 4. Informações confirmadas
- **Endereço completo:** [rua, número, bairro, cidade/UF, CEP]
- **Horário:** [ex.: ter–sex 9h–20h, sáb 8h–18h, fecha dom e seg]
- **WhatsApp e telefone:** [números]
- **Redes e links oficiais:** [Instagram, Google Maps, iFood, agendamento online, cardápio digital…]
- **Entrega / retirada / área atendida:** [se houver]
- **Formas de pagamento:** [se fizer sentido mostrar]
- **Diferenciais reais:** [o que os clientes elogiam nas avaliações]
- **Depoimentos reais:** [onde estão, ou "não usar"]
- **Pendências (não inventar):** [o que ainda falta confirmar]

### 5. Publicação
- **Hospedagem:** [Vercel (cliente sem domínio próprio) / DreamHost (cliente com domínio)]
- **Domínio (se DreamHost):** [ex.: www.studioexemplo.com.br]

---

## PARTE 1 — CONCEITO: CRIATIVO E OUSADO

Este não é um template. É o site que faz o cliente do nosso cliente pensar "esse lugar é de outro nível".

1. **Estude o material antes de desenhar.**
   - O que é mais bonito, gostoso ou impressionante neste negócio?
   - O que dá para tocar, girar, montar, revelar, comparar ou arrastar?
   - O que os clientes mais elogiam nas avaliações? É isso que o site deve fazer sentir.
2. **Uma ideia central forte vale mais que dez efeitos soltos.** Escolha 1 ou 2 momentos "uau" e faça-os impecáveis; o resto fica calmo e serve a eles.
3. **Cada cliente tem a própria ideia.** Nada de repetir a estrutura de outro site da Bravo BR, de referências ou de templates. Não existe layout obrigatório: nem carrossel, nem vitrine que troca de lado, nem herói de título + dois botões. A interação nasce do conteúdo real do cliente. Exemplos de raciocínio:
   - **Salão:** antes e depois com divisor arrastável, ou o produto girando e revelando os ativos.
   - **Restaurante:** o prato se montando camada por camada, ou a pessoa montando o próprio pedido.
   - **Perfumaria:** o frasco girando e as notas do perfume aparecendo em volta.
   - **Imobiliária:** a planta virando 3D ao rolar e os cômodos acendendo.
   - **Clínica:** o tratamento contado passo a passo, conforme a pessoa rola.
   - **Loja:** a peça trocando de cor na hora, com o preço contando até o novo valor.
4. **Antes de construir, apresente o conceito em 5 a 8 linhas:**
   - a ideia central;
   - o momento uau;
   - como a interação nasce do material do cliente;
   - como fica no celular;
   - a lista do que vai usar de cada arquivo.

   Espere a aprovação.

---

## PARTE 2 — COR

- **Use exatamente as cores do briefing.** Não invente paleta, não troque a cor por seção e não "melhore" a cor da marca.
- Gere uma **escala de 50 a 950** da cor principal (só luminosidade) e use tudo como **tokens**:
  - escala da marca: `--brand-50…950`;
  - neutros e superfícies: `--bg`, `--surface`, `--surface-2`, `--border`;
  - texto: `--text`, `--text-body`, `--text-muted`, `--text-subtle`;
  - estados: `--success`, `--warning`, `--danger`.
- **Proporção:** ~70% neutros, ~20% superfícies e texto, ~10% marca. A marca aparece na ação principal, no elemento central e no que precisa saltar aos olhos.
- **Fundo escuro:** quase preto puxado para a marca, nunca `#000`. Texto em branco com opacidades:

  | Uso | Opacidade |
  |---|---|
  | Título | 100% |
  | Corpo | 85% |
  | Secundário | 62% |
  | Rótulo | 50% |

- **Fundo claro:** off-white tingido pela marca, nunca `#fff` chapado. Texto em quase preto, com a mesma lógica.
- **Contraste:** mínimo AA, verificado.
- **Profundidade sem brilho:** camadas, sombras longas e suaves em elementos flutuantes e, no máximo, um granulado bem sutil.
  - **Proibido:** luz borrada no fundo, brilho fosco, vidro fosco decorativo, reflexo em card, botões ou bolinhas com degradê brilhante.
  - **Nunca:** gradiente roxo→azul.

---

## PARTE 3 — TIPOGRAFIA

- **Montserrat** (500–900): títulos, números, preços, rótulos e navegação.
- **DM Sans** (400/500/700): corpo, botões e campos.

Se a marca tiver fontes próprias, use as dela. Hospede as fontes no próprio site (WOFF2).

| Uso | Fonte / peso | Tamanho | Entrelinha | Espaço entre letras |
|---|---|---|---|---|
| Título herói | Montserrat 800 | `clamp(2.2rem, 4vw, 4.6rem)` | 1.02 | −0.02em |
| Título de seção | Montserrat 800 | 28–44px | 1.1 | −0.02em |
| Título de card | Montserrat 700 | 18–22px | 1.2 | −0.01em |
| Kicker | Montserrat 700, MAIÚSCULAS | 11–12px | 1 | +0.25em |
| Corpo | DM Sans 400 | 15–16px | 1.6 | 0 |
| Secundário | DM Sans 400 | 13–14px | 1.5 | 0 |
| Preço / número | Montserrat 800, tabular-nums | 32–64px | 1 | −0.01em |
| Botão | DM Sans 600 | 14px | 1 | 0 |

- **Títulos em 2 linhas curtas e fortes**, com a 2ª linha em ~45–50% de opacidade ("Seu cabelo, / do jeito que você imaginou.").
- **Combo assinatura:** kicker espaçado em cima (`SERVIÇOS · CABELO`), título pesado e apertado, corpo leve e arejado.
- **Preços:** com `tabular-nums`; preço antigo menor, riscado, com 55% de opacidade.
- **Corpo:** até 60–70 caracteres por linha.
- **Textos na voz da empresa:** frases curtas e concretas ("Retirada no balcão", "Agenda aberta até sábado"). Nada de clichê ("excelência em cada detalhe", "revolucione", "tudo em um só lugar"), nada de travessão em toda frase.

---

## PARTE 4 — ESPAÇO, GRID E FORMA

- **Base de 4px:** 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128.
- **Respiro:**
  - margem lateral: 16px no celular, 32px no tablet e ~5vw no desktop (máx. ~1400px);
  - entre seções: 96–128px;
  - dentro de cards: 20–32px.

  Na dúvida, mais espaço.
- **Grid:** 12 colunas no desktop e 4 no celular; composições assimétricas alinhadas a uma grade invisível.
- **Hierarquia antes de caixa:** agrupe com espaço, linhas finas e tipografia. Evite grade de cards todos iguais.
- **Raios:**

  | Elemento | Raio |
  |---|---|
  | Campos | 14px |
  | Cards | 24px |
  | Destaques e modais | 28px |
  | Botões | pílula |

- **Toque:** área mínima de 44×44px.

---

## PARTE 5 — COMPONENTES

- **Botão primário:** pílula sólida em contraste máximo, seta `›` no fim; no hover a seta se afasta, e no clique `scale .95`.
- **Botão secundário:** pílula translúcida com borda sutil.
- **WhatsApp:**
  - sempre com a mensagem inicial já escrita, dizendo de onde a pessoa veio ("Olá! Vim pelo site e queria agendar…");
  - botão flutuante discreto no celular.
- **Navegação:**
  - cabeçalho com logo, poucos links e o botão da ação principal;
  - indicador do item ativo deslizando com mola;
  - no celular, menu em gaveta.
- **Rota:** "Como chegar" abre o Google Maps já no endereço da unidade certa.
- **Horário:** mostre "Aberto agora · fecha às 19h" calculado na hora, além da tabela completa.
- **Produtos / serviços / cardápio:**
  - categorias como pílulas clicáveis que filtram com animação;
  - fotos de produto padronizadas (caixa fixa, `object-fit: contain`, objeto ocupando ~85%, sombra suave);
  - sem foto: placeholder bonito na cor da marca, nunca ícone quebrado.
- **Galeria:** fotos reais em composição editorial (tamanhos diferentes, alinhados à grade), abrindo em tela cheia com gesto e teclado.
- **Depoimentos:** só reais, com nome e origem (ex.: "Google"). Se não houver, a seção não existe.
- **Rodapé:** contatos essenciais, endereço em uma linha, links oficiais e "Site por Bravo BR".
- **Página 404:** com a cara do site, uma frase simpática no tom da marca e botões para o início e para o WhatsApp.

---

## PARTE 6 — MOVIMENTO (o que faz parecer caro)

**Nada aparece seco na tela.** Tudo entra com movimento, e toda troca mostra de onde algo veio e para onde foi.

- **Mola** em tudo que a pessoa provoca (stiffness 260, damping 18). Curva `power4.out` (600–900ms) nas entradas.
- **Só `transform` e `opacity`.** Resposta ao toque em menos de 100ms. Animações interrompíveis.
- **Entrada da página:** cabeçalho desce → elemento principal entra com mola → títulos sobem da máscara → o resto aparece em sequência (40–80ms entre itens). Tudo numa timeline de no máximo ~1.5s.
- **Rolagem:** cada bloco sobe 24–40px com fade ao entrar na tela, uma vez só.
- **Títulos pela máscara:** cada linha sobe de trás de uma máscara; na troca, a antiga sai para cima e a nova sobe por baixo.
- **Contagem:** números e preços contam do valor antigo ao novo.
- **Momento uau que se conta sozinho:** se for uma cena animada, ela toca sozinha ao abrir (não depende de rolar), termina num estado bonito e tem um discreto "Ver de novo".
- **Repertório** (escolha o que serve ao conteúdo):
  - produto flutuando com sombra no chão;
  - tilt 3D seguindo o mouse;
  - parallax leve;
  - troca de produto com física (sai de um lado, entra com mola do outro);
  - objeto voando até o carrinho ou o pedido;
  - faixa de texto deslizando entre seções;
  - antes e depois arrastável.
- **Regra técnica:** animação contínua (CSS) e animação de interação (JS) nunca no mesmo elemento; use wrappers.
- **Movimento reduzido:** muitos Windows vêm com "efeitos de animação" desligados, o que ativa `prefers-reduced-motion`. **Não desligue tudo.** Nesse modo:
  - corte só o contínuo e o decorativo (flutuação, tilt, parallax);
  - deixe as faixas mais lentas;
  - mantenha entradas, máscaras e contagens, mais curtas.

  O site nunca pode parecer "morto".

---

## PARTE 7 — USABILIDADE

- **Celular primeiro.** Teste em 375, 768, 1024, 1366 e 1440+.
  - Sem rolagem horizontal.
  - Nada cortado ou sobreposto (teste com nomes e preços longos).
- **A ação principal fica a 1 toque** em qualquer ponto da página.
- **Teclado:** Tab com foco visível e bonito, Esc fecha, setas navegam galerias.
- **Gesto:** swipe acima de 50px com `touch-action: pan-y`.
- **Estados:** todo elemento clicável tem normal, hover, pressionado e foco.
- **Nada trava:** nenhum clique fica sem resposta.

---

## PARTE 8 — CONTEÚDO E HONESTIDADE

- **Use só informações confirmadas no briefing** e os materiais da pasta. O que faltar vira placeholder claramente provisório e entra na lista de pendências da entrega.
- **Nunca invente:**
  - preço, promoção, depoimento, avaliação ou nota;
  - número de clientes, prêmio, selo ou horário especial;
  - promessa de atendimento.
- **Fotos:** só as autorizadas pelo cliente; nunca imagens de terceiros tiradas da internet.
- **Imagens:**
  - WebP otimizadas (≤ 1600px nas grandes, ≤ 300KB quando possível);
  - a principal pré-carregada e o resto com lazy-load;
  - `alt` descritivo em todas.
- **SEO local e compartilhamento:**
  - título e descrição com nome, ramo e cidade;
  - Open Graph com a melhor foto (para WhatsApp e Instagram);
  - dados estruturados `LocalBusiness` (endereço, horário, telefone, geo);
  - `robots.txt`, `sitemap.xml`, favicon com a logo e `canonical` apontando para o endereço final.
- **Privacidade:** sem formulários, pixels ou analytics, a não ser que o briefing peça. Se pedir, aviso de cookies simples e página de privacidade.

---

## PARTE 9 — PROIBIDO (cara de IA / template)

- Brilho fosco, luz borrada, glow, neon, vidro fosco decorativo, linha de "scan" brilhando.
- Gradiente roxo→azul, emojis em títulos, "✨", foguetes.
- Grade de cards iguais sem hierarquia; herói só com título centralizado + subtítulo + dois botões.
- Texto estático em cápsula com borda e bolinha ("• NOVO", "• DESTAQUE"). Pílula só em controles clicáveis.
- Faixas de aviso coloridas com ícone de alerta.
- Barrinhas de stories e play/pause como enfeite.
- Fotos genéricas de banco de imagem que serviriam para qualquer empresa.
- Clichês de texto e travessões em excesso.
- Qualquer dado inventado apresentado como real.

---

## PARTE 10 — ESTRUTURA E PUBLICAÇÃO

- **Stack:**
  - HTML + CSS + JavaScript estático (Tailwind e GSAP por CDN com versão fixa, ou CSS próprio);
  - sem back-end;
  - abre com dois cliques no `index.html` sempre que possível.
- **Arquivos:**
  - um arquivo de tokens (cores, tipografia, espaços, raios, tempos);
  - mídias otimizadas numa pasta `assets/`;
  - a pasta `materiais/` com os originais **não** vai para publicação;
  - um `README.md` curto com o que é o site, como ver a prévia e como publicar.
- **Página 404 real nas duas hospedagens:**
  - `404.html` na raiz;
  - **DreamHost:** `.htaccess` com `ErrorDocument 404 /404.html`, HTTPS forçado e redirecionamento do domínio sem www para o canônico (ou o contrário, conforme o briefing);
  - **Vercel:** `vercel.json` só se precisar de regras extras; o `404.html` na raiz já é usado automaticamente.
- **Git:**
  - commits pequenos, em português, descrevendo o que mudou;
  - só no nome configurado no computador, sem coautor nem menção a IA;
  - nunca subir segredos, `node_modules` ou a pasta `materiais/` (incluir no `.gitignore`).
- **Publicação DreamHost automática (quando o briefing indicar DreamHost):** crie o workflow `.github/workflows/deploy-dreamhost.yml`, no mesmo padrão do site da Bravo BR. Ele:
  - roda a cada push na `main`;
  - copia só os arquivos públicos para uma pasta `publish/`;
  - envia por `rsync` via SSH para `/home/USUARIO/DOMINIO/`;
  - confere o site no ar;
  - usa os segredos `DREAMHOST_SSH_KEY` e `DREAMHOST_KNOWN_HOSTS` do repositório.

  Diga exatamente quais segredos e valores (usuário, servidor e pasta) precisam ser cadastrados no GitHub. Nunca peça nem grave senhas no código.

---

## PARTE 11 — ANTES DE ENTREGAR

1. **Abra e use de verdade** no celular e no computador. Teste:
   - todos os links: WhatsApp com mensagem, telefone, rota, Instagram, cardápio, delivery, agendamento;
   - todas as interações e a página 404.
2. **Console sem erros.** As animações acontecem mesmo com "reduzir movimento" ligado.
3. **Responsivo:** 375, 768, 1024, 1366 e 1440+. Sem rolagem lateral e sem nada cortado.
4. **Desempenho:** imagens leves, primeira tela rápida no 4G, nada travando ao rolar.
5. **Consistência:**
   - só tokens;
   - as cores exatas da marca;
   - nenhum item da Parte 9.
6. **Conteúdo:** tudo bate com a ficha do cliente e nada foi inventado.
7. **Entrega:** prints do celular e do computador, mais uma explicação curta com:
   - o conceito;
   - o que é interativo;
   - a lista de pendências do cliente;
   - o que falta para publicar.

---

**Resumo:** a cor exata da marca, tipografia pesada contra corpo leve, muito espaço, profundidade sem brilho, movimento com mola em tudo, um momento uau que nasce do material real do cliente, e o caminho até o contato sempre a um toque. Bonito, rápido, honesto e com a cara do cliente.
