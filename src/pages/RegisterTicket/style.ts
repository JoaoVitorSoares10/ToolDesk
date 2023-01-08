import Styled from 'styled-components';

export const Container = Styled.main`
    max-width: 1120px;
    margin: -6rem auto;
    
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 { 
        color: var(--dark-green);
        filter: brightness(0.5);
        margin-bottom: 0.5em;
    }

    @media screen and (max-width: 1200px) {
        &{
            height: 100vh;
        }
    }
`;

export const Content = Styled.div`
    background: #fff;
    border-radius: 5px;
    border: 1px solid #ddd;

    width: 100%;
    height: 100%;
    padding: 1rem 0;
`;

export const Form = Styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;

    div{
        margin: 0 1rem;
        width: 47%;
        min-width: 350px;
        display: flex;
        flex-direction: column;

        label {
            font-size: 1rem;
            color: var(--text-title);
            font-weight: bold;
            border-radius: 5px;   
            margin-top: 1rem;
        }

        input, textarea, select {
            color: var(--text-title);
            padding: 0.6rem;
        }

        input::placeholder {
            color: #000;
        }

        textarea {
            height: 80%;
        }

        .ErrorBorder {
            border: 1px solid var(--red);
        }

        .defaultBorder {
            border: 1px solid #ddd;
        }
    }

    @media screen and (max-width: 1200px) {
        div:last-child{
            margin-bottom: 1rem;
        }

        div{
            width: 100%;

            textarea {
                height: 200px;
            }
        }
    }
`;

export const Button = Styled.div`
    width: 100%;
    padding: 0 2rem;

    display: flex;
    justify-content: end;
    align-items: center;

    svg {
        font-size: 1.5rem;
        color: var(--dark-green);
        margin-right: 1rem;

        animation-name: turn;
        animation-duration: 2s;
        animation-iteration-count: infinite;
    }

    @keyframes turn{
        0% {
            transform: rotate(0deg)
        }
        100% {
            transform: rotate(360deg)
        }
    }

    button {
        background: var(--dark-green);
        padding: 0 1.5rem;
        border: none;
        color: #fff;
        border-radius: 5px;
        font-size: 1rem;
        height: 2rem;

        transition: filter 0.2s;

        &:hover{
            filter: brightness(0.9);
        }
    }

    button:disabled {
        background: #999;
        color: #fff; 

        cursor: default;
    }
`;

export const TextAlert = Styled.p`
    color: var(--red);
`;