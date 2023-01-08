import Styled from 'styled-components';

export const Container = Styled.div`  
    width: 100%;

    background: #fff;
    border-radius: 10px;
`

export const Content = Styled.div`   
    padding: 2rem;
`

export const Header = Styled.div`   
    display: flex;
    justify-content: end;

    border-bottom: 1px solid #ddd;

    button {
        background: none;
        color: var(--dark-green);
        border: none;
        font-size: 1rem;

        padding: 0.5rem 1rem;

        transition: all 0.3s;

        &:hover {
            color: var(--red);
        }
    }
`

export const TicketInfo = Styled.div`   
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    h3 {
        color: var(--text-title);
        font-size: 1rem;
    }

    p, textarea, select {
        color: var(--text-body);
        font-size: 1rem;
    }

    div {
        width: 50%;
        min-width: 200px;
        
        div{
            margin-bottom: 1rem;
        }
    }

    textarea {
        border: none;

        background: #fff;

        width: 100%;
        height: 100%;

        resize: none;
    }

    .high {
        color: var(--red);
    }

    .medium {
        color: var(--orange);
    }

    .low {
        color: var(--dark-green);
    } 

    @media screen and (max-width: 800px) {
        div:last-child{
            margin-bottom: 1rem;
        }

        div{
            width: 100%;
        }
    }
`

export const ButtonContent = Styled.div`
    display: flex;
    justify-content: space-between;

    div{
        button:first-child {
            margin-right: 1rem;
        }
    }
`;

interface buttonProps {
    color: string
};

export const Button = Styled.button<buttonProps>`   
    background: ${props => props.color};
    color: #fff;

    border: none;
    border-radius: 5px;

    font-size: 1rem;

    padding: 0.5rem 1rem;
`

export const CustomSelect = Styled.div`
    select {
        padding: 0.5rem;
        width: 10rem;

        color: var(--text-title);

        border: 1px solid #ddd;
        border-radius: 5px;
    }
`;