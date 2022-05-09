import "./Home.css";
import { Footer } from "../../components";
import logo from "../../assets/ExtensryNBg.png";
import { useBrowser } from "../../context/browser-context";

export const Home = () => {
    const { name, browserDispatch } = useBrowser();

    const handleNameChange = (event) => {
        if (event.key === "Enter" && event.target.value.length > 0) {
          browserDispatch({
            type: "USER_NAME",
            payload: event.target.value
          });
          localStorage.setItem("userName", event.target.value);
        }
      };
    
      const handleSubmit = (event) => {
        event.preventDefault();
      };

    return (
    <div className="home-container d-flex direction-column align-center gap">
        <div className="logo-container">
            <img className="logo logo-props" src={logo} alt="logo"/>
        </div>
        <div className="user-name-continer">
            <h1 className="heading-1 main-heading">Hello, what's your name?</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    value={name}
                    required className="input form-input"
                    onKeyPress={handleNameChange}
                />
            </form>
        </div>
        <Footer />
    </div>
    )
    
}