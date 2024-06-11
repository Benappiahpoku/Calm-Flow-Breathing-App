import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./components/store";
import MessageForm from "./components/MessageForm";
import SettingsPage from "./components/settingsPage";
import { FaHome } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { RxDividerVertical } from "react-icons/rx";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

function App() {
  const handleFormSubmit = (data) => {
    console.log(data);
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <div className="container">
            <header className="header-container">
              <nav className="nav">
                <Link to="/">
                  <FaHome style={{ fontSize: "2rem", color: "#346171" }} />
                </Link>{" "}
                <RxDividerVertical
                  style={{ fontSize: "2rem", color: "#346171" }}
                />{" "}
                <Link to="/settings">
                  <IoMdSettings
                    style={{ fontSize: "2rem", color: "#346171" }}
                  />
                </Link>
              </nav>
              <div className="header">
                <h1>Calm flow</h1>{" "}
                <img src="icon.png" alt="calm flow logo" className="img" />{" "}
              </div>
              <p>Gentle random messages</p>
            </header>

            <main>
              <Routes>
                <Route
                  path="/"
                  element={<MessageForm onSubmit={handleFormSubmit} />}
                />
                <Route path="/settings" element={<SettingsPage />} />
              </Routes>
            </main>
          </div>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;

// TODO
// I have remove this from package.json 
//"homepage": "./",
// if the electron app does not work, I will add it back