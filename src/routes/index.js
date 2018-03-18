import RootLayout from "../layouts/RootLayout";
import IndexRoutes from "./IndexRoutes";

export default () => {
    return [
        {
            component: RootLayout,
            routes: [IndexRoutes()]
        }
    ];
};