// import { Injectable } from '@angular/core';
// import { Store } from '@ngrx/store';
// import * as store from './core/store';

// @Injectable()
// export class AppSandbox {

//   constructor(
//     protected appState$: Store<store.State>,
//   ) {
//     // super(appState$);
//   }

//   /**
//    * Sets up default language for the application. Uses browser default language.
//    */
//   public setupLanguage(): void {
//     let localization: any        = this.configService.get('localization');
//     let languages: Array<string> = localization.languages.map(lang => lang.code);
//     let browserLang: string      = this.translate.getBrowserLang();

//     this.translate.addLangs(languages);
//     this.translate.setDefaultLang(localization.defaultLanguage);

//     let selectedLang    = browserLang.match(/en|hr/) ? browserLang : localization.defaultLanguage;
//     let selectedCulture = localization.languages.filter(lang => lang.code === selectedLang)[0].culture;

//     this.translate.use(selectedLang);
//     this.appState$.dispatch(new settingsActions.SetLanguageAction(selectedLang));
//     this.appState$.dispatch(new settingsActions.SetCultureAction(selectedCulture));
//   }

//   /**
//    * Returns global notification options
//    */
//   public getNotificationOptions(): any {
//   	return this.configService.get('notifications').options;
//   }
// }