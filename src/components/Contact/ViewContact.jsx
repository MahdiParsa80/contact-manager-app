import { useContext } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { contactContext } from "../../context/contactContext";

// Define the ViewContact component
const ViewContact = () => {
    // Extract contacts and groups from the context
    const {contacts,groups}=useContext(contactContext)
    // Extract the contact ID from the URL parameters
    const {contactid}=useParams()
    // Define styles for table cells
    const styleTd1='px-3 py-2 text-white text-xl !border-b-2 text-left'
    const styleTd2='px-3 py-2 text-white text-xl !border-b-2'
    // Filter the contact and group data based on the contact ID
    const contact=contacts.filter((c)=>c.id==contactid)
    const group=groups.filter((g)=>g.id==contact[0].group)
    return (
        <div className="flex justify-center h-[80%] flex-col items-center">
            <h2 className="text-white text-center"> مشاهده مخاطب</h2>
            <div className="w-2/3 flex justify-around items-center">
                <div className="text-white ">
                    <table className=" bg-[#2c2e47] w-4xs">
                        <tbody>
                            <tr>
                                <td className={styleTd1}>نام و نام خانوادگی:</td>
                                <td className={styleTd2}>{contact[0].fullName}</td>
                            </tr>
                            <tr>
                                <td className={styleTd1}>شماره تلفن:</td>
                                <td className={styleTd2}>{contact[0].mobile}</td>
                            </tr>
                            <tr>
                                <td className={styleTd1}>ایمیل:</td>
                                <td className={styleTd2}>{contact[0].email}</td>
                            </tr>
                            <tr>
                                <td className={styleTd1}>شغل:</td>
                                <td className={styleTd2}>{contact[0].job}</td>
                            </tr>
                            <tr>
                                <td className={styleTd1}>گروه:</td>
                                <td className={styleTd2}>{group[0].name}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className=""><img className="rounded-full w-95 h-95 object-cover" src={contact[0].photo} alt="profile photo" /></div>
            </div>
            <Link to={'/contacts'}>
            <button className="p-2 !rounded-lg bg-teal-500 text-white !mt-25">بازگشت به صفحه اصلی</button>
            </Link>
        </div>
    );
};

export default ViewContact