import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  IconButton,
  LinearProgress,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { DataGrid, frFR } from "@mui/x-data-grid";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import DownloadIcon from '@mui/icons-material/Download';


function CircularProgressWithLabel(props) {
  return (
    <Box
      sx={{
        position: "relative",
        transform: "translateY(150px)",
        display: "inline-flex",
      }}
    >
      <CircularProgress
        size={60}
        thickness={2}
        variant="determinate"
        {...props}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

const columns = [
  {
    field: "document",
    headerName: "Document",
    flex: 2,
    headerClassName:"datagrid-header",
    cellClassName:"datagrid-cell",
    headerAlign:"center",
  },
  {
    field: "page",
    headerName: "Page",
    flex: 1,
    headerClassName:"datagrid-header",
    cellClassName:"datagrid-cell",
    headerAlign:"center",
  },
  {
    field: "text_before",
    headerName: "Texte Avant",
    flex: 4,
    headerClassName:"datagrid-header",
    cellClassName:"datagrid-cell",
    headerAlign:"center",
  },
  {
    field: "text_after",
    headerName: "Texte Après",
    flex: 4,
    headerClassName:"datagrid-header",
    cellClassName:"datagrid-cell",
    headerAlign:"center",
  },
];

const ResultsStep = () => {
  const [progress, setProgress] = useState(0);
  const { ipcRenderer } = window.require("electron");
  const [results, setResults] = useState();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const handleFullscreenToggle = () => {
    setIsFullscreen(!isFullscreen);
  };

  
  const downloadCSV = () => {
    if (!results || results.length === 0) return;

    const csvContent = [
      columns.map((col) => col.headerName).join(","),
      ...results.map((row) => columns.map((col) => row[col.field]).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "results.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    const handleProgressUpdate = (event, newProgress) => {
      setProgress(newProgress);
    };

    ipcRenderer.on("update-progress", handleProgressUpdate);

    // Clean up the event listener when the component is unmounted
    return () => {
      ipcRenderer.removeListener("update-progress", handleProgressUpdate);
    };
  }, []);

  useEffect(() => {
    const handleResults = (event, results) => {
      setResults(JSON.parse(results));
    };

    ipcRenderer.on("results", handleResults);

    // Clean up the event listener when the component is unmounted
    return () => {
      ipcRenderer.removeListener("results", handleResults);
    };
  }, []);

  useEffect(() => {
    if (progress === 100) {
    }
  }, [progress]);

  return (
    <>
      {progress === 100 ? (
        <>
          <Card className={isFullscreen && "fullscreen"}>
            <CardContent>
              <div className="head">
                <Typography
                  sx={{ fontSize: 16, marginBottom: "15px" }}
                  color="text.secondary"
                  gutterBottom
                >
                  Résultats de la recherche
                </Typography>
                <IconButton
                  sx={{ marginBottom: "15px" }}
                  onClick={handleFullscreenToggle}
                >
                  {isFullscreen ? (
                    <>
                      <CloseFullscreenIcon
                        className="help-icon"
                        color="primary"
                      />
                    </>
                  ) : (
                    <>
                      <OpenInFullIcon className="help-icon" color="primary" />
                    </>
                  )}
                </IconButton>
              </div>
              <div style={{ height: 400, width: "100%" }}>
                {results && (
                  <DataGrid
                    disableSelectionOnClick
                    localeText={
                      frFR.components.MuiDataGrid.defaultProps.localeText
                    }
                    
                    getRowId={(row) => row?.id}
                    rows={results}
                    columns={columns}
                    pageSize={5}
                  />
                )}
              </div>
            </CardContent>
            <CardActions>
              <div className="justify-end">
                <Button onClick={downloadCSV} startIcon={<DownloadIcon />}>
                  Télecharger CSV
                </Button>
              </div>
            </CardActions>
          </Card>
        </>
      ) : (
        <div className="progress">
          <CircularProgressWithLabel value={progress} />
        </div>
      )}
    </>
  );
};

export default ResultsStep;
