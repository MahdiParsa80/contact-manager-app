import * as yup from 'yup';

export const contactSchema = yup.object().shape({
    fullName:yup.string().required('fullname is required'),
    photo:yup.string().url().required('photo is required'),
    job:yup.string().required('job is required'),
    group:yup.string().required('group is required'),
    email:yup.string().email('email is not valid').required('email is required'),
    mobile:yup.number().positive().required('phone number is required'),
})