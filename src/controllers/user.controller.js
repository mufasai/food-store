import UserService from "../services/user.service.js";
import { createUserSchema, updateUserSchema } from "../validations/user.validation.js";


class UserController {
    static async getAll(req, res, next) {
        try {
            const users = await UserService.getAllUsers();
            res.json(users);
        } catch (err) {
            next(err);
        }
    }

    static async getById(req, res, next) {
        try {
            const user = await UserService.getUserById(req.params.id);
            res.json(user);
        } catch (err) {
            next(err);
        }
    }

    static async create(req, res) {
        try {
            const validatedData = createUserSchema.parse(req.body);

            const user = await UserService.createUser(validatedData);
            res.status(201).json(user);

        } catch (err) {
            next(err);
        }
    }


    static async update(req, res) {
        try {
            const validatedData = updateUserSchema.parse(req.body);

            const user = await UserService.updateUser(req.params.id, validatedData);
            res.json(user);

        } catch (err) {
            next(err);
        }
    }


    static async remove(req, res, next) {
        try {
            await UserService.deleteUser(req.params.id);
            res.json({ message: "Deleted" });
        } catch (err) {
            next(err);
        }
    }
}

export default UserController;
