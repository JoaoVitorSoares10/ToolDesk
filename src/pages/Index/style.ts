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
    }
`;

export const Content = Styled.div`
    line-height: 1.25;
    padding: 1rem;
    
    table {
        width: 100%;
        table-layout: fixed;
    }
    
    table th, table td {
        border: 1px solid var(--dark-green);
        padding: 1rem 0;
        text-align: center;
        -moz-border-radius: 10px;
        -webkit-border-radius: 10px;
    }

    table th {
        font-size: 1rem;
        font-weight: normal;
        background: var(--dark-green);
        color: #fff;
    }

    @media screen and (max-width: 720px) {
        table thead {
            border: none;
            clip: rect(0 0 0 0);
            height: 1px;
            margin: -1px;
            overflow: hidden;
            padding: 0;
            position: absolute;
            width: 1px;
        }

        table td {
            border: 1px solid #fff;
            padding: 0.5rem 1rem;
            text-align: center;
        }

        table tr {
            border: 1px solid var(--dark-green);
            display: block;
            margin-bottom: 2rem;
            -moz-border-radius: 10px;
            -webkit-border-radius: 10px;
        }
        
        table td {
            display: block;
            text-align: right;
            -moz-border-radius: 10px;
            -webkit-border-radius: 10px;
        }
        
        table td::before {
            content: attr(data-label);
            float: left;
            font-weight: bold;
            color: var(--text-title)
        }
    }

    .closed, .high {
        color: var(--red);
    }

    .medium {
        color: var(--orange);
    }

    .open, .low {
        color: var(--dark-green);
    } 
`;

export const CustomSelect = Styled.div`
    select {
        padding: 0.5rem;
        width: 10rem;

        margin-bottom: 1rem;

        background: #fff;
        color: var(--text-title);

        border: 1px solid var(--dark-green);
        border-radius: 5px;
    }
`;

export const Empty = Styled.div`
    text-align: center;
    padding: 1rem;
`;