import { useContext } from "react";
import { SoapSyncContext } from "../context/SoapSyncContext";

export function useApiData(){
    const context = useContext(SoapSyncContext)

    return context
}