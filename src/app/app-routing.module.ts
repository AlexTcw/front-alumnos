import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Router } from '@angular/router';
import { NewAlumnoComponent } from './components/new-alumno/new-alumno.component';
import { HomeComponent } from './components/home/home.component';
import { EditAlumnoComponent } from './components/edit-alumno/edit-alumno.component';

const routes: Routes = [{ path: '', component: HomeComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
