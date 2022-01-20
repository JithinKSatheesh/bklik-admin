import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import RenderTextField from 'components/RenderTextField';
import RenderPasswordField from 'components/RenderPasswordField';

import { throwToast } from 'components/ThrowToast';
import { SaveButton } from 'components/CommonIcons'

import Button from '@mui/material/Button';

// ** hooks
import useInitUser from 'auth/initUser'

export default function Login(props) {

    const { loginUser } = useInitUser()
    const history = useHistory()

    const [inputVal, setInputVal] = useState({
        identifier: '',
        password: ''
    })


    const [error, setError] = useState({})
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setError({})
        setInputVal(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const callLogin = async () => {
        setLoading(true)
        const res = await loginUser(inputVal, setError)
        if (res) {
            throwToast.success("Welcome user")
            history.push('/dashboard')
        }
        setLoading(false)
    }

    return (
        <>
            <div className="mt-32"></div>
            <div className="container mx-auto ">
                <div elevation={2} className='rounded-xl w-96 mx-auto bg-wood p-4' >
                    <div className="font-bold">
                        BKLIK ADMIN
                    </div>
                    <div className='py-4'>
                        <RenderTextField
                            name={"identifier"}
                            value={inputVal['identifier']}
                            handleChange={handleChange}
                            placeholder="username"
                        />
                    </div>
                    <div className='py-4'>
                        <RenderPasswordField
                            name={"password"}
                            value={inputVal['password']}
                            handleChange={handleChange}
                            placeholder="password"
                        />
                    </div>
                    <div className="text-center text-xs text-red-500">
                        {error?.message}

                    </div>
                    <div className="py-3">
                        <SaveButton
                            loading={loading}
                            callback={callLogin}
                            label="Login"
                            />
                    </div>
                </div>
            </div>

        </>
    )
}
