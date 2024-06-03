import Role from "../models/role.js";
import { CreateError } from "../utils/error.js";
import { CreateSuccess } from "../utils/success.js";

// Create Role
export const createRole = async(req,res, next)=>{
    try{
        if(req.body.role && req.body.role !== ''){
            const newRole = new Role(req.body);
            await newRole.save();
            return next(CreateSuccess(200, "Role Created Successfully!"));
        }
        else{
            // return res.status(400).send("Bad Request");
            return next(CreateError(400,"Bad Request"));
        }
    }
    catch(error){
        // return res.status(500).send("Internal Server Error!");
        return next(CreateError(400,"Internal Server Error!"));
    }
}

// Update Role
export const updateRole = async(req,res, next)=>{
    try{
        const role = await Role.findById({_id: req.params.id})
        if (role){
            const newData = await Role.findByIdAndUpdate(
                req.params.id,
                {$set: req.body},
                {new: true}
            );
            // return res.status(200).send("Role Updated");
            return next(CreateSuccess(200, "Role Updated Successfully!"));
        }
        else{
            return next(CreateError(404,"Role  Not Found"));
        }
    }catch(error){
        return next(CreateError(500,"Internal Server Error"));
    }
}

// Get All Roles from DB
export const getAllRoles = async (req,res,next)=>{
    try {
        const roles = await Role.find({});
        // return res.status(200).send(roles);
        return next(CreateSuccess(200, roles));
    } catch (error) {
        return next(CreateError(500,"Internal Server Error"));
    }
}

// Delete A role from DB
export const deleteRole = async(req,res,next)=>{
    try{
        const roleId = req.params.id;
        const role = await Role.findById({_id: roleId});
        if(role){
            await Role.findByIdAndDelete(roleId);
            // return res.status(200).send("Role Deleted");
            return next(CreateSuccess(200, "Role Deleted Successfully!"));
        }
        else{
            // return res.status(404).send("Role not found");
            return next(CreateError(404,"Role not Found"));
        }
    }
    catch(error){
        // res.status(500).send("Internal Server Error!");
        return next(CreateError(500,"Internal Seerver Error!"));
    }
}

