import React from 'react';
import { Stack, Button, Grid, Paper, Typography } from '@mui/material';

import './styles.css';

const ResultComponent = () => {
    return (
        <Grid
            container
            spacing={2}
        >
            <Grid
                item
                xs={12}
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
            </Grid>
            <Grid
                item
                xs={12}
            >
                <Stack
                    direction='column'
                    spacing={2}
                    justifyContent='center'
                >
                    Colocar Algo aqui Depois
                    Talvez colocar o Histórico de requisições/Header
                </Stack>
            </Grid>
        </Grid>
    );
}

export default ResultComponent;