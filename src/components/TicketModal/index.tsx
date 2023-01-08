import { useState } from 'react';
import Modal from 'react-modal';
import Swal from 'sweetalert2';

import { useNavigate } from "react-router-dom";
import { api } from '../../service/database';

import { ITicket } from '../../types/ticketType';
import { Container, Header, Content, TicketInfo, Button, CustomSelect, ButtonContent } from './style';

interface TicketModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  ticket: ITicket;
  setIsDeleted: () => void;
}

export function TicketModal({ isOpen, onRequestClose, ticket, setIsDeleted }: TicketModalProps) {
  const [status, setStatus] = useState<boolean>(ticket.status && ticket.status);
  const [isStatusChanged, setIsStatusChanged] = useState<boolean>(false);
  const navigate = useNavigate();

  async function handleChangeStatus() {
    if (isStatusChanged) {
      try {
        await api.put(`ticket/status/${ticket._id}`, { status: status });
        Swal.fire({
          icon: 'success',
          title: 'Status atualizado com sucesso!',
          confirmButtonColor: '#405eafc5',
        })
        setIsStatusChanged(false);
        onRequestClose();
        setIsDeleted();
      } catch (e) {
        console.log(e);
      }
    }
  }

  function handleCloseModal() {
    if (isStatusChanged) {
      Swal.fire({
        icon: 'warning',
        title: 'Deseja sair sem salvar?',
        showCancelButton: true,
        confirmButtonColor: '#fc9303 ',
        cancelButtonColor: '#405eafc5',
        confirmButtonText: 'Sim',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          setIsStatusChanged(false);
          onRequestClose();
        }
      })
    } else {
      onRequestClose();
    }
  }

  function handleTicketDelete(){
    Swal.fire({
      title: 'Tem certeza?',
      text: "Não é possivel reverter a ação!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ff0000',
      cancelButtonColor: '#fc9303',
      confirmButtonText: 'Sim, apagar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.delete(`ticket/delete/${ticket._id}`)
          Swal.fire({
            icon: 'success',
            title: 'Chamado apago com sucesso!',
            confirmButtonColor: '#405eafc5',
          })
          handleCloseModal();
          setIsDeleted();
        } catch (err) {
          console.log(err)
          Swal.fire({
            icon: 'error',
            title: 'Não foi possivel apagar seu chamado!',
            confirmButtonColor: '#ff0000',
          })
        }
      }
    })
  }

  function handleUpdateTicket() {
    navigate(`/update/${ticket._id}`, { replace: true });
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleCloseModal}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
      ariaHideApp={false}
    >
      <Container>
        <Header><button onClick={() => handleCloseModal()}>X</button></Header>
        <Content>
          <TicketInfo>
            <div>
              <CustomSelect>
                <h3>Status:</h3>
                <select
                  onChange={(e) => {
                    setStatus(e.target.value === "open" ? false : true)
                    setIsStatusChanged(true)
                  }
                  }
                  defaultValue={ticket.status ? "closed" : "open"}
                >
                  <option value="open">Em aberto</option>
                  <option value="closed">Fechado</option>
                </select>
              </CustomSelect>
              <div>
                <h3>Solicitante: </h3>
                <p>{ticket.requester}</p>
              </div>
              <div>
                <h3>Assunto: </h3>
                <p>{ticket.subject}</p>
              </div>
              <div>
                <h3>Urgência: </h3>
                {ticket.urgency === "low" && <p className="low">Baixa</p>}
                {ticket.urgency === "medium" && <p className="medium">Média</p>}
                {ticket.urgency === "high" && <p className="high">Alta</p>}
              </div>
              <div>
                <h3>Data de Solicitação: </h3>
                {ticket.createdAt && <p>{new Intl.DateTimeFormat('pt-BR').format(new Date(ticket.createdAt))}</p>}
              </div>
            </div>
            <div>
              <h3>Descrição: </h3>
              <textarea value={ticket.description} disabled />
            </div>
          </TicketInfo>
          <ButtonContent>
            <div>
              <Button color="#e52e40" onClick={() => handleTicketDelete()}>Deletar</Button>
              <Button color="#ff9800" onClick={() => handleUpdateTicket()}>Editar</Button>
            </div>
            <div>
              {isStatusChanged && <Button color="#3ec23e" onClick={() => handleChangeStatus()}>Salvar</Button>}
              <Button color="#405eafc5" onClick={() => handleCloseModal()}>Voltar</Button>
            </div>
          </ButtonContent>
        </Content>
      </Container>
    </Modal>
  )
}