import { format } from "date-fns";
import { makeAutoObservable, runInAction } from "mobx"
import agent from "../api/agent";
import { Ora } from "../models/ora";

export default class OraStore {
    oraRegistry = new Map<string, Ora>();
    selectedOra: Ora | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }

    get oratByDate() {
        return Array.from(this.oraRegistry.values()).sort((a, b) => a.data!.getTime() - b.data!.getTime());
    }

    get groupedOrat(){
        return Object.entries(
            this.oratByDate.reduce((orat, ora) =>{
                const data = format(ora.data!, 'dd MMM yyy');
                orat[data] = orat[data] ? [...orat[data], ora] : [ora]
                return orat;
            }, {} as {[key: string]: Ora[]})
        )
    }

    loadOrat = async () => {
        this.loadingInitial = true;
        try {
            const orat = await agent.Orat.list();

            orat.forEach((ora) => {
                this.setOra(ora);
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error)
            this.setLoadingInitial(false);
        }
    }

    loadOra = async (id: string) => {
        let ora = this.getOra(id);
        if (ora) {
            this.selectedOra = ora;
            return ora;
        } else {
            this.loadingInitial = true;
            try {
                ora = await agent.Orat.details(id);
                this.setOra(ora);
                runInAction(() => {
                    this.selectedOra = ora;
                })
                this.setLoadingInitial(false);
                return ora;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setOra = (ora: Ora) => {
        ora.data = new Date(ora.data!);
        this.oraRegistry.set(ora.id, ora);
    }

    private getOra = (id: string) => {
        return this.oraRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createOra = async (ora: Ora) => {
        this.loading = true;
        try {
            await agent.Orat.create(ora);
            runInAction(() => {
                this.oraRegistry.set(ora.id, ora);
                this.selectedOra = ora;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateOra = async (ora: Ora) => {
        this.loading = true;
        try {
            await agent.Orat.update(ora);
            runInAction(() => {
                this.oraRegistry.set(ora.id, ora)
                this.selectedOra = ora;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    deleteOra = async (id: string) => {
        this.loading = true;
        try {
            await agent.Orat.delete(id);
            runInAction(() => {
                this.oraRegistry.delete(id);
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
}