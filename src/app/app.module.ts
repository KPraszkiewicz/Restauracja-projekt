import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { NgbModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { KoszykComponent } from './koszyk/koszyk.component';
import { AppNavComponent } from './app-nav/app-nav.component';
import { DanieMiniComponent } from './danie-mini/danie-mini.component';
import { DanieComponent } from './danie/danie.component';
import { ListaDanComponent } from './lista-dan/lista-dan.component';
import { NgOptimizedImage } from '@angular/common';
import { FiltryComponent } from './filtry/filtry.component';
import { DanieKoszykComponent } from './danie-koszyk/danie-koszyk.component';
import { AppMainComponent } from './app-main/app-main.component';
import { DodajDanieComponent } from './dodaj-danie/dodaj-danie.component'
import { RouterModule, Routes } from '@angular/router';
import { AppRDanieComponent } from './app-r-danie/app-r-danie.component';
import { GwiazdkiComponent } from './gwiazdki/gwiazdki.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { KomentarzeFormComponent } from './komentarze-form/komentarze-form.component';
import { KomentarzComponent } from './komentarz/komentarz.component';
import { LoginComponent } from './login/login.component';
import { RejestracjaComponent } from './rejestracja/rejestracja.component';
import { AuthInterceptor } from './auth.interceptor';
import { LoginInfoComponent } from './login-info/login-info.component';
import { UzytkownikGuard } from './uzytkownik.guard';
import { AdminGuard } from './admin.guard';
import { GoogleMapsModule } from '@angular/google-maps'

const appRoutes: Routes = [
    { path: 'glowna', component: AppMainComponent },
    { path: 'danie', component: AppRDanieComponent },
    { path: 'danie/:id', component: AppRDanieComponent},
    { path: 'login', component: LoginComponent },
    { path: 'rejestracja', component: RejestracjaComponent },

    // admin
    { path: 'dodaj_danie', component: DodajDanieComponent, canActivate: [AdminGuard] },


    { path: '', component: HomeComponent },
    //{ path: 'testy',   component: CComponent,   data: { key: 'ABC' }   }, 
    //{ path: '',    redirectTo: '/glowna',     pathMatch: 'full'    }, 
    //{ path: '**', component: PageNotFoundComponent }
]

@NgModule({
    declarations: [
        AppComponent,
        AppHeaderComponent,
        KoszykComponent,
        AppNavComponent,
        DanieMiniComponent,
        DanieComponent,
        ListaDanComponent,
        FiltryComponent,
        DanieKoszykComponent,
        AppMainComponent,
        DodajDanieComponent,
        AppRDanieComponent,
        GwiazdkiComponent,
        HomeComponent,
        KomentarzeFormComponent,
        KomentarzComponent,
        LoginComponent,
        RejestracjaComponent,
        LoginInfoComponent,
        
    ],
    imports: [
        BrowserModule,
        NgbModule,
        GoogleMapsModule,
        NgOptimizedImage,
        NgbCollapseModule,
        RouterModule.forRoot(appRoutes),
        ReactiveFormsModule,
        HttpClientModule,
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        UzytkownikGuard,
        AdminGuard,
    ],
    bootstrap: [AppComponent],
    exports: [RouterModule]
})
export class AppModule { }

