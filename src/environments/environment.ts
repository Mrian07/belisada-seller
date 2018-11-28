// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'https://api0.belisada.id/belisada',
  baseUrlSeller: 'https://seller0.belisada.id',
  baseUrlBuyer: 'https://dev.belisada.id',
  thumborUrl: 'http://img.belisada.id/',
  firebase: {
    apiKey: 'AIzaSyBIUJNYI-q2h2Bh1Drb7GvDuK7KDjx_e5o',
    authDomain: 'belisada-dev.firebaseapp.com',
    databaseURL: 'https://belisada-dev.firebaseio.com',
    projectId: 'belisada-dev',
    storageBucket: 'belisada-dev.appspot.com',
    messagingSenderId: '778701366310'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
