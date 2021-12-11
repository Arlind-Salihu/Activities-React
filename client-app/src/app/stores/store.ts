import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import LaptopiStore from "./laptopiStore";
import TelefoniStore from "./telefoniStore";
import OraStore from "./oraStore";
import UserStore from "./userStore";
import ModalStore from "./modalStore";

interface Store{
    telefoniStore: TelefoniStore;
    commonStore: CommonStore;
    laptopiStore: LaptopiStore;
    oraStore: OraStore;
    userStore: UserStore;
    modalStore: ModalStore;
}

export const store: Store = {
    telefoniStore: new TelefoniStore(),
    commonStore: new CommonStore(),
    laptopiStore: new LaptopiStore(),
    oraStore: new OraStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}