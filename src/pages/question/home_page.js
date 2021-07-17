import React from "react";
import QuestionTableComponent from "@/components/question/table_component";
import UpdateModalComponent from "@/components/question/update_modal_component";
import InsertModalComponent from "@/components/question/insert_modal_component";

const QuestionHomePage = () => {
    return (
        <>
            <QuestionTableComponent />
            <UpdateModalComponent />
            <InsertModalComponent />
        </>
    )
}

export default QuestionHomePage