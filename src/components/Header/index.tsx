import { Container, Content, ButtonLink } from './style';
import { BsPlusCircle } from "react-icons/bs";
import Logo from '../../assets/Logo.png';

export function Header() {
    return (
     <Container>
        <Content>
            <ButtonLink to="/"><img alt="" src={Logo}/></ButtonLink>
            <ButtonLink to="/register"><button type="button">Novo Chamado <BsPlusCircle /></button></ButtonLink>
        </Content>
     </Container>
   );
 }