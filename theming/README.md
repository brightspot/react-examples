# Example Application

This example application shows how to use JS Classes to use Brightspot theming via a Brightspot GraphQL Content Delivery API Endpoint (CDA).

## What you will learn
1. How to create a Brightspot CDA Endpoint that incorporates any theme uploaded to Brightspot
2. How to create and customize a theme to be used with Brightspot's headless CMS approach

## Running the example application

Refer to the [README](/README.md) at the root of the `react-examples` repository for details on running example applications in depth. Make sure you have the Docker instance for the example applications running, then follow the quick-start steps starting in the `theming` directory:

To upload JS Classes in Brightspot (http://localhost/cms):

```sh
cd brightspot
yarn
npx brightspot types download
npx brightspot types upload src
```

To run the front-end:

```sh
cd app
yarn
yarn start
```

The front-end application will open automatically in the browser.

## Using the example application

In Brightspot, first upload a theme. Navigate from the burger menu to **Admin** &rarr; **Themes** &rarr; **New Theme**. In the **MAIN** section for the New Theme, add a Name and click on the **CHOOSE** button next to the **New Upload** dropdown menu. Search for the zip file 'custom-theme.zip' (it is located in the `brightspot` directory). Select that zip file, then click the **SAVE** button. You should notice that two new tabs have appeared at the top of the Theme section: **COLOR PALETTE** and **USAGES**. If you click on **USAGES** you should see a message that the theme hasn't been used yet. Click on **COLOR PALETTE**. You will see four colors to add to your palette. Add the following colors:

Color 1: #ff0083 (pink)
Color 2: #ff4da8 (light pink)
Color 3: #000 (black)
Color 4: #888888 (steel gray)

Click the **SAVE** button at the bottom of the **COLOR PALETTE** section. Then, click on the **OVERRIDES** section. for the **Preset** dropdown menu, select **Custom**. Several fields will appear. For Primary Color, select Color 1 (pink). Select Color 2 (light pink) for Secondary Color, Color 3 (black) for Primary Text Color, and Color 4 (steel gray) for Secondary Text Color. 

> **_Note_** If any of the theme fields have content that is italicized and the text color is gray, those fields have not yet been set! Make sure to click on the field, actually select an option or color, and then click the **OK** button. You will know your value is saved because the text color will be black and not italicized.

Select your preferred font for Body, your preferred Navbar Text Alignment, and finally your preferred Button Style. Finally, click the **SAVE** button at the bottom of the **OVERRIDES** section.

Next, navigate from the burger menu to **Admin** &rarr; **Sites & Settings**, and select the **Global** site. Toggle Allow Global Editing? to be selected, and at the very bottom of the Global page select the Shared Theme and select the theme you created. Finally, click the **SAVE** button at the bottom of the page.

Now, navigate from the burger menu to **Admin** &rarr; **APIs**, and select **Theming Endpoint**. Select the theme you created for the Theme dropdown menu, then click the **SAVE** button. You are now ready to start creating content. 

You will need to reload the site for the styles changes to apply to content items. To reload the site, add `/?_reload=true`to the end of the Brightspot url. Your url should look similar to the following: 

```
http://localhost/cms/?_reload=true
```

After pressing the `Return` or `Enter` key, you will see  "reloading..." text appear in the browser. You also will probably have to hit the refresh button for your browser to reload the site after Brightspot has finished updating. 


The front-end application displays both **Cat** and **Dog** content created in Brightspot. Create at least one **Cat** or **Dog** item. When creating your content item, note the **⋯** at the top right of the content item page(to the left of the **URLS** wdiget section). Click the **⋯** and select Styles. Click the **v** to open the Presets section. Select Custom for the Preset, and the bullet style of your choice. Finally, publish your content.

Navigate to the front-end app to see the content displayed. Feel free to publish more **Cat** and **Dog** content to add to the front-end app. Notice the colors, Navbar alignment, bullet style for the cards, and the button style. These configurations all come from the theme you provided. 

## How everything works
Brightspot is designed to support various themes. In a traditional (non-headless) application, this theme would include templates to display content in a front-end app. In a headless setting, the theme can be used to provide styling, and even image size information. 

#### Points to note in the JS Class files:
1. `_config.json`: a file provides the key information for your theme. Note the following fields:
  - "styles": nested under styles is a template name that corresponds to the name specified in the `@ViewTemplate` annotation in each ViewModel file. The fields are set by content item as specified by the View Template name. 

> **_Note_** the template name must have a preceeding forward slash. Ex: `@ViewTemplate({ value: "/cat" })`. That name should appear the same in the "styles" section for the config file. Ex: 

```json
 "styles": {
    "/cat": {
      "fields": {
```

  - "themeFields": these fields are applied to the theme as a whole, irrespective of the Content item.
  - "colorPalette": these fields can be used to create a color palette. The nice part is once the color palette is created, those colors show as available options when you click on a color picker field. This is a nice to have but not a necessity. 
  - "imageSizes": these fields are used to specify image sizes. You can also create an ImageSizeProvider file that will also provide image size configurations. Refer to the example on Images for more information on customizing images.

2. `ThemingEndpoint.ts`: implementing the `ContentDeliveryApiThemeable` interface enables a theme to be selected and applied to the endpoint. You must also make sure the theme is applied to the site you are using (in this example Global).
s
#### Points to note in the front-end application:
The front-end application sets many of the styling values from the Graphql query using CSS variables, but also makes use of data attributes. There are multiple possibilities for applying styling (css in js, etc.). 

## Try it yourself
The following are suggestions for learning more about theming with JS Classes and Brightspot:

1. Add a new themeField and try to use that in your front-end app. For example, you can create a boolean field for a static navbar. When selected, the navbar will remain at the top of the browser instead of scrolling out of view. 
Add the following to your _config.json file in the themeFields section (since this is global stying):

```json
    "staticNavbar": {
      "displayName": "Enable Static Navbar",
      "type": "boolean",
      "cms.ui.note": "when checked the navbar will remain at the top of the page"
    }
```

Remember, if you make any changes to the theme `_config.json` file, you will need to create a new zip file. Run `yarn run config` in the `brightspot` directory to update the custom-theme.zip file (the changes will be added to the custom-theme.zip file located in the `brightspot` directory). Then navigate to from the burger menu to **Admin** &rarr; **Themes** and select your theme. Upload the new file. In the **OVERRIDES** tab make sure the newly added Enable Static Navbar toggle is checked to true. Make sure to save your endpoint as well in Brightspot or the newly added GraphQL field will not appear. You will also need to add this field to your GraphQL query in the front-end app. In `app/src/queries/GetDogsAndCats.tsx`, add `staticNavbar` to your query so your query's theme section looks like the following: 

```graphql
 _theme {
      NavBarAlignment
      bodyFont
      primaryColor
      primaryTextColor
      secondaryColor
      secondaryTextColor 
      buttonStyle
      staticNavbar
    }
```

Head to `app/src/App.tsx`. You will see two comments "UNCOMMENT TO USE". Uncomment both lines. The appropriate css styling will now be applied. 

Feel free to explore adding other styling fields! 

2. Read the [Brightspot documentation](https://www.brightspot.com/documentation/brightspot-cms-developer-guide/latest/data-modeling-for-themes) on theming to learn more about theming. 

## Troubleshooting
Having issues running the example application? Refer to the [Common Issues](/README.md) section in the respository README for assistance.