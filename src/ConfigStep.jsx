import React, { useEffect, useRef, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import {
  Checkbox,
  Collapse,
  Dialog,
  DialogTitle,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import CheckIcon from "@mui/icons-material/Check";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import HelpIcon from "@mui/icons-material/Help";
import CloseIcon from "@mui/icons-material/Close";

const ConfigStep = () => {
  const [mode, setMode] = useState("fast");
  const [openHelpOne, setOpenHelpOne] = React.useState(false);
  const [keywords, setKeywords] = useState(
    JSON.parse(localStorage.getItem("keywords"))
  );
  const [newKeyword, setNewKeyword] = useState("");
  const [addMode, setAddMode] = useState(false);
  const [textFieldWidth, setTextFieldWidth] = useState("1.3ch");
  const [wordsBefore, setWordsBefore] = useState(10);
  const [wordsAfter, setWordsAfter] = useState(10);
  const [lang, setLang] = useState("fr");
  const [caseSensitive, setCaseSensitive] = useState(false);

  const onChipClick = (index) => {
    const updatedKeywords = keywords.map((keyword, i) => {
      if (i === index) {
        return { ...keyword, active: !keyword.active };
      }
      return keyword;
    });

    setKeywords(updatedKeywords);
  };

  const handleModeChange = (event, newMode) => {
    setMode(newMode);
  };

  const handleClickOpenHelpOne = () => {
    setOpenHelpOne(true);
  };

  const handleClose = (value) => {
    setOpenHelpOne(false);
  };

  const handleAddKeyword = () => {
    const newKeywords = newKeyword.split(",").map((word) => {
      return { word: word.trim(), active: false };
    });

    setKeywords([...keywords, ...newKeywords]);
    setNewKeyword("");
    setTextFieldWidth("10ch");
    setAddMode(false);
  };

  const handleDeleteActiveKeywords = () => {
    setKeywords(keywords.filter((keyword) => !keyword.active));
  };

  const handleSetAddMode = () => {
    setAddMode(true);
  };

  const handleCancel = () => {
    setAddMode(false);
    setNewKeyword("");
    setTextFieldWidth("1.3ch");
  };

  const handelNewKeywordChange = (e) => {
    const inputLength = e.target.value.length;
    const newWidth = Math.min(Math.max(inputLength, 1) * 1.3, 50) + "ch";
    setTextFieldWidth(newWidth);
    setNewKeyword(e.target.value);
  };

  const handleCheckboxClick = (e) => {
    setCaseSensitive(e.target.checked);
  };

  const textFieldRef = useRef();

  useEffect(() => {
    localStorage.setItem("keywords", JSON.stringify(keywords));
  }, [keywords]);

  useEffect(() => {
    localStorage.setItem("mode", mode);
  }, [mode]);

  useEffect(() => {
    localStorage.setItem("wordsAfter", wordsAfter);
  }, [wordsAfter]);

  useEffect(() => {
    localStorage.setItem("wordsBefore", wordsBefore);
  }, [wordsBefore]);

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem("caseSensitive", caseSensitive);
  }, [caseSensitive]);

  useEffect(() => {
    if (addMode && textFieldRef.current) {
      textFieldRef.current.focus();
    }
  });

  return (
    <>
      <Card sx={{width:'100%'}}>
        <CardContent>
          <div className="head">
            <Typography
              sx={{ fontSize: 16 }}
              color="text.secondary"
              gutterBottom
            >
              Mode de recherche
            </Typography>
            <IconButton onClick={handleClickOpenHelpOne}>
              <HelpIcon className="help-icon" color="primary" />
            </IconButton>
          </div>
        </CardContent>
        <ToggleButtonGroup
          value={mode}
          exclusive
          fullWidth
          onChange={handleModeChange}
          aria-label="text alignment"
        >
          <ToggleButton value="fast" key="fast" aria-label="left aligned">
            <Stack
              direction="column"
              alignContent="center"
              alignItems="center"
              gap={1}
            >
              <ElectricBoltIcon />
              <Typography sx={{ fontSize: 14 }} gutterBottom>
                Rapide
              </Typography>
            </Stack>
          </ToggleButton>
          <ToggleButton value="hybrid" key="hybrid" aria-label="centered">
            <Stack
              direction="column"
              alignContent="center"
              alignItems="center"
              gap={1}
            >
              <ElectricBoltIcon />
              <Typography sx={{ fontSize: 14 }} gutterBottom>
                Hybride
              </Typography>
            </Stack>
          </ToggleButton>
          <ToggleButton value="ocr" key="ocr" aria-label="right aligned">
            <Stack
              direction="column"
              alignContent="center"
              alignItems="center"
              gap={1}
            >
              <ElectricBoltIcon />
              <Typography sx={{ fontSize: 14 }} gutterBottom>
                OCR
              </Typography>
            </Stack>
          </ToggleButton>
        </ToggleButtonGroup>
        <CardActions></CardActions>
      </Card>
      <br />
      <Card sx={{width:'100%'}}>
        <CardContent>
          <div className="head">
            <Typography
              sx={{ fontSize: 16 }}
              color="text.secondary"
              gutterBottom
            >
              Termes de recherche
            </Typography>
            <IconButton onClick={handleClickOpenHelpOne}>
              <HelpIcon className="help-icon" color="primary" />
            </IconButton>
          </div>

          <Grid container spacing={1} wrap="wrap">
            {keywords.map((keyword, index) => (
              <Grid item key={index}>
                <Chip
                  onClick={() => onChipClick(index)}
                  avatar={
                    keyword.active ? (
                      <Avatar>
                        <CheckIcon />
                      </Avatar>
                    ) : null
                  }
                  label={keyword.word}
                  variant={keyword.active ? "filled" : "outlined"}
                  className={"chip" + keyword.active}
                />
              </Grid>
            ))}
            <Grid item>
              <Collapse in={addMode} orientation="horizontal">
                <TextField
                  inputRef={textFieldRef}
                  id="outlined-basic"
                  variant="outlined"
                  value={newKeyword}
                  inputProps={{
                    style: { width: textFieldWidth },
                    onChange: handelNewKeywordChange,
                  }}
                />
              </Collapse>
            </Grid>
            <Grid item>
              {addMode ? (
                <>
                  <IconButton onClick={handleAddKeyword} size="small">
                    <CheckIcon />
                  </IconButton>
                  <IconButton onClick={handleCancel} size="small">
                    <CloseIcon />
                  </IconButton>
                </>
              ) : (
                <>
                  <IconButton onClick={handleSetAddMode} size="small">
                    <AddIcon />
                  </IconButton>
                </>
              )}
            </Grid>
            <Grid item></Grid>
          </Grid>
        </CardContent>

        <CardActions sx={{ textAlign: "right" }}>
          <div className="justify-end">
            <Button
              variant="text"
              onClick={handleDeleteActiveKeywords}
              startIcon={<DeleteIcon />}
              size="small"
            >
              Supprimer les mots selectionnés
            </Button>
          </div>
        </CardActions>
      </Card>
      <br />
      <Card sx={{width:'100%'}}>
        <CardContent>
          <div className="head">
            <Typography
              sx={{ fontSize: 16 }}
              color="text.secondary"
              gutterBottom
            >
              Options supplémentaires
            </Typography>
            <IconButton onClick={handleClickOpenHelpOne}>
              <HelpIcon className="help-icon" color="primary" />
            </IconButton>
          </div>
          <Stack
            direction="row"
            justifyContent="space-around"
            alignItems="center"
          >
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="flex-start"
              gap={2}
            >
              <div>
                <Typography color="text.secondary" sx={{ fontSize: 14 }}>
                  Nombre de mots avant le terme
                </Typography>
                <TextField
                  type="number"
                  inputProps={{ min: 0 }}
                  variant="outlined"
                  value={wordsBefore}
                  onChange={(e) => setWordsBefore(e.target.value)}
                ></TextField>
              </div>
              <div>
                <Typography color="text.secondary" sx={{ fontSize: 14 }}>
                  Nombre de mots après le terme
                </Typography>
                <TextField
                  type="number"
                  inputProps={{ min: 0 }}
                  variant="outlined"
                  value={wordsAfter}
                  onChange={(e) => setWordsAfter(e.target.value)}
                ></TextField>
              </div>
            </Stack>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="flex-start"
              gap={2}
            >
              <div>
                <Typography color="text.secondary" sx={{ fontSize: 14 }}>
                  Langue des documents
                </Typography>
                <FormControl variant="outlined" fullWidth>
                  <Select
                    value={lang}
                    onChange={(e) => setLang(e.target.value)}
                    inputProps={{
                      name: "language",
                      id: "language-select",
                    }}
                  >
                    <MenuItem value="fr">Français</MenuItem>
                    <MenuItem value="en">English</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    checked={caseSensitive}
                    onChange={handleCheckboxClick}
                  />
                }
                label={
                  <Typography color="text.secondary" sx={{ fontSize: 14 }}>
                    Respecter la case
                  </Typography>
                }
              />
            </Stack>
          </Stack>
        </CardContent>

        <CardActions sx={{ textAlign: "right" }}></CardActions>
      </Card>

      {/* Help dialogs */}
      <Dialog onClose={handleClose} open={openHelpOne}>
        <DialogTitle>Choisir un mode de recherche</DialogTitle>
      </Dialog>
    </>
  );
};

export default ConfigStep;
