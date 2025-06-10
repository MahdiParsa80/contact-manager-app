import { COLOR1 ,COLOR4, } from "../helpers/colors";
import SearchContact from "./Contact/SearchContact";

// Define the Navbar component
const Navbar = () =>{
    
    return(
        // Render the navigation bar with a title and a search component
        <nav className=" shadow-lg h-20 sticky top-0 bg-[#222831c4]  backdrop-filter backdrop-blur-2xl" >
            <div className="flex justify-center items-center h-full">
                <div className="flex md:w-2/3 justify-around">
                    <div className="col " style={{color:COLOR4}}>
                        <i className="fa fa-id-badge text-sm" style={{color:COLOR4, margin: '5px'}}></i>
                        وب اپلیکیشن مدیریت مخاطبین
                    </div>    
                    <div>
                        <SearchContact/>
                    </div>
                </div>
            </div>
        </nav>
    )
}

// Export the Navbar component
export default Navbar;