import { Component } from 'react';
import { Link } from 'react-router-dom';

interface ProdutoData {
    id: number;
    nome: string;
    descricao: string;
    preco: number;
    estoque: number;
    categoria: string;
}

interface State {
    produtos: ProdutoData[];
    loading: boolean;
    mensagem: string;
}

export default class ProdutoList extends Component<object, State> {
    constructor(props: object) {
        super(props);
        this.state = {
            produtos: [],
            loading: true,
            mensagem: ''
        };
    }

    componentDidMount() {
        fetch('/produtos.json')
            .then((res) => {
                if (!res.ok) throw new Error('Erro ao buscar os produtos');
                return res.json();
            })
            .then((data: ProdutoData[]) => {
                this.setState({ produtos: data });
            })
            .catch((err) => this.setState({ mensagem: `Erro: ${err.message}` }))
            .finally(() => this.setState({ loading: false }));
    }

    render() {
        const { loading, mensagem, produtos } = this.state;

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
                </div>
            );
        }

        return (
            <div className="container py-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2>Lista de Produtos</h2>
                    <Link to="/produtos/novo" className="btn btn-primary">
                        <i className="bi bi-plus-circle me-2"></i>
                        Novo Produto
                    </Link>
                </div>

                <div className="table-responsive">
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Categoria</th>
                                <th>Preço</th>
                                <th>Estoque</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {produtos.map((produto) => (
                                <tr key={produto.id}>
                                    <td>#{produto.id}</td>
                                    <td>{produto.nome}</td>
                                    <td>{produto.categoria}</td>
                                    <td>R$ {produto.preco.toFixed(2)}</td>
                                    <td>{produto.estoque}</td>
                                    <td>
                                        <div className="btn-group">
                                            <Link
                                                to={`/produtos/${produto.id}`}
                                                className="btn btn-sm btn-outline-primary"
                                            >
                                                <i className="bi bi-eye"></i>
                                            </Link>
                                            <Link
                                                to={`/produtos/${produto.id}/editar`}
                                                className="btn btn-sm btn-outline-secondary"
                                            >
                                                <i className="bi bi-pencil"></i>
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
} 