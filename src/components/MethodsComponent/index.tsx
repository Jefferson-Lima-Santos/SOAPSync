import { useState } from 'react';
import { Stack, Button, Paper, Typography, Tooltip } from '@mui/material';
import { Info, CheckCircle, AddCircleOutline } from '@mui/icons-material';
import context from '../../utils/context.json';
import HeaderTitle from '../HeaderTitle';


const MethodsComponent = () => {
    const [selectedMethod, setSelectedMethod] = useState('Get');
    const [appConfig] = useState(context);
    const { Methods } = appConfig;

    return (
        <Stack
            minWidth='20vw'
            position='relative'
            spacing={2}
        >
            <HeaderTitle
                title='Selecionar Métodos'
                size='h5'
            />
            <Stack
                direction='column'
                spacing={2}
                justifyContent='center'
                padding='0 1rem'
            >
                {Methods.map((method, index) => (
                    selectedMethod === method.name ? (
                        <Button
                            key={index}
                            variant='text'
                            color='success'
                            sx={{
                                justifyContent: 'space-between'

                            }}
                            startIcon={
                                <CheckCircle
                                    color='success'
                                />}
                            endIcon={
                                <Tooltip
                                    title={method.description}
                                >
                                    <Info
                                        color='primary'
                                    />
                                </Tooltip>
                            }
                        >
                            {method.name}
                        </Button>
                    ) : (
                        <Button
                            key={index}
                            variant='text'
                            color='primary'
                            startIcon={<AddCircleOutline />}
                            sx={{
                                justifyContent: 'space-between'

                            }}
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
            <Paper
                style={{
                    padding: '1rem 0',
                    textAlign: 'center',
                    position: 'absolute',
                    bottom: '0',
                    width: '100%'
                }}
            >
                <Typography
                    variant='h6'
                >
                    Criado por: <strong>Lucas</strong>
                </Typography>
            </Paper>
        </Stack>
    );
}

export default MethodsComponent;