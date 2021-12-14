import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import TelefoniStore from "./telefoniStore";
import UserStore from "./userStore";
import ModalStore from "./modalStore";

interface Store{
    telefoniStore: TelefoniStore;
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
}

export const store: Store = {
    telefoniStore: new TelefoniStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}