import { Outlet } from "react-router-dom"
import Header from "../../Component/Header/Header"
import Footer from "../../Component/Footer/Footer"

const Layout_Web = () => {

  return (
    <div>

      <Header />

      <main><Outlet /></main>

      <Footer />
    </div>
  )
}

export default Layout_Web
