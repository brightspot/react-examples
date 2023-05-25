# Example Application

Brightspot provides the ability to create content that can be displayed in various front-end applications. Content creators can add, edit and delete content in the CMS. However, what if content creators desire the fexibility to modify front-end functionality, image sizing, or other front-end styling?

Brightspot provides the ability to configure and modify styling and presentation functionality editorially.

This example demonstrates implementing Brightspot [theming](https://www.brightspot.com/documentation/brightspot-cms-developer-guide/latest/data-modeling-for-themes) via a Brightspot GraphQL [Content Delivery API (CDA)](https://www.brightspot.com/documentation/brightspot-cms-developer-guide/cda-guides) Endpoint to enable editorial styling and other front-end functionality changes.

## What you will learn
1. [Create a CDA Endpoint that incorporates a theme](#1-create-a-cda-endpoint-that-incorporates-a-theme).
2. [Create and customize a theme to enable front-end styling and functionality configuration via GraphQL](#2-create-and-customize-a-theme-to-enable-front-end-styling-and-functionality-configuration-via-graphql).

## Running the example application

> **_Note_** Just starting? Refer to the [README](/README.md) at the root of the `react-examples` repository for details on running example applications in depth.

Run the following commands from the `theming/app` directory:

### Install dependencies

```sh
$ yarn
```

```
[1/4] 🔍 Resolving packages...
[2/4] 🚚 Fetching packages...
[3/4] 🔗 Linking dependencies...
[4/4] 🔨 Building fresh packages...
✨ Done in 6.03s.
```

### Start the React app

```sh
$ yarn start
```

```
Compiled successfully!
```

The React app opens automatically in the browser.

## Using the example application

1. Upload a theme to Brightspot:
  From **&#x2630;** navigate to **Admin** &rarr; **Themes** &rarr; **New Theme**. In the **MAIN** section for the New Theme, add a Name and click on the **CHOOSE** button next to the **New Upload** dropdown menu. Search for the zip file `custom-theme.zip` (located in the `theming/brightspot` directory). Select the zip file, then click the **SAVE** button. 
<br>
2. Update the Color Palette:
  Two new tabs are now available at the top of the Theme section: **COLOR PALETTE** and **USAGES**. The **USAGES** tab displays the sites using the respective theme. Click on **COLOR PALETTE** and ddd the following colors:
    ```text
      Color 1: #ff0083 (pink)
      Color 2: #ff4da8 (light pink)
      Color 3: #000 (black)
      Color 4: #888888 (steel gray)
    ```
    Click the **SAVE** button at the bottom of the **COLOR PALETTE** section. 
<br>
3. Update Overrides:
  Click on the **OVERRIDES** section. Select **Custom** from the **Preset** dropdown menu. Several fields appear. For Primary Color, select Color 1 (pink). Select Color 2 (light pink) for Secondary Color, Color 3 (black) for Primary Text Color, and Color 4 (steel gray) for Secondary Text Color. Select your preferred font for Body, your preferred Navbar Text Alignment, and finally your preferred Button Style. Finally, click the **SAVE** button at the bottom of the **OVERRIDES** section.

  > **_Note_** If any of the theme fields have content that is italicized and the text color is gray, those fields have not yet been set. Make sure to click on the field, actually select an option or color, and then click the **OK** button. You know your value is saved because the text color will be black and not italicized.

4. Enable Global Editing and apply Theme
  Navigate from **&#x2630;** to **Admin** &rarr; **Sites & Settings**, and select the **Global** site. Toggle **Allow Global Editing?** to be selected, and at the very bottom of the Global page select **Shared Theme** and then the theme you created. Click **SAVE**. Navigate from **&#x2630;** to **Admin** &rarr; **APIs**, and select **Theming Endpoint**. Select the theme you created, then click **SAVE**.

  > **_Note_** You need to reload the site for the styles changes to apply to content items. To do so, stop and start your Docker instance. 

5. Create content and configure styling
  The front-end application displays both **Cat** and **Dog** content created in Brightspot. Create at least one **Cat** or **Dog** item. When creating your content item, note the **⋯** at the top right of the content item page(to the left of the **URLS** widget section). Click **⋯** and select **Styles**. Click the **v** to open the Presets section. Select **Custom** for the Preset, and the bullet style of your choice. Finally, publish your content.
  Navigate to the front-end app to see the content displayed. Feel free to publish more **Cat** and **Dog** content to add to the front-end app. Notice the colors, navbar alignment, bullet style for the cards, and the button style. These configurations all come from the theme. 

## How everything works

### 1. Create a CDA Endpoint that incorporates a theme
Brightspot is designed to support various themes. A theme may contain templates (for example, a coupled CMS), and/or styling, and even image size information. Brightspot provides access to these theme fields via it's GraphQL API. 

- [`ThemingEndpoint.ts`](/theming/brightspot/src/brightspot/example/theming/ThemingEndpoint.ts): Implement the `ContentDeliveryApiThemeable` interface to enable a theme to be selected and applied to the respective endpoint. Make sure the theme is applied to the site in use (in this example Global).

### 2. Create and customize a theme to enable front-end styling and functionality configuration via GraphQL

- [`_config.json`](/theming/brightspot/_config.json): This file provides key information for a theme. Note the following fields:
  - `"styles"`: nested under styles is a template name that corresponds to the name specified in the `@ViewTemplate` annotation in each ViewModel file. The fields are set by the content item specified by the View Template name. 

> **_Note_** The template name must have a preceeding forward slash. Ex: `@ViewTemplate({ value: "/cat" })`. That name should appear the same in the "styles" section for the config file. Ex: 

```json
 "styles": {
    "/cat": {
      "fields": {
```

  - `"themeFields"`: These fields are applied to the theme as a whole, irrespective of the Content item.
  - `"colorPalette"`: These fields are used to create a color palette. Once the color palette is created, those colors show as available options when you click on a color picker field. The color palette is optional.
  - `"imageSizes"`: These fields are used to specify image sizes. You can also create an `ImageSizeProvider` file that will also provide image size configurations. Refer to the [Images example](https://github.com/brightspot/react-examples/tree/feature/images) for more information on customizing images.

When a theme is applied to an endpoint, and also to the site, the `_Theme` field will be available in GraphQL, and `_style` fields to respective content items:

```graphql
  query GetDogsAndCats {
    Dogs {
      dogs {
        _style {
          bulletStyle # theme field for content type
        }
      }
    }
    _Theme {   # theme fields for site
      NavBarAlignment
      bodyFont
      buttonStyle
      primaryColor
      primaryTextColor
      secondaryColor
      secondaryTextColor
    }
  }
```
## Try it yourself
The following are suggestions for learning more about with Brightspot:

1. Add a new themeField and try to use that in your front-end app. For example, you can create a boolean field for a static navbar. When selected, the navbar will remain at the top of the browser instead of scrolling out of view. 

Add the following to your _config.json file in the themeFields section (since this is global stying):

```json
    "staticNavbar": {
      "displayName": "Enable Static Navbar",
      "type": "boolean",
      "cms.ui.note": "when checked the navbar will remain at the top of the page"
    }
```

Remember, if you make any changes to the theme `_config.json` file, you need to create a new zip file. Run `yarn run config` in the `brightspot` directory to update the custom-theme.zip file (the changes will be added to the custom-theme.zip file located in the `brightspot` directory). Then navigate to from the burger menu to **Admin** &rarr; **Themes** and select your theme. Upload the new file. In the **OVERRIDES** tab make sure the newly added Enable Static Navbar toggle is checked to true. Make sure to save your endpoint as well in Brightspot or the newly added GraphQL field will not appear. You also need to add this field to your GraphQL query in the front-end app. In `app/src/queries/GetDogsAndCats.tsx`, add `staticNavbar` to your query so your query's theme section looks like the following: 

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

Head to `app/src/App.tsx`. You see two comments "UNCOMMENT TO USE". Uncomment both lines. The appropriate css styling are applied. 

Feel free to explore adding other styling fields! 

2. Read the [Brightspot documentation](https://www.brightspot.com/documentation/brightspot-cms-developer-guide/latest/data-modeling-for-themes) on theming to learn more about theming. 

## Troubleshooting
Having issues running the example application? Refer to the [Common Issues](/README.md) section in the respository README for assistance.