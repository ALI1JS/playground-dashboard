import React, { useState } from "react";
import UserType from "../../types/user.type";
import Input from "./input.comp";


const Login: React.FC<UserType> = () => {

    const [userData, setUserData] = useState<UserType>({ username: '', password: '' });
    const [errors, setErrors] = useState<UserType>({ username: '', password: '' });
    const [resetPassword, setResetPassword] = useState<boolean>(false);
    const [checkEmailMsg, setcheckEmailMsg] = useState<boolean>(false);


    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setUserData(prevState => ({ ...prevState, [name]: value }))
        validateField(name, value);
    }


    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Implement your login logic here, e.g., calling an API
        if (!userData.username || !userData.password || errors.username || errors.password) {
            console.error('Form validation errors:', errors);
            return; // Stop submission if there are errors
        }
        console.log('Login attempt:', userData);
        
    };

    const resetPassSubmit = (e: React.FormEvent<HTMLFormElement>):void =>{
        e.preventDefault();
        
        if (!userData.username || errors.username ) {
            console.error('Form validation errors:', errors.username);
            return; // Stop submission if there are errors
        }

         setcheckEmailMsg(true);
        // Implement your login logic here, e.g., calling an API
        console.log('Login attempt:', userData.username);

        // return to Login Component after some minutes

        setTimeout(()=>{
            setResetPassword(false);
        }, 3000)

    }

    const validateField = (name: string, value: string): void => {
        let errMsg = '';
        if (!value) {
            errMsg = `${name.replace(/([A-Z])/g, ' $1').trim()} is required.`;
        } else if (name === 'password' && value.length < 8) {
            errMsg = 'Password must be at least 8 characters long.';
        }
        else if (name === "username")
        {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
              errMsg = 'Invalid email format.';
            }
        }

        setErrors(prevErrors => ({ ...prevErrors, [name]: errMsg }));
    };

    const resetPasswordHandle = (): void => {
        setResetPassword(true);
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="rounded px-8 py-6 mt-4 text-left bg-white shadow-lg md:w-1/3 lg:w-1/4">
                {
                    !resetPassword &&
                    <>
                        <h3 className="text-2xl font-bold text-center">Login</h3>
                        <form onSubmit={handleLogin}>
                            <div className="mt-4">

                                <Input type="text" name="username" label="usernamOrEmail" value={userData.username} handleOnChange={handleOnChange} error={errors.username}/>
                                <Input type="password" name="password" label="password" value={userData.password} handleOnChange={handleOnChange} error={errors.password}/>
                                <div className="flex items-baseline justify-between">
                                    <button type="submit" className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">Login</button>
                                    <a onClick={resetPasswordHandle} className="text-sm text-blue-600 hover:underline cursor-pointer">Forgot password?</a>
                                </div>
                            </div>
                        </form>
                    </>

                }
               {
                 resetPassword &&
                 <form onSubmit={resetPassSubmit}>
                   {checkEmailMsg && <p className="text-black text-whrite text-md font-bold mt-1">check your email to Rest your password</p>}
                 <Input type="text" name="username" label="usernamOrEmail" value={userData.username} handleOnChange={handleOnChange} error={errors.username}/>
                 <button type="submit" className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">Login</button>
             </form>

               }
                

            </div>
        </div>
    )
}


export default Login;