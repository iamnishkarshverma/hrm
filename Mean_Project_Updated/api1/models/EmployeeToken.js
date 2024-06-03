import mongoose, {Schema} from "mongoose";

const TokenSchema = mongoose.Schema({
    employeeId:{
        type: Schema.Types.ObjectId,
        required: true,
        ref:"Employee"
    },

    token:{
        type: String,
        required: true
    },
    
    createdAt:{
        type:Date,
        default: Date.now,
        expires: 300
    } 
})

export default mongoose.model("Token", TokenSchema);