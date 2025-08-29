# 🎭 Trajeto Cultural | Frontend

O **Trajeto Cultural** é um aplicativo web interativo voltado para promover a cultura e arte dentro da UFSM.  
A ideia é transformar o campus em um grande **mapa interativo**, onde a comunidade acadêmica e visitantes podem explorar e conhecer pontos artísticos, monumentos, murais, esculturas e obras espalhadas pela universidade.

---

## 🚀 Tecnologias Utilizadas

- [React.js](https://react.dev/) – biblioteca para construção da interface
- [Vite](https://vitejs.dev/) – bundler rápido para desenvolvimento
- [Tailwind CSS](https://tailwindcss.com/) – framework de estilização utilitária
- [shadcn/ui](https://ui.shadcn.com/) – componentes acessíveis e prontos para uso
- [Lucide Icons](https://lucide.dev/) – ícones leves e modernos
- [React Router](https://reactrouter.com/) – navegação entre páginas

---

## 📦 Requisitos

- [Node.js](https://nodejs.org/) **20.19+** ou **22.12+**
- [npm](https://www.npmjs.com/) (vem junto com o Node)

---

## ⚙️ Como Rodar o Projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/acervo-frontend.git
````

2. Acesse a pasta do projeto:

   ```bash
   cd acervo-frontend
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

4. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

5. Abra no navegador:

   ```
   http://localhost:5173
   ```

---

## 📱 Dica para testar em modo mobile

* Abra o site no navegador (Chrome/Edge/Firefox).
* Pressione `F12` para abrir o DevTools.
* Ative o **modo responsivo / mobile** (ícone de celular e tablet no canto superior da aba de inspeção).
* Escolha diferentes tamanhos de tela (iPhone, Galaxy, iPad, etc.).

---

## 📂 Estrutura Básica do Projeto

```
acervo-frontend/
│── public/              # arquivos estáticos
│── src/
│   ├── components/      # componentes reutilizáveis
│   ├── pages/           # páginas principais
│   ├── App.jsx          # estrutura de rotas
│   ├── main.jsx         # ponto de entrada React
│── index.html
│── package.json
│── tailwind.config.js
│── README.md
```

---

## ✨ Funcionalidades Planejadas

* Mapa interativo do campus com pontos culturais
* Listagem de eventos culturais
* Tela de detalhes do evento
* Favoritos e sugestões personalizadas
* Acessibilidade e design responsivo
