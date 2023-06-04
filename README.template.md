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

### With Static files

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

## APIs-

### Zip

#### Usage

{{ZIP_USAGE_EXAMPLE}}

### NLP

#### Remove StopWords

{{NLP_REMOVE_STOPWORDS_USAGE_EXAMPLE}}


### Inflection Port

#### Usage

{{INFLECTION_USAGE_EXAMPLE}}

### Template

#### Usage

Builtin Functions: [Documentation](https://github.com/TheBinaryBrigade/clasico-utils/blob/main/src/template/README.md#table-of-contens)

Try it out: [Playground](https://thebinarybrigade.github.io/clasico-utils/)

{{EVAL_USAGE_EXAMPLE}}

<!-- ### Diff Utils

#### Usage

{{DIFF_USAGE_EXAMPLE}}

### Fuzzy Utils

#### Usage
{{FUZZY_USAGE_EXAMPLE}}

### Bisect Array Class

#### Usage
{{BISECT_ARRAY_USAGE_EXAMPLE}}

### Misc Utils

#### Usage

{{MISC_USAGE_EXAMPLE}} -->
