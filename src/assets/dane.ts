export class Danie {
    public id: string = ""
    public nazwa: string = ""
    public opis: string = ""
    public cena: number = 0
    public obrazy: string[] = []
    public typ: string = ""
    public kategoria: string = ""
    public skladniki: string[] = []
    public dostepnosc: number = 10
    public popularnosc: number = 0

    public ocena: number = 0
    public ocena_calk: number = 0
    public ilosc_ocen: number = 0
    // zmienne robocze
    public _id: string = ""
    public ilosc: number = 0

    constructor(danie_serwer: any = null) {
        if(danie_serwer)
        {
            this.id = danie_serwer._id
            this.nazwa = danie_serwer.nazwa
            this.opis= danie_serwer.opis
            this.cena= danie_serwer.cena
            this.obrazy= danie_serwer.obrazy
            this.typ= danie_serwer.typ
            this.kategoria= danie_serwer.kategoria
            this.skladniki= danie_serwer.skladniki
            this.dostepnosc= danie_serwer.dostepnosc
            this.popularnosc = danie_serwer.popularnosc
            this.ocena = danie_serwer.ocena 
            this.ocena_calk = danie_serwer.ocena_calk 
            this.ilosc_ocen = danie_serwer.ilosc_ocen
        }
     }
}

export class Komentarz {
    public _id: string = ''
    public idu: string = ''
    public idd: string = ''
    
    public nick: string = ''
    public tytul: string = ''
    public opis: string = ''
    public data: Date = new Date()
    public ocena:number = 0
}

export class Uzytkownik {
    public _id: string = ''
    public nazwa: string = ''
    public haslo: string = ''

}

class Zamowienie_danie {
    id_danie = ''
    ilosc = 0
}

export class Zamowienie {
    public _id: string = ''
    public idu: string = ''
    public data: string = ''
    public dania: Zamowienie_danie[] = []
    public status: Number = 0
    dodaj_danie(id_danie:string, ilosc:number)
    {
        this.dania.push({id_danie, ilosc})
    }
}
