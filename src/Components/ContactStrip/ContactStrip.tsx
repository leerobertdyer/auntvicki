import './ContactStrip.css'
import { FaSquareFacebook } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";

export const ContactStrip = () => {
    return (
        <div className='mainContactStripDiv'>

            <a href="https://www.facebook.com/AuntVickiBand" target="_blank">
                <FaSquareFacebook fill="white" size={60} /></a>
            <a href="mailto:Aunt Vicki<mgmt@auntvicki.rocks>?subject=Booking">
            <MdOutlineMailOutline fill="white" size={60} />
            </a>
            <a href="https://www.instagram.com/_aunt_vicki" target="_blank">
                <FaInstagramSquare fill="white" size={60} />
            </a>
        </div>
    )
}
