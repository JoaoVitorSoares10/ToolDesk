import { Container } from './styles';
import LoaderImg from '../../assets/Loader.svg';

export function Loader(){
    return(
        <Container>
            <img src={LoaderImg} alt="" />
        </Container>
    )
}