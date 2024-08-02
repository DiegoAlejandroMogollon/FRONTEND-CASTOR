import { Routes } from '@angular/router';
import { EmpleadoComponent } from './pages/empleado/empleado.component'; 

export const routes: Routes = [
    { path: 'empleados', component: EmpleadoComponent },
    { path: '', redirectTo: '/empleados', pathMatch: 'full' }

];
