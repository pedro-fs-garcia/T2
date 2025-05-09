import { Component } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/homePage";
import ClienteList from "../pages/clientes/ClienteList";
import ClienteForm from "../pages/clientes/ClienteForm";
import PetList from "../pages/pets/PetList";
import PetForm from "../pages/pets/PetForm";
import ProdutoList from "../pages/produtos/ProdutoList";
import ProdutoForm from "../pages/produtos/ProdutoForm";
import ServicoList from "../pages/servicos/ServicoList";
import ServicoForm from "../pages/servicos/ServicoForm";
import RegistroCompra from "../pages/RegistroCompra";
import RegistroVenda from "../pages/RegistroVenda";

export default class AppRoutes extends Component {
    render() {
        return (
            <Routes>
                <Route path="/" element={<HomePage />} />
                
                {/* Rotas de Clientes */}
                <Route path="/clientes" element={<ClienteList />} />
                <Route path="/clientes/novo" element={<ClienteForm />} />
                <Route path="/clientes/:id/editar" element={<ClienteForm />} />
                
                {/* Rotas de Pets */}
                <Route path="/pets" element={<PetList />} />
                <Route path="/pets/novo" element={<PetForm />} />
                <Route path="/pets/:id/editar" element={<PetForm />} />
                
                {/* Rotas de Produtos */}
                <Route path="/produtos" element={<ProdutoList />} />
                <Route path="/produtos/novo" element={<ProdutoForm />} />
                <Route path="/produtos/:id/editar" element={<ProdutoForm />} />
                
                {/* Rotas de Serviços */}
                <Route path="/servicos" element={<ServicoList />} />
                <Route path="/servicos/novo" element={<ServicoForm />} />
                <Route path="/servicos/:id/editar" element={<ServicoForm />} />

                {/* Rotas de Registro */}
                <Route path="/registro/compra" element={<RegistroCompra />} />
                <Route path="/registro/venda" element={<RegistroVenda />} />
            </Routes>
        );
    }
}