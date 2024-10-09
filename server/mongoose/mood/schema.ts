import {Schema, InferSchemaType} from 'mongoose';
export const MoodSchema:Schema = new Schema<MoodType>({
    userName:{
        type:String, 
        required:true, 
    }, 
    moods:{
        type: [String], 
        required: true, 
    },
}); 
export declare type MoodType = InferSchemaType<typeof MoodSchema>

