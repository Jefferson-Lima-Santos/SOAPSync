import { useState } from 'react';
import { Stack, Button, Paper, Typography, Tooltip } from '@mui/material';
import { Info, CheckCircle, AddCircleOutline } from '@mui/icons-material';
import TextCard from '../TextCard';
import { Player } from '@lottiefiles/react-lottie-player';
import RobotJson from '../../assets/lottie/robot-help.json';
import context from '../../utils/context.json';
import HeaderTitle from '../HeaderTitle';


const MethodsComponent = () => {
    const [selectedMethod, setSelectedMethod] = useState('Get');
    const [appConfig] = useState(context);
    const { Methods } = appConfig;
    const infoComponent = () => {
        return (
        <Info 
            color='primary' 
            sx={{
                position: 'absolute',
                right: '1rem',
                bottom: '1rem'
            }}
            />)
    }
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
                                justifyContent: 'space-between',
                                backgroundColor: '#fff',
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
            <Stack
                direction='column'
                spacing={2}
                justifyContent='center'
                padding='0 1rem'
                sx={{
                    position: 'absolute',
                    bottom: '0',
                }}
            >
                <Player
                    autoplay
                    loop
                    src={RobotJson}
                    style={{width: '70%', height: '70%'}}
                >
                </Player>
                <TextCard 
                    htmlText='Caso tenha alguma <strong>dúvida</strong> relacionada aos <strong>métodos</strong>, basta passar o mouse no icone'
                    Icon={infoComponent}
                />
                <Stack
                    style={{
                        padding: '1rem 0',
                        textAlign: 'center',
                        width: '100%',
                        color: '#fff'
                    }}
                >
                    <Typography
                        variant='h6'
                    >
                        SOAP <strong>SYNC</strong>
                    </Typography>
                </Stack>
            </Stack>
        </Stack>
    );
}

export default MethodsComponent;