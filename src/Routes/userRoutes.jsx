import CollectionDetails from "../pages/CollectionDetails/CollectionDetails";
import CreateCollection from "../pages/CreateCollection/CreateCollection";
import CreateCollectionUploadImage from "../pages/CreateCollection/CreateCollectionUploadImage";
import CreateNft from "../pages/CreateNft/CreateNft";
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
    },
    {
        path:"/createNft",
        component:CreateNft
    },
    {
        path:"/createCollection",
        component:CreateCollection
    },
    {
        path:"/createCollectionUploadImage",
        component:CreateCollectionUploadImage
    }

    

]