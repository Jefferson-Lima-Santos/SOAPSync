import { Stack, Typography } from '@mui/material';

interface HeaderTitleProps {
    title: string;
    size?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    color?: 'primary' | 'secondary' | 'textPrimary' | 'textSecondary' | 'primary.contrastText';
}

const HeaderTitle = (props: HeaderTitleProps) => {
    const { title, size = 'h5', color = 'primary.contrastText' } = props;
    return (
        <Stack
            style={{
                padding: '0.5rem',
                textAlign: 'center',
                backgroundColor: '#080B13',
            }}
        >
            <Typography
                variant={size}
                color={color}
            >
                {title}
            </Typography>
        </Stack>
    )
}

export default HeaderTitle;