export interface ITicket {
    _id: string,
    cod: number,
    status: boolean,
    subject: string,
    description: string,
    requester: string,
    urgency: string,
    createdAt: string
}

export interface ISubject {
    _id: string,
	title: string
}