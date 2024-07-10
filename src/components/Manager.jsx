import React, { useEffect } from 'react'
import { useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';


import 'react-toastify/dist/ReactToastify.css';

function Manager() {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setForm] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setPasswordArray(JSON.parse(passwords))
        }

    }, [])

    const copyText = (text) => {
        toast('✅ Copied to clipboard', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            // toastId: 'success1'
            
            
            
            });
        navigator.clipboard.writeText(text)

    }



    const showPassword = () => {
        passwordRef.current.type = "text"
        if (ref.current.src.includes("icons/dontshow.svg")) {
            ref.current.src = "icons/show.svg"
            passwordRef.current.type = "password"

        }
        else {
            ref.current.src = "icons/dontshow.svg"
            passwordRef.current.type = "text"

        }
    }

    const savePassword = () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            const newPassword = { ...form, id: uuidv4() };
            const newPasswordArray = [...passwordArray, newPassword];
    
            setPasswordArray(newPasswordArray);
            localStorage.setItem("passwords", JSON.stringify(newPasswordArray));
            // setPasswordArray([...passwordArray, {...form, id: uuidv4()}])
            // localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form, id: uuidv4()}]))
            // console.log([...passwordArray, form])
    
            setForm({ site: "", username: "", password: "" });
    
            toast('✅ Password Saved!', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            // toastId: 'success3'
            });
        } else {
            toast('❌ Password not saved!',{
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    };
    const deletePassword = (id) => {
        console.log("Deleting password with id ", id)
        let c = confirm("Do you really want to delete this password?")
        if(c){
            setPasswordArray(passwordArray.filter(item=>item.id!==id))
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id))) 
            toast('Password Deleted!', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                // toastId: 'success2'
            });
        }
    }
    const editPassword = (id) => {
        
        // console.log("Editing password with id ", id)
        setForm(passwordArray.filter(i=>i.id===id)[0]) 
        setPasswordArray(passwordArray.filter(item=>item.id!==id)) 



    }
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={true}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                containerId="containerA"
               
            />
            {/* Same as */}
            <ToastContainer />
            <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div></div>
            <div className="p-2 md:p-0 md:mycontainer">
                <h1 className='text-4xl font-bold text-center'><span className='text-green-700'>&lt;</span>
                    Pass
                    <span className='text-green-700'>Lock/&gt;</span></h1>
                <p className='text-green-900 text-lg text-center'>Keep Your Secrets Safe</p>

                <div className="flex flex-col p-4 text-black gap-8 items-center">
                    <input value={form.site} onChange={handleChange} placeholder='Enter Website URL' className='rounded-full border border-green-500 w-full py-1 p-4' type="text" name='site' id='site' />


                    <div className="flex flex-col md:flex-row  w-full justify-between gap-8">


                        <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border border-green-500 w-full py-1 p-4' type="text" name='username' id='username' />
                        <div className="relative">

                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border border-green-500 w-full py-1 p-4' type="password" name='password' id='password' />
                            <span onClick={showPassword} className='absolute right-0 top-0'><img ref={ref} className='p-2 cursor-pointer ' width={35} src="icons/show.svg" alt="show" /></span>
                        </div>


                    </div>
                    <button onClick={savePassword} className='gap-2 flex justify-center items-center bg-green-500 hover:bg-green-400 rounded-full px-8 py-2 w-fit border border-green-900'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover">
                        </lord-icon>
                        Save Password</button>

                </div>
                <div className="passwords">
                    <h2 className='font-bold text-2xl py-4 text-center'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No Passwords to show</div>}
                    {passwordArray.length != 0 &&
                        <table className="table-auto w-full rounded-md overflow-hidden mb-20">
                            <thead className='bg-green-800 text-white'>
                                <tr>
                                    <th className='py-2'>Site</th>
                                    <th className='py-2'>Username</th>
                                    <th className='py-2'>Password</th>
                                    <th className='py-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-100'>
                                {passwordArray.map((item, index) => {
                                    return <tr key={index}>


                                        <td className='py-2 gap-0 border border-white text-center flex justify-center sm:gap-4'> <a className='text-xs sm:text-sm' href={item.site} target="_blank" >{item.site} </a><div onClick={() => { copyText(item.site) }} className='cursor-pointer'>
                                            <img className='w-3 copyimg border sm:w-5  border-black invert' src="icons/copy.svg" alt="copy" />

                                        </div> </td>



                                        <td className='py-2 border border-white text-center w-32'> <span className='text-xs sm:text-sm'>
                                        </span >{item.username}</td>



                                        <td onClick={() => { copyText(item.password) }} className='flex justify-center  py-2 border border-white text-center ' ><span className='text-xs sm:text-sm'>

                                            {item.password}
                                        </span>
                                            <div className='cursor-pointer'>
                                                <img className='w-3 copyimg border sm:w-5  border-black invert' src="icons/copy.svg" alt="copy" />

                                            </div>
                                        </td>
                                        <td className='py-2 border border-white text-center ' >
                                            <div className='flex justify-center gap-2'>

                                            <span onClick={()=>{editPassword(item.id)}} className='w-3 sm:w-5 cursor-pointer'><img src="icons/edit.svg" alt="edit" /></span>
                                            <span onClick={()=>{deletePassword(item.id)}} className='w-3 sm:w-5 cursor-pointer'><img src="icons/delete.svg" alt="delete" /></span>
                                            </div>
                                      
                                        </td>


                                    </tr>
                                })}

                            </tbody>
                        </table>}
                </div>
            </div>
        </>
    )
}

export default Manager
