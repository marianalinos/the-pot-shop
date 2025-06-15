# THE POTION SHOP

Este projeto é uma aplicação fullstack dividida em `backend` e `frontend`, utilizando Node.js, React, Prisma e Docker.

## 🚀 Pré-requisitos

- [Node.js](https://nodejs.org/) instalado
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/) instalados

---

## 🛠️ Passo a passo para rodar o projeto

### 1. Instale as dependências do projeto principal
```bash
npm install
```

### 2. Vá até a pasta `frontend` e instale as dependências
```bash
cd frontend
npm install
cd ..
```

### 3. Gere o cliente Prisma com o schema
```bash
npx prisma generate --schema backend/config/prisma/schema.prisma
```

### 4. Rode as migrações do banco de dados
```bash
npx prisma migrate dev --schema backend/config/prisma/schema.prisma
```

---

## 🐳 Subindo os containers com Docker

Execute o seguinte comando para subir o banco de dados com o Docker:

```bash
docker compose up -d
```

---

## 📦 Rodando o servidor e o frontend

Abra **dois terminais separados**:

### Terminal 1 – Iniciar o servidor (Node.js)
```bash
npm start dev
```

### Terminal 2 – Iniciar o frontend (React)
```bash
cd frontend
npm run dev
```

---

## ✅ Pronto!

A aplicação estará rodando localmente:
- Backend: `http://localhost:3000` 
- Frontend: `http://localhost:5173`

---
