import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core'
import {
    DoctorsContainer,
    PatientsContainer,
    
    DashboardContainer,
    HomeContainer
} from './containers';

export const routes: ModuleWithProviders = RouterModule.forRoot([
  {
    path: '',
    component: DashboardContainer,
    children: [
        { path: 'doctors', component: DoctorsContainer },{ path: 'patients', component: PatientsContainer },
        { path: '', component: HomeContainer }
    ]
  },
  { path: '**', redirectTo: '' }
]);
