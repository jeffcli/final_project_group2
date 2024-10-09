import {Schema, InferSchemaType} from 'mongoose';
export const QuoteSchema:Schema = new Schema<QuoteType>({
    userName:{
        type:String, 
        required:true, 
    }, 
    quote:{
        type: String, 
        required: true, 
    },
}); 
export declare type QuoteType = InferSchemaType<typeof QuoteSchema>

