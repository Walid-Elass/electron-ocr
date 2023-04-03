import React from 'react'
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
/* import {ReactComponent as ReactLogo} from './addsvg.svg'; */
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const Welcome = (props) => {
  return (
    <div className='section_all welcome_parent'>
        <div className="section_corps welcome center_content">
            {/* <ReactLogo className='img' /> */}
            {/* <img src={add} alt="" srcset="" /> */}
            <Typography className='text_center' variant='h4'>Bienvenue à l'assistant virtuel de création de demande IaaS</Typography>
            <Typography className='text_center' variant='h5'>Utilisez cet assistant si vous avez besoin d'une machine virtuelle. Veuillez renseigner toutes les informations demandées par l'assistant pour bénéficier d'un service plus rapide.</Typography>
            <Button id='start_btn' className='btn' variant="contained" endIcon={<NavigateNextIcon /> } size="large"
            onClick = {()=> {
                props.prog(0);
            }}
            >
                Commencer
            </Button>
        </div>
        
    </div>
  )
}

export default Welcome