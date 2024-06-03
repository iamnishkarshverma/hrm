import mongoose, { Schema } from "mongoose";

const EmployeeSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        mobile: {
            type: Number,
            required: true,
        },
        gender: {
            type: String,
            required: true
        },
        dob: {
            type: Date,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        profileImage: {
            type: String,
            required: false,
            default: "https://cdn.pixabay.com/photo/2017/07/18/23/40/group-2517459_1280.png"
        },
        department: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true,
        },
        tc: {
            type: Boolean,
            required: true
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        roles: {
            type: [Schema.Types.ObjectId],
            required: true,
            ref: "Role"
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model("Employee", EmployeeSchema);