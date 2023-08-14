import http from "../http-common";

class TodoDataService {
    getAll() {
        return http.get("/todo");
    }

    get(id) {
        return http.get(`/todo/${id}`);
    }

    create(data) {
        return http.post("/todo", data);
    }

    update(id, data) {
        return http.put(`/todo/${id}`, data);
    }

    delete(id) {
        return http.delete(`/todo/${id}`);
    }

    findByTitle(title) {
        return http.get(`/todo?title=${title}`);
    }
}

export default new TodoDataService();