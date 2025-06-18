import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CommonModule } from '@angular/common';
import { NzListModule } from 'ng-zorro-antd/list';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';

@NgModule({
  imports: [
    AuthRoutingModule,
    FormsModule,
    NzInputModule,
    NzListModule,
    CommonModule,
    NzFormModule,
    ReactiveFormsModule,
    NzIconModule,
    NzButtonModule,
  ],
  declarations: [AuthComponent],
  exports: [AuthComponent],
  //   providers: [MainService],
})
export class AuthModule {}
