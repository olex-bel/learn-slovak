import { useNavigate } from "react-router-dom";
import TestWordCardList from "../features/words/TestWordCardList";

export function Component() {
    const navigate = useNavigate();

    const handleFinish = () => {
        navigate(-1);
    };

    return (
        <TestWordCardList onFinish={handleFinish} />
    );
}

Component.displayName = "TestWords";