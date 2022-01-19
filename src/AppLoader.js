import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import ROUTES, { RenderRoutes } from "./routes";


// **hooks
import initUser from 'auth/initUser'

// // ** toast
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


export default function Apploader(props) {

    const { fetchAndInitUser } = initUser()
    const history = useHistory()
   
    const [loading, setLoading] = useState(false)
    
    const [isError, setError] = useState(false)

    const initiateUser = async() => {
        // if (!jwt.allowAutoLoad) {
        //     return
        // }
        setLoading(true)
        try {

            await fetchAndInitUser()
            history.push('/dashboard')

        } catch (ex) {
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
