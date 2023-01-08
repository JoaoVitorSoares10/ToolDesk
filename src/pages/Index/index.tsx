import { useEffect, useState } from "react";

import { api } from "../../service/database";
import { ITicket } from "../../types/ticketType";

import { Layout } from "../../components/Layout";
import { Container, Content, CustomSelect, Empty } from "./style";
import { TicketModal } from "../../components/TicketModal";
import { Loader } from "../../components/Loader";

export function Index() {
    const [tickets, setTickets] = useState<ITicket[]>([]);
    const [ticketModal, setTicketModal] = useState<ITicket>({} as ITicket);
    const [ticketOption, setTicketOption] = useState<boolean>(false);
    const [isTicketModalOpen, setIsTicketModalOpen] = useState<boolean>(false);
    const [isDeleted, setIsDelected] = useState<boolean>(false);
    const [isDisconnected, setIsDisconnected] = useState<boolean>(false);
    const [showLoader, setShowLoader] = useState<boolean>(true);

    useEffect(() => {
        api.get(ticketOption ? "ticket/closed" : "ticket/open")
            .then(response => {
                setTickets(response.data);
                setIsDisconnected(false);
                setShowLoader(false);
            })
            .catch((e) => {
                setIsDisconnected(true);
                setShowLoader(false);
            })
    }, [ticketOption, isDeleted]);

    function setIsDeleted() {
        setIsDelected(!isDeleted);
    }

    function handleOpenTicketModal(ticket: ITicket) {
        setIsTicketModalOpen(true);
        setTicketModal(ticket);
    }

    function handleCloseTicketModal() {
        setIsTicketModalOpen(false);
    }

    return (
        <>
            <TicketModal
                isOpen={isTicketModalOpen}
                onRequestClose={handleCloseTicketModal}
                ticket={ticketModal}
                setIsDeleted={setIsDeleted}
            />
            <Layout status={isDisconnected}>
                <Container>
                    <h1>Chamados</h1>
                    <Content>
                        <CustomSelect>
                            <select onChange={() => setTicketOption(!ticketOption)}>
                                <option value="open">Em aberto</option>
                                <option value="closed">Fechados</option>
                            </select>
                        </CustomSelect>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">STATUS</th>
                                    <th scope="col">ASSUNTO</th>
                                    <th scope="col">SOLICITANTE</th>
                                    <th scope="col">URGENCIA</th>
                                    <th scope="col">DATA DE SOLICITAÇÃO</th>
                                </tr>
                            </thead>
                            {tickets.length !== 0 &&
                                <tbody>
                                    {tickets.map(ticket => (
                                        <tr key={ticket._id} onClick={() => handleOpenTicketModal(ticket)}>
                                            <td data-label="ID">{ticket.cod}</td>
                                            {ticket.status ? <td data-label="STATUS" className="closed">Fechado</td> : <td data-label="STATUS" className="open">Em aberto</td>}
                                            <td data-label="ASSUNTO" >{ticket.subject}</td>
                                            <td data-label="SOLICITANTE">{ticket.requester}</td>
                                            {ticket.urgency === "low" && <td data-label="URGÊNCIA" className="low">Baixa</td>}
                                            {ticket.urgency === "medium" && <td data-label="URGÊNCIA" className="medium">Media</td>}
                                            {ticket.urgency === "high" && <td data-label="URGÊNCIA" className="high">Alta</td>}
                                            <td data-label="DATA DE SOLICITAÇÃO">
                                                {new Intl.DateTimeFormat('pt-BR').format(new Date(ticket.createdAt))}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            }
                        </table>
                        <Empty>
                            {tickets.length === 0 && <p>Nenhum Chamado Registrado</p>}
                        </Empty>
                    </Content>
                </Container>
            </Layout>
            {showLoader && <Loader />}
        </>
    )
}