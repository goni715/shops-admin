import {useEffect, useState} from "react";
import {useLoginMutation} from "../redux/features/auth/authApi.js";
import {useNavigate} from "react-router-dom";
import {Spinner} from "@material-tailwind/react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [login, {isLoading, isSuccess}] = useLoginMutation();
    const navigate = useNavigate();


    useEffect(()=>{
        if(isSuccess){
            navigate('/');
        }
    },[navigate,isSuccess]);


    const handleSubmit = (e) => {
        e.preventDefault()
        login({
            email, password
        })

    }

    return (
        <>
            <div className="min-h-screen bg-white flex justify-center px-5 items-center">
                <div className="bg-white p-5 sm:p-10 border w-[90%] sm:w-[450px] border-gray-800 rounded">
                    <h1 className="text-center font-semibold text-2xl">Admin Login </h1>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-6 py-5">
                            <div>
                                <label className="inline-block pb-2 text-gray-800" htmlFor="email">Email</label>
                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full focus:outline-none border border-gray-300 px-4 py-2 rounded-lg"
                                    type="email"
                                    id="email"
                                    required
                                />
                            </div>
                            <div>
                                <label className="inline-block pb-2 text-gray-800" htmlFor="password">Password</label>
                                <input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full focus:outline-none border border-gray-300 px-4 py-2 rounded-lg"
                                    type="password"
                                    id="password"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                            <span onClick={() => navigate('/register')}
                                  className="text-primary  underline cursor-pointer">Not a user Register here?</span>
                            <button disabled={isLoading}
                                    className="bg-primary self-end flex items-center justify-center gap-3 w-[170px] px-3 py-2.5 text-white font-bold text-md rounded-md">
                                {isLoading? (
                                    <>
                                        <Spinner className="h-6 w-6" /> Processing...
                                    </>
                                ):
                                    "Login"
                                }
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;