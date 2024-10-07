import {Schema, InferSchemaType} from 'mongoose';
export const FriendsSchema:Schema = new Schema<FriendsType>({
    userName:{
        type:String, 
        required:true, 
    }, 
    friends:{
        type:[Object], 
        required: true, 
    }
}); 
export declare type FriendsType = InferSchemaType<typeof FriendsSchema>

