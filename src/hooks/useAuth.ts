
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import { useState } from 'react';  
import httpService, { unsecureHttpService } from '../utils/httpService';
import Cookies from "js-cookie"


const useAuth = () => {

    const [open, setOpen] = useState(false) 
    const [tab, setTab] = useState(4)

    const [email, setEmail] = useState("")
    

    const signupMutation = useMutation({
        mutationFn: (data: any) => unsecureHttpService.post(`/auth/email-signup`, data),
        onError: (error: any) => {
            toast.error(error?.response?.data?.error?.details?.message)
        },
        onSuccess: () => { 
            
            toast.success("Signed Up Successfully")

            Cookies.set("email", formikSignup.values.email)
            setEmail(formikSignup.values.email)
            setTab(1)
        },
    });

    const loginMutation = useMutation({
        mutationFn: (data: any) => unsecureHttpService.post(`/auth/email-signin`, data),
        onError: (error: any) => {
            toast.error(error?.response?.data?.error?.details?.message)
        },
        onSuccess: (data) => { 

            Cookies.set("access_token", data?.data?.token)
            
            toast.success("Logged In Successfully")
            setTab(2)
        },
    });

    const payForTicket = useMutation({
        mutationFn: (data: {
            "eventId": string,
            "ticketTypes": {
                "ticketTypeId": string,
                "numberOfTickets": number
              }[]
          }
        ) => httpService.post(`/donations/event-ticket-payment-intent`, data),
        onError: (error: any) => {
            toast.error(error?.response?.data?.error?.details?.message)
        },
        onSuccess: (data) => { 
            const paymentUrl = data?.data?.url;

            if (paymentUrl) {
              // ✅ Open the payment page in a new tab
              window.open(paymentUrl, "_blank");
            } else {
              toast.error("Payment URL not found.");
            }
        },
    });


    const payForTicketFree = useMutation({
        mutationFn: (data: {
            "eventId": string,
            "ticketTypes": {
                "ticketTypeId": string,
                "numberOfTickets": number
              }[]
          }
        ) => httpService.post(`/donations/event-ticket-free-purchase`, data),
        onError: (error: any) => {
            toast.error(error?.response?.data?.error?.details?.message)
        },
        onSuccess: () => {  
            
            setTab(4)

        },
    });
    
    
    const verifyMutation = useMutation({
        mutationFn: (data: any) => unsecureHttpService.post(`/auth/verify-otp`, data),
        onError: (error: any) => {
            toast.error(error?.response?.data?.error?.details?.message)
        },
        onSuccess: () => { 
            
            toast.success("OTP Verified Successfully")
            setTab(3)
        },
    });

    const formikSignup = useFormik<{
        "fullname": string,
        "email": string,
        "phone": string,
        "password": string
    }>({
        initialValues: {
            fullname: "",
            email: "",
            phone: "",
            password: ""
        },
        validationSchema: Yup.object({
            fullname: Yup.string().required("Required"),
            email: Yup.string().email("Invalid email").required("Required"),
            phone: Yup.string().required("Required"),
            password: Yup.string().required("Required"),
        }),
        onSubmit: (data) => {
            signupMutation.mutate(data)
        },
    });

    const formik = useFormik<{
        "email": string,
        "password": string
    }>({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email").required("Required"),
            password: Yup.string().required("Required"),
        }),
        onSubmit: (data) => {
            loginMutation.mutate(data)
        },
    });


    const formikVerify = useFormik<{
        "otp": string,
        "phoneOrEmail": string
    }>({
        initialValues: {
            "otp": "",
            "phoneOrEmail": email
          },
        validationSchema: Yup.object({
            otp: Yup.string().required("Required"),
            phoneOrEmail: Yup.string().required("Required"),
        }),
        onSubmit: (data) => {
            verifyMutation.mutate(data)
        },
    });

    return {
        formik,
        signupMutation, 
        formikVerify,
        verifyMutation,
        loginMutation,
        formikSignup, 
        payForTicket,
        payForTicketFree,
        open,
        setOpen,
        tab,
        setTab, 
        email, 
        setEmail
    }

}


export default useAuth