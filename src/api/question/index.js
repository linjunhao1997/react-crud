import { BASE_REQUEST } from "@/utils/request/base_request";

const login = (username, password, ...params) => {
    return BASE_REQUEST.post('/api/question/_search', {
        username: username,
        password: password,
    })
}