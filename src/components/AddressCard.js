import React from 'react';
// import styled from 'styled-components';
import { EditButton } from 'components/CommonIcons';
// import imgPen from 'assets/icons/pen.svg'

// const Card = styled.div`
//         &:hover {
//             box-shadow : 0px 0px 10px 1px  #D06646 ;
//         }

//     `;


const AddressCard = (props) => {

    const { className, item, callback, editFunc, allowEdit = true } = props;

    return (
        <div 
            className={`w-full rounded-3xl bg-white p-4 shadow-lg cursor-pointer ${className}`}
            onClick={() => callback(item)}
            >
            <div className="flex justify-between items-center">
                <div className='font-bold truncate w-28'>{item.name}</div>
                <div>
                        <EditButton
                            className='px-6 '
                            callback={() => editFunc(item.id)}
                        />
                    
                </div>
            </div>
            <div className="py-3 text-grey text-xs">
                <div className="div">{item.name}</div>
                <div className="div">{item.address}</div>
                <div className="div">{item.city}</div>
            </div>

        </div>
    );
};

export default AddressCard