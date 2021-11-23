import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import ProduktiStore from "./produktiStore";

interface Store{
    produktiStore: ProduktiStore;
    commonStore: CommonStore;
}

export const store: Store = {
    produktiStore: new ProduktiStore(),
    commonStore: new CommonStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}