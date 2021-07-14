import {action, makeAutoObservable, observable} from "mobx";

class QuestionStore {

    currentQuestionRecord = {}

    refreshTime = Date.parse(new Date())

    updateModelVisible = false

    constructor() {
        makeAutoObservable(this)
    }
    @action setCurrentQuestionRecord(record) {
        this.currentQuestionRecord = record
    }

    @action refresh() {
        this.refreshTime = Date.parse(new Date());
        console.log(this.refreshTime)
    }

    @action setUpdateModelVisible(visible) {
        this.updateModelVisible = visible
        console.log(this.updateModelVisible)
    }


}

export default new QuestionStore()