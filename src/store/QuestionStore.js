import {action, makeAutoObservable, observable} from "mobx";

class QuestionStore {

    currentQuestionRecord = {}

    constructor() {
        makeAutoObservable(this)
    }
    @action setCurrentQuestionRecord(record) {
        this.currentQuestionRecord = record
    }
}

export default new QuestionStore()