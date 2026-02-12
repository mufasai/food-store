import User from "../models/user.model.js";

class UserRepository {
    static findAll() {
        return User.find();
    }

    static findById(id) {
        return User.findById(id);
    }

    static create(data) {
        return User.create(data);
    }

    static update(id, data) {
        return User.findByIdAndUpdate(id, data, { new: true });
    }

    static delete(id) {
        return User.findByIdAndDelete(id);
    }
}

export default UserRepository;
