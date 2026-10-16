# Verificação do protótipo

Validação executada em Chromium com Playwright, usando servidor estático local. O servidor foi utilizado apenas nos testes; não é requisito do projeto.

## Resultados

- JavaScript: verificação de sintaxe aprovada.
- Conteúdo: um H1, dez serviços, cinco diferenciais, cinco segmentos e cinco posições de clientes.
- Conversão: exatamente dois links comerciais, com o mesmo número e mensagem de WhatsApp; sem formulário, pop-up ou botão flutuante de WhatsApp.
- Navegação: âncoras e referências de ícones válidas; destaque da seção ativa e cabeçalho ao rolar funcionando.
- Responsividade: sem rolagem horizontal nas larguras de 320, 360, 390, 480, 768, 992, 1200, 1440 e 1920 px.
- Menu mobile: abrir, fechar, selecionar seção, controlar foco com Tab/Shift+Tab e fechar com Escape verificados.
- Interações: contadores chegam a 15, 100 e 50; voltar ao topo funciona; preferência por movimento reduzido respeitada.
- Imagens configuráveis: testada a aplicação de logo e cliente, além da troca automática de banner desktop/mobile, usando temporariamente a imagem local existente como fixture, sem alterar a configuração entregue. Esse teste valida a lógica de substituição, não o enquadramento das oito imagens originais ausentes.
- SEO: title, description, Open Graph básico e JSON-LD Organization com dados fornecidos. Sem domínio, e-mail ou perfis sociais inventados.
- Execução: nenhum erro de JavaScript, console ou resposta HTTP no fluxo testado.
- Auditoria automática axe-core: nenhuma violação detectada nas regras WCAG 2 A/AA e 2.1 AA executadas em desktop (1440 px) e mobile (390 e 320 px). Auditorias automáticas não substituem uma revisão humana completa de acessibilidade.
- Revisão visual: telas de Hero desktop/mobile, Sobre e Serviços inspecionadas.
- Arquivo original `2.png` preservado, sem mudanças em arquivos anteriormente rastreados pelo Git.

## Pendências e limites

1. Os oito banners/logos exibidos no chat não estavam acessíveis como arquivos. Os caminhos estão preparados e documentados, mas as imagens originais ainda precisam ser incorporadas e verificadas visualmente. Atualmente há fundo vetorial e nomes em texto como fallback.
2. O telefone provisório foi aplicado conforme o briefing. A CMD precisa confirmar que possui WhatsApp ativo. Foram verificados o formato e a mensagem dos links; não foi enviada nenhuma mensagem nem confirmada uma conta externa.
3. A navegação direta por `file://` foi bloqueada pela política do Chromium gerenciado do ambiente. Esse caminho não foi validado aqui; a página não usa servidor, módulos ou APIs para carregar seu conteúdo e recursos locais.
4. Não houve publicação, configuração de domínio, teste em Safari/iOS real nem validação em uma nova instância do ambiente.
