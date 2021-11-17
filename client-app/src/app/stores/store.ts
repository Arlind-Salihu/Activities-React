import { createContext, useContext } from "react";
import ProduktiStore from "./produktiStore";

interface Store{
    produktiStore: ProduktiStore
}

export const store: Store = {
    produktiStore: new ProduktiStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}