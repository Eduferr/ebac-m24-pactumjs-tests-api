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

it('API - Deletar um produto', async () => {

    const produtoFake = factory.produto();

    // Para o teste ficar individualizado, executa um novo cadastro para retornar o Id
    const produtoId = await spec()
        .post('/api/addProduct')
        .withHeaders("Authorization", token)
        .withJson(produtoFake)
        .returns('data._id');
    //console.log('Id cadastrado:', produtoId);

    await spec()
        .delete(`/api/deleteProduct/${produtoId}`)
        .withHeaders("Authorization", token)
        .expectStatus(200)
        .expectJson('success', true)
        .expectJson('message', 'product deleted');

});