/// test.js
const { spec, request } = require('pactum');
const { regex, like } = require('pactum-matchers');
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

it('API - Cadastrar nova Categoria', async () => {

    const categoriaFake = factory.categoria(); // gera dados dinâmicos

    await spec()
        .post('/api/addCategory') // endpoint para cadastrar categoria
        .withHeaders("Authorization", token)
        .withJson(categoriaFake)
        .expectStatus(200)
        .expectJson('success', true)
        .expectJson('message', 'category added')
        .expectJsonMatch({
            data: {
                _id: regex(/^[a-f0-9]{24}$/),
                name: like("Nome do produto"),
                photo: like("fotoproduto.png.com.br")
            }
        })

});