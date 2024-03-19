import { useParams } from "react-router-dom";
import Quiz from "../features/quiz/Quiz";

export function Component() {
    const { id } = useParams();

    return (
        <Quiz topicId={+id!} />
    );
}

Component.displayName = "Lesson";