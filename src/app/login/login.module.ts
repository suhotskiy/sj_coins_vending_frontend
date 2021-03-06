import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { MdButtonModule, MdIconModule, MdInputModule, OverlayModule } from "@angular/material";
import { LoginComponent } from "./login.component";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    MdInputModule,
    MdButtonModule,
    MdIconModule,
    OverlayModule
  ],
  declarations: [
    LoginComponent
  ]
})
export class LoginModule { }
