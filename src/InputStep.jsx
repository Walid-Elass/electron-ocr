import React, { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Collapse, List } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

function splitByLastBackslash(filePath) {
  const parts = filePath.split("\\");
  const lastPart = parts.pop();
  const remainingPath = parts.join("\\");
  return remainingPath;
}

const InputStep = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [files, setFiles] = useState();
  const [selectedFiles, setSelectedFiles] = useState();
  const [folderPath, setFolderPath] = useState();
  const handleFolderChange = async (event) => {
    console.log(event.target.files);
    setFiles(
      Array.from(event.target.files).filter(
        (file) => file.type === "application/pdf"
      )
    );
    const folderPath = event.target.files[0].path;
    console.log("Selected folder:", folderPath);
    setFolderPath(folderPath);

    // Communicate with Electron
    const { ipcRenderer } = window.require("electron");
    const path = splitByLastBackslash(folderPath);
    localStorage.setItem("path", path);
  };

  const handleShowFiles = () => {
    setCollapsed(false);
  };

  return (
    <>
      <Card sx={{ width: "100%" }}>
        <CardContent>
          <Typography sx={{ fontSize: 14, marginBottom:'15px' }} color="text.secondary" gutterBottom>
            Répertoire
          </Typography>
          <div className="folder-selector">
          <Button variant="contained" color="secondary">
          <label for="file-upload" class="custom-file-upload">
            Choisir un répertoire
          </label>
          </Button>
          <div className="selected-folder">
          <Typography sx={{ fontSize: 14, marginTop:'5px' }} color="text.secondary" gutterBottom>
            
            {localStorage.getItem("path") ? localStorage.getItem("path") : "Choisir"}
          </Typography>
          </div>
          </div>
          
          
          <input
            type="file"
            id="file-upload"
            webkitdirectory="true"
            accept="application/pdf"
            onChange={handleFolderChange}
          />
        </CardContent>
        <CardActions>
        </CardActions>
      </Card>
    </>
  );
};

export default InputStep;
