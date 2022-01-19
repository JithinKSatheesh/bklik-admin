import { ToastContainer, toast } from 'react-toastify';

export const throwToast = {
    success : (message = "Success") => {
        toast(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            // theme:"dark",
            type:"success",
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
    },
    error: (message = "Error!") => {
        toast(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            // theme:"dark",
            type:"error",
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
    }
}