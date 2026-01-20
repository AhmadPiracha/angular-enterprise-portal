export const environment = {
  production: true,
  apiUrl: 'https://api.company.com',
  apimUrl: 'https://apim.azure-api.net',
  frontDoorUrl: 'https://portal.company.com',
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
    enableChatbot: true
  }
};
