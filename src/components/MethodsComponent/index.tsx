import React, { useState } from 'react';
import { Stack, Button, Grid, Paper, Typography, Tooltip } from '@mui/material';
import { Info, CheckCircle, AddCircleOutline } from '@mui/icons-material';
import context from '../../utils/context.json';


const MethodsComponent = () => {
    const [selectedMethod, setSelectedMethod] = useState('Get');
    const [appConfig] = useState(context);
    const { Methods } = appConfig;

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
                        Selecionar Métodos
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
                    {Methods.map((method, index) => (
                        selectedMethod === method.name ? (
                            <Button
                                key={index}
                                variant='outlined'
                                color='success'
                                startIcon={
                                    <CheckCircle
                                        color='success'
                                    />}
                                endIcon={
                                    <Tooltip
                                        title={method.description}
                                    >
                                        <Info />
                                    </Tooltip>
                                }
                            >
                                {method.name}
                            </Button>
                        ) : (
                            <Button
                                key={index}
                                variant='outlined'
                                color='primary'
                                startIcon={<AddCircleOutline />}
                                endIcon={
                                    <Tooltip
                                        title={method.description}
                                    >
                                        <Info />
                                    </Tooltip>
                                }
                                onClick={() => setSelectedMethod(method.name)}
                            >
                                {method.name}
                            </Button>
                        )
                    ))}
                </Stack>
            </Grid>
            <Grid
                item
                xs={12}
                display='flex'
                flexDirection='column'
                justifyContent='flex-end'
                flexWrap='wrap'
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
                        Criado por: <strong>Lucas</strong>
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default MethodsComponent;