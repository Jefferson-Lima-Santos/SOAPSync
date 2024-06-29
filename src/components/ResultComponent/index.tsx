import React from "react";
import { Button, Stack } from "@mui/material";
import { useApiData } from "../../hooks/useApiData";
import { Historic } from "../../context/SoapSyncContext";

import HeaderTitle from "../HeaderTitle";

import "./styles.css";

const ResultComponent = () => {
  const { apiData, historic, CallSetSelectedApi } = useApiData();

  return (
    <Stack width="30vw">
      <HeaderTitle title="Resposta" />
      <Stack
        height="45vh"
        direction="column"
        spacing={2}
        padding={2}
        fontSize={18}
      >
        {apiData && !apiData.error && (
          <iframe
            title="HTML Content"
            srcDoc={apiData}
            style={{ width: "100%", height: "500px", border: "none" }}
            sandbox="allow-same-origin allow-scripts"
          />
        )}

        {apiData && apiData.error && (
          <div>
            <h2
              style={{
                fontSize: 26,
                color: "red",
                marginTop: -10,
              }}
            >
              Error {apiData.code}
            </h2>

            <h2
              style={{
                fontSize: 20,
                color: "white",
                marginTop: -10,
                fontWeight: "normal",
              }}
            >
              {apiData.message}
            </h2>
            <h2
              style={{
                fontSize: 20,
                color: "white",
                marginTop: -10,
                fontWeight: "normal",
              }}
            >
              {apiData.error}
            </h2>
          </div>
        )}
      </Stack>

      <HeaderTitle title="Histórico" />
      <Stack
        flexGrow={1}
        height="40vh"
        overflow="auto"
        padding={2}
        fontSize={18}
      >
        {historic?.map((item: Historic) => {
  
          return (
            <Button
              onClick={() =>
                CallSetSelectedApi({
                  label: item.label,
                  SOAPAction: item.requestUrl,
                  url: item.requestUrl,
                  headers: item.headers,
                })
              }
              key={item.id}
              variant="text"
              color="primary"
              startIcon={
                <>
                  <h1>{item.statusCode}</h1>
                </>
              }
              sx={{
                justifyContent: "space-between",
              }}
              endIcon={
                <>
                  <h1></h1>
                </>
              }
            >
              <h1 style={{ width: "20rem", fontSize: 12, overflow: "hidden" }}>
                {item.requestUrl}
              </h1>
            </Button>
          );
        })}
      </Stack>

      <HeaderTitle title="" />
    </Stack>
  );
};

export default ResultComponent;
