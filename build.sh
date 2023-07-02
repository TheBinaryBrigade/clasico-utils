
# NPM=bun
NPM=npm

set -e -o xtrace

# Auto fix linting issues
$NPM run lint
$NPM run lint:fix

# Run examples
$NPM run example:eval:usage
$NPM run example:utils:hashcode
$NPM run example:utils:capitalize
$NPM run example:array:zip
$NPM run example:nlp:stopwords
$NPM run example:nlp:stemmer

# Run unit tests
$NPM test || exit 1

rm -rf ./lib ./dist

# Build docs
$NPM run build:eval:doc

# Build web distribution
$NPM run build:web

# Build node distributions
$NPM run build:node10 &
$NPM run build:node12 &
$NPM run build:node14 &
$NPM run build:node16 &
$NPM run build:node18

wait

$NPM run build:node20

# Build npm package
$NPM run build:lib

sha_dir() {
    find "$1" -type f \( -exec sha512sum {} \; \)
}

# shellcheck disable=SC2035
( \
    sha_dir dist \
    && sha_dir lib \
    && sha_dir docs \
    && sha_dir examples \
    && sha_dir src \
    && sha_dir *.ts \
    && sha_dir *.cjs \
) > './checksums.txt'

git add dist/*
git add lib/*
git add checksums.txt

npm pack

set +x

echo ""
echo "Registry: https://www.npmjs.com/package/clasico"
echo "SC: https://github.com/TheBinaryBrigade/clasico-utils#readme"
