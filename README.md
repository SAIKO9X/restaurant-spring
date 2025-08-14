# Food Ordering - Plataforma de Pedidos de Comida

![Java](https://img.shields.io/badge/Java-17-blue)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.3.2-brightgreen)
![React](https://img.shields.io/badge/React-18-blueviolet)
![Docker](https://img.shields.io/badge/Docker-Compose-blue)
![GitHub Actions](https://img.shields.io/github/actions/workflow/status/SEU_USUARIO/SEU_REPOSITORIO/ci-backend.yml?branch=main)

Uma plataforma full-stack completa para pedidos de comida, construída com Spring Boot no backend e React no frontend. O projeto simula um ecossistema real com três tipos de utilizadores (Clientes, Donos de Restaurante e Administradores), cada um com o seu próprio painel e funcionalidades.

O ambiente de desenvolvimento é totalmente containerizado com Docker, permitindo que qualquer pessoa execute o projeto completo com apenas alguns comandos.

## ✨ Funcionalidades Principais

### 👨‍🍳 Para Clientes (`ROLE_CUSTOMER`)

- [x] Registo e Login com autenticação via JWT.
- [x] Visualização de restaurantes aprovados e ativos.
- [x] Pesquisa de restaurantes por nome ou tipo de cozinha.
- [x] Adicionar/remover restaurantes aos favoritos.
- [x] Visualizar o menu detalhado de um restaurante com filtros.
- [x] Adicionar itens ao carrinho de compras.
- [x] "Finalizar" o pedido (simulação de pagamento com Stripe).
- [x] Ver o histórico de pedidos.
- [x] Deixar avaliações (nota e comentário) nos restaurantes.
- [x] Iniciar um chat com um restaurante para tirar dúvidas.

### 🍽️ Para Donos de Restaurante (`ROLE_RESTAURANT_OWNER`)

- [x] Registo de uma nova conta de restaurante.
- [x] Formulário de criação de restaurante que aguarda aprovação do Admin.
- [x] Painel de controlo dedicado para gerir o **seu** restaurante.
- [x] Gestão completa do menu (criar, editar, apagar pratos).
- [x] Gestão de categorias de comida e ingredientes.
- [x] Visualização e atualização do estado dos pedidos recebidos.
- [x] Visualização de todas as avaliações recebidas.
- [x] Acesso a um painel de chat para responder às mensagens dos clientes.

### 👑 Para Administradores (`ROLE_ADMIN`)

- [x] Utilizador Admin criado automaticamente no arranque da aplicação.
- [x] Painel de administração para supervisionar toda a plataforma.
- [x] Visualização de **todos** os restaurantes registados.
- [x] Funcionalidade para **aprovar** novos restaurantes, tornando-os públicos.
- [x] Funcionalidade para **suspender** (banir) ou **reativar** restaurantes.
- [x] Visualização de **todos** os utilizadores da plataforma.
- [x] Capacidade de alterar a `role` de qualquer utilizador.

## 🚀 Tecnologias Utilizadas

### Backend (Spring Boot)

- **Framework:** Spring Boot 3.3.2
- **Linguagem:** Java 17
- **Segurança:** Spring Security com autenticação baseada em JWT.
- **Base de Dados:** Spring Data JPA (Hibernate) com MySQL.
- **Validação:** Spring Boot Validation.
- **Outros:** Lombok, Maven.

### Frontend (React)

- **Framework:** React 18 com Vite.
- **Gestão de Estado:** Redux & Redux Thunk.
- **UI:** Material-UI (MUI) e TailwindCSS.
- **Formulários:** Formik e Yup para validação.
- **Roteamento:** React Router DOM.
- **Cliente HTTP:** Axios.

### DevOps

- **Containerização:** Docker e Docker Compose.
- **Integração Contínua (CI):** GitHub Actions para build e teste automáticos do backend.

## ⚙️ Como Rodar o Projeto Localmente

Para executar este projeto, você precisará de ter o **Docker** e o **Docker Compose** instalados na sua máquina.

#### 1. Clonar o Repositório

```bash
git clone [https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git](https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git)
cd SEU_REPOSITORIO
```

_Substitua `SEU_USUARIO/SEU_REPOSITORIO` pelo seu utilizador e nome do repositório._

#### 2. Configurar as Variáveis de Ambiente

O projeto utiliza um ficheiro `.env` para gerir as chaves de API e credenciais.

```bash
# Na raiz do projeto, copie o ficheiro de exemplo
cp .env.example .env
```

Abra o ficheiro `.env` recém-criado e preencha os valores em falta, como a sua chave do Stripe (`STRIPE_URL`). As outras credenciais já têm valores padrão para o ambiente de desenvolvimento.

#### 3. Subir os Contentores com Docker Compose

Este comando irá construir a imagem do backend e iniciar os contentores do backend e da base de dados.

```bash
docker-compose up --build -d
```

- `-d` executa os contentores em segundo plano.
- O backend estará disponível em `http://localhost:8080`.

#### 4. Rodar o Frontend

O frontend precisa de ser executado separadamente no seu ambiente de desenvolvimento.

```bash
# Navegue para a pasta do frontend
cd frontend

# Instale as dependências (execute apenas da primeira vez)
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

- O frontend estará disponível em `http://localhost:5173`.

#### 5. Aceder à Aplicação

- **Aplicação:** Abra o seu navegador e vá para `http://localhost:5173`.
- **Utilizador Admin Padrão:** O sistema cria automaticamente um administrador. Pode fazer login com:
  - **Email:** `admin@food.com`
  - **Senha:** `admin123`
