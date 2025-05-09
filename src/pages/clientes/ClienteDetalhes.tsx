import { Component } from "react";
import Cliente from "../../models/cliente";
import RoutesUtils from "../../routes/WithRouter";
import ClienteService from "../../services/ClienteService";

type State = {
    cliente: Cliente,
    loading: boolean,
    erro: string | null,
    aba:string
};

type Props = {
  router: {
    params: {
      id: number;
    };
  };
};


class ClienteDetalhes extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        const cs = new ClienteService();
        this.state = {
            cliente: cs.buscarClientePorId(props.router.params.id),
            loading: false,
            erro: null,
            aba: "pets"
        };
    }
    
    formatCurrency(value:number) {
        return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
    }

    render() {
        const { cliente, loading, erro, aba } = this.state;

        if (loading) {
            return <div className="text-center mt-5">Carregando clientes...</div>;
        }

        if (erro) {
            return <div className="text-danger text-center mt-5">Erro: {erro}</div>;
        }

        if (!cliente) {
            return (
                <div className="container py-5 d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
                    <p>Carregando informações do cliente...</p>
                </div>
            )
        }
        return (
            <div className="container py-5">
                <h1 className="mb-4">Informações do Cliente</h1>

                <div className="row g-4">
                    <div className="col-lg-4">
                        <div className="card">
                            <div className="card-header">
                                <h5>{cliente.getNome}</h5>
                                {cliente.getNome !== cliente.getNomeSocial && <small>Nome social: {cliente.getNomeSocial}</small>}
                            </div>
                            <div className="card-body">
                                <p><strong>CPF:</strong> {cliente.getCpf.getValor}</p>
                                <p><strong>RG:</strong> {cliente.getRg?.getValor}</p>
                                <p><strong>Cadastrado em:</strong> {cliente.getDataCadastro.toDateString()}</p>
                                <hr />
                                <h6>Contatos:</h6>
                                {cliente.getTelefones.map((tel, idx) => (
                                    <p key={idx}>({tel.getDdd}) {tel.getNumero}</p>
                                ))}
                                <p>{cliente.getEmail}</p>
                                <hr />
                                <h6>Consumo:</h6>
                                <div className="row">
                                    <div className="col">
                                        <p className="mb-1"><small>Itens consumidos</small></p>
                                        <h5>{cliente.getItensConsumidos}</h5>
                                    </div>
                                    <div className="col">
                                        <p className="mb-1"><small>Valor total</small></p>
                                        <h5>{this.formatCurrency(cliente.getValorConsumido)}</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-8">
                        <div className="card">
                            <div className="card-header">
                                <ul className="nav nav-tabs card-header-tabs">
                                    <li className="nav-item">
                                        <button
                                            className={`nav-link ${aba === "pets" ? "active" : ""}`}
                                            onClick={() => this.setState({ aba: "pets" })}
                                        >
                                            Pets
                                        </button>
                                    </li>
                                    <li className="nav-item">
                                        <button
                                            className={`nav-link ${aba === "produtos" ? "active" : ""}`}
                                            onClick={() => this.setState({ aba: "produtos" })}
                                        >
                                            Produtos
                                        </button>
                                    </li>
                                    <li className="nav-item">
                                        <button
                                            className={`nav-link ${aba === "servicos" ? "active" : ""}`}
                                            onClick={() => this.setState({ aba: "servicos" })}
                                        >
                                            Serviços
                                        </button>
                                    </li>
                                </ul>
                            </div>
                            <div className="card-body">
                                {aba === "pets" && (
                                    <>
                                        {cliente.getPets.length > 0 ? (
                                            <div className="row g-3">
                                                {cliente.getPets.map((pet, idx) => (
                                                    <div className="col-md-6" key={idx}>
                                                        <div className="card">
                                                            <div className="card-body">
                                                                <h5 className="card-title">{pet.getNome}</h5>
                                                                <p className="card-text">{pet.getTipo} - {pet.getRaca}</p>
                                                                <p className="card-text"><small>Gênero: {pet.getGenero}</small></p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p>Nenhum pet cadastrado.</p>
                                        )}
                                    </>
                                )}

                                {aba === "produtos" && (
                                    <>
                                        {cliente.getProdutosConsumidos.length > 0 ? (
                                            <>
                                                {cliente.getProdutosConsumidos.map((produto, idx) => (
                                                    <div key={idx} className="d-flex justify-content-between border-bottom pb-2 mb-2">
                                                        <div>
                                                            <p className="mb-0"><strong>{produto.getNome}</strong></p>
                                                            <small>ID: {produto.getId}</small>
                                                        </div>
                                                        <span className="badge bg-secondary">{this.formatCurrency(produto.getPreco)}</span>
                                                    </div>
                                                ))}
                                                <div className="d-flex justify-content-between mt-3 fw-bold">
                                                    <p>Total</p>
                                                    <p>{this.formatCurrency(cliente.getProdutosConsumidos.reduce((acc, p) => acc + p.getPreco, 0))}</p>
                                                </div>
                                            </>
                                        ) : (
                                            <p>Nenhum produto consumido.</p>
                                        )}
                                    </>
                                )}

                                {aba === "servicos" && (
                                    <>
                                        {cliente.getServicosConsumidos.length > 0 ? (
                                            <>
                                                {cliente.getServicosConsumidos.map((servico, idx) => (
                                                    <div key={idx} className="d-flex justify-content-between border-bottom pb-2 mb-2">
                                                        <div>
                                                            <p className="mb-0"><strong>{servico.getNome}</strong></p>
                                                            <small>ID: {servico.getId}</small>
                                                        </div>
                                                        <span className="badge bg-secondary">{this.formatCurrency(servico.getPreco)}</span>
                                                    </div>
                                                ))}
                                                <div className="d-flex justify-content-between mt-3 fw-bold">
                                                    <p>Total</p>
                                                    <p>{this.formatCurrency(cliente.getServicosConsumidos.reduce((acc, s) => acc + s.getPreco, 0))}</p>
                                                </div>
                                            </>
                                        ) : (
                                            <p>Nenhum serviço consumido.</p>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
} 
const routesUtils = new RoutesUtils();
export default routesUtils.withRouter(ClienteDetalhes);