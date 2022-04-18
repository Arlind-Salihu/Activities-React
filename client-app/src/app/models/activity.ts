import { Profile } from "./profile";

export interface Activity {
    id: string;
    emri: string;
    kategoria: string;
    brendi: string;
    data: Date | null;
    pershkrimi: string;
    hostUsername: string;
    isCancelled: boolean;
    isInteresed: boolean;
    isHost: boolean;
    host?: Profile;
    activitiesPrezencat: Profile[]
}

export class Activity implements Activity{
    constructor(init?: ActivityFormValues){
        Object.assign(this, init);
    }
}

export class ActivityFormValues{
    id?: string = undefined;
    emri: string = '';
    kategoria: string = '';
    brendi: string = '';
    data: Date | null = null;
    pershkrimi: string = '';

    constructor(activity?: ActivityFormValues){
        if(activity){
            this.id = activity.id;
            this.emri = activity.emri;
            this.kategoria = activity.kategoria;
            this.brendi = activity.brendi;
            this.data = activity.data;
            this.pershkrimi = activity.pershkrimi;
        }
    }
}