
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

# Run unit tests
$NPM test || exit 1

rm -rf ./lib ./dist

# Build docs
$NPM run build:eval:doc &

# Build web distribution
$NPM run build:web

# Build node distributions
$NPM run build:node10 &
$NPM run build:node12 &
$NPM run build:node14 &
$NPM run build:node16 &
$NPM run build:node18 &
$NPM run build:node20 &

# Build npm package
$NPM run build:lib

wait

sha_dir() {
    find $1 -type f \( -exec sha512sum {} \; \)
}

( \
    echo "$(sha_dir dist)" \
    && echo "$(sha_dir lib)" \
    && echo "$(sha_dir docs)" \
    && echo "$(sha_dir examples)" \
    && echo "$(sha_dir src)" \
    && echo "$(sha_dir *.ts)" \
    && echo "$(sha_dir *.cjs)" \
) > './checksums.txt'

git add dist/*
git add lib/*
git add checksums.txt

npm pack

echo ""
echo "Registry: https://www.npmjs.com/package/clasico"
echo "SC: https://github.com/TheBinaryBrigade/clasico-utils#readme"
