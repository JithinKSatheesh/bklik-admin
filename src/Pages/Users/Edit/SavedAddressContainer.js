import React from 'react';
import { motion } from 'framer-motion';

import AddressCard from 'components/AddressCard';
import { CloseButton, DeleteButton, SaveButton} from 'components/CommonIcons';
// import AdressForm from 'components/common/AdressForm';
// import { RadioButtons } from 'components/common/RadioButtons';
// import useStoreData from 'hooks/useStoreData'

import Renderinputs from 'components/RenderInputs'

export const SavedAddressContainer = (props) => {

    const { 
        addressData, 
        editCardId, 
        addressEditInputVal, 
        setAddressEdit, 
        EditDataFunc, 
        deleteDataFunc, 
        closeEdit, 
        handleEditAddressChange, 
        loadingEdit ,
        _inputFieldsAddress
    } = props;

    // const {isAllowAddressEdit} = useStoreData()
    // const _isAllowAddressEdit = isAllowAddressEdit()
    // console.log(_isAllowAddressEdit)

    return (<React.Fragment>
        {[...addressData].map(item => <motion.div key={item.id}
            layout
            className={`w-full lg:pr-4 py-2 
                ${item.id === editCardId ? 'lg:w-full' : 'lg:w-60'}
                `}
        >
            {item.id === editCardId ?
                <div className="w-full rounded-3xl bg-white p-4 ">
                    <div className="px-2 py-2 flex justify-end">
                        <CloseButton  callback={closeEdit} />
                    </div>
                    
                    <div key={item.id} className="py-4 flex flex-wrap">
                        <Renderinputs
                            inputFileds={_inputFieldsAddress}
                            handleInputChange={handleEditAddressChange}
                            inputVal={addressEditInputVal}
                            // loading={loading}
                            // valErrors={valErrors}
                            wrapperClass="my-2 w-2/4 px-2"
                            />
                    </div>
                    {/* <div className='py-4 w-full '>
                        <RadioButtons
                            name="is_default"
                            checked={addressEditInputVal?.is_default}
                            // checked={true}
                            type="checkbox"
                            handleChange={handleEditAddressChange}
                            label="Set as default" 
                            className="" />
                    </div> */}
                    <div className="w-full justify-between flex  py-2">
                        <SaveButton
                            callback={EditDataFunc}
                            loading={loadingEdit}
                            // disabled={!_isAllowAddressEdit._edit}
                            className="mr-2 md:w-36 px-2 md:px-0"
                            label="Update address" />
                        <DeleteButton
                            callback={deleteDataFunc}
                            variant="outlined"
                            // disabled={!_isAllowAddressEdit._delete}
                            className="mr-2 md:w-24 px-2 md:px-0"
                            label="Delete" />
                    </div>
                </div>
                :
                <AddressCard
                    className=" mr-6 h-36 "
                    key={item.id}
                    item={item}
                    editFunc={() => setAddressEdit(item)} />}
        </motion.div>
        )}
    </React.Fragment>

    );

};
