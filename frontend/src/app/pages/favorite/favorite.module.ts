import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CommonModule } from '@angular/common';
import { NzListModule } from 'ng-zorro-antd/list';
import { FavoriteRoutingModule } from './favorite-routing.module';
import { FavoriteComponent } from './favorite.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzModalModule } from 'ng-zorro-antd/modal';

@NgModule({
  imports: [
    FavoriteRoutingModule,
    FormsModule,
    NzInputModule,
    NzListModule,
    CommonModule,
    NzFormModule,
    ReactiveFormsModule,
    NzIconModule,
    NzButtonModule,
    NzCardModule,
    NzModalModule,
  ],
  declarations: [FavoriteComponent],
  exports: [FavoriteComponent],
  //   providers: [MainService],
})
export class FavoriteModule {}
