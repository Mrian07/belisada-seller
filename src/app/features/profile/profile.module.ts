import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileInformationComponent } from './profile-information/profile-information.component';
import { RekeningComponent } from './rekening/rekening.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ProfileInformationComponent, RekeningComponent]
})
export class ProfileModule { }
