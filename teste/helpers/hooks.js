// helpers/hooks.js
const { spec, request } = require('pactum');
const config = require('./config'); // importa as configurações

// Define a base URL global para os testes
request.setBaseUrl(config.baseUrl);

// Função para gerar o token de autenticação
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
