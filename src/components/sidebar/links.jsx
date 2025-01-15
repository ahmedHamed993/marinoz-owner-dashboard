import { PiBookOpenTextLight } from "react-icons/pi";
import { IoNewspaperOutline, IoBoatOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa6";
import { BiUserPin } from "react-icons/bi";
import { TiHome } from "react-icons/ti";
import { LiaShipSolid } from "react-icons/lia";
import { HiOutlineBriefcase } from "react-icons/hi2";
import { MdOutlineInsertLink } from "react-icons/md";
const iconProps = { size: 24 };
export const adminLinks = [
  // {
  //   label: "Dashboard",
  //   path: "/",
  //   icon: <MdOutlineInsertLink {...iconProps} />,
  // },
  // {
  //   label: "Trips",
  //   path: "/trips",
  //   icon: <HiOutlineBriefcase {...iconProps} />,
  // },
  {
    label: "Yacht",
    path: "/yacht",
    icon: <MdOutlineInsertLink {...iconProps} />,
  },
  {
    label: "Rental Management",
    path: "/rental",
    icon: <MdOutlineInsertLink {...iconProps} />,
  },
  {
    label: "Tours Management",
    path: "/Tours",
    icon: <MdOutlineInsertLink {...iconProps} />,
  },
  {
    label: "Events Management",
    path: "/events",
    icon: <MdOutlineInsertLink {...iconProps} />,
  },
  {
    label: "Suites Management",
    path: "/suites",
    icon: <MdOutlineInsertLink {...iconProps} />,
  },
  {
    label: "Custom Events Requests",
    path: "/custom-events-requests",
    icon: <MdOutlineInsertLink {...iconProps} />,
  },
  {
    label: "Custom Tour Requests",
    path: "/custom-tour-requests",
    icon: <MdOutlineInsertLink {...iconProps} />,
  },
  {
    label: "Luxury Charter Requests",
    path: "/luxury-charter-requests",
    icon: <MdOutlineInsertLink {...iconProps} />,
  },
  // {
  //   label: "Bookings & Requests",
  //   path: "/bookings",
  //   icon: <BiUserPin {...iconProps} />,
  // },
  // {
  //   label: "Users Management",
  //   path: "/users",
  //   icon: <FaRegUser {...iconProps} />,
  // },
  // {
  //   label: "Reviews & Feeback",
  //   path: "/reviews",
  //   icon: <IoNewspaperOutline {...iconProps} />,
  // },
  // {
  //   label: "Promotions & Offeres",
  //   path: "/promotions",
  //   icon: <PiBookOpenTextLight {...iconProps} />,
  // },
];
