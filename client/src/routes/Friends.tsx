import { FriendComponent } from "@/components/FriendComponent"
export const Friends = () => { 
    return(
        <div className="h-screen w-full font-poppins  grid grid-cols-2">
            {/* <div className = "flex flex-row  justify-center col-span-1">
                
                <div className = "text-left text-3xl ml-5 mt-10">
                    Your friends: 
                    <FriendComponent name="Dante Giles" photoURL="" relation="Booch"/>
                </div>        
            </div> */}
            <div className = "flex flex-row  justify-center col-span-1">
                
            <div className = "text-left text-3xl ml-5 mt-10">
                Your friends: 
                <FriendComponent name="Dante Giles" photoURL="" relation="Booch"/>
                <FriendComponent name="Dante Giles" photoURL="" relation="Booch"/>

            </div>        
        </div>
        <div className = "flex flex-row  justify-center col-span-1">
                
            <div className = "text-left text-3xl ml-5 mt-10">
                Your friends: 
                <FriendComponent name="Dante Giles" photoURL="" relation="Booch"/>
                <FriendComponent name="Dante Giles" photoURL="" relation="Booch"/>

            </div>        
        </div>
           
           
        </div>
    )
}   