import { ThemeContextProvider } from "./context/ThemeContext";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Search from "./components/Search";
import Result from "./components/Result"

const App = () => {
  return (
    <ThemeContextProvider>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </Router>
    </ThemeContextProvider>
  );
};

export default App;
