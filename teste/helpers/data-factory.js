const { faker } = require('@faker-js/faker');

module.exports = {
  
  categoria() {
    return {
      name: faker.commerce.department(), // Gera um nome de categoria realista
      photo: faker.image.urlPicsumPhotos() // Gera um link de imagem válido
    };
  },

  produto() {
    return {
      name: faker.commerce.productName(),         // nome aleatório de produto
      price: faker.number.float({ min: 10, max: 200, precision: 0.01 }),
      quantity: faker.number.int({ min: 1, max: 50 }),
      categories: "67ec3e678bb5e25d3b2741f4",     // ID fixo (pode ser dinâmico futuramente)
      description: faker.commerce.productDescription(), // descrição realista
      photos: faker.image.urlPicsumPhotos(),      // link aleatório de imagem
      popular: true,
      visible: true,
      location: faker.location.city(),            // cidade aleatória
      additionalDetails: [],
      specialPrice: faker.number.float({ min: 5, max: 150, precision: 0.01 })
    };
  }

};

