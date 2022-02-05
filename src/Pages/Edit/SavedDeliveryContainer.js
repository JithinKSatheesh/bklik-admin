import React from 'react';
import { motion } from 'framer-motion';
import Alert from '@mui/material/Alert';

import DeliveryCard from 'components/DeliveryCard';
import { CloseButton, DeleteButton, SaveButton} from 'components/CommonIcons';
// import AdressForm from 'components/common/AdressForm';
// import { RadioButtons } from 'components/common/RadioButtons';
// import useStoreData from 'hooks/useStoreData'

import Renderinputs from 'components/RenderInputs'
import Renderswitch from 'components/RenderSwitch';

export const SavedDeliveryContainer = (props) => {

    const { 
        deliveryData, 
        editCardId, 
        deliveryEditInputVal, 
        setDeliveryEdit, 
        EditDataFunc, 
        deleteDataFunc, 
        closeEdit, 
        handleEditDeliveryChange, 
        loadingEdit ,
        _inputFieldsDelivery
    } = props;

    // const {isAllowAddressEdit} = useStoreData()
    // const _isAllowAddressEdit = isAllowAddressEdit()
    // console.log(_isAllowAddressEdit)

    return (<React.Fragment>
        {[...deliveryData].map(item => <motion.div key={item.id}
            layout
            className={`w-full lg:pr-4 py-2 
                ${item.id === editCardId ? 'lg:w-full' : 'lg:w-60'}
                `}
        >
            {item.id === editCardId ?
                <div className="w-full rounded-3xl bg-white p-4 ">
                    <div className="px-2  flex justify-end">
                        <CloseButton  callback={closeEdit} />
                    </div>
                    
                    <div key={item.id} className="flex flex-wrap">
                        <Renderinputs
                            inputFileds={_inputFieldsDelivery}
                            handleInputChange={handleEditDeliveryChange}
                            inputVal={deliveryEditInputVal}
                            // loading={loading}
                            // valErrors={valErrors}
                            wrapperClass="my-2 w-2/4 "
                            />
                    </div>
                    <div className="py-2">
                        <Alert severity='info' icon={false}>
                            <Renderswitch 
                                labelText="is box delivered."
                                value={deliveryEditInputVal.is_delivered}
                                handleChange={(e) => handleEditDeliveryChange({'is_delivered' : e.target.checked})}
                                />
                            Mark it "On" position if the box is delivered to user!. Also click "update data" after change
                        </Alert>
                    </div>
                    {/* <div className='py-4 w-full '>
                        <RadioButtons
                            name="is_default"
                            checked={deliveryEditInputVal?.is_default}
                            // checked={true}
                            type="checkbox"
                            handleChange={handleEditDeliveryChange}
                            label="Set as default" 
                            className="" />
                    </div> */}
                    <div className="w-full justify-between flex  py-2">
                        <SaveButton
                            callback={EditDataFunc}
                            loading={loadingEdit}
                            // disabled={!_isAllowAddressEdit._edit}
                            className="mr-2 md:w-36 px-2 md:px-0"
                            label="Update Data" />
                        {/* <DeleteButton
                            callback={deleteDataFunc}
                            variant="outlined"
                            // disabled={!_isAllowAddressEdit._delete}
                            className="mr-2 md:w-24 px-2 md:px-0"
                            label="Delete" /> */}
                    </div>
                </div>
                :
                <DeliveryCard
                    className=" mr-6  "
                    key={item.id}
                    item={item}
                    editFunc={() => setDeliveryEdit(item)} />}
        </motion.div>
        )}
    </React.Fragment>

    );

};
