import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Swal from "sweetalert2";
import { BiLoaderAlt } from "react-icons/bi";

import { Layout } from "../../components/Layout";
import { api } from "../../service/database";
import { ISubject, ITicket } from "../../types/ticketType";
import { Container, Content, Form, Button, TextAlert} from "./style";

export function Update(){
    const navigate = useNavigate();
    const { id } = useParams();
    
    const [requester, setRequester] = useState<string>("");
    const [subject, setSubject] = useState<string>("");
    const [urgency, setUrgency] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [ticket, setTicket] = useState<ITicket>({} as ITicket);
    const [subjects, setSubjects] = useState<ISubject[]>([]);
    const [requesterAlert, setRequesterAlert] = useState<boolean>(false)
    const [subjectAlert, setSubjectAlert] = useState<boolean>(false)
    const [urgencyAlert, setUrgencyAlert] = useState<boolean>(false)
    const [descriptionAlert, setDescriptionAlert] = useState<boolean>(false)
    const [isDisconnected, setIsDisconnected] = useState<boolean>(false);
    const [showLoader, setShowLoader] = useState<boolean>(false);
    
    useEffect(() => {
        api.get('/subject')
            .then(response => {
                setSubjects(response.data)
                setIsDisconnected(false)
            })
            .catch((e)=>setIsDisconnected(true))
    }, []);

    useEffect(()=>{
        async function fetchData(){
            await api.get(`ticket/id/${id}`)
            .then((response) =>{
                console.log(response.data)
                setTicket(response.data)
                setRequester(response.data.requester)
                setSubject(response.data.subject)
                setUrgency(response.data.urgency)
                setDescription(response.data.description)
            });
        }
        fetchData();
    }, [id])

    async function handleUpdateTicket(){
        setShowLoader(true);
        const newticket = {
            status: false,
            subject, 
            description,
            requester, 
            urgency
        }

        if (subject !== '' && description !== '' && requester !== '' && urgency !== '') {
            try{
                await api.put(`ticket/update/${ticket._id}`, newticket);
                setShowLoader(false);
                Swal.fire({
                    icon: 'success',
                    title: 'Chamado atualizado com sucesso!',
                    confirmButtonColor: '#405eafc5',
                })
                navigate(`/`, { replace: true });
            }catch(e){
                console.log(e);
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

    return(
        <Layout status={isDisconnected}>
            <Container>
                <h1>Atualizar chamado</h1>
                <Content>
                    <Form>
                        <div>
                            <label htmlFor="requester">SOLICITANTE</label>
                            <input className={requesterAlert ? 'ErrorBorder' : "defaultBorder"} id="requester" type="text" value={requester} onChange={value => setRequester(value.target.value)} />
                            {requesterAlert && <TextAlert>Preencha o campo solicitante</TextAlert>}
                            <label htmlFor="subject" >ASSUNTO</label>
                            <select className={subjectAlert ? 'ErrorBorder' : "defaultBorder"} id="subject" onChange={event => setSubject(event.target.value)}>
                                <option value="">Selecione</option>
                                {subjects.map((item) => {
                                    if(subject === item.title){
                                        return <option key={item._id} value={item.title} selected>{item.title}</option>
                                    }else{
                                        return <option key={item._id} value={item.title}>{item.title}</option>
                                    }
                                })}
                            </select>
                            {subjectAlert && <TextAlert>Preencha o campo assunto</TextAlert>}
                            <label htmlFor="subject" >URGÊNCIA</label>
                            <select className={urgencyAlert ? 'ErrorBorder' : "defaultBorder"} onChange={event => setUrgency(event.target.value)}>
                                <option value="">Selecione</option>
                                {urgency === "low" ? <option value="low" selected>Baixa</option> : <option value="low">Baixa</option>}
                                {urgency === "medium" ? <option value="medium" selected>Média</option> : <option value="medium">Média</option>}
                                {urgency === "high" ? <option value="high" selected>Alta</option> : <option value="high">Alta</option>}
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
                            <button disabled>Atualizar</button>
                        </>
                        :
                            <button onClick={() => handleUpdateTicket()}>Atualizar</button>
                        }
                    </Button>
                </Content>
            </Container>
        </Layout>
    )
}