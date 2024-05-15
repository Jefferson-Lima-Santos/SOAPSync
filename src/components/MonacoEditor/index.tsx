import { useRef, useState } from 'react';
import { Stack, TextField, IconButton, Checkbox, Button } from '@mui/material';
import { AddCircle } from '@mui/icons-material';
import Editor from '@monaco-editor/react';
import HeaderTitle from '../HeaderTitle/index';

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

    function handleEditorDidMount(editor: any, monaco: any) {
        editorRef.current = editor;
    }

    const handleHeaderChange = (index: number, key: string, value: string) => {
        const newHeaders = headers.map((header, i) => {
            if (i === index) {
                return {
                    key,
                    value
                }
            }
            return header;
        });
        setHeaders(newHeaders);
    }

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

    function showValue() {
        if (editorRef?.current)
            alert(editorRef.current.getValue());
    }

    return (
        <Stack
            width='50vw'
            height='-webkit-fill-available'
        >
            <HeaderTitle
                title='Editor'
            />
            <Stack
                direction='column'
                spacing={2}
                justifyContent='center'
            >
                <Editor
                    height="50vh"
                    width="50vw"
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
                    sx={{
                        overflowY: 'auto'
                    }}
                >
                    {headers && headers.map((header, index) => (
                        <Stack
                            key={index}
                            direction='row'
                            spacing={2}
                            sx={{
                                margin: '0.5rem 0 !important',
                            }}
                        >
                            <Checkbox
                                size='small'
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