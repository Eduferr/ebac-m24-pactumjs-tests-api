const { reporter, flow, mock, handler, spec } = require('pactum');
const pf = require('pactum-flow-plugin');
const { regex, like } = require('pactum-matchers');
const factory = require('../../helpers/data-factory');

const randomPatch = Math.floor(Math.random() * 100)

function addFlowReporter() {
    pf.config.url = 'http://localhost:8080'; // pactum flow server url
    pf.config.projectId = 'ebacM24-API-AddProduto';
    pf.config.projectName = 'EBAC M24 API Adicionar Produto';
    pf.config.version = `1.0.${randomPatch}`; // versão dinâmica
    pf.config.username = 'scanner';
    pf.config.password = 'scanner';
    reporter.add(pf.reporter);
}

// global before
before(async () => {
    addFlowReporter();
    await mock.start(4000);
});

// global after
after(async () => {
    await mock.stop();
    await reporter.end();
});

// variável para armazenar o token
let token;

// antes de cada teste, faz o login e guarda o token
beforeEach(async () => {
    token = await spec()
        .post('http://lojaebac.ebaconline.art.br/public/authUser')
        .withJson({
            email: 'admin@admin.com',
            password: 'admin123',
        })
        .returns('data.token');
});

it('API - Teste de Contrato - Adicionar produto', async () => {

    const produtoFake = factory.produto(); // gera dados dinâmicos

    await flow('Cadastrar Produto')
        .post('http://lojaebac.ebaconline.art.br/api/addProduct')
        .withHeaders('Authorization', token)
        .withJson(produtoFake)
        .expectStatus(200)
        .expectJson('success', true)
        .expectJson('message', 'product added')
        .expectJsonMatch({
            data: {
                _id: regex(/^[a-f0-9]{24}$/),
                name: like("NomeProduto"),
                price: like(100)
            }
        })
});