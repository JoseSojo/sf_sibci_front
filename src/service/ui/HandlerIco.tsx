import { FC } from "react"
import { IconsType } from "../../types/app"
import { FaBoxes, FaCashRegister, FaCheck, FaCogs, FaExchangeAlt, FaEye, FaInfo, FaListUl, FaPen, FaPowerOff, FaUser } from "react-icons/fa"
import { MdAdd, MdArrowRight, MdError, MdOutlinePayment, MdOutlineSubscriptions, MdRestaurantMenu, MdSecurity } from "react-icons/md"
import { FaDeleteLeft, FaRegMoneyBill1 } from "react-icons/fa6"
import { RiAdminFill, RiDeleteBin4Fill, RiExchange2Fill } from "react-icons/ri"
import { PiFilePdfBold, PiUserListFill } from "react-icons/pi"
import { GrUpdate } from "react-icons/gr"
import { CiLogin, CiShop } from "react-icons/ci"
import { GoGraph } from "react-icons/go"
import { IoIosReturnLeft, IoMdArrowDropdown, IoMdNotifications } from "react-icons/io"
import { IoImageOutline } from "react-icons/io5"
import { FiAlertTriangle } from "react-icons/fi"
import { BsCalendar2, BsXLg } from "react-icons/bs"


interface Props {
    ico: IconsType
}

const HandlerIco: FC<Props> = ({ico}) => {

    if(ico === "config") return <FaCogs />
    if(ico === "create") return <MdAdd />
    if(ico === "delete-row") return <FaDeleteLeft />
    if(ico === "delete") return <RiDeleteBin4Fill />
    if(ico === "list") return <FaListUl />
    if(ico === "report") return <PiFilePdfBold />
    if(ico === "reload") return <GrUpdate />
    if(ico === "update") return <FaPen />
    if(ico === "logout") return <FaPowerOff />
    if(ico === "singin") return <CiLogin />
    if(ico === "subscription") return <MdOutlineSubscriptions />
    if(ico === "dashboard") return <GoGraph />
    if(ico === "payments") return <MdOutlinePayment />
    if(ico === "shop") return <CiShop />
    if(ico === "user") return <FaUser />
    if(ico === "unique") return <FaEye />
    if(ico === "master") return <RiAdminFill />
    if(ico === "down") return <MdArrowRight />
    if(ico === "drop") return <IoMdArrowDropdown />
    if(ico === "money") return <FaRegMoneyBill1 />
    if(ico === "secure") return <MdSecurity />
    if(ico === "image") return <IoImageOutline />
    if(ico === "error") return <MdError />
    if(ico === "success") return <FaCheck />
    if(ico === "info") return <FaInfo />
    if(ico === "warning") return <FiAlertTriangle />
    if(ico === "notification") return <IoMdNotifications />
    if(ico === "x") return <BsXLg />
    if(ico === `return`) return <IoIosReturnLeft />
    if(ico === `finanzas`) return <FaCashRegister />
    if(ico === `distribucion`) return <FaBoxes />
    if(ico === `agend`) return <BsCalendar2 />
    if(ico === `exchange`) return <FaExchangeAlt />
    if(ico === `menu`) return <MdRestaurantMenu />
    if(ico === `select`) return <></>
    if(ico === `change`) return <RiExchange2Fill />
    if(ico === `consult`) return <PiUserListFill />
    
    return <></>
}

export default HandlerIco;
