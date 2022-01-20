import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import ROUTES, { RenderRoutes } from "./routes";


// **hooks
import initUser from 'auth/initUser'
import jwt from 'API/tokenServices'

// // ** toast
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


export default function Apploader(props) {

    const { fetchAndInitUser } = initUser()
    const history = useHistory()
   
    const [loading, setLoading] = useState(false)
    
    const [isError, setError] = useState(false)

    const initiateUser = async() => {
        setLoading(true)
        try {

            const res =  await fetchAndInitUser()
            if (!res) {
                jwt.clearTokens()
            }
            history.push('/dashboard')

        } catch (ex) {
            jwt.clearTokens()
            // toast something went wrong please reload
        }
        setLoading(false)
    }

    useEffect(() => {
        
        initiateUser()
    }, [])
    
    const PageLoad = () => {
        return (<>
            <div className="h-full fixed w-full left-0 top-0 bg-green">
                <div className="flex h-full flex-col  items-center justify-center">
                    <div className="h-10 w-10 rounded-full bg-amber-500 mx-auto">
                        <div className="lds-hourglass"></div>
                    </div>
                    <div className='text-lg font-bold mt-6 text-white'>
                        Initializing...
                    </div>
                    {isError &&
                    <div className='text-lg font-bold  mt-6 text-white text-center'>
                        Something went wrong!... <br /> <span className=" text-amber-500"> please reload! </span>
                    </div>
                    }

                </div>
            </div>
        </>)
    }
    

    return (
        <>
        {/* <ToastContainer /> */}
        {(loading ) ? 
            <PageLoad />
            :
            
                <RenderRoutes routes={ROUTES} />
            
        }
            
        </>
    )
}
