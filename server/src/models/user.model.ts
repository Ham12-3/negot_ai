import { model, Schema , Document} from "mongoose";

export interface IUser extends Document {
    googleId: string;
    email:string;
    displayName: string;
    profilePicture: string;

}


const UserSchema:Schema = new Schema({
    googleId: {
        type:String,
        required: true,
        unique:true
    },
    email: {
        type: String,
        required: true,

    },
    displayName: {
        type:String,
        required: true
    },
    profilePicture: {
        type: String,
        required: false
    }
})



export default model<IUser>("User", UserSchema)