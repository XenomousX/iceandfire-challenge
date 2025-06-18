import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CommonModule } from '@angular/common';
import { NzListModule } from 'ng-zorro-antd/list';
import { DetailRoutingModule } from './detail-routing.module';
import { DetailComponent } from './detail.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';

@NgModule({
  imports: [DetailRoutingModule, FormsModule, NzInputModule, NzListModule, CommonModule, NzModalModule, NzIconModule, NzButtonModule],
  declarations: [DetailComponent],
  exports: [DetailComponent], 
//   providers: [MainService],
})
export class DetailModule {}
