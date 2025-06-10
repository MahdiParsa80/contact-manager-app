/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import { useImmer } from 'use-immer';
import _ from 'lodash';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import { COLOR1 } from './helpers/colors';
import { contactContext } from './context/contactContext';
import { ToastContainer, toast } from 'react-toastify';

import { getAllContact, getAllGroups, createContact, deleteContact } from './services/contactService';

import Navbar from './components/Navbar';
import Contacts from './components/Contact/Contacts';
import AddContact from './components/Contact/AddContact';
import EditContact from './components/Contact/EditContact';
import ViewContact from './components/Contact/ViewContact';
import { contactSchema } from './validations/contactValidation';

// Define the App component
const App = () => {
    const [loading, setLoading] = useImmer(false);
    const [groups, setGroups] = useImmer([]);
    const [contacts, setContacts] = useImmer([]);
    const [filteredContacts, setFilteredContacts] = useImmer([]);
    const [Contact, setContact] = useImmer({});
    const [errors, setErrors] = useImmer([]);
    const [changeFlag,setChangeFlag] = useImmer(false)

    const navigate = useNavigate();

    const changed=()=>{
        setChangeFlag(!changeFlag)
    }
    const contactSearch = _.debounce((query) => {
        if (query.trim() === '') {
            setFilteredContacts(contacts);
        } else {
            setFilteredContacts(
                contacts.filter((contact) =>
                    contact.fullName.toLowerCase().includes(query.toLowerCase())
                )
            );
        }
    }, 1500);

    const createContactForm = async (values) => {
        try {
            const status = await createContact(values);
            if (status == 201) {
                setContact({});
                setErrors([]);
                changed();
                navigate('/contacts');
                toast.success('مخاطب اضافه شد', { icon: '✅' });
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    const confirmDelete = (id, fullname) => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div style={{ backgroundColor: COLOR1 }} className="border-2 rounded-2xl p-4">
                        <h1 className="text-white">پاک کردن مخاطب</h1>
                        <p className="text-white">جدی میخوای {fullname} رو پاکش کنی؟</p>
                        <button
                            className="mx-2 bg-green-500 text-white !rounded-2xl p-3"
                            onClick={onClose}
                        >
                            نه بی خیال...
                        </button>
                        <button
                            className="mx-2 bg-red-500 text-white !rounded-2xl p-3"
                            onClick={async() => {
                                await removeContact(id);
                                onClose();
                                changed();
                            }}
                        >
                            آررره پاکش کن
                        </button>
                    </div>
                );
            },
        });
    };

    const removeContact = async (id) => {
        try {
            setLoading(true);
            await deleteContact(id);
            setContacts((prev) => prev.filter((c) => c.id !== id));
            setLoading(false);
            toast.error('مخاطب از هستی سرور نیست گشت');
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };

    const fetchData = async () => {
            try {
                setLoading(true);
                const contactResponse = await getAllContact();
                const groupsResponse = await getAllGroups();
                setContacts(contactResponse);
                setFilteredContacts(contactResponse);
                setGroups(groupsResponse);
                setLoading(false);
            } catch (err) {
                setLoading(false);
            }
        };

    useEffect(() => {
        fetchData();
    }, []);
    
    useEffect(() => {
        fetchData();
    }, [changeFlag]);
    

    return (
        <>
            <ToastContainer
                rtl={true}
                position="top-left"
                autoClose={5000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <contactContext.Provider
                value={{
                    loading,
                    contacts,
                    Contact,
                    filteredContacts,
                    groups,
                    contactSearch,
                    errors,
                    changeFlag,
                    confirmDelete,
                    createContactForm,
                    changed,
                }}
            >
                <Navbar />
                <Routes>
                    <Route path="/" element={<Navigate to="/contacts" />} />
                    <Route path="/contacts" element={<Contacts />} />
                    <Route path="/addcontact" element={<AddContact />} />
                    <Route path="/editcontact/:contactid" element={<EditContact />} />
                    <Route path="/viewcontact/:contactid" element={<ViewContact />} />
                </Routes>
            </contactContext.Provider>
        </>
    );
};

export default App;