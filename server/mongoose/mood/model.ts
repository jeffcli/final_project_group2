import mongoose, {model} from "mongoose"; 
import { MoodType, MoodSchema } from "./schema";
export default mongoose.models.mood  || model<MoodType>("mood", MoodSchema); 