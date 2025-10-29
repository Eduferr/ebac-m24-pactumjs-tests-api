/// test.js
const { spec, request } = require('pactum');
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

it('API - Editar produto', async () => {

    const produtoFake = factory.produto();

    // Para o teste ficar individualizado, executa um novo cadastro para retornar o Id
    const produtoId = await spec()
        .post('/api/addProduct')
        .withHeaders("Authorization", token)
        .withJson(produtoFake)
        .returns('data._id');
    //console.log('Id cadastrado:', produtoId);

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