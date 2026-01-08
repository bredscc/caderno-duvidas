# Caderno de Estudos

Aplicação web para registro de dúvidas durante sessões de estudo, permitindo manter o foco no conteúdo principal e esclarecer questões posteriormente.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18.x-61dafb.svg)
![Vite](https://img.shields.io/badge/Vite-5.x-646cff.svg)

## Visão Geral

Durante o estudo, interrupções para pesquisar dúvidas podem quebrar o fluxo de concentração e dispersar o foco do tema principal. Esta ferramenta permite anotar rapidamente questões que surgem, mantendo-as organizadas para consulta posterior.

## Funcionalidades

- Registro rápido de dúvidas e anotações
- Campo para identificação do assunto de estudo
- Numeração automática das entradas
- Registro de horário em cada anotação
- Cópia formatada de todas as anotações
- Download em formato de texto
- Interface visual inspirada em cadernos físicos
- Design responsivo para múltiplos dispositivos

## Tecnologias Utilizadas

- **React 18** - Biblioteca JavaScript para interfaces de usuário
- **Vite** - Ferramenta de build e desenvolvimento
- **Tailwind CSS v4** - Framework CSS
- **Lucide React** - Biblioteca de ícones
- **Google Fonts** - Tipografia customizada

## Instalação

```bash
# Clone o repositório
git clone https://github.com/bredscc/caderno.git
cd caderno

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse http://localhost:5173

## Uso

1. Informe o assunto de estudo no campo superior (opcional)
2. Registre dúvidas conforme surgem durante o estudo
3. Continue com o material principal
4. Ao final, utilize os botões de copiar ou download
5. Cole as anotações em assistentes de IA, documentos ou compartilhe com professores

## Build para Produção

```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`

## Deploy

Projeto configurado para GitHub Pages:

```bash
# Configure o caminho base no vite.config.js
base: '/caderno/'

# Execute o build
npm run build

# Copie os arquivos para o repositório de páginas
cp -r dist/* /caminho/para/repositorio/caderno/
```

Aplicação disponível em: https://brecketline.me/caderno/

## Estrutura do Projeto

```
caderno/
├── src/
│   ├── App.jsx          # Componente principal da aplicação
│   ├── main.jsx         # Ponto de entrada
│   └── index.css        # Estilos base do Tailwind
├── public/              # Arquivos estáticos
├── package.json         # Dependências e scripts
├── vite.config.js       # Configuração do Vite
├── tailwind.config.js   # Configuração do Tailwind
├── postcss.config.js    # Configuração do PostCSS
└── README.md
```

## Formato de Exportação

As anotações são exportadas em formato texto estruturado:

```
CADERNO DE ANOTAÇÕES

Assunto: [Tema de estudo]
Data: [Data atual]

Anotações:
1. (HH:MM) [Texto da anotação]
2. (HH:MM) [Texto da anotação]
```

## Contribuições

Contribuições são aceitas via pull requests. Para mudanças significativas, abra uma issue primeiro para discussão.

1. Fork o projeto
2. Crie uma branch para sua funcionalidade (`git checkout -b feature/Nova-Funcionalidade`)
3. Commit suas alterações (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/Nova-Funcionalidade`)
5. Abra um Pull Request

## Possíveis Melhorias Futuras

- Persistência de dados no navegador
- Categorização por tags ou etiquetas
- Modo de visualização escuro
- Exportação em formato Markdown
- Sistema de busca nas anotações
- Estatísticas de uso

## Licença

Este projeto está licenciado sob a licença MIT. Consulte o arquivo LICENSE para detalhes.

## Autor

Brenda Cabral Chaves

- Website: [brecketline.me](https://brecketline.me)
- GitHub: [@bredscc](https://github.com/bredscc)

## Referências

Metodologia baseada em técnicas de estudo focado e gerenciamento de atenção durante o aprendizado.

---

Desenvolvido com foco em produtividade acadêmica e eficiência no processo de aprendizado.
