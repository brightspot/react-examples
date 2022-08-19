# Applications with JS Classes

JS Classes make it possible to create and modify Brightspot CMS content with JavaScript (TypeScript).

## Initialize a project from scratch:

Run the following commands to create a new project that uses Brightspot JS Classes:

```
npm init -y
yarn add --dev typescript
yarn add --dev @brightspot/cli
npx tsc --init
```

## Compile an existing project:

Run the following commands in your `<example app name>/brightspot` directory (if there is already a `brightspot.json` file you can skip the `npx brightspot config server http://localhost/cms` command):

```
yarn
npx brightspot config server http://localhost/cms
npx brightspot login
npx brightspot types download

# create some files in src/brightspot/example/react_graphql_app directory

npx brightspot types upload src
```
