import mongoose, {model} from "mongoose";
import { JournalType, JournalSchema } from "./schema";
export default mongoose.models.friends || model<JournalType>("journal", JournalSchema);
