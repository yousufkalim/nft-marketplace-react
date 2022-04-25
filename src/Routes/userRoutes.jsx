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
    }

]