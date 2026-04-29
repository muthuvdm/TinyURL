import { Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';

export const routes: Routes = [
  { path: '', component: CreateComponent },
  { path: 'list', component: ListComponent }
];