import mongoose, {model} from "mongoose"; 
import { HabitsType, HabitsSchema } from "./schema";
export default mongoose.models.habits || model<HabitsType>("habits", HabitsSchema); 