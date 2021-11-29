import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import LaptopiStore from "./laptopiStore";
import TelefoniStore from "./telefoniStore";
import OraStore from "./oraStore";

interface Store{
    telefoniStore: TelefoniStore;
    commonStore: CommonStore;
    laptopiStore: LaptopiStore;
    oraStore: OraStore;
}

export const store: Store = {
    telefoniStore: new TelefoniStore(),
    commonStore: new CommonStore(),
    laptopiStore: new LaptopiStore(),
    oraStore: new OraStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}