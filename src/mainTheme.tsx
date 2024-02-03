
import { createTheme, responsiveFontSizes } from "@mui/material";
import DancingScriptSemiBold from "./fonts/DancingScript-SemiBold.ttf";

declare module "@mui/material/styles" {
    interface TypographyVariants {
        boardtitle: React.CSSProperties;
    }
  
    // allow configuration using `createTheme`
    interface TypographyVariantsOptions {
        boardtitle?: React.CSSProperties;
    }
  }
  
// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
    interface TypographyPropsVariantOverrides {
        boardtitle: true;
    }
}

const theme = createTheme({
    typography: {
        boardtitle: {
            fontFamily: "'Dancing Script', cursive",
            fontSize: "3rem",
            fontWeight: 600,
            lineHeight: 1.167,
            letterSpacing: "0em",
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: `
            @font-face {
              font-family: 'Dancing Script';
              font-style: normal;
              font-display: swap;
              font-weight: 600;
              src: url(${DancingScriptSemiBold}) format('ttf');
            }
          `,
        },
        MuiTypography: {
            defaultProps: {
                variantMapping: {
                    boardtitle: "h3",
                },
            },
        },
    },
    palette: {
        mode: "light",
        primary: {
            main: "#4e2504",
        },
        secondary: {
            main: "#042d4e",
        },
        background: {
            default: "#F3EDD7",
            paper: "#ebe3c7",
        },
        success: {
            main: "#0ba55b",
        },
        error: {
            main: "#B71F2E",
        },
        warning: {
            main: "#d18400",
        },
        info: {
            main: "#01808e",
        },
    },
});

export const mainTheme = responsiveFontSizes(theme);
