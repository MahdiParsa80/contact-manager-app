import { COLOR3 } from "../../helpers/colors"
import{useLocation} from "react-router-dom"
import { useContext } from "react"
import { contactContext } from "../../context/contactContext"


const SearchContact = ()=>{
    const location=useLocation()
    const {contactSearch} =useContext(contactContext)
    return(
        <div className={`${location.pathname==='/contacts'||'!hidden'} mx-2 w-5 md:w-75 hidden md:block `} dir="ltr">
            <span className="rounded-l-xl p-2" id="basic-addon1" style={{backgroundColor:COLOR3}}>
                <i className="fa fa-search"></i>
            </span>
            <input onChange={event=>contactSearch(event.target.value)} dir="rtl" placeholder="جستجوی مخاطب" aria-label="search" aria-describedby="basic-addon1" type="text" className="bg-white rounded-r-xl p-2 border-white" />
        </div>
    )
}

export default SearchContact