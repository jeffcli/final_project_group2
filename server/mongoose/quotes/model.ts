import mongoose, {model} from "mongoose"; 
import { QuoteSchema, QuoteType } from "./schema";
export default mongoose.models.quotes  || model<QuoteType>("quotes", QuoteSchema); 