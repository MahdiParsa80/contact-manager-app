import React, {createContext} from 'react'

export const contactContext=createContext({
    loading:false,
    changeFlag:false,
    setContact: {},
    contact: [],
    contacts: [],
    filteredContacts: {},
    group: {},
    setLoading:()=>{},
    deleteContact:()=>{},
    updateContact:()=>{},
    createContact:()=>{},
    contactSearch:()=>{},
    changed:()=>{},
})
