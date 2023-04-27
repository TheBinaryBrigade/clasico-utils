set -e -o xtrace

# Auto fix liniting issues
npm run lint:fix

# Run examples
npm run example:eval:usage

# Run unit tests
npm test

# Build docs
npm run build:eval:doc

# Build web distribution
npm run build:web

# Build node distributions
npm run build:node10

# Build npm pacakge
npm run build:lib

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
