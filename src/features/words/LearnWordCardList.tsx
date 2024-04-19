import { useQuery } from "react-query";
import { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import LernCard from "./LearnWordCard";
import { getLearnCards } from "./cardsUtils";

type LernCardListProps = {
    onFinish: () => void;
}

export default function LernWordCardList({ onFinish } : LernCardListProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const {isLoading, isError, data} = useQuery(["words"], () => getLearnCards());

    if (isLoading && !data) {
        return (
            <Box>Завантаження...</Box>
        );
    }

    if (isError || !data) {
        return (
            <Box sx={{ color: "error" }}>Ой...виникла помилка.</Box>
        );
    }

    if (data.length === 0) {
        <Box>Нема слов для навчяння</Box>;
    }

    const currentCard = data[currentIndex];
    const isLastWord = currentIndex === (data.length - 1);

    const handleNext = function () {
        setCurrentIndex((prevIndex) => prevIndex + 1);
    };

    return (
        <Stack 
            justifyContent="center"
            alignItems="center"
            spacing={2}
            mt={2}
        >
            <LernCard key={currentIndex} word={currentCard.word} info={currentCard.info} isLastWord={isLastWord} onNextCard={isLastWord? onFinish : handleNext} />
        </Stack>
    );
}
