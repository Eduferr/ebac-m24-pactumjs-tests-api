/// test.js
const { spec, request } = require('pactum');
const factory = require('../../helpers/data-factory')
const { regex, like } = require('pactum-matchers');

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

it('API - Cadastrar novo Produto', async () => {

    const produtoFake = factory.produto(); // gera dados fake do produto

    await spec()
        .post('/api/addProduct')
        .withHeaders("Authorization", token)
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