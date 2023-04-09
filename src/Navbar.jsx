import { Typography,Stack,ThemeProvider, createTheme, CardContent } from '@mui/material'
import Box from '@mui/material/Box';
import React, { useState } from 'react'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Card from "@mui/material/Card";

const steps = [
    {
      label: 'Sélectionner un répertoire',
      description: `Sélectionnez le répertoire contenant les fichiers PDF à traiter.`,
    },
    {
      label: 'Paramétrez la recherche',
      description:
        'Entrez les mots clés que vous souhaitez rechercher dans les fichiers. Prenez également le temps de paramétrer quelques points importants.',
    },
    {
      label: 'Visualiser les résultats',
      description: `Consultez les résultats de la recherche. Vous pouvez choisir de les sauvegarder ou de recommencer avec une configuration différente.`,
    },
  ];

const Navbar = (props) => {
  
    

  const handleNext = () => {
    props.setProg((prevActiveStep) => prevActiveStep + 1);
    
  };

  const handleBack = () => {
    props.setProg((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    props.setProg(0);
  };

  const start = async () => {
    const { ipcRenderer } = window.require('electron');
    console.log(localStorage.getItem('path'))
    const results = await ipcRenderer.invoke('start-search', localStorage.getItem('path'), JSON.parse(localStorage.getItem('keywords')).map(obj => obj.word),localStorage.getItem('wordsBefore'), localStorage.getItem('wordsAfter'), localStorage.getItem('lang'), localStorage.getItem('caseSensitivity'),);
    props.setProg((prevActiveStep) => prevActiveStep + 1);
  }

  return (
    <Card>
    <CardContent>
      <Stepper activeStep={props.step} orientation="vertical">
        {steps.map((step, index) => (
          <Step  key={step.label}>
            <StepLabel >
              {step.label}
            </StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={index !== 1 ? handleNext : start}
                    sx={{ mt: 1, mr: 1 }}
                    className={index === steps.length - 1 ? " hidden" :""}
                  >
                    {index === steps.length - 3 && 'Suivant' }
                    {index === steps.length - 2 && 'Lancer' }
                    {index === steps.length - 1 && 'Terminer'}
                  </Button>
                  <Button
                  
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Retour
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </CardContent>
    </Card>
  )
}

export default Navbar