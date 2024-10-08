import {Schema, InferSchemaType} from 'mongoose';
export const HabitsSchema:Schema = new Schema<HabitsType>({
    userName:{
        type:String, 
        required:true, 
    }, 
    description:{
        type: String, 
        required: true, 
    },
    created: {
        type: Date,
        required: true,
    },
    completed: {
        type: [Date],
        required: true,
    }
}); 
export declare type HabitsType = InferSchemaType<typeof HabitsSchema>

