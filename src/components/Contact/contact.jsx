import { COLOR4 ,COLOR3 ,COLOR2, COLOR1, COLOR5, COLOR6 ,} from "../../helpers/colors"
import { NavLink } from "react-router-dom"
import '../../../index.css'
const Contact =({contact,confirmDelete})=>{
    const listStyle = 'text-sm md:p-3 text-white border-white p-2'
    const buttonStyle = 'w-10 h-10 rounded-xl m-1'
    return(
        <div className="w-[100%] md:w-[50%]">
            <div style={{backgroundColor:COLOR2}} className="m-2 px-1 rounded-2xl">
                <div className="p-3">
                    <div className="items-center flex flex-wrap justify-around">
                        <div className="m-1">
                            <img src={contact.photo} alt="aks" className="rounded-full w-20 h-20 md:w-40 md:h-40 object-cover"/>
                        </div>
                        <div className="flex items-center w-[100%] md:w-[60%] m-2">
                            <ul className="rounded-3xl bg-[#778192] w-[100%] " >
                                <li className={listStyle}>
                                    نام و نام خانوادگی :{" "}
                                    <span className="fw-bold">
                                        {contact.fullName}
                                    </span>
                                </li>
                                <li className={`${listStyle} border-y`}>
                                    رایانامه:{" "}
                                    <span className="fw-bold">
                                        {contact.email}
                                    </span>
                                </li>
                                <li className={listStyle}>
                                    تلفن:{" "}
                                    <span className="fw-bold">
                                        {contact.mobile}
                                    </span>
                                </li>
                            </ul>
                        </div>
                        <div className="flex md:flex-col items-center">
                            <NavLink to={`/editcontact/${contact.id}`}>
                                <button className={buttonStyle} style={{backgroundColor:COLOR5}}>
                                    <i className="fa fa-pencil  text-white"></i>    
                                </button>
                            </NavLink>
                            <NavLink to={`/ViewContact/${contact.id}`} key={contact.id}>
                                <button className={buttonStyle} style={{backgroundColor:COLOR6}}>
                                    <i className="fa fa-eye text-white"></i>
                                </button>
                            </NavLink>
                            <button className={`${buttonStyle} bg-red-600`} onClick={confirmDelete}>
                                <i className="fa fa-trash text-white p-1"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Contact