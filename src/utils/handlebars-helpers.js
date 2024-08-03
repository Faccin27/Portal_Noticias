// src/utils/handlebars-helpers.js
const Handlebars = require('handlebars');

// Helper para limitar a quantidade de itens exibidos
Handlebars.registerHelper('limit', function(array, limit) {
    return array.slice(0, limit);
});

// Helper para comparações condicionais
Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {
  switch (operator) {
    case '==':
      return (v1 == v2) ? options.fn(this) : options.inverse(this);
    case '===':
      return (v1 === v2) ? options.fn(this) : options.inverse(this);
    case '!=':
      return (v1 != v2) ? options.fn(this) : options.inverse(this);
    case '!==':
      return (v1 !== v2) ? options.fn(this) : options.inverse(this);
    case '<':
      return (v1 < v2) ? options.fn(this) : options.inverse(this);
    case '<=':
      return (v1 <= v2) ? options.fn(this) : options.inverse(this);
    case '>':
      return (v1 > v2) ? options.fn(this) : options.inverse(this);
    case '>=':
      return (v1 >= v2) ? options.fn(this) : options.inverse(this);
    default:
      return options.inverse(this);
  }
});

// Helper para verificar se o cargo é 'admin'
Handlebars.registerHelper('isAdmin', function(cargo, options) {
  if (cargo === 'admin') {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});


Handlebars.registerHelper('uniqueCategories', function (listaNoticias) {
  const categories = new Set();
  listaNoticias.forEach(noticia => categories.add(noticia.categoria));
  return Array.from(categories);
});

Handlebars.registerHelper('uniqueEmploymentTypes', function (listaEmpregos) {
  const types = new Set();
  listaEmpregos.forEach(emprego => types.add(emprego.tipoEmprego));
  return Array.from(types);
});

