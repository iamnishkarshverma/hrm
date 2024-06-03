import Role from "../models/role.js";
import Employee from "../models/employee.js";
import bcrypt from "bcryptjs";
import { CreateError } from "../utils/error.js";
import { CreateSuccess } from "../utils/success.js";
import jwt from "jsonwebtoken";
import role from "../models/role.js";
import EmployeeToken from "../models/EmployeeToken.js";
import nodemailer from 'nodemailer';


// Create Register Controller
export const register = async (req, res, next) => {
    const role = await Role.find({ role: 'User' });
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const newEmployee = new Employee({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        mobile: req.body.mobile,
        gender: req.body.gender,
        dob: req.body.dob,
        address: req.body.address,
        department: req.body.department,
        tc: req.body.tc,
        password: hashPassword,
        roles: role
    });
    await newEmployee.save();
    return res.status(200).json("Employee Registered Successfully!");
}

// Create Login Controller
export const login = async (req, res, next) => {
    try {
        const employee = await Employee.findOne({ email: req.body.email })
            .populate("roles", "role");

        const { roles } = employee;
        if (!employee) {
            // return res.status(404).send("Employee Not Found!");
            return next(CreateError(404, "Employee Not Found"));
        }
        const isPasswordCorrect = await bcrypt.compare(req.body.password, employee.password);
        if (!isPasswordCorrect) {
            // return res.status(404).send("Password is Incorrect!");
            return next(CreateError(404, "Password is Incorrecct!"));
        }

        const token = jwt.sign(
            { id: employee._id, isAdmin: employee.isAdmin, roles: roles },
            process.env.JWT_SECRET
        )
        res.cookie("Access Token", token, { httpOnly: true })
            .status(200)
            .json({
                status: 200,
                message: "Login Success",
                data: employee
            })
            console.log(token)
        // return  next(CreateSuccess(200, "Employee login Successfully!"));


    } catch (error) {
        // return res.status(500).send("Something  Went Wrong!")
        return next(CreateError(500, "Something Went Wrong"));
    }
}

// Register Admin Controller
export const registerAdmin = async (req, res, next) => {
    const role = await Role.find({});
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const newEmployee = new Employee({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        mobile: req.body.mobile,
        gender: req.body.gender,
        dob: req.body.dob,
        address: req.body.address,
        department: req.body.department,
        tc: req.body.tc,
        password: hashPassword,
        isAdmin: true,
        roles: role
    });
    await newEmployee.save();
    return next(CreateSuccess(200, "Admin Registered Successfully!"));
}

// Send Email Controller
export const sendEmail = async (req, res, next) => {
    const email = req.body.email;
    const employee = await Employee.findOne({ email: { $regex: '^' + email + '$', $options: 'i' } });
    if (!employee) {
        return next(CreateError(404, "Employee Not  found to rest the email!"))
    }
    const payload = {
        email: employee.email
    }
    const expiryTime = 300;
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: expiryTime });

    const newToken = new EmployeeToken({
        employeeId: employee._id,
        token: token
    });

    const mailTransporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "code.ryl0000@gmail.com",
            pass: "nfkxdxoxeiyqtoso"
        }
    });

    let mailDetails = {
        from: "code.ryl0000@gmail.com",
        to: email,
        subject: "Reset Password",
        html: `
        <html>
            <head>
                <title>Password  Reset Request</title>
            </head>
            <body>
                <h1>Password Reset Request</h1>

                <p>Dear ${employee.firstName},</p>

                <p>We have received a request to reset your password for your account with HR Management. To complete the password reset process, please click on the button below:</p>

                <a href=${process.env.LIVE_URL}/reset/${token}>
                     <button>Reset Password</button>
                </a>

                <p>Please note that this link is only valid for 5 mins. If you did not request a password reset, please disregard this message</p>
                
                <p>Thank You</p>

                <p>Coderyl Team</p>
            </body>
        </html>
        `
    };

    mailTransporter.sendMail(mailDetails, async (err, data) => {
        if (err) {
            console.log(err);
            return next(CreateError(500, "Something went wrong  while sending the email"))
        }
        else {
            await newToken.save();
            return next(CreateSuccess(200, "Email Sent Successfully"))
        }
    })
}

// Reset-Password
export const resetPasssword = (req, res, next) => {
    const token = req.body.token;
    const newPassword = req.body.password;

    jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
        if (err) {
            return next(CreateError(500, "Reset Link is Expired!"))
        }
        else {
            const response = data;
            const employee = await Employee.findOne({ email: { $regex: '^' + response.email + '$', $options: 'i' } });
            const salt = await bcrypt.genSalt(10);
            const encryptedPassword = await bcrypt.hash(newPassword, salt);
            employee.password = encryptedPassword;
            try {
                const updatedEmployee = await Employee.findOneAndUpdate(
                    { _id: employee._id },
                    { $set: employee },
                    { new: true }
                )
                return next(CreateSuccess(200, "Passsword Reset Success"))
            }
            catch (error) {
                return next(CreateError(500, "Something   Went  Wrong while resetting  the password"))

            }
        }
    })
}