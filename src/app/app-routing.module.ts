import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserPageComponent } from './user/user-page/user-page.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { HomePageComponent } from './home/home-page/home-page.component';
import { AuthGuardGuard as AuthGuard } from './auth-guard.guard';

const routes: Routes = [
  { path: '', component: HomePageComponent},
  {
    path: 'user',
    loadChildren: () => import(`./user/user.module`).then((m) => m.UserModule),
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
