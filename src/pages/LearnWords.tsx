import { useNavigate } from "react-router-dom";
import LernWordCardList from "../features/words/LearnWordCardList";

export function Component() {
    const navigate = useNavigate();

    const handleFinish = () => {
        navigate(-1);
    };

    return (
        <LernWordCardList onFinish={handleFinish} />
    );
}

Component.displayName = "LeanWords";