import { format } from "date-fns";
import { makeAutoObservable, runInAction } from "mobx"
import agent from "../api/agent";
import { Laptopi } from "../models/laptopi";

export default class LaptopiStore {
    laptopiRegistry = new Map<string, Laptopi>();
    selectedLaptopi: Laptopi | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }

    get laptopatByDate() {
        return Array.from(this.laptopiRegistry.values()).sort((a, b) => a.data!.getTime() - b.data!.getTime());
    }

    get groupedLaptopat(){
        return Object.entries(
            this.laptopatByDate.reduce((laptopat, laptopi) =>{
                const data = format(laptopi.data!, 'dd MMM yyy');
                laptopat[data] = laptopat[data] ? [...laptopat[data], laptopi] : [laptopi]
                return laptopat;
            }, {} as {[key: string]: Laptopi[]})
        )
    }

    loadLaptopat = async () => {
        this.loadingInitial = true;
        try {
            const laptopat = await agent.Laptopat.list();

            laptopat.forEach((laptopi) => {
                this.setLaptopi(laptopi);
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error)
            this.setLoadingInitial(false);
        }
    }

    loadLaptopi = async (id: string) => {
        let laptopi = this.getLaptopi(id);
        if (laptopi) {
            this.selectedLaptopi = laptopi;
            return laptopi;
        } else {
            this.loadingInitial = true;
            try {
                laptopi = await agent.Laptopat.details(id);
                this.setLaptopi(laptopi);
                runInAction(() => {
                    this.selectedLaptopi = laptopi;
                })
                this.setLoadingInitial(false);
                return laptopi;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setLaptopi = (laptopi: Laptopi) => {
        laptopi.data = new Date(laptopi.data!);
        this.laptopiRegistry.set(laptopi.id, laptopi);
    }

    private getLaptopi = (id: string) => {
        return this.laptopiRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createLaptopi = async (laptopi: Laptopi) => {
        this.loading = true;
        try {
            await agent.Laptopat.create(laptopi);
            runInAction(() => {
                this.laptopiRegistry.set(laptopi.id, laptopi);
                this.selectedLaptopi = laptopi;
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

    updateLaptopi = async (laptopi: Laptopi) => {
        this.loading = true;
        try {
            await agent.Laptopat.update(laptopi);
            runInAction(() => {
                this.laptopiRegistry.set(laptopi.id, laptopi)
                this.selectedLaptopi = laptopi;
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

    deleteLaptopi = async (id: string) => {
        this.loading = true;
        try {
            await agent.Laptopat.delete(id);
            runInAction(() => {
                this.laptopiRegistry.delete(id);
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