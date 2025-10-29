const { reporter, flow, handler, mock } = require('pactum');
const pf = require('pactum-flow-plugin');
const { like, regex } = require('pactum-matchers');

const randomPatch = Math.floor(Math.random() * 100)

function addFlowReporter() {
    pf.config.url = 'http://localhost:8080';
    pf.config.projectId = 'ebacM24-front-AddProduto';
    pf.config.projectName = 'EBAC M24 Front Adicionar Produto';
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

handler.addInteractionHandler('Login Response', () => {
    return {
        provider: 'ebacM24-API-AddProduto',
        flow: 'Login',
        request: {
            method: 'POST',
            path: '/public/authUser',
            body: {
                "email": "admin@admin.com",
                "password": "admin123"
            }
        },
        response: {
            status: 200,
            body: {
                "success": true,
                "message": "login successfully",
                "data": {
                    "_id": "65766e71ab7a6bdbcec70d0d",
                    "role": "admin",
                    "profile": {
                        "firstName": "admin"
                    },
                    "email": "admin@admin.com",
                    "token": like("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...")
                }
            }
        }
    };
});

handler.addInteractionHandler('Add Product Response', () => {
    return {
        provider: 'ebacM24-API-AddProduto',
        flow: 'Add Product',
        request: {
            method: 'POST',
            path: '/api/addProduct',
            headers: {
                "Authorization": like("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...")
            },
            body: {
                "name": like("produto Teste"),
                "photo": like("https://imagemfake.com/foto.png")
            }
        },
        response: {
            status: 200,
            body: {
                "success": true,
                "message": "product added",
                "data": {
                    "name": like("Produto Teste"),
                    "photo": like("https://imagemfake.com/foto.png")
                }
            }
        }
    };
});

it('FRONT - Teste de Contrato - Adicionar Produto', async () => {
    await flow("Add Product")
        .useInteraction('Add Product Response')
        .post('http://localhost:4000/api/addProduct')
        .withHeaders("Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...")
        .withJson({
            "name": "Produto Teste",
            "photo": "https://imagemfake.com/foto.png"
        })
        .expectStatus(200)
        .expectJson('success', true)
        .expectJson('message', 'product added');
});
