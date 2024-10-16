"use client";
import { signupInputs } from '@/app/_components/_data/data';
import CustomInput from '@/app/_components/CustomInput/CustomInput';
import Link from 'next/link';
import { useState } from 'react';

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSignup = (e) => {
        e.preventDefault();
        // Here you can handle signup logic (e.g., save user data)
        setMessage(`User ${formData.username} signed up successfully!`);
        console.log('User data:', formData);
    };

       const isFormValid = Object.values(formData).every(value => value.trim() !== '');

    return (
        <div className="flex items-center  justify-center h-screen bg-gray-100">
            <div className="bg-white   rounded-lg shadow-sm hover:shadow-md p-8 w-96  h-fit">
                <h1 className="text-2xl font-bold text-center mb-6">Sign Up</h1>
                <form onSubmit={handleSignup}>
                    {signupInputs.map((input, index) => (
                        <CustomInput
                            key={index}
                            label={input.label}
                            type={input.type}
                            placeholder={input.placeholder}
                            name={input.name}
                            value={formData[input.name]}
                            onChange={handleChange}
                            required={input.required}
                        />
                    ))}

                    <div className="flex gap-5 justify-center">
                    <button
                        type="submit"
                            className={` px-3 mb-2   ${
        !isFormValid ? 'bg-slate-300 hover:bg-slate-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
    }   bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition duration-200`}
                              disabled={!isFormValid} 
                    >
                        Sign Up
                        </button>
                        
                    </div>
                    <div className='flex  w-full items-center justify-around '>
                      
                            <span className='min-w-fit mx-2'>If Already  have an account?</span>
                            

                    <Link
                        href="/auth/signin"
                        className="text-center shadow-md w-4/12 h-auto p-1 bg-blue-500 text-white font-semibold  rounded hover:bg-blue-600 transition duration-200"
                    >
                        Sign In
                        </Link>
                        
                            </div>
                </form>
                {message && <p className="mt-4 text-green-600 text-center">{message}</p>}
            </div>
        </div>
    );
};

export default Signup;
