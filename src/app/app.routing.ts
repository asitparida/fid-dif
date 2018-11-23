import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthoringComponent } from './authoring/authoring.component';
import { PreviewComponent } from './preview/preview.component';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'authoring',
        component: AuthoringComponent
    },
    {
        path: 'authoring/:id',
        component: AuthoringComponent
    },
    {
        path: 'preview/:id',
        component: PreviewComponent
    },
    { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes
        )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
