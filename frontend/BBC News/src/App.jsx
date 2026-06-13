import {BrowserRouter, Routes, Route} from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import SingleNews from "./pages/SingleNews"
import Category from "./pages/Category"
import Login from "./admin/Login"
import Dashboard from "./admin/Dashboard"
import Profile from "./admin/Profile"
import Changepassword from "./admin/Changepassword"
import Createnews from "./admin/NewsManagement/Createnews"
import DraftNews from "./admin/NewsManagement/DraftNews"
import EditNews from "./admin/NewsManagement/EditNews"
import DeleteNews from "./admin/NewsManagement/DeleteNews"
import Inreview from "./admin/NewsManagement/Inreview"
import Schedule from "./admin/NewsManagement/Schedule"
import PublishNews from "./admin/NewsManagement/PublishNews"

const App = () => {
  return (
  <BrowserRouter>
        <Navbar />
    <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/news/:id" element={<SingleNews/>} />
       <Route path="/category/:category"  element={<Category/>} />


       <Route path='/admin/login' element={<Login/>} />
       <Route path="/admin/dashboard" element={<Dashboard/>} />
       <Route path="/admin/profile" element={<Profile/>} />
       <Route path="/admin/changepassword" element={<Changepassword/>} />


       <Route path="/admin/createnews" element={<Createnews/>} />
       <Route path="/admin/draftnews" element={<DraftNews/>} />
       <Route path="/admin/edit-news/:id" element={<EditNews/>} />
       <Route path="/admin/delete/:id" element={<DeleteNews/>} />

       <Route path="/admin/review" element={<Inreview/>} />
       <Route path="/admin/schedule" element={<Schedule/>} />
       <Route path="/admin/publish" element={<PublishNews/>} />
    </Routes>
  
  
  
  </BrowserRouter>
  )
}

export default App