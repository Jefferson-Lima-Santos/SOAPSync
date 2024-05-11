import React from 'react';
import { Stack, Paper, Typography } from '@mui/material';

import './styles.css';

const ResultComponent = () => {
    return (
        <Stack
            width='30vw'
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
                    Resposta da Requisição
                </Typography>
            </Paper>
            <Stack
                direction='column'
                spacing={2}
                justifyContent='center'
            >
                Colocar Algo aqui Depois
                Talvez colocar o Histórico de requisições/Header
            </Stack>
        </Stack>
    );
}

export default ResultComponent;