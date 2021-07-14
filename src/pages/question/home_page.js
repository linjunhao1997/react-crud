import React from "react";
import QuestionTableComponent from "@/components/question/table_component";
import UpdateModalComponent from "@/components/question/update_modal_component";

const QuestionHomePage = () => {
    return (
        <>
            <QuestionTableComponent />
            <UpdateModalComponent />
        </>
    )
}

export default QuestionHomePage