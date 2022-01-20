import React from 'react';
import Renderinputs from 'components/RenderInputs';
import { SaveButton } from 'components/CommonIcons';
import Renderswitch from 'components/RenderSwitch';

export const EditOrderForm = (props) => {


    const { inputVal, handleInputChange, _inputFields, loading, updateOrder } = props;

    return (<div>
        <div className="py-4 flex flex-wrap">
            <div className='w-full py-2'>
                <Renderswitch
                    value={inputVal?.is_delivery_confirmed}
                    handleChange={(e) => handleInputChange({ 'is_delivery_confirmed': e.target.checked })}
                    labelText="Is delivery confirmed" />
            </div>
            <div className='w-full py-2'>
                <Renderswitch
                    value={inputVal?.is_payment_confirmed}
                    handleChange={(e) => handleInputChange({ 'is_payment_confirmed': e.target.checked })}
                    labelText="Is Payment confirmed" />
            </div>
            <Renderinputs
                inputFileds={_inputFields}
                handleInputChange={handleInputChange}
                inputVal={inputVal}
                // loading={loading}
                // valErrors={valErrors}
                wrapperClass="my-2 w-2/4 px-2" />
        </div>
        <div className='flex justify-start'>
            <SaveButton loading={loading} callback={updateOrder} label="Update Order" />
        </div>
    </div>);
};
