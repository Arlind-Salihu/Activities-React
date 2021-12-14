import { format } from "date-fns";
import { makeAutoObservable, runInAction } from "mobx"
import agent from "../api/agent";
import { Telefoni, TelefoniFormValues } from "../models/telefoni";
import { Profile } from "../models/profile";
import { store } from "./store";

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
        const user = store.userStore.user;
        if (user){
            telefoni.isGoing = telefoni.telefonatPrezencat!.some(
                a => a.username === user.username
            )
            telefoni.isHost = telefoni.hostUsername === user.username;
            telefoni.host = telefoni.telefonatPrezencat?.find(x => x.username === telefoni.hostUsername)
        }
        telefoni.data = new Date(telefoni.data!);
        this.telefoniRegistry.set(telefoni.id, telefoni);
    }

    private getTelefoni = (id: string) => {
        return this.telefoniRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createTelefoni = async (telefoni: TelefoniFormValues) => {
        const user = store.userStore.user;
        const telefoniPrezent = new Profile(user!);
        try {
            await agent.Telefonat.create(telefoni);
            const newTelefoni = new Telefoni(telefoni);
            newTelefoni.hostUsername = user!.username;
            newTelefoni.telefonatPrezencat = [telefoniPrezent];
            this.setTelefoni(newTelefoni);
            runInAction(() => {
                this.selectedTelefoni = newTelefoni;
            })
        } catch (error) {
            console.log(error);
        }
    }

    updateTelefoni = async (telefoni: TelefoniFormValues) => {
        try {
            await agent.Telefonat.update(telefoni);
            runInAction(() => {
                if(telefoni.id){
                    let updatedTelefoni = {...this.getTelefoni(telefoni.id), ...telefoni}
                    this.telefoniRegistry.set(telefoni.id, updatedTelefoni as Telefoni);
                    this.selectedTelefoni = updatedTelefoni as Telefoni;
                }
            })
        } catch (error) {
            console.log(error);
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

    updatePrezencen = async () => {
        const user = store.userStore.user;
        this.loading = true;
        try {
            await agent.Telefonat.telefoniPrezent(this.selectedTelefoni!.id);
            runInAction(() => {
                if(this.selectedTelefoni?.isGoing){
                    this.selectedTelefoni.telefonatPrezencat = this.selectedTelefoni.telefonatPrezencat?.filter(a => a.username !== user?.username);
                    this.selectedTelefoni.isGoing = false;
                } else {
                    const telefoniPrezent = new Profile(user!);
                    this.selectedTelefoni?.telefonatPrezencat?.push(telefoniPrezent);
                    this.selectedTelefoni!.isGoing = true;
                }
                this.telefoniRegistry.set(this.selectedTelefoni!.id, this.selectedTelefoni!)
            })
        } catch (error) {
            console.log(error)            
        } finally {
            runInAction(() => this.loading = false);
        }
    }

    cancelTelefoniToggle = async () => {
        this.loading = true;
        try {
            await agent.Telefonat.telefoniPrezent(this.selectedTelefoni!.id);
            runInAction(() => {
                this.selectedTelefoni!.isCancelled = !this.selectedTelefoni?.isCancelled;
                this.telefoniRegistry.set(this.selectedTelefoni!.id, this.selectedTelefoni!)
            })
        } catch (error) {
            console.log(error);
        } finally {
            runInAction(() => this.loading = false);
        }
    }
}