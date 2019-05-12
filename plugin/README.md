

# Idyll Observable plugin

Enables usage of notebooks created using ObservableHQ in Idyll documents. Idyll
variables can be bound to properties of the Observable cells and will
work reactively as expected.

_Note currently this reactivity only goes one way, from Idyll --> Observable. Changes made via Observable widgets do not currently get passed back to Idyll._

## Installation

```
$ npm install --save-dev idyll-plugin-observable
```

Add it to your idyll configuration in `package.json`:

```json
"idyll": {
  "compiler": {
    "postProcessors": ["idyll-plugin-observable"]
  }
}
```

Notebook cells can then be included in Idyll markup using markup like:

```
[Observable
  notebook:"https://observablehq.com/@mathisonian/d3-change-line-chart"
  showCells:`['chart']`
  variables:`{
    lineWidth: lineWidth,
    height: height
  }` /]
```

## Known Issues

The plugin pulls the notebook code and all dependencies down at compile time. Currently, the first time you do this
the compilation will fail with a "component not found error". If you see this message, re-compile and things should
work properly.

