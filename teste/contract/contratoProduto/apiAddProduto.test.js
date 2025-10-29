const { reporter, flow, mock } = require('pactum');
const pf = require('pactum-flow-plugin');
const { regex, like } = require('pactum-matchers');
const factory = require('../../helpers/data-factory');
const { gerarToken } = require('../../helpers/hooks');

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

before(async () => {
    addFlowReporter();
    await mock.start(4000);
});

after(async () => {
    await mock.stop();
    await reporter.end();
});

// Token gerado via hooks.js
let token;
beforeEach(async () => {
    token = await gerarToken();
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