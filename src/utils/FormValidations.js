import * as yup from 'yup';

export const loginFormValidations = yup.object().shape({
    email: yup.string().email("This email is not valide!").required("Required!"),
    password: yup.string().min(8, "Must be at least 8 characters long").matches(/^(?=.*[a-z])/, 'Must contain at least 1 lowercase letter').matches(/^(?=.*[A-Z])/, "Must contain at least 1 uppercase character").matches(1, 'Must contain at leadt 1 number').matches(/^(?=.*[0-9])/, "Must contain at leadt 1 number").matches(/^(?=.*[!@#%&])/, "Must contain at least one special character").required("Required!"),
});

export const registerFormValidations = yup.object().shape({
    name: yup.string().min(3, "Must contain at least 3 characters").required("Required!"),
    email: yup.string().email("This email is not valide!").required("Required!"),
    password: yup.string().min(8, "Must be at least 8 characters long").matches(/^(?=.*[a-z])/, 'Must contain at least 1 lowercase letter').matches(/^(?=.*[A-Z])/, "Must contain at least 1 uppercase character").matches(1, 'Must contain at leadt 1 number').matches(/^(?=.*[0-9])/, "Must contain at leadt 1 number").matches(/^(?=.*[!@#%&])/, "Must contain at least one special character").required("Required!"),
    confirm_password: yup.string().oneOf([yup.ref('password'), null], "Your confirm password does not match your password").required("Required!"),
});

export const addProductFormValidations = yup.object().shape({
    title: yup.string().min(3, "Must contain at least 3 characters").required("Required!"),
    amount: yup.string().required("Required!"),
    description: yup.string().min(10, "Must contain at least 10 characters").required("Required!"),
});

export const contactFormValidations = yup.object().shape({
    name: yup.string().min(3, "Must contain at least 3 characters").required("Required!"),
    email: yup.string().email("This email is not valide!").required("Required!"),
    subject: yup.string().min(3, "Must contain at least 3 characters").required("Required!"),
    message: yup.string().min(10, "Must contain at least 10 characters").required("Required!"),
});

export const orderFormValidations = yup.object().shape({
    product_title: yup.string().min(3, "Must contain at least 3 characters").required("Required!"),
    quantity: yup.string().required("Required!"),
});