import { useRef, useState } from 'react';
import { Stack, Paper, Typography, TextField, IconButton, Checkbox, Button } from '@mui/material';
import { Send } from '@mui/icons-material';
import Editor from '@monaco-editor/react';

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
            minWidth='50vw'
        >
            <Paper
                style={{
                    padding: '1rem',
                    textAlign: 'center'
                }}
            >
                <Typography
                    variant='h5'
                >
                    Editor
                </Typography>
            </Paper>
            <Stack
                direction='column'
                spacing={2}
                justifyContent='center'
            >
                <Editor
                    height="50vh"
                    width="50vw"
                    defaultLanguage="javascript"
                    defaultValue='<?xml version="1.0"?>
                    <soap:Envelope xmlns:soap="https://www.w3.org/2003/05/soap-envelope">
                    </soap:Envelope>'
                    onMount={handleEditorDidMount}
                />
            </Stack>
            <Stack
                direction='column'
                spacing={2}
                justifyContent='center'
                sx={{
                    postion: 'relative'
                }}
            >
                <Paper
                    style={{
                        padding: '1rem',
                        textAlign: 'center'
                    }}
                >
                    <Typography
                        variant='h6'
                    >
                        Headers
                    </Typography>
                </Paper>
                <Stack
                    direction='column'
                    spacing={2}
                    justifyContent='center'
                    maxHeight='18vh'
                    sx={{
                        overflowY: 'auto'
                    }}
                >
                    {headers && headers.map((header, index) => (
                        <Stack
                            key={index}
                            direction='row'
                            spacing={2}
                            justifyContent='center'
                        >
                            <Checkbox />
                            <TextField
                                fullWidth
                                variant='standard'
                                label='Header Key'
                            />
                            <TextField
                                fullWidth
                                variant='standard'
                                label='Header Value'
                            />
                            <IconButton
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
                        bottom: '0'
                    }}
                >
                    <Button
                        variant='outlined'
                        color='primary'
                        onClick={handleAddHeader}
                        endIcon={
                            <Send />
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