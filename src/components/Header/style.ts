import Styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = Styled.header`
    background: var(--green);
`;

export const Content = Styled.div`
    margin: 0 auto;
    padding: 1rem 2rem 6rem 2rem;

    
    display: flex;
    align-items: center;
    justify-content: space-between;

    img {
        width: 100px;
    }

    button {
        background: var(--dark-green);
        padding: 1rem;
        width: 11rem;
        height: 2rem;
        border: none;
        color: #fff;
        border-radius: 5px;
        font-size: 1rem;

        display: flex;
        align-items: center;
        justify-content: space-around;

        transition: filter 0.2s;

        &:hover{
            filter: brightness(0.9);
        }
    }
`;

export const ButtonLink = Styled(Link)`
    text-decoration: none;
`;