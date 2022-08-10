# Brightspot Preview with React and Apollo Client

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Getting Started

Follow the [instructions](https://github.com/brightspot/react-examples/tree/feature/cma-next) for running the Brightspot instance.

CD into `preview-app/app` in your terminal and run the following commands:

```
yarn && yarn start
```

Navigate to `http://localhost:3000` in your browser. The screen should be blank since you have not published a Hello World item yet.

## Publish CMS Content

Publish a Hello World item in the CMS. For the title, use `Hello World` or change the path variable in `app/src/components/HelloWorldContainer.tsx` to the path you created (the permalink that is generated when you create a Hello World). Once you have hit the Publish Button in the CMS you will see a preview appear in the middle rail of the Hello World page in the CMS. Navigate back to your app in the browser and you should see your Hello World content.
