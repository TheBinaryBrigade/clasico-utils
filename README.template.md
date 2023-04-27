# Common Utility Functions

## Install

### With NPM
```console
npm install --save clasico
```

### With YARN
```console
yarn add clasico
```

### Static files

Static files for the web and node are provided in the `dist` folder

#### Using the Web Static File

```html
<script src="./clasico-utils.js"></script>

<script>
const clasico = Clasico.default;
const parser = new clasico.parser.SentenceParser({
  includeBuiltIns: true,
});

// See Permissive Sentence Parser Usage for rest 

</script>
```

## APIs

### Permissive Sentence Parser

#### Usage

Builtin Functions: [Documentation](https://github.com/TheBinaryBrigade/clasico-utils/blob/main/src/eval/README.md#table-of-contens)

{{USAGE_EXAMPLE}}


### Array Types

#### Usage
TODO: Usage

### Date Utils

#### Usage
TODO: Usage

### Diff Utils

#### Usage
TODO: Usage

### Fuzzy Utils

#### Usage
TODO: Usage

### Inflection Port

#### Usage
TODO: Usage

### Misc Utils

#### Usage
TODO: Usage

## Goals

The goal of this package is to be dependency free (or at least close to that).
