const AST = require('idyll-ast');
const fs = require('fs');
const fetch = require('node-fetch');

try {
  fs.mkdirSync('notebooks');
} catch(e) {

}

const cleanName = (str) => {
  const find = 'observablehq.com/';
  const notebookName = str.substring(str.indexOf(find) + find.length + 1);
  return notebookName.replace(/@/g, '').replace(/\//g, '-');
}

const toCamel = (s) => {
  return s.replace(/(\w)(\w*)/g,
        function(g0,g1,g2){return g1.toUpperCase() + g2.toLowerCase();}).split('-').join('');
};

const buildComponent = (notebookName, componentName) => `
  const React = require('react');
  const IdyllObservable = require('idyll-observable-component');
  import notebook from "../notebooks/${notebookName}";

  class ${componentName} extends React.Component {
    render() {
      const { idyll, hasError, updateProps, ...props } = this.props;
      return (
        <div ref={(ref) => this._ref = ref} />
      );
    }
  }

  module.exports = ${componentName};
`

const cleanNotebook = (str) => {
  // TODO - Use Acorn to actually tokenize the actual JS and make this more robust.
  return str.replace(/require/g, '_require').replace(/'_require'/g, "'require'").replace(/"_require"/g, '"require"');
}

module.exports = (ast, done) => {
  const observableNodes = AST.getNodesByName(ast, 'Observable');
  const promises = [];

  observableNodes.forEach((node) => {
    let url = node.properties.notebook.value;
    const notebookName = cleanName(url);
    const componentName = toCamel(notebookName);
    node.name = componentName;

    if (url.indexOf('api.') === -1) {
      url = url.replace('observablehq.', 'api.observablehq.') + '.js';
    }
    promises.push(fetch(url).then((res) => {
      return res.text();
    }).then((text) => {
      fs.writeFileSync('notebooks/' + notebookName + '.js', cleanNotebook(text));
      fs.writeFileSync('components/' + notebookName + '.js', buildComponent(notebookName, componentName));
    }))
  })

  Promise.all(promises).then(() => {
    done(null, ast);
  });
};