const { spec } = require('pactum');
const { regex, like } = require('pactum-matchers');
const factory = require('../../helpers/data-factory');
const { gerarToken } = require('../../helpers/hooks');

// Token gerado via hooks.js
let token;
beforeEach(async () => {
    token = await gerarToken();
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