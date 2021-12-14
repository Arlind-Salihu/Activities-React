import { Profile } from "./profile";

export interface Telefoni {
    id: string;
    emri: string;
    kategoria: string;
    brendi: string;
    data: Date | null;
    pershkrimi: string;
    cmimi: number | null;
    hostUsername: string;
    isCancelled: boolean;
    isGoing: boolean;
    isHost: boolean;
    host?: Profile;
    telefonatPrezencat: Profile[]
}

export class Telefoni implements Telefoni{
    constructor(init?: TelefoniFormValues){
        Object.assign(this, init);
    }
}

export class TelefoniFormValues{
    id?: string = undefined;
    emri: string = '';
    kategoria: string = '';
    brendi: string = '';
    data: Date | null = null;
    pershkrimi: string = '';
    cmimi: number | null = null;

    constructor(telefoni?: TelefoniFormValues){
        if(telefoni){
            this.id = telefoni.id;
            this.emri = telefoni.emri;
            this.kategoria = telefoni.kategoria;
            this.brendi = telefoni.brendi;
            this.data = telefoni.data;
            this.pershkrimi = telefoni.pershkrimi;
            this.cmimi = telefoni.cmimi;
        }
    }
}