import React, { useRef } from 'react';

import Editor from '@monaco-editor/react';

const MonacoEditor = () => {
    const editorRef = useRef<any>(null);

    function handleEditorDidMount(editor : any, monaco : any) {
        editorRef.current = editor;
    }

    function showValue() {
        if (editorRef?.current)
            alert(editorRef.current.getValue());
    }

    return (
        <>
            <button onClick={showValue}>Show value</button>
            <Editor
                height="90vh"
                width="50vw"
                defaultLanguage="javascript"
                defaultValue="// some comment"
                onMount={handleEditorDidMount}
            />
        </>
    );
}

export default MonacoEditor;