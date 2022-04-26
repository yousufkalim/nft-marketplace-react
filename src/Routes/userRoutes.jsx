import CollectionDetails from "../pages/CollectionDetails/CollectionDetails";
import ExplorePage from "../pages/ExplorePage/ExplorePage";
import HomePage from "../pages/HomePage";
import ChangePassword from "../pages/UserPages/ChangePassword";

export const userRoutes = [
    {
        path : "/",
        component : HomePage
    },
    {
        path:"/changePassword",
        component:ChangePassword
    },
    {
        path:"/explore",
        component:ExplorePage
    },
    {
        path:"/collectionDetails",
        component:CollectionDetails
    }

]