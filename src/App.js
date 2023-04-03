import "./App.css";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import Welcome from "./Welcome";
import Navbar from "./Navbar";
import InputStep from "./InputStep";
import ConfigStep from "./ConfigStep";
import ResultsStep from "./ResultsStep";
import theme from "./theme/theme";

function App() {
  const [correctionMode, setCorrectionMode] = useState(false);
  const [progress, setProgress] = useState(2);
  const [demandeur, setDemandeur] = useState("");
  const [besoin, setBesoin] = useState({});
  const [config, setConfig] = useState({});
  const [middleware, setMiddleware] = useState({});

  useEffect(() => {
    const { ipcRenderer } = window.require('electron');
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App All">
        {progress === -1 ? (
          <></>
        ) : (
          <div className="narvContainer">
            <Navbar step={progress} setProg={setProgress}></Navbar>
          </div>
        )}

        <div className="corps_all">
          {progress === -1 ? (
            <>
              <Welcome prog={setProgress}></Welcome>
            </>
          ) : (
            <></>
          )}
          {progress === 0 ? (
            <>
              <InputStep prog={setProgress}></InputStep>
            </>
          ) : (
            <></>
          )}
          {progress === 1 ? (
            <>
              <ConfigStep prog={setProgress}></ConfigStep>
            </>
          ) : (
            <></>
          )}
          {progress === 2 ? (
            <div className="results-pane">
              <ResultsStep prog={setProgress}></ResultsStep>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
