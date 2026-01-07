# Caderno de Dúvidas com IA

Uma aplicação web inteligente que ajuda você a manter o foco nos estudos, permitindo anotar dúvidas durante o aprendizado e receber explicações detalhadas de uma IA ao final da sessão.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18.x-61dafb.svg)
![Vite](https://img.shields.io/badge/Vite-5.x-646cff.svg)

## Problema Resolvido

Você já passou pela situação de estar estudando algo e, ao encontrar uma dúvida, acabar se perdendo em pesquisas paralelas, perdendo o foco do assunto principal?

Este aplicativo resolve exatamente isso: permite que você anote rapidamente suas dúvidas sem interromper o fluxo de estudos, e depois receba explicações correlacionadas de todas elas de uma só vez.

## Funcionalidades

- **Anotação Rápida**: Interface simples para registrar dúvidas durante o estudo
- **Organização Temporal**: Cada dúvida é registrada com horário
- **Explicações com IA**: Utiliza Claude (Anthropic) para gerar explicações detalhadas
- **Correlação de Conceitos**: A IA identifica conexões entre suas dúvidas
- **Citação de Fontes**: Explicações baseadas em conceitos estabelecidos
- **Design Profissional**: Interface limpa e focada na produtividade
- **Responsivo**: Funciona em desktop, tablet e mobile

## Tecnologias Utilizadas

- **React 18** - Biblioteca JavaScript para interfaces
- **Vite** - Build tool moderna e rápida
- **Tailwind CSS** - Framework CSS utility-first
- **Lucide React** - Ícones modernos e elegantes
- **Anthropic API** - Inteligência artificial Claude Sonnet 4

## Pré-requisitos

- Node.js 16.x ou superior
- npm ou yarn
- Conta na Anthropic (opcional - a API já está configurada)

## Instalação

**1. Clone o repositório:**

```bash
git clone https://github.com/bredscc/caderno-duvidas.git
cd caderno-duvidas
```

**2. Instale as dependências:**

```bash
npm install
```

**3. Inicie o servidor de desenvolvimento:**

```bash
npm run dev
```

**4. Abra seu navegador em** `http://localhost:5173`

## Como Usar

1. **Defina o assunto** (opcional): Digite o tema que você está estudando no campo superior
2. **Anote suas dúvidas**: Durante o estudo, sempre que surgir uma dúvida, pause rapidamente e anote
3. **Continue estudando**: Suas dúvidas ficam salvas, você não precisa parar para pesquisar
4. **Receba explicações**: Ao final da sessão, clique em "Explicar Todas as Dúvidas"
5. **Aprenda**: A IA fornecerá explicações detalhadas, correlacionadas e com contexto

## Capturas de Tela

### Interface Principal

Interface limpa e profissional com duas colunas: anotações à esquerda e explicações à direita.

### Anotando Dúvidas

Sistema de numeração automática com timestamp para cada dúvida registrada.

### Explicações da IA

Respostas detalhadas, bem formatadas e fáceis de ler.

## Estrutura do Projeto

```
caderno-duvidas/
├── public/
├── src/
│   ├── App.jsx          # Componente principal
│   ├── main.jsx         # Entry point
│   └── index.css        # Estilos globais
├── package.json
├── vite.config.js
└── README.md
```

## Notas sobre API

O aplicativo utiliza a API da Anthropic (Claude). A chave de API está configurada para funcionar no contexto do Claude.ai. Para uso em produção, você deve:

1. Obter sua própria chave em [console.anthropic.com](https://console.anthropic.com)
2. Adicionar a chave em uma variável de ambiente
3. Nunca expor a chave no código frontend em produção

## Deploy

### Vercel (Recomendado)

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm run build
# Arraste a pasta 'dist' para netlify.com/drop
```

### GitHub Pages

```bash
npm install --save-dev gh-pages
```

Adicione ao `package.json`:

```json
"homepage": "https://bredscc.github.io/caderno-duvidas",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

Execute:

```bash
npm run deploy
```

## Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abrir um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## Autor

**Brenda**

- GitHub: [@bredscc](https://github.com/bredscc)

## Agradecimentos

- Anthropic pela API do Claude
- Comunidade React
- Todos que contribuírem para o projeto

---

_Se este projeto te ajudou, considere dar uma estrela no GitHub!_
