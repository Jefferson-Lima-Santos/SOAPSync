import { Card, Typography } from '@mui/material';

interface TextCardProps {
    htmlText: string;
    Icon: any;
}

const TextCard = ({ htmlText, Icon }: TextCardProps) => {
    return (
        <Card
            sx={{
                position: 'relative',
                backgroundColor: 'transparent',
                padding: '1rem'
            }}
        >
            <Typography
                border={0}
                boxShadow={undefined}
                color='white' fontSize={20}
                dangerouslySetInnerHTML={{ __html: htmlText }}
            />
            <Icon />
        </Card>
    );
}

export default TextCard;