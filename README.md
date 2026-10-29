# Bravo BR Consultoria

Um ecossistema digital, duas especializações. HTML estático, CSS e JavaScript compartilhados, sem dependências de produção ou pasta de compilação.

## Rotas

| URL            | Fonte              | Papel                                          |
| -------------- | ------------------ | ---------------------------------------------- |
| `/`            | `index.html`       | Institucional completo da Bravo BR Consultoria |
| `/foods`       | `foods.html`       | Restaurantes e negócios gastronômicos          |
| `/empresarial` | `empresarial.html` | Empresas, comércio e prestadores de serviços   |

`styles.css` mantém o sistema visual e as variações de cada vertical. `app.js` compartilha navegação, vídeo adaptativo, tabs, interações e dados dos cases. As páginas são fontes editáveis na raiz; não é necessário gerar arquivos para trabalhar no site.

## Prévia e validação

- `node server.mjs` — prévia em `http://127.0.0.1:4173`, incluindo as três rotas e os redirecionamentos canônicos.
- `node check.mjs` — valida páginas, âncoras locais e entre rotas, imagens, metadados, contatos e estrutura.
- `node --check app.js` e `node --check server.mjs` — validação de sintaxe.
- Os mesmos comandos estão disponíveis pelos scripts de `package.json`, quando npm estiver instalado.

## Conteúdo e identidade

A Consultoria reúne posicionamento, soluções transversais, método e provas sociais de todo o ecossistema. A Foods concentra cardápio, delivery, marketing e operação gastronômica. A Empresarial desenvolve presença local, canais, atendimento e organização comercial. Consulte `ARCHITECTURE.md` para o mapa editorial.

Contatos únicos: `consultoria@bravobr.com.br`, `@bravobrconsultoria` e WhatsApp `+55 (19) 98119-8188`. Os links de WhatsApp identificam a experiência visitada na mensagem inicial, sem enviar nada automaticamente.

Os depoimentos originais mantêm as referências históricas à Bravo BR Foods, com contexto explícito. Não há resultados numéricos, estrelas, funcionários ou clientes inventados. A apresentação institucional permanece desabilitada até existir um PDF real.

## Assets

- `assets/consultoria`, `assets/foods` e `assets/empresarial`: organização fornecida pelo responsável, com originais preservados.
- `assets/web`: derivados leves para publicação; logos oficiais sem redesenho, imagens WebP e vídeos H.264 sem áudio.
- `assets/fonts`: fontes WOFF2 locais e licenças OFL.
- As pastas `assets/foods/clients` e `assets/empresarial/clients` são arquivos de produção locais, ignorados no Git. Todas as mídias usadas nas páginas estão versionadas em `assets/web`. Um clone contém tudo que é necessário para executar o site.
- `prepare-media.py` e `inspect-assets.py`: utilitários opcionais de mídia, com Pillow e imageio-ffmpeg; pypdfium2 é usado na inspeção de PDFs. Não são necessários para executar o site.

## Publicação

Endereço atual: `https://bravobrconsultoria.vercel.app`.

Domínio futuro: `https://bravobrconsultoria.com.br`. Na migração, atualizar canonical, Open Graph, JSON-LD, robots.txt e sitemap.xml para o domínio próprio e configurar os redirecionamentos na Vercel.

### Vercel

O `vercel.json` publica este projeto como site estático, sem executar `server.mjs` e sem criar funções Node. O servidor local não deve ser usado como entrypoint de produção. Isso evita a dependência de uma função para servir HTML, CSS, imagens e vídeos.

Os builders estáticos explícitos publicam apenas os arquivos públicos selecionados, mantendo os fontes na raiz e sem gerar `dist` ou duplicar o projeto. Essa configuração é intencional: substitui a detecção automática de um backend Node e exclui scripts de desenvolvimento e mídias originais da publicação. A Vercel pode informar que as configurações de build do painel foram substituídas pelo arquivo; isso é esperado.

Use a raiz do repositório como Root Directory e a branch `main`. As rotas `/foods` e `/empresarial` são reescritas para seus HTMLs; URLs com extensão são redirecionadas. `404.html` fornece a página de erro estática. Não configure todas as rotas para `server.mjs`.

Execute `npm run check` antes de publicar. O comando também confere se os recursos usados pelas páginas estão incluídos na publicação estática. Com a integração GitHub ativa, novos pushes disparam um deployment. Um redeploy manual deve selecionar o commit corrigido, não apenas reconstruir um deployment antigo.

Publicar apenas `index.html`, `foods.html`, `empresarial.html`, `styles.css`, `app.js`, `privacidade.html`, `404.html`, `robots.txt`, `sitemap.xml`, os arquivos de `assets/web`, as fontes WOFF2 e suas licenças, e `assets/foods/videos/hero-web.mp4`. Não publicar `.git`, `.qa`, `.tools`, scripts de desenvolvimento ou arquivos brutos de clientes.

A hospedagem deve mapear `/foods` para `foods.html` e `/empresarial` para `empresarial.html`, responder 404 real com `404.html` para URLs desconhecidas e redirecionar os caminhos com extensão/barra final para as URLs canônicas. O arquivo `.htaccess` fornece essas regras para Apache com mod_rewrite e AllowOverride habilitados. Em outros provedores, aplicar as regras equivalentes. Não reescrever todos os endereços para a homepage.

O servidor Node incluído é uma prévia local. O push ao GitHub não configura DNS, TLS ou hospedagem. Não há cookies, pixels, analytics, cadastro ou formulário no código atual.

## Créditos

Logos, vídeos institucionais e materiais de clientes fornecidos pela Bravo. Pessoas em cenas ilustrativas não são apresentadas como funcionários da empresa.

Fotografia gastronômica ilustrativa: Jason Edwards, [Unsplash](https://unsplash.com/photos/cooked-dish-on-white-ceramic-plate-ip5OlSjG88I), [licença](https://unsplash.com/license). Tipografia: Barlow Condensed e DM Sans, licenças OFL em `assets/fonts`.
