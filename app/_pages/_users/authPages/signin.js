"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CustomInput from '@/app/_components/CustomInput/CustomInput';
import { signinInputs } from '@/app/_components/_data/data';
import Link from 'next/link';
import User from '@/models/User';

const Signin = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSignin = (e) => {
        e.preventDefault();
        const user = User.find(
            (user) => user.email === formData.email && user.password === formData.password
        );

        if (user) {
            console.log('User logged in:', user);
            router.push('/dashboard'); // Redirect to dashboard
        } else {
            setError('Invalid email or password');
        }
    };

    //
    const isFormValid = Object.values(formData).every(value => value.trim() !== '');
    return (

        <>
            <div className="flex   justify-center h-screen bg-gray-100">
            <div className="flex flex-col w-3/12 items-center justify-center p-4 bg-gray-100">
                <form
                    onSubmit={handleSignin}
                    className="w-full  bg-white rounded-lg shadow-sm hover:shadow-md p-8"
                >
                <h1 className="text-3xl font-bold mb-6 text-center">Sign In</h1>
                    {signinInputs.map((input, index) => (
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
                        
                        <div className="flex gap-5 items-center">
                    <button
                        type="submit"
                        className={`w-full  ${
        !isFormValid ? 'bg-slate-300 hover:bg-slate-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
    }  text-white font-semibold py-2 rounded-md transition duration-300 ease-in-out hover:bg-blue-500 mb-2`}
                    >
                        Sign In
                        </button>
                        
                        </div>
                         <div className='flex  w-full items-center'>
                      
                            <span className='w-11/12 text-right mx-2'>If Dont have an account?</span>
                            

                    <Link
                        href="/auth/signup"
                        className="text-center shadow-md w-4/12 h-auto p-1 bg-blue-500 text-white font-semibold  rounded hover:bg-blue-600 transition duration-200"
                    >
                        Sign Up
                        </Link>
                        
                            </div>
                </form>
                {error && <p className="mt-4 text-red-500">{error}</p>}
            </div>
            </div>
        </>
    );
};

export default Signin;
