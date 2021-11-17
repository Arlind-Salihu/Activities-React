import { makeAutoObservable, runInAction} from "mobx"
import agent from "../api/agent";
import { Produkti } from "../models/produkti";
import {v4 as uuid} from 'uuid';

export default class ProduktiStore {
    produktiRegistry = new Map<string, Produkti>();
    selectedProdukti: Produkti | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;

    constructor() {
        makeAutoObservable(this)
    }

    get produktetByDate(){
        return Array.from(this.produktiRegistry.values()).sort((a,b)=> Date.parse(a.data) - Date.parse(b.data));
    }

    loadProduktet = async () => {
        try {
            const produktet = await agent.Produktet.list();
            
                produktet.forEach((produkti) => {
                    produkti.data = produkti.data.split("T")[0];
                    this.produktiRegistry.set(produkti.id, produkti);
                })
                this.setLoadingInitial(false);
        } catch (error) {
            console.log(error)
            this.setLoadingInitial(false);
        }
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    selectProdukti = (id: string) => {
        this.selectedProdukti = this.produktiRegistry.get(id);
    }

    cancelSelectedProdukti = () => {
        this.selectedProdukti = undefined;
    }

     openForm = (id?: string) => {
         id ? this.selectProdukti(id) : this.cancelSelectedProdukti();
         this.editMode = true;
     }

     closeForm = () => {
         this.editMode = false;
     }

     createProdukti = async (produkti: Produkti) => {
         this.loading = true;
         produkti.id = uuid();
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
     
     deleteProdukti = async (id: string) =>{
         this.loading = true;
         try {
             await agent.Produktet.delete(id);
             runInAction(() =>{
                this.produktiRegistry.delete(id);
                if(this.selectedProdukti?.id === id) this.cancelSelectedProdukti();
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