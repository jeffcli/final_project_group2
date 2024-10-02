import {Schema, InferSchemaType} from 'mongoose'; 
export const FriendsSchema:Schema = new Schema<FriendsType>({
    userName:{
        type:String, 
        required:true, 
    }, 
    friends:{
        type:[String], 
    }
}); 
export declare type FriendsType = InferSchemaType<typeof FriendsSchema>
