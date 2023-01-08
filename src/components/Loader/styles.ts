import Styled from 'styled-components';

export const Container = Styled.div`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0; 
    z-index: 2;

    display: flex;
    align-items: center;
    justify-content: center;
    
    background: #fff;

    img {
        width: 5rem;

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
`;