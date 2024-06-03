import Employee from "../models/employee.js";
import { CreateError } from "../utils/error.js"
import { CreateSuccess } from "../utils/success.js";

export const getAllEmployees = async (req, res, next) => {
    try {
        const employees = await Employee.find();
        return next(CreateSuccess(200, "All Employess", employees))
    } catch (error) {
        return next(CreateError(500, "Internal Server Error"));
    }
}

export const getById = async (req, res, next) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee)
            return next(CreateError(404, "Employee Not found!"));
        else {
            return next(CreateSuccess(200, "Single Employee", employee));
        }
    } catch (error) {
        return next(CreateError(500, "Internal Server Error"));
    }
}