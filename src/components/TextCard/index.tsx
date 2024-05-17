import { Card, Typography } from '@mui/material';

interface TextCardProps {
    htmlText: string;
    Icon: any;
}

const TextCard = ({ htmlText, Icon }: TextCardProps) => {
    return (
        <Card
            sx={{
                padding: '1rem',
                position: 'relative',
            }}
        >
            <Typography
                dangerouslySetInnerHTML={{ __html: htmlText }}
            />
            <Icon/>
        </Card>
    );
}

export default TextCard;