import {logout} from "../../helper/SessionHelper.js";
import {MdOutlineLogout} from "react-icons/md";
import {useLocation, useNavigate} from "react-router-dom";
import {IoMdClose} from "react-icons/io";
import {GiHamburgerMenu} from "react-icons/gi";
import {useState} from "react";
import {SidebarMenu} from "../../Data/data.js";

const MobileNav = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const pathName = location.pathname;
    const [open, setOpen] = useState(false);

    //handle open
    const handleOpen = () => {
        setOpen(!open);
    }

    const handleNavigate = (to) => {
        navigate(to);
    }




    return (
        <>

            <div className="mobile-nav block md:hidden w-full fixed top-0 z-20 overflow-hidden">
                <div className="h-[50px] w-full bg-[#1e1e1e] p-2 flex justify-between items-center">
                    <div className="mobile-nav-header flex items-center ">
                        {open ? (
                            <IoMdClose className="mobile-nav-icon text-white cursor-pointer" size={30} onClick={handleOpen}/>
                        ): (
                            <GiHamburgerMenu className="mobile-nav-icon text-white cursor-pointer" size={30} onClick={handleOpen}/>
                        )
                        }
                        <span className="mobile-nav-title text-[#f29f67] font-bold capitalize text-xl ml-5">Shops Admin</span>
                    </div>
                </div>

                {/*mobile menu */}

                {
                    open && (
                        <>
                            <div className="mobile-nav md:hidden bg-[#330101] min-h-screen w-[300px] shadow-lg text-white">

                                <div className="side-menu px-3 flex flex-col gap-8 py-10">
                                    {SidebarMenu.map((item,i)=>{
                                        return(
                                            <>
                                                <div key={i.toString()} onClick={()=>handleNavigate(item.path)} className={`flex items-center gap-3 cursor-pointer duration-300 hover:pl-2 hover:text-blue-700 ${pathName===item.path && "active"}`} >
                                                    <item.icon size={20} />
                                                    <span className="text-lg font-bold">
                                       {item.name}
                                    </span>
                                                </div>
                                            </>
                                        )
                                    })
                                    }

                                    <div onClick={()=>logout()} className={`flex items-center gap-3 cursor-pointer duration-300 hover:pl-2 hover:text-blue-700`}>
                                        <MdOutlineLogout size={20} />
                                        <span className="text-lg font-bold">Logout</span>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                }

            </div>


        </>
    );
};

export default MobileNav;