import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Globals {
  storeStatus: String = 'NA';
  isLoading: Boolean = false;
  showChat: Boolean = false;
  storeId: number;
  socket;
}
