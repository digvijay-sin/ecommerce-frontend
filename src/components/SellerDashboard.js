import Button from "react-bootstrap/Button";
import {auth} from "../utils/firebase.config";

const SellerDashboard = () => {

    const handleSignout = async() => {
        try {            
            await auth.signOut();
            window.location.href = "./login";
            console.log("User signedOut successfully.");
        } catch (error) {
            console.log("Error message", error);            
        }
    }
    
    return (
        <>
            <h1>Welcome to Seller Dashbaord! You have successfully signed in</h1>
            <Button onClick={handleSignout}>SignOut</Button>
        </>
    )
}

export default SellerDashboard;