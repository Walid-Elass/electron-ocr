import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#9cd67d",
    },
    secondary: {
      main: "#1e4e4f",
    },
    background: {
      default: "#1a1c18",
      paper: "#21261d",
    },
  },
  shape: {
    borderRadius: 20,
  },
  typography: {
    fontFamily: "Open Sans",
    color:"#e3e3dc",
    fontSize: 14,
    h1: {
      fontFamily: "Open Sans",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          boxShadow: "none",
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: "2px solid #43493e",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          textTransform: "none",
          boxShadow: "none",
          borderWidth:'1px',
          background:'#3e4a36',
          borderRadius:'8px',
          textOverflow:'ellipsis'
        },
      },
      variants: [
        {
          props: { variant: 'filled' },
          style: {
            textTransform: 'none',
            border: 'none',
          },
        },
        {
          props: { variant: 'outlined' },
          style: {
            border: `1px solid #c5c9bc`,
            background:'transparent'
          },
        },
      ],
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius:8,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderRadius:0,
          fontSize:13,
          height:32,
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          background:'transparent',
          fontSize:12,
          width:12,
          height:12,
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: {
          textTransform: "none",
          padding: "0px 16px",
          borderColor:"#8d9286"
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontSize: "14px",
        },
      },
    },
  },
});

export default theme;
