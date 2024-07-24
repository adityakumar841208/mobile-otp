import React from 'react'
import { useState, useRef, useEffect } from 'react'
import Otpenter from './Otpenter'

const Otpcomponent = () => {
    const [isSubmit, setIsSubmit] = useState(false)
    const [mobileNumber, setMobileNumber] = useState("")
    const inputRef = useRef()
    const buttonRef = useRef()

    const handleClick = () => {
        if (mobileNumber.length === 10 && /^\d{10}$/.test(mobileNumber)) {
            setIsSubmit(true);
        } else {
            alert("please enter the correct number");
        }
    };
    
    const handleKeyPress = (event)=>{
        if(event.key === "Enter"){
            buttonRef.current.click()
        }
    }

    useEffect(() => {
        inputRef.current.focus()
    }, [])

    return (
        <>
            {!isSubmit ? (<div className="flex items-center flex-col justify-center">
                <div className="mb-4">
                    <input
                        required
                        ref={inputRef}
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        type="text"
                        placeholder="Enter mobile number"
                        onKeyPress={handleKeyPress}
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    ref={buttonRef}
                    onClick={handleClick}
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Submit
                </button>
            </div>) :
                <Otpenter number={mobileNumber}/>
            }


        </>
    )
}

export default Otpcomponent
