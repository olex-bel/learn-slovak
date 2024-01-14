
import { useParams } from "react-router-dom";
import Quiz from "../features/quiz/Quiz";

export default function Lesson() {
    const { id } = useParams();

    return <Quiz topicId={+id!} />;
}