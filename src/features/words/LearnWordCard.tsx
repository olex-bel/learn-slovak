
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

type LernWordCardProps = {
  word: string;
  info: string;
  isLastWord: boolean;
  onNextCard: () => void;
}

export default function LernWordCard({ word, info, isLastWord, onNextCard } : LernWordCardProps) {
    return (
        <Card 
            sx={
                {
                    width: { xs: "360px", md: "480px" },
                }
            }
        >
            <CardContent sx={{
                minHeight: "200px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
            }}>
                <Typography variant="h3">{word}</Typography>
                <Typography>{info}</Typography>
            </CardContent>
            <CardActions sx={{
                marginRight: "1rem",
                justifyContent: "end",
            }}>
                <Button onClick={onNextCard}>{isLastWord? "Завершити" : "Наступне"}</Button>
            </CardActions>
        </Card>
    );
}