import { ReactNode } from "react";
import { Header } from "../Header";
import { Container, Content, InternetConnectionContainer } from "./style";

interface LayoutProps {
  children: ReactNode;
  status: boolean;
}

export function Layout({ children, status }: LayoutProps) {
  return (
    <Container>
      {status &&
        <InternetConnectionContainer>
          <p>Parece que não há conexão com a internet!</p>
        </InternetConnectionContainer>
      }
      <Header />
      <Content>
        {children}
      </Content>
    </Container>
  );
}