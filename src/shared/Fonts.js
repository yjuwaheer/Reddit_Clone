import { Global } from "@emotion/react";

export const Fonts = () => (
  <Global
    styles={`
      /* Copied from https://fonts.googleapis.com/css2?family=Open+Sans:wght@700&family=Raleway&display=swap */

      // POPPINS
      /* devanagari */
      @font-face {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url(https://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrJJbecnFHGPezSQ.woff2) format('woff2');
        unicode-range: U+0900-097F, U+1CD0-1CF6, U+1CF8-1CF9, U+200C-200D, U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FB;
      }
      /* latin-ext */
      @font-face {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url(https://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrJJnecnFHGPezSQ.woff2) format('woff2');
        unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
      }
      /* latin */
      @font-face {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url(https://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrJJfecnFHGPc.woff2) format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }

      // RALEWAY
      /* latin-ext */
      @font-face {
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url(https://fonts.gstatic.com/s/raleway/v18/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVvaorCGPrcVIT9d0c-dYA.woff) format('woff');
        unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
      }
      /* latin */
      @font-face {
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url(https://fonts.gstatic.com/s/raleway/v18/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVvaorCIPrcVIT9d0c8.woff) format('woff');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }

      // OVERPASS
      /* cyrillic-ext */
      @font-face {
        font-family: 'Overpass';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url(https://fonts.gstatic.com/s/overpass/v11/qFda35WCmI96Ajtm83upeyoaX6QPnlo6_PPbM5qMl8Kuo8AzesE.woff) format('woff');
        unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
      }
      /* cyrillic */
      @font-face {
        font-family: 'Overpass';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url(https://fonts.gstatic.com/s/overpass/v11/qFda35WCmI96Ajtm83upeyoaX6QPnlo6_PPbOpqMl8Kuo8AzesE.woff) format('woff');
        unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
      }
      /* vietnamese */
      @font-face {
        font-family: 'Overpass';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url(https://fonts.gstatic.com/s/overpass/v11/qFda35WCmI96Ajtm83upeyoaX6QPnlo6_PPbMZqMl8Kuo8AzesE.woff) format('woff');
        unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
      }
      /* latin-ext */
      @font-face {
        font-family: 'Overpass';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url(https://fonts.gstatic.com/s/overpass/v11/qFda35WCmI96Ajtm83upeyoaX6QPnlo6_PPbMJqMl8Kuo8AzesE.woff) format('woff');
        unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
      }
      /* latin */
      @font-face {
        font-family: 'Overpass';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url(https://fonts.gstatic.com/s/overpass/v11/qFda35WCmI96Ajtm83upeyoaX6QPnlo6_PPbPpqMl8Kuo8Az.woff) format('woff');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }

      // OXYGEN
      /* latin-ext */
      @font-face {
        font-family: 'Oxygen';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url(https://fonts.gstatic.com/s/oxygen/v15/2sDfZG1Wl4LcnbuKgE0mRUe0A4Uc.woff2) format('woff2');
        unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
      }
      /* latin */
      @font-face {
        font-family: 'Oxygen';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url(https://fonts.gstatic.com/s/oxygen/v15/2sDfZG1Wl4LcnbuKjk0mRUe0Aw.woff2) format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
    `}
  />
);
