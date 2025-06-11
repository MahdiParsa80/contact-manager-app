import { useContext } from 'react';
import { Link } from 'react-router-dom';
import addContactPhoto from '../../contact-manager-app/assets/add_contact.png'
import { contactContext } from '../../context/contactContext';
import {ErrorMessage, Field, Form,  Formik} from 'formik'
import { contactSchema } from '../../validations/contactValidation';
// Define the AddContact component
const AddContact = () => {
    // Extract state and functions from the context
    const {Contact,groups,createContactForm}=useContext(contactContext)

    // Define styles for form inputs
    const style='bg-gray-800 border-gray-400 border-2 text-gray-300 block rounded !my-3 py-1 px-2 w-100'
    const initVal={
            fullName:'',
            photo:'',
            mobile:'',
            email:'',
            job:'',
            group:'',
        }
    return (
        <div className="flex justify-center h-200 items-center">
           <div className="flex w-3/4 flex-col">
                <h1 className='text-white text-center text-4xl'>ساخت مخاطب جدید</h1>
                <div className='flex flex-row justify-around'>
                    <div className='w-50 flex items-center m-2'>
                        {/* Render the form for adding a new contact */}
                        <Formik initialValues={initVal} validationSchema={contactSchema} onSubmit= {values =>createContactForm(values)}>
                            {()=>(<Form>
                                <Field className={style} type="text" name='fullName' placeholder='نام و نام خانوادگی'/>
                                <ErrorMessage name='fullName' render={(msg)=><p className='text-red-700'>{msg}</p>}/>
                                <Field className={style} type="url" name='photo' placeholder='لینک عکس'/>
                                <ErrorMessage name='photo' render={(msg)=><p className='text-red-700'>{msg}</p>}/>
                                <Field className={style} type="tel" name='mobile' placeholder='شماره تلفن'/>
                                <ErrorMessage name='mobile' render={(msg)=><p className='text-red-700'>{msg}</p>}/>
                                <Field className={style} type="email" name='email' placeholder='رایانامه'/>
                                <ErrorMessage name='email' render={(msg)=><p className='text-red-700'>{msg}</p>}/>
                                <Field className={style} type="text" name='job' placeholder='شغل'/>
                                <ErrorMessage name='job' render={(msg)=><p className='text-red-700'>{msg}</p>}/>
                                <Field className={`${style} !backdrop-blur-3xl`} as='select' type="group" name='group' placeholder=''>
                                    <option className='!backdrop-blur-3xl' value="">انتخاب گروه</option>
                                    {groups.length>0 && groups.map((group)=> <option key={group.id} value={group.id}>{group.name}</option>)}
                                </Field>
                                {/* Provide buttons for submitting the form or canceling the action */}
                                <button className='text-white p-1.5 m-2 !rounded bg-[#4db487] w-46' type='submit'> ساخت مخاطب</button>
                                <Link to="/contacts">
                                <button className='text-white p-1.5 m-2 !rounded bg-red-500 w-46'> انصراف</button>
                                </Link>
                            </Form>)}
                        </Formik>
                    </div>
                    {/* Display an image alongside the form */}
                    <div className="w-[50%]">
                        <img src={addContactPhoto} alt="add contact" className='rounded-2xl'/>
                    </div>
                </div>
           </div>
        </div>
    );
};

export default AddContact;