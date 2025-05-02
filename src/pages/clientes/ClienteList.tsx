import { Component } from "react";
import { Link } from "react-router-dom";
import Cliente from "../../models/cliente";
import Telefone from "../../models/telefone";
import CPF from "../../models/cpf";

type State = {
    clientes: Cliente[],
    loading: boolean,
    erro: string | null
};

type Props = {};

export default class ClienteList extends Component <Props, State> {
    constructor(props:Props) {
        super(props);
        this.state = {
          clientes: [],
          loading: true,
          erro: null
        };
    }
    
    componentDidMount() {
        fetch('/clientes.json')
          .then(response => {
            if (!response.ok) {
              throw new Error('Erro ao carregar o arquivo JSON');
            }
            return response.json();
          })
          .then((data: any[]) => {
            const clientesConvertidos = data.map(clienteData => {
              const cpf = new CPF(clienteData.cpf, new Date());
              const tel = clienteData.telefone
              const telefone = new Telefone(tel.ddd, tel.numero);
              return new Cliente(
                clienteData.nome,
                clienteData.nomeSocial,
                cpf,
                null,
                new Date(),
                [telefone]
              );
            });
      
            this.setState({ clientes: clientesConvertidos, loading: false });
          })
          .catch(error => {
            this.setState({ erro: error.message, loading: false });
          });
      }
      
    
    removerCliente = (cpf:string) => {
        const confirmacao = window.confirm('Tem certeza que deseja remover este cliente?');
        if (confirmacao) {
          this.setState((prevState) => ({
            clientes: prevState.clientes.filter((cliente: Cliente) => cliente.getCpf.getValor !== cpf)
          }));
        }
    }


    render() {
        const { clientes, loading, erro } = this.state;

        if (loading) {
          return <div className="text-center mt-5">Carregando clientes...</div>;
        }
    
        if (erro) {
          return <div className="text-danger text-center mt-5">Erro: {erro}</div>;
        }
        return (
            <div className="container py-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="mb-0">Clientes</h2>
                    <Link to="/clientes/novo" className="btn btn-primary">
                        <i className="bi bi-plus-lg me-2"></i>Novo Cliente
                    </Link>
                </div>

                <div className="card">
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th>CPF</th>
                                        <th>Telefone</th>
                                        <th>Email</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {clientes.map((cliente:Cliente) => (
                                    <tr key={cliente.getCpf.getValor}>
                                    <td>{cliente.getNome}</td>
                                    <td>{cliente.getCpf.getValor}</td>
                                    <td>
                                        {cliente.getTelefones.map((telefone: Telefone, index: number) => (
                                            <div key={index}>{telefone.descrever()}</div>
                                        ))}
                                    </td>
                                    <td>{cliente.getEmail ? cliente.getEmail : '—'}</td>
                                    <td>
                                        <div className="btn-group">
                                            <Link to="/clientes/1" className="btn btn-sm btn-outline-primary">
                                                <i className="bi bi-eye"></i>
                                            </Link>
                                            <Link to={`/clientes/${cliente.getCpf}/editar`} 
                                                  className="btn btn-sm btn-outline-secondary">
                                                <i className="bi bi-pencil"></i>
                                            </Link>
                                            <button className="btn btn-sm btn-outline-danger" 
                                                    onClick={() => this.removerCliente(cliente.getCpf.getValor)}>
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </div>
                                    </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
} 