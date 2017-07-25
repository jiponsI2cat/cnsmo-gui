import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'app/core/auth.guard';
import { ApplicationLayoutComponent } from "app/layouts/application-layout/application-layout.component";
import { LandingPageComponent } from "app/layouts/application-layout/landing-page.component";


const layoutsRoutes: Routes = [
  {
    path: '',
    component: ApplicationLayoutComponent,
    children: [
      /*{
        path: '',
        component: UserComponent
      },

      {
        path: 'users',
        children: [...usersRoutes]
      },
      {
        path: 'notifications',
        component: NotificationsListComponent
      },
      {
        path: 'datasets',
        children: [...datasetsRoutes]
      },
      {
        path: 'workstations',
        children: [...workstationsRoutes]
      },
      {
        path: 'requests',
        children: [...requestsRoutes]
      },*/
    ], canActivate: [
      AuthGuard
    ]
  },
  {
    path: 'login', component: LandingPageComponent
  },
/*  {
    path: 'use-cases', component: InfoLayoutComponent, children: [
      { path: '', component: UseCasesComponent }
    ]
  }*/
];

@NgModule({
  imports: [
    RouterModule.forChild(layoutsRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class LayoutsRoutingModule { }
