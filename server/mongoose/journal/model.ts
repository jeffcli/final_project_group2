import mongoose, {model} from "mongoose";
import { JournalType, JournalSchema } from "./schema";
export default mongoose.models.journal|| model<JournalType>("journal", JournalSchema);
