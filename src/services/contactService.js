import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://plyqerltqrunmsgnyzfd.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBseXFlcmx0cXJ1bm1zZ255emZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0ODkxMDgsImV4cCI6MjA2NTA2NTEwOH0.p81IXfb2ckatbdOhxf4WmxhKwrP27COYpeSOaxdq_ZU';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export const getAllContact = async () => {
    const { data, error } = await supabase.from('contacts').select('*');
    if (error) throw error;
    return data;
};

export const getContact = async (id) => {
    const { data, error } = await supabase.from('contacts').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
};

export const getAllGroups = async () => {
    const { data, error } = await supabase.from('groups').select('*');
    if (error) {
        console.error('Error fetching groups:', error);
        throw error;
    }
    return data;
};

export const getGroup = async (groupId) => {
    const { data, error } = await supabase.from('groups').select('*').eq('id', groupId).single();
    if (error) throw error;
    return data;
};

export const createContact = async (contact) => {
    const { status, error } = await supabase.from('contacts').insert(contact);
    if (error) throw error;
    return status;
};

export const updateContact = async (contactId, contact) => {
    console.log('Updating contact with ID:', contactId, 'Data:', contact); // Debugging log
    const { data, error, status } = await supabase.from('contacts').update(contact).eq('id', contactId);
    if (error) {
        console.error('Error updating contact:', error.message); // Improved error logging
        throw error;
    }
    console.log('Update successful, status:', status); // Debugging log
    return { data, status }; // Return status for better handling
};

export const deleteContact = async (contactId) => {
    const { data, error } = await supabase.from('contacts').delete().eq('id', contactId);
    if (error) throw error;
    return data;
};