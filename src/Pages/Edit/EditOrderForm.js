import React from 'react';
import Renderinputs from 'components/RenderInputs';
import { SaveButton } from 'components/CommonIcons';
import Renderswitch from 'components/RenderSwitch';
import Alert from '@mui/material/Alert';

export const EditOrderForm = (props) => {


    const { inputVal, handleInputChange, _inputFields, loading, updateOrder } = props;

    return (<div>
        <div className="py-4 flex flex-wrap">
            <div className='w-full py-2'>
                <Alert  severity={'info'} icon={false} >
                    <Renderswitch
                        value={inputVal?.is_delivery_confirmed}
                        handleChange={(e) => handleInputChange({ 'is_delivery_confirmed': e.target.checked })}
                        labelText="Is Order confirmed" />
                    Toggle  the switch to "On" position if all the details given by user is correct.
                    This will update status of user from "Reviewing..." to "Active" in bklik website.  Also click" update order" button after changing.
                </Alert>
            </div>
            <div className='w-full py-2'>
            <Alert  severity={'info'} icon={false} >
                <Renderswitch
                    value={inputVal?.is_payment_confirmed}
                    handleChange={(e) => handleInputChange({ 'is_payment_confirmed': e.target.checked })}
                    labelText="Is Payment Received" />
                    Mark it to "on" position when money is received from user. Also don't forget to clik "update order"
                </Alert>
             
            </div>
            <div className='w-full py-2'>
            <Alert  severity={'success'} icon={false} >
                {inputVal?.language ? <>
                   User is using "{inputVal?.language === 'arm' ? "Armenian" : "English"}" as language
                </> : 
                <>
                    Couldn't dectect user language.
                </>
                }
            </Alert>
             
            </div>
            {console.log(inputVal)}
            <Renderinputs
                inputFileds={_inputFields}
                handleInputChange={handleInputChange}
                inputVal={inputVal}
                // loading={loading}
                // valErrors={valErrors}
                wrapperClass="my-2 w-2/4 px-2" />
        </div>
        { inputVal?.is_glutan_free  && <Alert className='my-2' severity='success' icon={false}>
             User need vegetarian food
        </Alert>}
        { inputVal?.is_lent  && <Alert className='my-2' severity='success' icon={false}>
            Food restrictions : Lent
        </Alert>}
        <div className='flex justify-start'>
            <SaveButton loading={loading} callback={updateOrder} label="Update Order" />
        </div>
    </div>);
};
