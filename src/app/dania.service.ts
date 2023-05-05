import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { Danie, Komentarz } from 'src/assets/dane';
import { Filtry } from './filtry/filtry.component';
import { catchError } from 'rxjs/operators';
import { config } from "src/assets/config"

@Injectable({
    providedIn: 'root'
})

export class DaniaService {
    dania: Danie[] =[]
    url = config.serwer_url
    // Observable string sources
    private usun_daniaSource = new Subject<string>();
    private dodaj_filtr_src = new Subject<Filtry>();
    private pobrano_dania_src = new Subject<void>();

    //private filtruj_daniaSource = new Subject<>()

    // Observable string streams
    usun_daniaObs$ = this.usun_daniaSource.asObservable();
    dodaj_filtr_obs$ = this.dodaj_filtr_src.asObservable();
    pobrano_dania_obs$ = this.pobrano_dania_src.asObservable();

    constructor(private http: HttpClient) {
    }

    // REST API /////////////////////////////////////////
    // GET id
    pobierz_danie(id: string) {
        return this.http.get<Danie>(this.url + "danie/" + id)
            .pipe(
                catchError(this.handleError)
            );
    }

    // GET
    pobierz_dania(nr_strony: number = 0, ilosc: number = this.dania.length, filtry?: Filtry) {
        let params = new HttpParams()
            .set('od', nr_strony * ilosc)
            .set('do', ilosc)
        if (filtry) {
            if (filtry.cena_od)
                params = params.set('cena_od', filtry.cena_od)
            if (filtry.cena_do)
                params = params.set('cena_do', filtry.cena_do)
            if (filtry.typ)
                params = params.set('typ', filtry.typ)
            if (filtry.kat)
                params = params.set('kat', filtry.kat)
            if (filtry.gw)
                params = params.set('gw', filtry.gw.toString())
        }
        const options = {
            params: params
        };

        return this.http.get<Danie[]>(this.url + "danie", options)
            .pipe(
                catchError(this.handleError)
            );
    }

    pobierz_dania_test(nr_strony: number = 0, ilosc: number = this.dania.length, filtry?: Filtry) {
        let params = new HttpParams()
            .set('od', nr_strony * ilosc)
            .set('do', ilosc)
        if (filtry) {
            if (filtry.cena_od)
                params = params.set('cena_od', filtry.cena_od)
            if (filtry.cena_do)
                params = params.set('cena_do', filtry.cena_do)
            if (filtry.typ)
                params = params.set('typ', filtry.typ)
            if (filtry.kat)
                params = params.set('kat', filtry.kat)
            if (filtry.gw)
                params = params.set('gw', filtry.gw.toString())
        }
        const options = {
            params: params
        };

        this.http.get<Danie[]>(this.url + "danie", options)
        .subscribe(dane =>{
            this.dania = dane.map((danie:any) => new Danie(danie))
            this.pobrano_dania_src.next()
        })
    }
    // PUT
    zmien_danie(danie: Danie) {
        return this.http.put<any>(this.url + "danie/" + danie.id, danie)
            .pipe(
                catchError(this.handleError)
            );
    }

    // POST
    dodaj_danie(danie: Danie) {
        return this.http.post<any>(this.url + "danie", danie)
            .pipe(
                catchError(this.handleError)
            );
    }
    // DELETE
    usun_danie(id: string) {
        this.http.delete<any>(this.url + "danie/" + id).subscribe(dane => {
            if(dane.deletedCount == 1)
            {
                this.usun_daniaSource.next(id)
            }
        })
    }

    // PUT ocena
    ocen_danie(idd: string, idu:string,  ocena:Number)
    {
        return this.http.put<any>(this.url + "ocena/" + idd, {ocena, idd, idu })
    }

    get_info()
    {
        return this.http.get<any>(this.url)
    }

    private handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong.
            console.error(
                `Backend returned code ${error.status}, body was: `, error.error);
        }
        // Return an observable with a user-facing error message.
        return throwError(() => new Error('Something bad happened; please try again later.'));
    }

    //////////////////////////////////////////////////


    dodaj_filtr(f: Filtry) {
        this.dodaj_filtr_src.next(f)
    }



}
