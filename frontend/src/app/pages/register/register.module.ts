import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CommonModule } from '@angular/common';
import { NzListModule } from 'ng-zorro-antd/list';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
// import { NzFormModule }

@NgModule({
  imports: [RegisterRoutingModule, FormsModule, NzInputModule, NzListModule, CommonModule, NzFormModule, ReactiveFormsModule, NzButtonModule],
  declarations: [RegisterComponent],
  exports: [RegisterComponent], 
//   providers: [MainService],
})
export class RegisterModule {}
