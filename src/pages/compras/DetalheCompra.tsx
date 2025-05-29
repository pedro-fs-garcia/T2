import { Component } from 'react';
import { Link } from 'react-router-dom';

interface Fornecedor {
    id: number;
    nome: string;
    email: string;
    telefone: string;
}

interface Produto {
    id: number;
    nome: string;
    preco: number;
}

interface ItemCompra {
    id: number;
    produto: Produto;
    quantidade: number;
    subtotal: number;
}

interface Compra {
    id: number;
    data: string;
    fornecedor: Fornecedor;
    itens: ItemCompra[];
    total: number;
    status: string;
    formaPagamento: string;
}

interface State {
    compra: Compra | null;
    loading: boolean;
    mensagem: string;
}

export default class DetalheCompra extends Component<{ id: string }, State> {
    constructor(props: { id: string }) {
        super(props);
        this.state = {
            compra: {
                id: 1,
                data: "2024-03-15",
                fornecedor: {
                    id: 1,
                    nome: "PetShop Distribuidora",
                    email: "contato@petshopdist.com",
                    telefone: "(11) 3333-4444"
                },
                itens: [
                    {
                        id: 1,
                        produto: {
                            id: 1,
                            nome: "Ração Premium",
                            preco: 45.90
                        },
                        quantidade: 10,
                        subtotal: 459.00
                    },
                    {
                        id: 2,
                        produto: {
                            id: 2,
                            nome: "Shampoo para Cães",
                            preco: 29.90
                        },
                        quantidade: 5,
                        subtotal: 149.50
                    }
                ],
                total: 608.50,
                status: "concluida",
                formaPagamento: "boleto"
            },
            loading: false,
            mensagem: ''
        };
    }

    formatarData = (data: string) => {
        return new Date(data).toLocaleDateString('pt-BR');
    };

    getStatusLabel = (status: string) => {
        const statusMap: { [key: string]: string } = {
            concluida: 'Concluída',
            pendente: 'Pendente',
            cancelada: 'Cancelada'
        };
        return statusMap[status] || status;
    };

    getFormaPagamentoLabel = (forma: string) => {
        const formasMap: { [key: string]: string } = {
            cartao: 'Cartão',
            dinheiro: 'Dinheiro',
            pix: 'PIX',
            boleto: 'Boleto'
        };
        return formasMap[forma] || forma;
    };

    render() {
        const { compra, loading, mensagem } = this.state;

        if (loading) {
            return (
                <div className="container py-4">
                    <div className="text-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Carregando...</span>
                        </div>
                    </div>
                </div>
            );
        }

        if (mensagem) {
            return (
                <div className="container py-4">
                    <div className="alert alert-danger" role="alert">
                        {mensagem}
                    </div>
                    <Link to="/compras" className="btn btn-outline-secondary">
                        <i className="bi bi-arrow-left me-2"></i>
                        Voltar para Compras
                    </Link>
                </div>
            );
        }

        if (!compra) {
            return (
                <div className="container py-4">
                    <div className="alert alert-warning" role="alert">
                        Compra não encontrada
                    </div>
                    <Link to="/compras" className="btn btn-outline-secondary">
                        <i className="bi bi-arrow-left me-2"></i>
                        Voltar para Compras
                    </Link>
                </div>
            );
        }

        return (
            <div className="container py-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2>Detalhes da Compra #{compra.id}</h2>
                    <div>
                        <Link to="/compras" className="btn btn-outline-secondary me-2">
                            <i className="bi bi-arrow-left me-2"></i>
                            Voltar
                        </Link>
                        <Link to={`/compras/${compra.id}/editar`} className="btn btn-primary">
                            <i className="bi bi-pencil me-2"></i>
                            Editar
                        </Link>
                    </div>
                </div>

                <div className="card shadow-sm mb-4">
                    <div className="card-header bg-success text-white">
                        <h5 className="mb-0">Informações Gerais</h5>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6">
                                <p><strong>Data:</strong> {this.formatarData(compra.data)}</p>
                                <p><strong>Status:</strong> {this.getStatusLabel(compra.status)}</p>
                                <p><strong>Forma de Pagamento:</strong> {this.getFormaPagamentoLabel(compra.formaPagamento)}</p>
                            </div>
                            <div className="col-md-6">
                                <p><strong>Fornecedor:</strong> {compra.fornecedor.nome}</p>
                                <p><strong>Email:</strong> {compra.fornecedor.email}</p>
                                <p><strong>Telefone:</strong> {compra.fornecedor.telefone}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card shadow-sm">
                    <div className="card-header bg-success text-white">
                        <h5 className="mb-0">Itens da Compra</h5>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Produto</th>
                                        <th>Quantidade</th>
                                        <th>Preço Unitário</th>
                                        <th>Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {compra.itens.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.produto.nome}</td>
                                            <td>{item.quantidade}</td>
                                            <td>R$ {item.produto.preco.toFixed(2)}</td>
                                            <td>R$ {item.subtotal.toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan={3} className="text-end"><strong>Total:</strong></td>
                                        <td><strong>R$ {compra.total.toFixed(2)}</strong></td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}