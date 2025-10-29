const { spec} = require('pactum');
const factory = require('../../helpers/data-factory')
const { gerarToken } = require('../../helpers/hooks');

// Token gerado via hooks.js
let token;
beforeEach(async () => {
    token = await gerarToken();
});

it('API - Editar produto', async () => {

    const produtoFake = factory.produto();

    // Para o teste ficar individualizado, executa um novo cadastro para retornar o Id
    const produtoId = await spec()
        .post('/api/addProduct')
        .withHeaders("Authorization", token)
        .withJson(produtoFake)
        .returns('data._id');

    await spec()
        .put(`/api/editProduct/${produtoId}`)
        .withHeaders("Authorization", token)
        .withJson({
            "name": "Texugo Black",
            "price": 100,
            "quantity": 50
        })
        .expectStatus(200)
        .expectJson('success', true)
        .expectJson('message', 'product updated')

});