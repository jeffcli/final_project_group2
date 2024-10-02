import mongoose, {model} from "mongoose"; 
import { FriendsType, FriendsSchema } from "./schema";
export default mongoose.models.friends || model<FriendsType>("friends", FriendsSchema); 
 