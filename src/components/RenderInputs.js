import React, { Fragment } from 'react'
import RenderSelect from 'components/RenderSelect'
import RenderTextField from 'components/RenderTextField'
import RenderDatePicker from 'components/RenderDatePicker'
import RenderAutoComplete from 'components/RenderAutoComplete'
import RenderPasswordField from 'components/RenderPasswordField'

export default function Renderinputs(props) {
    const {
        loading,
        inputVal, 
        valErrors = {}, 
        handleInputChange,
        inputFileds,
        wrapperClass = '',
        size,
    } = props

    const switchInput = (field) => {
        switch (field.type) {
            case 'select' : 
                return <div className={`${wrapperClass} ${field.wrapperClass}`}>
                    <RenderSelect
                        labelText={field.labelText}
                        name={field.name}
                        handleChange={(e) => handleInputChange({ [field.name]: e.target.value })}
                        value={inputVal[`${field.name}`]}
                        valErrors={valErrors}
                        disabled={loading || field.disabled}
                        size={size}
                        options={field.options}
                        isHelperText={field.isHelperText}
                    />
                </div>

            case 'autocomplete' :
                return <div className={`${wrapperClass} ${field.wrapperClass}`}>
                    <RenderAutoComplete
                        labelText={field.labelText}
                        name={field.name}
                        handleChange={
                                field.handleInputChange ? 
                                    field.handleInputChange 
                                    : 
                                    (e, val) => handleInputChange({ [field.name]: val?.value })
                            }
                        value={inputVal[`${field.name}`]}
                        valErrors={valErrors}
                        disabled={loading || field.disabled}
                        size={size}
                        options={field.options}
                        isHelperText={field.isHelperText}
                    />
                </div>
            
            case 'textarea' : 
            case 'number' :
            case  'text' : 
                return <div className={`${wrapperClass} ${field.wrapperClass}`}>
                    <RenderTextField
                        labelText={field.labelText}
                        name={field.name}
                        handleChange={
                                field.handleInputChange ? 
                                    field.handleInputChange 
                                    : 
                                    (e) => handleInputChange({ [field.name]: e.target.value }, [field.name])
                                }
                        value={inputVal[`${field.name}`]}
                        valErrors={valErrors}
                        disabled={loading || field.disabled}
                        size={size}
                        multiline={field.type === 'textarea'}
                        inputProps={field.inputProps}
                        errorKey={field.errorKey}
                        isHelperText={field.isHelperText}
                    />
                </div>
            // case 'textarea' : 
            //     return <div className={`${wrapperClass} ${field.wrapperClass}`}>
            //     <RenderTextField
            //         labelText={field.labelText}
            //         name={field.name}
            //         handleChange={(e) => handleInputChange({ [field.name]: e.target.value }, [field.name])}
            //         value={inputVal[`${field.name}`]}
            //         valErrors={valErrors}
            //         disabled={loading || field.disabled}
            //         size={size}
            //         multiline={field.type === 'textarea'}
            //         inputProps={field.inputProps}
            //         errorKey={field.errorKey}
            //         isHelperText={field.isHelperText}
            //     />
            //     </div>
            case 'date' : 
                return <div className={`${wrapperClass} ${field.wrapperClass}`}>
                <RenderDatePicker
                    labelText={field.labelText}
                    name={field.name}
                    handleChange={(e) => handleInputChange({ [field.name]: e })}
                    value={inputVal[`${field.name}`]}
                    valErrors={valErrors}
                    disabled={loading || field.disabled}
                    size={size}
                    errorKey={field.errorKey}
                    isHelperText={field.isHelperText}
                />
                </div>
            case 'password' : 
                return <div className={`${wrapperClass} ${field.wrapperClass}`}>
                <RenderPasswordField
                    labelText={field.labelText}
                    name={field.name}
                    handleChange={(e) => handleInputChange({ [field.name]: e.target.value })}
                    value={inputVal[`${field.name}`]}
                    valErrors={valErrors}
                    disabled={loading || field.disabled}
                    size={size}
                    isHelperText={field.isHelperText}
                />
                </div>
        }
    }

    return (
        <>
            {inputFileds.map(field => (
                <Fragment key={field.name}>
                    {switchInput(field)}
                </Fragment>
            ))}
        </>
    )
}
