import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import LaptopiStore from "./laptopiStore";
import TelefoniStore from "./telefoniStore";

interface Store{
    telefoniStore: TelefoniStore;
    commonStore: CommonStore;
    laptopiStore: LaptopiStore;
}

export const store: Store = {
    telefoniStore: new TelefoniStore(),
    commonStore: new CommonStore(),
    laptopiStore: new LaptopiStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}