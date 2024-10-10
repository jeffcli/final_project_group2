import {Schema, InferSchemaType} from 'mongoose';
export const JournalSchema:Schema = new Schema<JournalType>({
    title:{
        type:String,
        required:true,
    },
    entry:{
        type:String,
        required: true,
    },
    userName:{
        type:String,
        required: true,
    },
    dateCreated:{
        type:Date,
        required: true,
    },

});
export declare type JournalType = InferSchemaType<typeof JournalSchema>

