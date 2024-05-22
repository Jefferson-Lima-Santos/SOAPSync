import { useRef, useState } from 'react';
import { Stack, TextField, IconButton, Checkbox, Button, Autocomplete } from '@mui/material';
import { Send } from '@mui/icons-material';
import { AddCircle } from '@mui/icons-material';
import Editor from '@monaco-editor/react';
import HeaderTitle from '../HeaderTitle/index';
import { context } from '../../context';

interface HeaderType {
    key: string;
    value: string;
}

const initialHeader: HeaderType[] = [
    {
        key: '',
        value: ''
    }
]


const MonacoEditor = () => {
    const editorRef = useRef<any>(null);
    const [headers, setHeaders] = useState<HeaderType[]>(initialHeader);
    const [selectedApi, setSelectedApi] = useState<{ label: string; url: string } | null>(null);


    function handleEditorDidMount(editor: any, monaco: any) {
        editorRef.current = editor;
    }

    // const handleHeaderChange = (index: number, key: string, value: string) => {
    //     const newHeaders = headers.map((header, i) => {
    //         if (i === index) {
    //             return {
    //                 key,
    //                 value
    //             }
    //         }
    //         return header;
    //     });
    //     setHeaders(newHeaders);
    // }

    const handleAddHeader = () => {
        setHeaders([
            ...headers,
            {
                key: '',
                value: ''
            }
        ]);
    }
    const handleRemoveHeader = (index: number) => {
        if (headers.length === 1) {
            setHeaders(initialHeader);
            return;
        }
        const newHeaders = headers.filter((header, i) => i !== index);
        setHeaders(newHeaders);
    }

    const handleSendRequest = async () => {
        if (!selectedApi) {
            alert('Please select an API');
            return;
        }

        const xmlData = editorRef.current.getValue();
        const headersObject = headers.reduce((acc, header) => {
            if (header.key && header.value) {
                acc[header.key] = header.value;
            }
            return acc;
        }, {});

        try {
            const response = await fetch(selectedApi.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/xml',
                    ...headersObject
                },
                body: xmlData
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.text();
            console.log('Response:', responseData);
            // Handle the response as needed
        } catch (error) {
            console.error('Error:', error);
        }
    }
    // function showValue() {
    //     if (editorRef?.current)
    //         alert(editorRef.current.getValue());
    // }

    return (
        <Stack
            width='50vw'
            height='-webkit-fill-available'
            alignItems='center'
            sx={{
                backgroundColor: '#090C15'
            }}
        >
            <HeaderTitle
                title='Editor'
            />
            <Stack
                direction='row'
                spacing={2}
                justifyContent='center'
                sx={{
                    backgroundColor: '#FFF',
                    width: '95%',
                    padding: '0.5rem',
                    boxSizing: 'border-box',
                }}
            >
                <Autocomplete
                    options={context.soapApis}
                    getOptionLabel={(option) => option.url}
                    fullWidth
                    onChange={(event, newValue) => setSelectedApi(newValue)}
                    renderOption={(props, option) => (
                        <li {...props}>
                            {option.label}
                        </li>
                    )}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Select API"
                            variant="outlined"
                        />
                    )}
                    sx={{
                        backgroundColor: '#fff',
                        color: '#000',
                        borderRadius: '0.5rem',
                    }}
                />
                <Button
                    variant='contained'
                    color='primary'
                    sx={{
                        marginTop: '1rem'
                    }}
                    endIcon={
                        <Send />
                    }
                    onClick={handleSendRequest}
                >
                    Enviar
                </Button>
            </Stack>
            <Stack
                direction='column'
                spacing={2}
                justifyContent='center'
                sx={{
                    width: '95%',
                }}
            >
                <Editor
                    height="50vh"
                    width="100%"
                    defaultLanguage="xml"
                    defaultValue='<?xml version="1.0"?>
                    <soap:Envelope xmlns:soap="https://www.w3.org/2003/05/soap-envelope">
                    </soap:Envelope>
                    </xml>'

                    onMount={handleEditorDidMount}
                />
            </Stack>
            <Stack
                direction='column'
                spacing={3}
                justifyContent='flex-start'
                sx={{
                    width: '95%',
                    position: 'relative',
                    height: '-webkit-fill-available'
                }}
            >
                <HeaderTitle
                    title='Headers'
                    size='h6'
                />
                <Stack
                    direction='row'
                    flexWrap='wrap'
                    justifyContent='center'
                    maxHeight='24vh'
                    flexGrow={1}
                    sx={{
                        overflowY: 'auto',
                        backgroundColor: '#FFF',
                    }}
                >
                    {headers && headers.map((header, index) => (
                        <Stack
                            key={index}
                            direction='row'
                            alignItems='center'
                            spacing={2}
                            sx={{
                                margin: '0.5rem 0 !important',
                                maxHeight: '3rem',
                            }}
                        >
                            <Checkbox
                                size='small'
                                sx={{
                                    // color: '#fff',
                                    // '&.Mui-checked': {
                                    //     color: '#fff'
                                    // },
                                }}
                            />
                            <TextField
                                fullWidth
                                variant='outlined'
                                size='small'
                                label='Header Key'
                            />
                            <TextField
                                fullWidth
                                variant='outlined'
                                size='small'
                                label='Header Value'
                            />
                            <IconButton
                                size='small'
                                onClick={() => handleRemoveHeader(index)}
                                // sx={{
                                //     color: '#fff',
                                // }}
                            >
                                X
                            </IconButton>
                        </Stack>
                    ))}
                </Stack>
                <Stack
                    direction='row'
                    spacing={2}
                    justifyContent='flex-start'
                    sx={{
                        position: 'absolute',
                        bottom: '0',
                        padding: '1rem'
                    }}
                >
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={handleAddHeader}
                        endIcon={
                            <AddCircle />
                        }
                    >
                        Adicionar Header
                    </Button>
                </Stack>
            </Stack>
        </Stack>
    );
}

export default MonacoEditor;