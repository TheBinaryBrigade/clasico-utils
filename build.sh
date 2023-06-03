set -e -o xtrace

# NPM=bun
NPM=npm

# Auto fix liniting issues
$NPM run lint:fix

# Run examples
$NPM run example:eval:usage &
$NPM run example:utils:hashcode &
$NPM run example:utils:capitalize &
$NPM run example:array:zip

wait

# Run unit tests
$NPM test || exit 1

rm -rf ./lib ./dist

# Build docs
$NPM run build:eval:doc &

# Build web distribution
$NPM run build:web &

# Build node distributions
$NPM run build:node10 &
$NPM run build:node12 &
$NPM run build:node14 &
$NPM run build:node16 &
$NPM run build:node18 &
$NPM run build:node20 &

# Build npm pacakge
$NPM run build:lib

wait

shadir() {
    find $1 -type f \( -exec sha512sum {} \; \)
}

( \
    echo "$(shadir dist)" \
    && echo "$(shadir lib)" \
    && echo "$(shadir docs)" \
    && echo "$(shadir examples)" \
    && echo "$(shadir src)" \
    && echo "$(shadir *.ts)" \
    && echo "$(shadir *.cjs)" \
) > './checksums.txt'

git add dist/*
git add lib/*
git add checksums.txt

npm pack
