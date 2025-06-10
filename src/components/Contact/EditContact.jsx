/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getAllGroups, getContact, updateContact } from "../../services/contactService";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useImmer } from 'use-immer';
import { toast } from "react-toastify";

import LoadGif from "../LoadGif";
import { contactSchema } from "../../validations/contactValidation";
import { contactContext } from "../../context/contactContext";

const EditContact = () => {
    const style = 'bg-gray-800 border-gray-400 border-2 text-gray-300 block rounded !my-3 py-1 px-2 w-100';
    const { changed } = useContext(contactContext)
    const { contactid } = useParams();
    const navigate = useNavigate();
    const [state, setState] = useImmer({
        isLoading: false,
        contact: {
            fullName: "",
            photo: "",
            mobile: "",
            email: "",
            job: "",
            group: ""
        },
        groups: []
    });

    useEffect(() => {
        const fetch = async () => {
            try {
                setState(draft => { draft.isLoading = true });
                const contactData = await getContact(contactid);
                const groupsData = await getAllGroups();
                setState(draft => {
                    draft.contact = contactData;
                    draft.groups = groupsData;
                    draft.isLoading = false;
                });
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };
        fetch();
    }, []);

    const editContactInfo = async (value) => {
        try {
            setState(draft => { draft.isLoading = true }); // Set loading state
            const { status } = await updateContact(contactid, value);
            if (status === 200 || status === 204) { // Handle both 200 and 204 as success
                toast.info('مخاطب به روزرسانی شد', { icon: '🔁' });
                changed()
                navigate('/contacts');
            } else {
                throw new Error(`Unexpected status code: ${status}`);
            }
        } catch (err) {
            console.error('Error updating contact:', err.message); // Improved error logging
            setState(draft => { draft.isLoading = false });
        }
    };

    const { isLoading, contact, groups } = state;
    return (
        <>
            {isLoading ? <LoadGif /> : (
                <div className="flex justify-center h-200 items-center">
                    <div className="flex w-2/3 flex-col">
                        <h1 className='text-white text-center text-3xl'>ویرایش مخاطب </h1>
                        <div className='flex flex-row justify-around'>
                            <div className='w-50 flex items-center'>
                                <Formik
                                    initialValues={contact}
                                    enableReinitialize={true}
                                    validationSchema={contactSchema}
                                    onSubmit={values => editContactInfo(values)}
                                >
                                    {() => (
                                        <Form>
                                            <Field className={style} type="text" name='fullName' placeholder='نام و نام خانوادگی' />
                                            <ErrorMessage name='fullName' render={(msg) => <p className='text-red-700'>{msg}</p>} />
                                            <Field className={style} type="url" name='photo' placeholder='لینک عکس' />
                                            <ErrorMessage name='photo' render={(msg) => <p className='text-red-700'>{msg}</p>} />
                                            <Field className={style} type="tel" name='mobile' placeholder='شماره تلفن' />
                                            <ErrorMessage name='mobile' render={(msg) => <p className='text-red-700'>{msg}</p>} />
                                            <Field className={style} type="email" name='email' placeholder='رایانامه' />
                                            <ErrorMessage name='email' render={(msg) => <p className='text-red-700'>{msg}</p>} />
                                            <Field className={style} type="text" name='job' placeholder='شغل' />
                                            <ErrorMessage name='job' render={(msg) => <p className='text-red-700'>{msg}</p>} />
                                            <Field className={`${style} !backdrop-blur-3xl`} as='select' type="group" placeholder=''>
                                                <option className='!backdrop-blur-3xl' value="">انتخاب گروه</option>
                                                {groups.length > 0 && groups.map((group) => <option key={group.id} value={group.id}>{group.name}</option>)}
                                            </Field>
                                            <button className='text-white p-1.5 m-2 !rounded bg-[#4db487] w-46' type='submit'> ویرایش مخاطب</button>
                                            <Link to="/contacts">
                                                <button className='text-white p-1.5 m-2 !rounded bg-red-500 w-46'> انصراف</button>
                                            </Link>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                            <div className="flex flex-row-reverse w-[50%]">
                                <img src={contact.photo} alt="add contact" className='rounded-full w-95 h-95 object-cover' />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default EditContact;