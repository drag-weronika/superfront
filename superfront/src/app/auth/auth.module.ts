import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { RegisterpageComponent } from './registerpage/registerpage.component';


@NgModule({
  declarations: [LoginpageComponent, RegisterpageComponent],
  imports: [
    CommonModule,
    AuthRoutingModule
  ],
  exports: [LoginpageComponent, RegisterpageComponent],

})
export class AuthModule { }
