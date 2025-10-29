const { reporter, flow, handler, mock } = require('pactum');
const pf = require('pactum-flow-plugin');
const { like, regex } = require('pactum-matchers');

const randomPatch = Math.floor(Math.random() * 100)

function addFlowReporter() {
    pf.config.url = 'http://localhost:8080';
    pf.config.projectId = 'ebacM24-front';
    pf.config.projectName = 'EBAC M24 Front';
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
        provider: 'ebacM24-api',
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

handler.addInteractionHandler('Add Category Response', () => {
    return {
        provider: 'ebacM24-api',
        flow: 'Add Category',
        request: {
            method: 'POST',
            path: '/api/addCategory',
            headers: {
                "Authorization": like("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...")
            },
            body: {
                "name": like("Categoria Teste"),
                "photo": like("https://imagemfake.com/foto.png")
            }
        },
        response: {
            status: 200,
            body: {
                "success": true,
                "message": "category added",
                "data": {
                    "name": like("Categoria Teste"),
                    "photo": like("https://imagemfake.com/foto.png")
                }
            }
        }
    };
});

it('FRONT - Teste de Contrato - Adicionar categoria', async () => {
    await flow("Add Category")
        .useInteraction('Add Category Response')
        .post('http://localhost:4000/api/addCategory')
        .withHeaders("Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...")
        .withJson({
            "name": "Categoria Teste",
            "photo": "https://imagemfake.com/foto.png"
        })
        .expectStatus(200)
        .expectJson('success', true)
        .expectJson('message', 'category added');
});
