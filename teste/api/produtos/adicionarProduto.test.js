/// test.js
const { spec, request } = require('pactum');
const { eachLike, like } = require('pactum-matchers');
const factory = require('../../helpers/data-factory')

request.setBaseUrl('http://lojaebac.ebaconline.art.br')

let token
beforeEach(async () => {
    token = await spec()
        .post('/public/authUser')
        .withJson({
            "email": "admin@admin.com",
            "password": "admin123"
        })
        .returns('data.token')
});

it.only('API - Cadastrar novo Produto', async () => {

    const produtoFake = factory.produto(); // gera informações fake do

    await spec()
        .post('/api/addCategory') // endpoint para cadastrar (ajuste se for /api/addProduct)
        .withHeaders("Authorization", token)
        .withJson(produtoFake)
        .expectStatus(200)
        .expectJson('success', true);
});