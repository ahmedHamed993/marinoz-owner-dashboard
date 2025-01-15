import { lazy } from "react";
import { createBrowserRouter } from "react-router";
// layouts
import MainLayout from "../components/layouts/MainLayout";
// pages
import Login from "../pages/login/Login";
import Register from "../pages/registration/Registration";
import Home from "../pages/home/Home";
import VerifyOtp from "../pages/registration/VerifyOtp";
// trips
import Trips from "../pages/trips/Trips";
import AddTrip from "../pages/trips/AddTrip";
import EditTrip from "../pages/trips/EditTrip";
// yacht
import Yacht from "../pages/yacht/Yacht";
import AddYacht from "../pages/yacht/AddYacht";
import EditYacht from "../pages/yacht/EditYacht";
// rental
import Rental from "../pages/rental/Rental";
import AddRental from "../pages/rental/AddRental";
import EditRental from "../pages/rental/EditRental";
// toures
import Tours from "../pages/tours/Tours";
import AddTour from "../pages/tours/AddTour";
import EditTour from "../pages/tours/EditTour";
// availabilities
import Availabilities from "../pages/availabilities/Availabilities";
import AddAvailability from "../pages/availabilities/AddAvailability";
import EditAvailability from "../pages/availabilities/EditAvailability";
// rental-availabilities
import RentalAvailabilities from "../pages/rental-availabilities/RentalAvailabilities";
import AddRentalAvailability from "../pages/rental-availabilities/AddRentalAvailability";
import EditRentalAvailability from "../pages/rental-availabilities/EditRentalAvailability";
// addons
import Addons from "../pages/addons/Addons";
import AddAddons from "../pages/addons/AddAddons";
import EditAddons from "../pages/addons/EditAddons";
// activities
import Activities from "../pages/activities/Activities";
import AddActivity from "../pages/activities/AddActivity";
import EditActivity from "../pages/activities/EditActivity";
// catering
import Catering from "../pages/catering/Catering";
import AddCatering from "../pages/catering/AddCatering";
// transportation
import Transportation from "../pages/transportation/Transportation";
import AddTransportation from "../pages/transportation/AddTransportation";
// water sports
import WaterSports from "../pages/water-sports/WaterSports";
import AddWaterSports from "../pages/water-sports/AddWaterSports";
// food beverages
import FoodBeverages from "../pages/food-beverages/FoodBeverages";
import AddFoodBeverages from "../pages/food-beverages/AddFoodBeverages";
// fishing equipments
import FishingEquipments from "../pages/fishing-equipments/FishingEquipments";
import AddFishingEquipments from "../pages/fishing-equipments/AddFishingEquipments";
// snorkling equipmetns
import SnorklingEquipments from "../pages/snorkling-equipments/SnorklingEquipments";
import AddSnorklingEquipments from "../pages/snorkling-equipments/AddSnorklingEquipments";
// marine attractions
import MarineAttractions from "../pages/marine-attractions/MarineAttractions";
import AddMarineAttractions from "../pages/marine-attractions/AddMarineAttractions";
// things to do
import ThingsToDo from "../pages/things-to-do/ThingsToDo";
import AddThingsToDo from "../pages/things-to-do/AddThingsToDo";
// trip types
import TripTypes from "../pages/trip-types/TripTypes";
import AddTripType from "../pages/trip-types/AddTripType";
// tour reviews
import Reviews from "../pages/reviews/Reviews";
// events
import Events from "../pages/events/Events";
import AddEvent from "../pages/events/AddEvent";
import EditEvent from "../pages/events/EditEvent";
// suites 
import Suites from "../pages/suites/Suites";
import AddSuite from "../pages/suites/AddSuite";
import EditSuite from "../pages/suites/EditSuite";
// yacht resales
import YachtResales from "../pages/yacht-resales/YachtResales";
import AddYachtResale from "../pages/yacht-resales/AddYachtResale";
import EditYachtResale from "../pages/yacht-resales/EditYachtResale";
// custom event requests
import CustomEventsRequests from "../pages/cutom-events-requests/CustomEventsRequests";
// custom tour requests 
import CustomTourRequests from "../pages/custom-tour-requests/CustomTourRequests";
import LuxuryCharterRequests from "../pages/luxury-charter-requests/LuxuryCharterRequests";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      // /trips
      {
        path: "trips",
        children: [
          {
            index: true,
            element: <Trips />,
          },
          {
            path: "add",
            element: <AddTrip />,
          },
          {
            path: ":tripId",
            element: <EditTrip />,
          },
        ],
      },
      // /yacht
      {
        path: "yacht",
        children: [
          {
            index: true,
            element: <Yacht />,
          },
          {
            path: "add",
            element: <AddYacht />,
          },
          {
            path: ":yachtId",
            element: <EditYacht />,
          },
        ],
      },
      // rental
      {
        path: "rental",
        children: [
          {
            index: true,
            element: <Rental />,
          },
          {
            path: "add",
            element: <AddRental />,
          },
          {
            path: ":rentalId",
            element: <EditRental />,
          },
        ],
      },
      // /tours
      {
        path: "tours",
        children: [
          {
            index: true,
            element: <Tours />,
          },
          {
            path: "add",
            element: <AddTour />,
          },
          {
            path: ":tourId",
            element: <EditTour />,
          },
        ],
      },
      // availabilities
      {
        path: "availabilities",
        children: [
          {
            index: true,
            element: <Availabilities />,
          },
          {
            path: "add",
            element: <AddAvailability />,
          },
          {
            path: ":availabilityId",
            element: <EditAvailability />,
          },
        ],
      },
      // addons
      {
        path: "addons",
        children: [
          {
            index: true,
            element: <Addons />,
          },
          {
            path: "add",
            element: <AddAddons />,
          },
          {
            path: ":addonsId",
            element: <EditAddons />,
          },
        ],
      },
      // activities
      {
        path: "activities",
        children: [
          {
            index: true,
            element: <Activities />,
          },
          {
            path: "add",
            element: <AddActivity />,
          },
          {
            path: ":activityId",
            element: <EditActivity />,
          },
        ],
      },
      // catering
      {
        path: "catering",
        children: [
          {
            index: true,
            element: <Catering />,
          },
          {
            path: "add",
            element: <AddCatering />,
          },
        ],
      },
      // transportation
      {
        path: "transportation",
        children: [
          {
            index: true,
            element: <Transportation />,
          },
          {
            path: "add",
            element: <AddTransportation />,
          },
        ],
      },
      // water-sports
      {
        path: "water-sports",
        children: [
          {
            index: true,
            element: <WaterSports />,
          },
          {
            path: "add",
            element: <AddWaterSports />,
          },
        ],
      },
      // food-beverages
      {
        path: "food-beverages",
        children: [
          {
            index: true,
            element: <FoodBeverages />,
          },
          {
            path: "add",
            element: <AddFoodBeverages />,
          },
        ],
      },
      // fishing-equipments
      {
        path: "fishing-equipments",
        children: [
          {
            index: true,
            element: <FishingEquipments />,
          },
          {
            path: "add",
            element: <AddFishingEquipments />,
          },
        ],
      },
      // snorkeling-equipments
      {
        path: "snorkeling-equipments",
        children: [
          {
            index: true,
            element: <SnorklingEquipments />,
          },
          {
            path: "add",
            element: <AddSnorklingEquipments />,
          },
        ],
      },
      // marine-attractions
      {
        path: "marine-attractions",
        children: [
          {
            index: true,
            element: <MarineAttractions />,
          },
          {
            path: "add",
            element: <AddMarineAttractions />,
          },
        ],
      },
      // marine-attractions
      {
        path: "things-to-do",
        children: [
          {
            index: true,
            element: <ThingsToDo />,
          },
          {
            path: "add",
            element: <AddThingsToDo />,
          },
        ],
      },
      // marine-attractions
      {
        path: "trip-types",
        children: [
          {
            index: true,
            element: <TripTypes />,
          },
          {
            path: "add",
            element: <AddTripType />,
          },
        ],
      },
      {
        path: "reviews",
        children: [
          {
            index: true,
            element: <Reviews />,
          },
        ],
      },
      // rental-availabilities
      {
        path: "rental-availabilities",
        children: [
          {
            index: true,
            element: <RentalAvailabilities />,
          },
          {
            path: "add",
            element: <AddRentalAvailability />,
          },
          {
            path: ":availabilityId",
            element: <EditRentalAvailability />,
          },
        ],
      },
      // events
      {
        path: "events",
        children: [
          {
            index: true,
            element: <Events />,
          },
          {
            path: "add",
            element: <AddEvent />,
          },
          {
            path: ":eventId",
            element: <EditEvent />,
          },
        ],
      },
      // suites 
      {
        path:"suites",
        children:[
          {
            index:true,
            element:<Suites />
          },
          {
            path:'add',
            element:<AddSuite />
          },
          {
            path:':suiteId',
            element:<EditSuite />
          },
        ]
      },
      // yacht-resales 
      {
        path:"yacht-resales",
        children:[
          {
            index:true,
            element:<YachtResales />
          },
          {
            path:'add',
            element:<AddYachtResale />
          },
          {
            path:':resaleId',
            element:<EditYachtResale />
          },
        ]
      },
      // custom-events-requests
      {
        path:"custom-events-requests",
        children:[
          {
            index:true,
            element:<CustomEventsRequests />
          }
        ]
      },
      // custrom-tour-requests
      {
        path:"custom-tour-requests",
        children:[
          {
            index:true,
            element:<CustomTourRequests />
          }
        ]
      },
      // luxury-charter-requests
      {
        path:"luxury-charter-requests",
        children:[
          {
            index:true,
            element:<LuxuryCharterRequests />
          }
        ]
      }
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/verify-otp",
    element: <VerifyOtp />,
  },
]);
