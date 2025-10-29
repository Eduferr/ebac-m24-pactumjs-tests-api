const { spec } = require('pactum');
const factory = require('../../helpers/data-factory')
const { gerarToken } = require('../../helpers/hooks');

// Token gerado via hooks.js
let token;
beforeEach(async () => {
    token = await gerarToken();
});

it('API - Deletar uma categoria', async () => {

    const categoriaFake = factory.categoria();

    // Para o teste ficar individualizado, executa um novo cadastro para retornar o Id
    const categoriaId = await spec()
        .post('/api/addCategory')
        .withHeaders("Authorization", token)
        .withJson(categoriaFake)
        .returns('data._id');
    //console.log('Id cadastrado:', categoriaId);

    await spec()
        .delete(`/api/deleteCategory/${categoriaId}`)
        .withHeaders("Authorization", token)
        .expectStatus(200)
        .expectJson('success', true)
        .expectJson('message', 'category deleted')

});