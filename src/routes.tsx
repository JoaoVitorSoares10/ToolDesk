import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Index } from './pages/Index';
import { Register } from "./pages/RegisterTicket";
import { Update } from './pages/UpdateRegister';

export function AppRoutes(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Index />}/>
                <Route path='/register' element={<Register />}/>
                <Route path='/update/:id' element={<Update />}/>
            </Routes>
        </BrowserRouter>
    )
}