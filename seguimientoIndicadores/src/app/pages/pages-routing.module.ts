import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { PerfilComponent } from './perfil/perfil.component';

import { AdminUsuariosComponent } from './administrador/admin-usuarios/admin-usuarios.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { AdminGuard } from '../guards/admin.guard';
import { IndicadoresGestionComponent } from './indicadoresGenerales/indicadores-gestion/indicadores-gestion.component';

import { IdIndicadoresComponent } from './indicadoresGenerales/id-indicadores/id-indicadores.component';
import { VerindicadoresComponent } from './indicadoresGenerales/verindicadores/verindicadores.component';
import { IndicadoresUpdiComponent } from './indicadoresGenerales/indicadores-updi/indicadores-updi.component';
import { IdindicadoresUpdiComponent } from './indicadoresGenerales/idindicadores-updi/idindicadores-updi.component';
/* Avances Indicador */
import { InsertAvanceIndicadorComponent } from './indicadoresGenerales/insert-avance-indicador/insert-avance-indicador.component';

import { IdreformasRequirenteComponent } from './reformasGenerales/idreformas-requirente/idreformas-requirente.component';
import { ReformasPresupuestariasComponent } from './reformasGenerales/reformas-presupuestarias/reformas-presupuestarias.component';
import { ReformasRequirenteComponent } from './reformasGenerales/reformas-requirente/reformas-requirente.component';
import { VerReformasPGComponent } from './reformasGenerales/ver-reformas-pg/ver-reformas-pg.component';






const routes: Routes = [
  { 
    path: 'dashboard', canActivate:[AdminGuard],
    component: PagesComponent,
    children: [
        { path: '', component: DashboardComponent, data:{ titulo: 'Dashboard'},canActivate:[AdminGuard] },
        { path: 'perfil', component: PerfilComponent,  data:{ titulo: 'Perfil'} ,canActivate:[AdminGuard]},
        { path: 'account-settings', component: AccountSettingsComponent,  data:{ titulo: 'Temas'},canActivate:[AdminGuard], },
   
        { path: 'adminUsers', component: AdminUsuariosComponent,  data:{ titulo: 'Usuarios Registrados'},canActivate:[AdminGuard], },
        { path: 'indicadoresGestion', component: IndicadoresGestionComponent,  data:{ titulo: 'Indicadores de Gestión'},canActivate:[AdminGuard], },
        { path: 'historial', component: VerindicadoresComponent,  data:{ titulo: 'Indicadores de Gestión'},canActivate:[AdminGuard], },
        { path: 'indicadores', component: IdIndicadoresComponent,  data:{ titulo: 'Indicadores de Gestión'},canActivate:[AdminGuard], },
        { path: 'indicadores/:id', component: IdIndicadoresComponent,  data:{ titulo: 'Indicadores de Gestión'},canActivate:[AdminGuard], },
        
        /* Avance de Indicador */
        { path: 'avancesIndicador/:id', component: InsertAvanceIndicadorComponent,  data:{ titulo: 'Avances de Indicador'},canActivate:[AdminGuard], },

        {path:'indicadoresUpdi', component: IndicadoresUpdiComponent, data:{ titulo: 'Indicadores de Gestión'},canActivate:[AdminGuard],},
        {path:'indicadoresUpdiId', component: IdindicadoresUpdiComponent, data:{ titulo: 'Indicadores de Gestión'},canActivate:[AdminGuard],},
        {path:'indicadoresUpdiId/:id', component: IdindicadoresUpdiComponent, data:{ titulo: 'Indicadores de Gestión'},canActivate:[AdminGuard],},
        {path:'reformas', component: ReformasPresupuestariasComponent, data:{ titulo: 'Reforma Presupuestaria'},canActivate:[AdminGuard],},
        {path:'reformasRequirente', component: ReformasRequirenteComponent, data:{ titulo: 'Reformas'},canActivate:[AdminGuard],},
        {path:'reformasRequirentes', component: IdreformasRequirenteComponent, data:{ titulo: 'Reforma Presupuestaria'},canActivate:[AdminGuard]},
        {path:'reformasRequirentes/:id', component: IdreformasRequirenteComponent, data:{ titulo: 'Reforma Presupuestaria'},canActivate:[AdminGuard]},

        {path:'reformasGenerales', component:VerReformasPGComponent, data:{ titulo: 'Reforma Presupuestaria'},canActivate:[AdminGuard]}
      ]
},
//
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild( routes,)
  ],

  exports:[ RouterModule]
})
export class PagesRoutingModule { }
