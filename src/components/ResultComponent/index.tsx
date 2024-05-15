import React from 'react';
import { Stack } from '@mui/material';

import './styles.css';
import HeaderTitle from '../HeaderTitle';

const ResultComponent = () => {
    return (
        <Stack
            width='30vw'
        >
            <HeaderTitle
                title='Resposta da Requisição'
            />
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