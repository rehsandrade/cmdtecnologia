# CMD Tecnologia & Infraestrutura

Protótipo institucional estático em HTML5, CSS3 e JavaScript puro. Sem framework, backend, banco de dados ou etapa de build. O conteúdo institucional segue o briefing recebido.

## Estrutura

```text
cmdtecnologia/
├── index.html            # Página completa, ícones Lucide e dados estruturados
├── style.css             # Layout, cores, fontes e responsividade
├── script.js             # Configuração e interações
├── 2.png                 # Data center original do repositório, preservado
├── visualizacao.html     # Site interativo em arquivo único, com imagens e fontes incorporadas
├── publicacao.zip        # Arquivos para enviar e extrair em public_html
├── README.md
└── assets/
    ├── README.md         # Correspondência das oito imagens enviadas no chat
    ├── fonts/            # Manrope e Inter, armazenadas localmente
    └── licenses/         # Licenças das fontes e dos ícones
```

## Abrir no navegador

Para visualizar sem extrair pastas, baixe e abra `visualizacao.html` com um navegador moderno: todas as fontes, imagens e interações estão incorporadas nesse arquivo. Para editar o projeto, abra `index.html` com os demais arquivos na mesma pasta. Todos os recursos necessários à página atual são locais; não há imports de módulos, chamadas a APIs ou downloads de fontes durante a execução. Uma conexão é necessária apenas para acessar o WhatsApp. Se o navegador da sua organização bloquear arquivos locais, use uma hospedagem ou um servidor estático.

Para desenvolvimento com servidor opcional:

```sh
cd /workspace/cmdtecnologia
python3 -m http.server 8080 --bind 127.0.0.1
```

O servidor não é uma dependência de produção. Interrompa com `Ctrl+C` quando terminar.

## Imagens e logomarca

O logo original da CMD e os cinco logos de clientes recebidos em `Logos.zip` estão incorporados no cabeçalho, rodapé e seção Clientes. Os seis arquivos PNG foram copiados sem alterar seus bytes, cores ou transparência. As imagens também estão no HTML para aparecerem com JavaScript desativado. O código mantém textos alternativos e um fallback para falhas de carregamento.

O logo A3 tem letras brancas e é exibido sobre fundo azul escuro. As margens transparentes dos arquivos são enquadradas pelo CSS sem distorção. O logotipo CMD permanece inteiro; nenhum filtro de cor é aplicado.

**Pendência:** os banners de computador e celular não vieram em `Logos.zip`. O Hero conserva uma rede vetorial decorativa até os dois arquivos serem enviados. A imagem `2.png`, já presente no repositório, continua na seção Sobre.

Para trocar um logo, substitua o respectivo arquivo em `assets/` preservando o nome. Para aplicar os banners, copie os originais para `assets/` e preencha `heroDesktop` e `heroMobile` em `CMD_CONFIG.images` no início de `script.js`. A tabela em `assets/README.md` identifica todos os arquivos.

Configuração de imagens (os caminhos dos banners só devem ser ativados quando os arquivos existirem):

```js
images: {
  logo: 'assets/logo-cmd.png',
  heroDesktop: 'assets/hero-desktop.png',
  heroMobile: 'assets/hero-mobile.png',
  favicon: '',
  clients: {
    bizz: 'assets/cliente-bizz.png',
    'anglo-american': 'assets/cliente-anglo-american.png',
    north: 'assets/cliente-north.png',
    komatsu: 'assets/cliente-komatsu.png',
    a3: 'assets/cliente-a3.png'
  }
}
```

Preserve as cores e proporções da CMD. A área do logo tem fundo branco e não aplica filtros de cor. Se o arquivo tiver fundo preto incorporado, use uma versão transparente oficial ou adapte o fundo de `.brand`; não remova o fundo por filtros CSS. A imagem do banner usa `object-fit: cover`, e os logos usam `object-fit: contain` para preservar toda a marca. O banner mobile é selecionado até 768 px. Ajuste `object-position` em `.hero-media img` se precisar reposicionar o enquadramento.

