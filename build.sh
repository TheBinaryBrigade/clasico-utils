set -e -o xtrace

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