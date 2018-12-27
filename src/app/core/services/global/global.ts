import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Globals {
  isBackdropActive: Boolean = false;
  isLoading: Boolean = false;
}
