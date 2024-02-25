import {FaHome, FaUsers} from "react-icons/fa";
import {RiProductHuntLine} from "react-icons/ri";
import {MdCategory, MdOutlineContactSupport} from "react-icons/md";



// admin menu
export const SidebarMenu = [
    {
        name: "Home",
        path: "/",
        icon: FaHome,
    },
    {
        name: "Users",
        path: "/users",
        icon: FaUsers,
    },
    {
        name: "Category List",
        path: "/category-list",
        icon: MdCategory,
    },
    {
        name: "Create Product",
        path: "/create-product",
        icon: RiProductHuntLine,
    },
    {
        name: "Product List",
        path: "/product-list",
        icon: RiProductHuntLine,
    },
    {
        name: "Contact List",
        path: "/contact-list",
        icon: MdOutlineContactSupport,
    },
];
