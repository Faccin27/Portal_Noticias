// src/utils/handlebars-helpers.js
const Handlebars = require('handlebars');

// Helper para limitar a quantidade de itens exibidos
Handlebars.registerHelper('limit', function(array, limit) {
    return array.slice(0, limit);
});

// Outros helpers podem ser adicionados aqui
