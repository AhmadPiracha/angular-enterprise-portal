// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'https://api-dev.company.com',
  apimUrl: 'https://apim-dev.azure-api.net',
  frontDoorUrl: 'https://dev.company.com',
  contentful: {
    spaceId: 'YOUR_CONTENTFUL_SPACE_ID',
    accessToken: 'YOUR_CONTENTFUL_ACCESS_TOKEN',
    environment: 'master'
  },
  appInsights: {
    instrumentationKey: 'YOUR_APP_INSIGHTS_KEY'
  },
  features: {
    enableAnalytics: true,
    enableChatbot: false
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
