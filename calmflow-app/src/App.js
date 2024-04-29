import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./components/store";
import MessageForm from "./components/MessageForm";

function App() {
  const handleFormSubmit = (data) => {
    console.log(data);
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="App">
          <header className="App-header">
            <MessageForm onSubmit={handleFormSubmit} />
          </header>
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
