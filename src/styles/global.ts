import {createGlobalStyle} from 'styled-components';

export const GlobalStyles = createGlobalStyle`
    :root {
        --dark-green: #1060f0;
        --green: #91e0f8;
        --red: #e52e40;
        --orange: #ff9800;
        --text-title: #363f5f;
        --text-body: #697191;
    }

    *{
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }

    html {
        @media (max-width: 1080px) {
            font-size: 98.75%;
        }

        @media (max-width: 720px) {
            font-size: 87.5%;
        }
    }

    body{
        -webkit-font-smoothing: antialiased;
    }

    body, input, textarea {
        font-family: 'poppins', sans-serif;
        font-weight: 400;
    }

    input, textarea, select {
        outline: none;
        border-radius: 10px;
    }

    h1, h2, h3, h4, h5, h6, strong {
        font-weight: 600;
    }

    button {
        cursor: pointer;
    }

    .react-modal-overlay {
        position: fixed;
        top:0;
        right: 0;
        bottom: 0;
        left: 0;

        display: flex;
        justify-content: center;
        align-items: center;

        background: rgb(0, 0, 0, 0.5);
    }

    .react-modal-content {
        width: 100%;
        max-width: 1120px;

        position: relative;
    }

    .react-modal-close {
        position: absolute;
        right: 2.2rem;
        top: 1.5rem;
        border: 0;
        background: transparent;
        transition: filter 0.2s;

        &:hover {
            filter: brightness(0.7);
        }
    }
`;