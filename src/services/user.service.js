import UserRepository from "../repositories/user.repository.js";

class UserService {
    static getAllUsers() {
        return UserRepository.findAll();
    }

    static getUserById(id) {
        return UserRepository.findById(id);
    }

    static createUser(data) {
        return UserRepository.create(data);
    }

    static updateUser(id, data) {
        return UserRepository.update(id, data);
    }

    static deleteUser(id) {
        return UserRepository.delete(id);
    }
}

export default UserService;
