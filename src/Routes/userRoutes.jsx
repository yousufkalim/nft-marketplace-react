import CollectionDetails from "../pages/CollectionDetails/CollectionDetails";
import CollectionView from "../pages/CollectionView/CollectionView";
import CreateCollection from "../pages/CreateCollection/CreateCollection";
import CreateCollectionUploadImage from "../pages/CreateCollection/CreateCollectionUploadImage";
import CreateNft from "../pages/CreateNft/CreateNft";
import UploadNft from "../pages/CreateNft/UploadNft";
import ExplorePage from "../pages/ExplorePage/ExplorePage";
import FilterCollections from "../pages/FilterCollections/FilterCollections";
import HomePage from "../pages/HomePage";
import NftDetail from "../pages/NftDetail/NftDetail";
import Profile from "../pages/Profile/Profile";
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
        component:UploadNft
    },
    {
        path:"/createCollection",
        component:CreateCollection
    },
    {
        path:"/createCollectionUploadImage",
        component:CreateCollectionUploadImage
    },
    {
        path:"/nftDetail",
        component:NftDetail
    },
    {
        path:"/collectionView/:id",
        component:CollectionView
    },
    {
        path:"/profile",
        component:Profile
    },
    {
        path:"/filterCollections",
        component:FilterCollections
    }


    

]