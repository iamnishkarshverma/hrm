// import jwt from 'jsonwebtoken';
// import { CreateError } from './error.js';
// import Employee from '../models/employee.js';

// export const verifyToken = (req, res, next) => {
//     const token = req.cookies.access_token;
//     if (!token)
//         return next(CreateError(401, "You are not authenticated"));
//     else {
//         jwt.verify(token, process.env.JWT_SECRET, (err, employee) => {
//             if (err) {
//                 return next(CreateError(401, "Token is not Valid"));
//             }
//             else {
//                 req.employee = employee;
//             }
//             next();
//         })
//     }
// }

// export const verifyEmployee = (req, res, next) => {
//     verifyToken(req, res, () => {
//         if (req.Employee.id === req.params.id || req.Employee.isAdmin) {
//             next();
//         }
//         else {
//             return next(CreateError(403, "You are not authorized"))
//         }
//     })
// }

// export const verifyAdmin = (req, res, next) => {
//     verifyToken(req, res, () => {
//         if (req.Employee.isAdmin) {
//             next();
//         }
//         else {
//             return next(CreateError(403, "You are not authorized!"))
//         }
//     })
// }