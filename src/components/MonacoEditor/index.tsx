import { useRef, useState } from "react";
import {
  Stack,
  TextField,
  IconButton,
  Checkbox,
  Button,
  Autocomplete,
} from "@mui/material";
import { Send, AddCircle } from "@mui/icons-material";
import { context } from "../../context";
import { useApiData } from "../../hooks/useApiData";
import { v4 as uuidv4 } from "uuid";
import { Historic } from "../../context/SoapSyncContext";

import Editor from "@monaco-editor/react";
import HeaderTitle from "../HeaderTitle/index";
import axios from "axios";

interface HeaderType {
  key: string;
  value: string;
}

const initialHeader: HeaderType[] = [
  {
    key: "",
    value: "",
  },
];

const MonacoEditor = () => {
  const {
    CallSetApiData,
    CallSetHistoric,
    CallSetSelectedRequestData,
    CallSetSelectedApi,
    selectedRequestData,
    selectedApi,
  } = useApiData();

  const editorRef = useRef<any>(null);
  const [headers, setHeaders] = useState<HeaderType[]>(initialHeader);

  function handleEditorDidMount(editor: any, monaco: any) {
    editorRef.current = editor;
  }

  const handleAddHeader = () => {
    setHeaders([
      ...headers,
      {
        key: "",
        value: "",
      },
    ]);
  };

  const handleRemoveHeader = (index: number) => {
    if (headers.length === 1) {
      setHeaders(initialHeader);
      return;
    }
    const newHeaders = headers.filter((header, i) => i !== index);
    setHeaders(newHeaders);
  };

  const handleHeaderChange = (index: number, field: string, value: string) => {
    const newHeaders = headers.map((header, i) => {
      if (i === index) {
        return {
          ...header,
          [field]: value,
        };
      }
      return header;
    });
    setHeaders(newHeaders);
  };

  const handleSendRequest = async () => {
    if (!selectedApi) {
      alert("Please select an API");
      return;
    }

    const xmlData = editorRef.current.getValue();
    const headersObject = headers.reduce((acc: any, header) => {
      if (header.key && header.value) {
        acc[header.key] = header.value;
      }
      return acc;
    }, {});

    try {
      const proxyUrl = "https://api.allorigins.win/get?url=";

      const response = await axios.post(
        proxyUrl + selectedApi.SOAPAction,
        xmlData,
        {
          headers: {
            "Content-Type": "application/xml",
            Accept: "*/*",
            ...headersObject,
          },
        }
      );

      const localHistoric = localStorage.getItem("HISTORIC_SOAP_SYNC");

      const newHistoricData: Historic = {
        headers,
        id: uuidv4(),
        requestUrl: selectedApi.SOAPAction,
        label: selectedApi.label,
        statusCode: String(response.status),
        xmlData,
      };

      if (!localHistoric) {
        localStorage.setItem(
          "HISTORIC_SOAP_SYNC",
          JSON.stringify([newHistoricData])
        );

        CallSetHistoric([newHistoricData]);
      } else {
        localStorage.setItem(
          "HISTORIC_SOAP_SYNC",
          JSON.stringify([...JSON.parse(localHistoric), newHistoricData])
        );

        CallSetHistoric([...JSON.parse(localHistoric), newHistoricData]);
      }

      const html = response.data.contents;

      CallSetApiData(html);
    } catch (error: any) {
      console.error("Error:", error);
      if (error?.response?.status) {
        CallSetApiData({
          code: error.response.status,
          message: error.message,
          error: error.response.data.error,
        });
      }
    }
  };

  return (
    <Stack
      width="50vw"
      height="-webkit-fill-available"
      alignItems="center"
      sx={{
        backgroundColor: "#090C15",
      }}
    >
      <HeaderTitle title="Editor" />
      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        mb={1}
        sx={{
          backgroundColor: "#0D0D0D",
          width: "97%",
          padding: "0.5rem",
          boxSizing: "border-box",
        }}
      >
        <Autocomplete
          value={{
            label: selectedApi ? selectedApi?.label : "",
            SOAPAction: selectedApi ? selectedApi?.SOAPAction : "",
            url: selectedApi ? selectedApi?.url : "",
          }}
          options={context.soapApis}
          getOptionLabel={(option) => option!.url!}
          fullWidth
          onChange={(event, newValue: any) => {
            CallSetSelectedApi(newValue);
            CallSetSelectedRequestData(null);
          }}
          renderOption={(props, option) => <li {...props}>{option.label}</li>}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select API"
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white",
                  },
                  "&:hover fieldset": {
                    borderColor: "white",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "transparent",
                },
                "& .MuiOutlinedInput-input": {
                  color: "black",
                },
              }}
            />
          )}
          sx={{
            backgroundColor: "#fff",
            color: "#000",
            borderRadius: "0.5rem",
          }}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{
            marginTop: "1rem",
          }}
          endIcon={<Send />}
          onClick={handleSendRequest}
        >
          Enviar
        </Button>
      </Stack>
      <Stack
        direction="column"
        spacing={2}
        justifyContent="center"
        sx={{
          width: "95%",
        }}
      >
        <Editor
          height="40vh"
          width="100%"
          theme="vs-dark"
          defaultLanguage="xml"
          defaultValue={
            selectedRequestData
              ? selectedRequestData.xmlData
              : `<?xml version="1.0"?>\n<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://www.webserviceX.NET/">\n  <soap:Body>\n    <web:GetConversionRate>\n      <web:CurrencyFrom>USD</web:CurrencyFrom>\n      <web:CurrencyTo>EUR</web:CurrencyTo>\n      <web:RateDate>2024-06-28</web:RateDate>\n    </web:GetConversionRate>\n  </soap:Body>\n</soap:Envelope>`
          }
          onMount={handleEditorDidMount}
        />
      </Stack>
      <Stack
        direction="column"
        spacing={3}
        justifyContent="flex-start"
        sx={{
          width: "95%",
          position: "relative",
          height: "-webkit-fill-available",
        }}
      >
        <HeaderTitle title="Headers" size="h6" />
        <Stack
          direction="row"
          flexWrap="wrap"
          justifyContent="center"
          maxHeight="20vh"
          flexGrow={1}
          sx={{
            overflowY: "auto",
          }}
        >
          {headers.map((header, index) => (
            <Stack
              key={index}
              direction="row"
              alignItems="center"
              spacing={2}
              sx={{
                margin: "0.5rem 0 !important",
                maxHeight: "3rem",
              }}
            >
              <Checkbox
                size="small"
                sx={{
                  color: "white",
                  "&.Mui-checked": {
                    color: "white",
                  },
                }}
              />
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                label="Header Key"
                value={header.key}
                onChange={(e) =>
                  handleHeaderChange(index, "key", e.target.value)
                }
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "white",
                    },
                    "&:hover fieldset": {
                      borderColor: "white",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "white",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "black",
                  },
                  "& .MuiOutlinedInput-input": {
                    color: "black",
                    backgroundColor: "white",
                    borderRadius: 1,
                  },
                  color: "black",
                }}
              />
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                label="Header Value"
                value={header.value}
                onChange={(e) =>
                  handleHeaderChange(index, "value", e.target.value)
                }
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "white",
                    },
                    "&:hover fieldset": {
                      borderColor: "white",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "white",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "black",
                  },
                  "& .MuiOutlinedInput-input": {
                    color: "black",
                    backgroundColor: "white",
                    borderRadius: 1,
                  },
                  color: "black",
                }}
              />
              <IconButton
                size="small"
                onClick={() => handleRemoveHeader(index)}
                sx={{
                  color: "white",
                }}
              >
                X
              </IconButton>
            </Stack>
          ))}

          {selectedApi?.headers?.length > 0 &&
            selectedApi!.headers.map((header: any, index: any) => (
              <Stack
                key={index}
                direction="row"
                alignItems="center"
                spacing={2}
                sx={{
                  margin: "0.5rem 0 !important",
                  maxHeight: "3rem",
                }}
              >
                <Checkbox
                  size="small"
                  sx={{
                    color: "white",
                    "&.Mui-checked": {
                      color: "white",
                    },
                  }}
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  label="Header Key"
                  value={header.key}
                  onChange={(e) =>
                    handleHeaderChange(index, "key", e.target.value)
                  }
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "white",
                        backgroundColor: "white",
                      },
                      "&:hover fieldset": {
                        borderColor: "white",
                        backgroundColor: "white",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "white",
                        backgroundColor: "white",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "black",
                    },
                    "& .MuiOutlinedInput-input": {
                      color: "black",
                    },
                  }}
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  label="Header Value"
                  value={header.value}
                  onChange={(e) =>
                    handleHeaderChange(index, "value", e.target.value)
                  }
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "white",
                        backgroundColor: "white",
                      },
                      "&:hover fieldset": {
                        borderColor: "white",
                        backgroundColor: "white",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "white",
                        backgroundColor: "white",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "black",
                    },
                    "& .MuiOutlinedInput-input": {
                      color: "black",
                    },
                  }}
                />
                <IconButton
                  size="small"
                  onClick={() => handleRemoveHeader(index)}
                  sx={{
                    color: "white",
                  }}
                >
                  X
                </IconButton>
              </Stack>
            ))}
        </Stack>
        <Stack
          style={{
            position: "absolute",
            right: 0,
          }}
          direction="row"
          spacing={2}
          justifyContent="flex-start"
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddHeader}
            endIcon={<AddCircle />}
          >
            Adicionar Header
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default MonacoEditor;
