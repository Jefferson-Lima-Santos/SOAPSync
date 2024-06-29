import { ReactNode, createContext, useEffect, useState } from "react";

export interface Historic {
  id: string;
  requestUrl: string;
  statusCode: string;
  xmlData: any;
  headers: any;
  label: string;
}

export interface SelectedApiData {
  label: string;
  url: string;
  SOAPAction: string;
  headers?: any;
}

export type SoapSyncContextDataProps = {
  apiData: any;
  historic: Historic[] | [];
  selectedRequestData: Historic | null;
  selectedApi: SelectedApiData | null;
  CallSetSelectedRequestData: (
    data: Historic | null,
    setSelectedApi?: (selectedApi: {
      label: string;
      url: string;
      SOAPAction: string;
    }) => void
  ) => void;
  CallSetApiData: (meal: any) => void;
  CallSetSelectedApi: (data: SelectedApiData) => void;
  CallSetHistoric: (data: Historic[]) => void;
};

export const SoapSyncContext = createContext<SoapSyncContextDataProps>(
  {} as SoapSyncContextDataProps
);

type AuthContextProviderProps = {
  children: ReactNode;
};

export function SoapSyncContextProvider({
  children,
}: AuthContextProviderProps) {
  const [apiData, setApiData] = useState<any>([]);
  const [historic, setHistoric] = useState<Historic[]>([]);
  const [selectedRequestData, setSelectedRequestData] =
    useState<Historic | null>(null);
  const [selectedApi, setSelectedApi] = useState<SelectedApiData | null>(null);

  function CallSetApiData(section: any) {
    setApiData(section);
  }

  function CallSetHistoric(data: Historic[]) {
    setHistoric(data);
  }

  function CallSetSelectedRequestData(
    data: Historic | null,
    setSelectedApi?: (selectedApi: {
      label: string;
      url: string;
      SOAPAction: string;
    }) => void
  ) {
    setSelectedRequestData(data);
    if (setSelectedApi) {
      setSelectedApi({
        label: data!.label,
        SOAPAction: data!.requestUrl,
        url: data!.requestUrl,
      });
    }
  }

  function getLocalStorageHistoricData() {
    const historicData = localStorage.getItem("HISTORIC_SOAP_SYNC");

    if (historicData) {
      setHistoric(JSON.parse(historicData));
    }
  }

  function CallSetSelectedApi(data: SelectedApiData) {
    setSelectedApi(data);
  }

  useEffect(() => {
    getLocalStorageHistoricData();
  }, []);

  return (
    <SoapSyncContext.Provider
      value={{
        apiData,
        historic,
        selectedRequestData,
        selectedApi,
        CallSetSelectedApi,
        CallSetApiData,
        CallSetHistoric,
        CallSetSelectedRequestData,
      }}
    >
      {children}
    </SoapSyncContext.Provider>
  );
}
