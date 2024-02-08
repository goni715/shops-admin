import {BrowserRouter, Route, Routes} from "react-router-dom";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import HomePage from "./pages/HomePage.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import PublicRoute from "./routes/PublicRoute.jsx";
import UserListPage from "./pages/UserListPage.jsx";
import CategoryListPage from "./pages/CategoryListPage.jsx";
import ProductListPage from "./pages/ProductListPage.jsx";




const App = () => {


    return (
        <>
             <BrowserRouter>
                 <Routes>
                     <Route path="/" element={<PrivateRoute> <HomePage/> </PrivateRoute>} />
                     <Route path="/users" element={<PrivateRoute> <UserListPage/></PrivateRoute>} />
                     <Route path="/category-list" element={<PrivateRoute> <CategoryListPage/> </PrivateRoute>} />
                     <Route path="/product-list" element={<PrivateRoute> <ProductListPage/> </PrivateRoute>} />


                     <Route path="/register" element={<PublicRoute> <Register/> </PublicRoute>}/>
                     <Route path="/login" element={<PublicRoute> <Login/> </PublicRoute>}/>
                 </Routes>
            </BrowserRouter>
        </>
    );
};

export default App;