Para trocar a imagem institucional, altere o `src`, as dimensões e o `alt` do `<img>` de `.about-visual` em `index.html`. A imagem de fibra óptica mencionada no briefing não estava disponível; o serviço está representado pelo ícone de rede.

O favicon só deve ser configurado depois que houver um arquivo oficial preparado. Não foi inventado um símbolo de marca. Ao ter domínio e imagens definitivos, acrescente a URL absoluta de `og:image`, `og:url` e o link canonical no `<head>` de `index.html`.

## WhatsApp e telefone

No início de `script.js`, altere `CMD_CONFIG.whatsapp` para o número internacional, somente com dígitos, e `CMD_CONFIG.message` para editar a mensagem. A mudança atualiza as duas chamadas comerciais. O número provisório é `553138681251`, conforme o briefing; **a existência de uma conta WhatsApp ativa nesse número precisa ser confirmada pela CMD**.

Se trocar o número comercial, atualize também o telefone visível e o link `tel:` do rodapé, o campo `telephone` dos dados estruturados e os dois `href` estáticos com `data-whatsapp` de `index.html`. Estes últimos servem como fallback sem JavaScript. O funcionamento da conta WhatsApp não pode ser validado apenas pelo formato do link.

## Cores e fontes

As cores ficam nas variáveis de `:root` em `style.css`. `--blue`, `--tech`, `--turquoise`, `--dark`, `--light` e `--gray` controlam a identidade principal. `--accent-text` é um turquesa mais escuro para manter contraste nos textos pequenos sobre fundo claro. A marca oficial não recebe filtros nem alteração de cor.

Manrope é usada nos títulos, e Inter nos textos. Os arquivos locais são distribuídos pelo Fontsource a partir das famílias disponíveis no Google Fonts, com licenças incluídas em `assets/licenses/`. Para trocar as fontes, substitua os arquivos, atualize as regras `@font-face`, `--font-heading`, `--font-body` e os dois preloads em `index.html`.

## Clientes e redes sociais

Os cinco nomes de clientes correspondem às marcas fornecidas na conversa. Para adicionar outro logo, inclua um `<figure class="client-mark">` na grade `.client-grid`, com um texto de fallback `data-client-fallback="identificador"`, e acrescente o mesmo identificador em `CMD_CONFIG.images.clients`. O script cria a imagem com o texto alternativo correspondente. Não invente clientes ou depoimentos.

Instagram, Facebook e LinkedIn estão reservados no rodapé como texto sem links. Ative-os apenas quando os endereços oficiais forem fornecidos, substituindo os respectivos `<span>` por links com rótulos acessíveis.

## Publicar na Hostinger ou em hospedagem comum

1. Confirme o WhatsApp e aplique os banners originais antes de apresentar a versão como definitiva.
2. Baixe `publicacao.zip`. No gerenciador de arquivos da hospedagem, abra a pasta pública do domínio (normalmente `public_html`). Faça backup de um site existente antes de substituir qualquer arquivo.
3. Envie `publicacao.zip` e extraia diretamente nessa pasta. O ZIP contém `index.html`, `style.css`, `script.js`, `2.png` e a pasta `assets/` na raiz. Não exige uma subpasta nem contém arquivos do Git. Alternativamente, envie esses arquivos individualmente, preservando os caminhos. O README e `visualizacao.html` não precisam ser publicados.
4. Ative HTTPS pelo painel da hospedagem e acesse o domínio no computador e no celular.
5. Verifique as imagens, os links âncora e os dois destinos de WhatsApp. Depois de definir o domínio, atualize os metadados indicados acima.

Nenhuma publicação foi realizada durante a criação deste protótipo.

## Validação

Os testes de navegador usam um servidor estático local e verificam conteúdo, interações e layout. O navegador gerenciado deste ambiente bloqueia navegação pelo protocolo `file://`; portanto, a abertura direta não pôde ser exercitada aqui. A implementação usa apenas arquivos estáticos e recursos locais compatíveis com essa forma de abertura. Consulte `VALIDACAO.md` para o resultado das verificações executadas.
