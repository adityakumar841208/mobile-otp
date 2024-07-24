import React, { useRef, useState, useEffect } from 'react';

const OtpEnter = ({ number }) => {
    const [otp, setOtp] = useState(['', '', '', '']);
    const inputRefs = useRef([]);

    const handleChange = (e, index) => {
        const { value } = e.target;
        if (/^[0-9]$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
            if (index < 3) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    useEffect(()=>{
        inputRefs.current[0].focus()
    },[])

    const handleBackspace = (e, index) => {
        if (e.key === 'Backspace') {
            if (otp[index]) {
                const newOtp = [...otp];
                newOtp[index] = '';
                setOtp(newOtp);
            } else if (index > 0) {
                inputRefs.current[index - 1].focus();
            }
        }
    };

    const handlePaste = (e) => {
        const paste = e.clipboardData.getData('text');
        if (/^\d{4}$/.test(paste)) {
            const newOtp = paste.split('');
            setOtp(newOtp);
            inputRefs.current[3].focus();
        }
    };

    return (
        <div className="flex flex-col items-center">
            <div className="text-center mb-4">Otp sent on {number}. Please enter the OTP.</div>
            <div className="flex space-x-2" onPaste={handlePaste}>
                {otp.map((digit, index) => (
                    <input
                        key={index}
                        type="text"
                        maxLength="1"
                        className="w-12 h-12 text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={digit}
                        onChange={(e) => handleChange(e, index)}
                        onKeyDown={(e) => handleBackspace(e, index)}
                        ref={(el) => (inputRefs.current[index] = el)}
                    />
                ))}
            </div>
        </div>
    );
};

export default OtpEnter;

