# Initialize a project from scratch:

```
npm init -y
yarn add --dev typescript
yarn add --dev @brightspot/cli
npx tsc --init
```

To compile an existing project:

```
yarn
npx brightspot config server http://localhost/cms
npx brightspot login
npx brightspot types download

# create some files in src/brightspot/example/apollo_app directory

npx brightspot types upload src
```
