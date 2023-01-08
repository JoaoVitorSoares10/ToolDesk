import { useEffect, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import { BiLoaderAlt } from "react-icons/bi";

import { Layout } from "../../components/Layout";
import { api } from "../../service/database";
import { ISubject } from "../../types/ticketType";
import { Container, Content, Form, Button, TextAlert } from "./style";

interface INumberOfRegister {
    count: number;
}

export function Register() {
    const navigate:NavigateFunction = useNavigate();

    const [requester, setRequester] = useState<string>("");
    const [subject, setSubject] = useState<string>("");
    const [urgency, setUrgency] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [requesterAlert, setRequesterAlert] = useState<boolean>(false)
    const [subjectAlert, setSubjectAlert] = useState<boolean>(false)
    const [urgencyAlert, setUrgencyAlert] = useState<boolean>(false)
    const [descriptionAlert, setDescriptionAlert] = useState<boolean>(false)
    const [subjects, setSubjects] = useState<ISubject[]>([]);
    const [isDisconnected, setIsDisconnected] = useState<boolean>(false);
    const [numberOfRegister, setNumberOfRegister] = useState<INumberOfRegister>({} as INumberOfRegister);
    const [showLoader, setShowLoader] = useState<boolean>(false);

    useEffect(() => {
        api.get('/subject')
            .then(response => {
                setSubjects(response.data)
                setIsDisconnected(false)
            })
            .catch((e)=>setIsDisconnected(true))
    }, []);

    useEffect(() => {
        api.get('/ticket/count').then((response) => setNumberOfRegister(response.data));
    })

    async function handleNewTicket() {
        setShowLoader(true);
        const newticket = {
            cod: numberOfRegister.count + 1,
            status: false,
            subject,
            description,
            requester,
            urgency
        }

        if (subject !== '' && description !== '' && requester !== '' && urgency !== '') {
            try {
                await api.post('ticket/register', newticket);
                setShowLoader(false);
                Swal.fire({
                    icon: 'success',
                    title: 'Chamado cadastrado com sucesso!',
                    confirmButtonColor: '#405eafc5',
                })
                navigate(`/`, { replace: true });
            } catch (e) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Houve um problema ao cadastrar seu chamdo!',
                    confirmButtonColor: '#405eafc5',
                })
            }
        } else {
            if (requester === '') {
                setRequesterAlert(true);
            }else{
                setRequesterAlert(false);
            }
            
            if (subject === '') {
                setSubjectAlert(true);
            }else{
                setSubjectAlert(false);
            }

            if (urgency === '') {
                setUrgencyAlert(true);
            }else{
                setUrgencyAlert(false);
            }
            
            if (description === '') {
                setDescriptionAlert(true);
            }else{
                setDescriptionAlert(false);
            }
        }
        setShowLoader(false);
    }

    return (
        <Layout status={isDisconnected}>
            <Container>
                <h1>Cadastrar chamado</h1>
                <Content>
                    <Form>
                        <div>
                            <label htmlFor="requester">SOLICITANTE</label>
                            <input className={requesterAlert ? 'ErrorBorder' : "defaultBorder"} id="requester" type="text" value={requester} onChange={value => setRequester(value.target.value)} />
                            {requesterAlert && <TextAlert>Preencha o campo solicitante</TextAlert>}
                            <label htmlFor="subject" >ASSUNTO</label>
                            <select className={subjectAlert ? 'ErrorBorder' : "defaultBorder"} id="subject" onChange={event => setSubject(event.target.value)}>
                                <option value="" >Selecione</option>
                                {subjects.map((subject) =>(
                                    <option key={subject._id} value={subject.title}>{subject.title}</option>
                                ))}
                            </select>
                            {subjectAlert && <TextAlert>Preencha o campo assunto</TextAlert>}
                            <label htmlFor="subject" >URGÊNCIA</label>
                            <select className={urgencyAlert ? 'ErrorBorder' : "defaultBorder"} onChange={event => setUrgency(event.target.value)}>
                                <option value="" >Selecione</option>
                                <option value="low">Baixa</option>
                                <option value="medium">Média</option>
                                <option value="high">Alta</option>
                            </select>
                            {urgencyAlert && <TextAlert>Preencha o campo urgência</TextAlert>}
                        </div>
                        <div>
                            <label htmlFor="description">DESCRIÇÃO</label>
                            <textarea className={descriptionAlert ? 'ErrorBorder' : "defaultBorder"}id="description" value={description} onChange={value => setDescription(value.target.value)} />
                            {descriptionAlert && <TextAlert>Preencha o campo descrição</TextAlert>}
                        </div>
                    </Form>
                    <Button>
                        {showLoader 
                        ?
                        <>
                            <BiLoaderAlt />
                            <button disabled>Cadastrar</button>
                        </>
                        :
                            <button onClick={() => handleNewTicket()}>Cadastrar</button>
                        }
                    </Button>
                </Content>
            </Container>
        </Layout>
    )
}