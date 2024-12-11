import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteList } from './components/cliente-list/cliente-list';
import { PlatoListComponent } from './components/plato-list/plato-list.component';

const routes: Routes = [
  { path: 'clientes', component: ClienteList },
  { path: 'platos', component: PlatoListComponent }, // Ruta para lista de platos
  { path: '', redirectTo: '/clientes', pathMatch: 'full' }, // Redirección inicial
  { path: '**', redirectTo: '/clientes', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
