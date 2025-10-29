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

it('API - Editar categoria', async () => {

    const categoriaFake = factory.categoria();

    // Para o teste ficar individualizado, executa um novo cadastro para retornar o Id
    const categoriaId = await spec()
        .post('/api/addCategory')
        .withHeaders("Authorization", token)
        .withJson(categoriaFake)
        .returns('data._id');
    //console.log('Id cadastrado:', categoriaId);

    await spec()
        .put(`/api/editCategory/${categoriaId}`)
        .withHeaders("Authorization", token)
        .withJson({
            "name": "NomeEditado",
            "photo": "fotoEditada.png.com.br"
        })
        .expectStatus(200)
        .expectJson('success', true)
        .expectJson('message', 'category updated')

});