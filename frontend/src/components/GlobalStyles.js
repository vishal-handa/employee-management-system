import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    /* *,
    *:before,
    *:after {
        box-sizing: border-box;   
        -webkit-font-smoothing: antialiased;
    } */

    body { 
        margin: 0
    }
    body { 
        scroll-behavior:smooth
    }
    html, body, div,
    input, button, select, option,
    h1, h2, h3, h4, h5, h6, p,
    text {
        font-family: "Montserrat", sans-serif;
    }

    html, body {
        max-width: 100vw;
    }

    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    caption,
    article, aside, canvas, details, embed,
    figure, figcaption, footer, header, hgroup,
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        vertical-align: baseline; 
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure,
    footer, header, hgroup, menu, nav, section {
        display: block;
    }
    body {
        line-height: 1;
    }
    ol, ul {
        list-style: none;
    }
    blockquote, q {
        quotes: none;
    }

    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }

    h1,
    h2,
    h3,
    label,
    button {
        font-family: 'Montserrat';
    }

    p,
    a,
    li,
    blockquote,
    input {
        font-family: 'Montserrat';
    }

    button {
        border: none;
        text-decoration: none;
        outline: none;
    }

    table {
    border-collapse: collapse;
    width: inherit;
    padding: 8px;
  }

  td,
  th {
    border-bottom: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
    font-size: 16px;
  }

  tr {
    border-bottom: 1px solid gray;
  }

`;
