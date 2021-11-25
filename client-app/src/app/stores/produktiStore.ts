import { format } from "date-fns";
import { makeAutoObservable, runInAction } from "mobx"
import agent from "../api/agent";
import { Produkti } from "../models/produkti";

export default class ProduktiStore {
    produktiRegistry = new Map<string, Produkti>();
    selectedProdukti: Produkti | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }

    get produktetByDate() {
        return Array.from(this.produktiRegistry.values()).sort((a, b) => a.data!.getTime() - b.data!.getTime());
    }

    get groupedProduktet(){
        return Object.entries(
            this.produktetByDate.reduce((produktet, produkti) =>{
                const data = format(produkti.data!, 'dd MMM yyy');
                produktet[data] = produktet[data] ? [...produktet[data], produkti] : [produkti]
                return produktet;
            }, {} as {[key: string]: Produkti[]})
        )
    }

    loadProduktet = async () => {
        this.loadingInitial = true;
        try {
            const produktet = await agent.Produktet.list();

            produktet.forEach((produkti) => {
                this.setProdukti(produkti);
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error)
            this.setLoadingInitial(false);
        }
    }

    loadProdukti = async (id: string) => {
        let produkti = this.getProdukti(id);
        if (produkti) {
            this.selectedProdukti = produkti;
            return produkti;
        } else {
            this.loadingInitial = true;
            try {
                produkti = await agent.Produktet.details(id);
                this.setProdukti(produkti);
                runInAction(() => {
                    this.selectedProdukti = produkti;
                })
                this.setLoadingInitial(false);
                return produkti;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setProdukti = (produkti: Produkti) => {
        produkti.data = new Date(produkti.data!);
        this.produktiRegistry.set(produkti.id, produkti);
    }

    private getProdukti = (id: string) => {
        return this.produktiRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createProdukti = async (produkti: Produkti) => {
        this.loading = true;
        try {
            await agent.Produktet.create(produkti);
            runInAction(() => {
                this.produktiRegistry.set(produkti.id, produkti);
                this.selectedProdukti = produkti;
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

    updateProdukti = async (produkti: Produkti) => {
        this.loading = true;
        try {
            await agent.Produktet.update(produkti);
            runInAction(() => {
                this.produktiRegistry.set(produkti.id, produkti)
                this.selectedProdukti = produkti;
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

    deleteProdukti = async (id: string) => {
        this.loading = true;
        try {
            await agent.Produktet.delete(id);
            runInAction(() => {
                this.produktiRegistry.delete(id);
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