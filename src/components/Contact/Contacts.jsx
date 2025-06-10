import { useContext } from "react";
import { Link } from "react-router-dom";
import { COLOR1, COLOR2, COLOR3, COLOR4, COLOR5, COLOR6 } from "../../helpers/colors"
import Contact from "./contact";
import notfound from "../../assets/404+error.gif"
import LoadGif from "../LoadGif.jsx";
import { contactContext } from "../../context/contactContext.js";
const Contacts =()=>{
    const {filteredContacts,loading,confirmDelete}=useContext(contactContext)
    return(
        <>
            <h3 className="fixed bottom-15 right-2  md:bottom-20 md:right-20">
                <Link to={'/AddContact'}>
                    <button className="w-10 h-10 md:w-auto md:h-auto md:mx-2 p-1 md:p-2 rounded-full md:rounded-2xl " style={{backgroundColor:COLOR3,color:COLOR2}}>
                        <span className="h3 hidden md:block">ساخت مخاطب جدید
                        <i className="fa fa-plus-circle mx-2"></i>
                        </span>
                        <i className="fa fa-plus-circle md:!hidden"></i>
                    </button>
                </Link>
            </h3>
                     
            {
                loading?<LoadGif/>:(
                <section className="w-[98vw] flex justify-center">
                    <section className="flex justify-center w-3/4">
                        <div className="flex flex-wrap">
                            {
                                filteredContacts.length>0? filteredContacts.map(c =>(
                                    <Contact key={c.id} contact={c} confirmDelete={()=>confirmDelete(c.id,c.fullName)}/>
                                )):(
                                    <div className="flex justify-center h-[75vh] items-center">
                                        <div className="flex flex-col items-center rounded-4xl justify-center py-5" style={{backgroundColor:COLOR5}}>
                                            <h3 className="text-5xl m-5 text-orange-500">مخاطب یافت نشد...</h3>
                                            <img src={notfound} alt="not found" className="w-75 rounded-full" />
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </section>
                </section>
                )
            }
        </>
    )
}
export default Contacts