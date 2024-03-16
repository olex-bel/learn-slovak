import { useQuery } from "react-query";
import { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TestWordCard from "./TestWordCard";
import { getTestCards } from "./cardsUtils";

type TestCardListProps = {
    onFinish: () => void;
}

export default function TestCardList({ onFinish } : TestCardListProps) {
    const {isLoading, isError, data} = useQuery(["words"], () => getTestCards());
    const [currentIndex, setCurrentIndex] = useState(0);

    if (isLoading && !data) {
        return (
            <Box>Завантаження...</Box>
        );
    }

    if (isError || !data) {
        return (
            <Box sx={{ color: "error" }}>Виникла помилка...</Box>
        );
    }

    if (data.length === 0) {
        <Box>Нема питань для перевірки</Box>;
    }
    
    const currentCard = data[currentIndex];
    const isLastQuestion = currentIndex === (data.length - 1);

    const handleNext = function () {
        setCurrentIndex((prevIndex) => prevIndex + 1);
    };

    return (
        <Stack 
            justifyContent="center"
            alignItems="center"
            spacing={2}
        >
            <TestWordCard key={currentIndex} {...currentCard} isLastQuestion={isLastQuestion} onNextCard={isLastQuestion? onFinish: handleNext } />
        </Stack>
    );
}