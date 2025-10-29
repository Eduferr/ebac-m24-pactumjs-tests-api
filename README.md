# 🧪 EBAC M24 - PactumJS Tests API

Projeto de automação de testes de API desenvolvido em **Node.js**, utilizando **PactumJS** como framework principal, **Mocha** como test runner e bibliotecas auxiliares como **Faker.js**, **Pactum Flow Plugin** e **Pactum Matchers**.  
O ambiente do **Pactum Flow** é executado via **Docker**, integrado a um banco **MongoDB**, para testes de contrato.
---

## 📁 Estrutura do Projeto

```bash
EBAC-M24-PACTUMJS-TESTS-API/
├── node_modules/
├── teste/
│   ├── api/
│   │   ├── categorias/
│   │   │   ├── adicionarCategoria.test.js
│   │   │   ├── deletarCategoria.test.js
│   │   │   └── editarCategoria.test.js
│   │   └── produtos/
│   │       ├── adicionarProduto.test.js
│   │       ├── deletarProduto.test.js
│   │       └── editarProduto.test.js
│   └── contract/
│       ├── contratoCategoria/
│       │   ├── apiAddCategoria.test.js
│       │   └── frontAddCategoria.test.js
│       └── contratoProduto/
│           ├── apiAddProduto.test.js
│           └── frontAddProduto.test.js
├── helpers/
│   ├── config.js
│   ├── data-factory.js
│   └── hooks.js
├── docker-compose.yml
├── package.json
├── package-lock.json
└── README.md
```

---

## ⚙️ Tecnologias Utilizadas

| Tecnologia             | Descrição                                                      |
| ---------------------- | -------------------------------------------------------------- |
| **Node.js**            | Ambiente de execução JavaScript                                |
| **Mocha**              | Framework para execução dos testes                             |
| **PactumJS**           | Framework principal para automação de testes de API            |
| **Pactum Matchers**    | Validadores dinâmicos de contratos e respostas                 |
| **Pactum Flow Plugin** | Registro e visualização de fluxos de testes                    |
| **Faker.js**           | Geração de dados fake e dinâmicos para os testes               |
| **Docker**             | Utilizado para subir o ambiente do Pactum Flow e banco MongoDB |
| **MongoDB**            | Banco de dados usado pelo Pactum Flow                          |

---

## 🧩 Estrutura de Pastas

- **helpers/**
  - `config.js` → Define URL base e credenciais de autenticação.
  - `data-factory.js` → Gera dados dinâmicos com Faker.js.
  - `hooks.js` → Configura URL base e função para gerar token JWT.

- **teste/api/**
  - Testes funcionais de **categorias** e **produtos**.

- **teste/contract/**
  - Testes de **contrato**, garantindo integridade de respostas da API.

---

## 🔐 Autenticação Global
  
- A autenticação é configurada no arquivo `helpers/hooks.js`, que gera automaticamente o token de acesso antes de cada teste.

```js
const { spec, request } = require('pactum');
const config = require('./config');

request.setBaseUrl(config.baseUrl);

async function gerarToken() {
  const token = await spec()
    .post('/public/authUser')
    .withJson({
      email: config.credencial.email,
      password: config.credencial.password
    })
    .returns('data.token');
  return token;
}

module.exports = { gerarToken };
```
---

## 🐳 Ambiente Docker - Pactum Flow + MongoDB

O **Docker Compose** é utilizado para subir o servidor do **Pactum Flow** e o **MongoDB** localmente.

### 🚀 Subindo o ambiente
```bash
docker-compose up -d
```

Acesse o **Pactum Flow Dashboard**
```bash
http://localhost:8080
```
---

## ✅ Boas Práticas Aplicadas

- Reutilização de código via **hooks globais**
- Separação clara entre **testes de API** e **testes de contrato**
- Geração de **dados dinâmicos** com Faker.js
- **Monitoramento visual** de fluxos com Pactum Flow
- **Ambiente controlado** com Docker + Mongo
- Estrutura modular e escalável

---

## 👨‍💻 Autor

**Autor:** Eduardo Ferreira  
*Analista de qualidade de software*  
🌐 [LinkedIn – Eduardo Ferreira](https://www.linkedin.com/in/edufgs/)   
**Licença:** Projeto desenvolvido como parte do módulo M24 da EBAC — *Automação de Testes de API com PactumJS*..

---
