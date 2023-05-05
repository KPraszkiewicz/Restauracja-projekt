import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from 'src/assets/config';
import { Komentarz } from 'src/assets/dane';

@Injectable({
    providedIn: 'root'
})
export class KomentarzeService {

    url = config.serwer_url
    nazwa = "komentarze"

    constructor(private http: HttpClient) { }

    // REST API /////////////////////////////////////////
    // GET
    pobierz_komentarze(idd: string) {
        return this.http.get<Komentarz[]>(this.url + "danie/"+ idd+ "/komentarze")
    }
    // POST 
    dodaj_komentarz(idd: string, kom: Komentarz)
    {
        return this.http.post<any>(this.url + "danie/" + idd + "/komentarze", kom)
    }
    
    // DELETE
    usun_komentarz(id: string) {
        return this.http.delete<any>(this.url + "komentarze" + "/" + id)
    }
    //////////////////////////////////////////////////////
}
