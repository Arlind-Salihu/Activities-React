import { format } from "date-fns";
import { makeAutoObservable, runInAction } from "mobx"
import agent from "../api/agent";
import { Telefoni } from "../models/telefoni";

export default class TelefoniStore {
    telefoniRegistry = new Map<string, Telefoni>();
    selectedTelefoni: Telefoni | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }

    get telefonatByDate() {
        return Array.from(this.telefoniRegistry.values()).sort((a, b) => a.data!.getTime() - b.data!.getTime());
    }

    get groupedTelefonat(){
        return Object.entries(
            this.telefonatByDate.reduce((telefonat, telefoni) =>{
                const data = format(telefoni.data!, 'dd MMM yyy');
                telefonat[data] = telefonat[data] ? [...telefonat[data], telefoni] : [telefoni]
                return telefonat;
            }, {} as {[key: string]: Telefoni[]})
        )
    }

    loadTelefonat = async () => {
        this.loadingInitial = true;
        try {
            const telefonat = await agent.Telefonat.list();

            telefonat.forEach((telefoni) => {
                this.setTelefoni(telefoni);
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error)
            this.setLoadingInitial(false);
        }
    }

    loadTelefoni = async (id: string) => {
        let telefoni = this.getTelefoni(id);
        if (telefoni) {
            this.selectedTelefoni = telefoni;
            return telefoni;
        } else {
            this.loadingInitial = true;
            try {
                telefoni = await agent.Telefonat.details(id);
                this.setTelefoni(telefoni);
                runInAction(() => {
                    this.selectedTelefoni = telefoni;
                })
                this.setLoadingInitial(false);
                return telefoni;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setTelefoni = (telefoni: Telefoni) => {
        telefoni.data = new Date(telefoni.data!);
        this.telefoniRegistry.set(telefoni.id, telefoni);
    }

    private getTelefoni = (id: string) => {
        return this.telefoniRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createTelefoni = async (telefoni: Telefoni) => {
        this.loading = true;
        try {
            await agent.Telefonat.create(telefoni);
            runInAction(() => {
                this.telefoniRegistry.set(telefoni.id, telefoni);
                this.selectedTelefoni = telefoni;
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

    updateTelefoni = async (telefoni: Telefoni) => {
        this.loading = true;
        try {
            await agent.Telefonat.update(telefoni);
            runInAction(() => {
                this.telefoniRegistry.set(telefoni.id, telefoni)
                this.selectedTelefoni = telefoni;
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

    deleteTelefoni = async (id: string) => {
        this.loading = true;
        try {
            await agent.Telefonat.delete(id);
            runInAction(() => {
                this.telefoniRegistry.delete(id);
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