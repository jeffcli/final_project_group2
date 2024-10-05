import { withAuthenticationRequired } from "@auth0/auth0-react";
interface Props{
    component: React.ComponentType
}; 
export const AuthenticationGuard = (props:Props) => { 
    const Component = withAuthenticationRequired(props.component, { 
        onRedirecting: () => { 
            return(
                <div>Loading!</div>
            )
        }
    }); 
    return  <Component/>

}
