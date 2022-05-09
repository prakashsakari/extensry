import { Footer } from "../../components";
import logo from "../../assets/ExtensryNBg.png"
import "./Home.css";

export const Home = () => {
    return (
    <div className="home-container d-flex direction-column align-center gap">
        <div className="logo-container">
            <img className="logo logo-props" src={logo} alt="logo"/>
        </div>
        <div className="user-name-continer">
            <h1 className="heading-1 main-heading">Hello, what's your name?</h1>
            <form>
                <input required className="input form-input"/>
            </form>
        </div>
        <Footer />
    </div>
    )
    
}