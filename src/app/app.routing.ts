import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthoringComponent } from './authoring/authoring.component';
import { PreviewComponent } from './preview/preview.component';

const appRoutes: Routes = [
    {
        path: 'authoring',
        component: AuthoringComponent
    },
    {
        path: 'preview',
        component: PreviewComponent
    },
    { path: '', redirectTo: '/preview', pathMatch: 'full' }
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
