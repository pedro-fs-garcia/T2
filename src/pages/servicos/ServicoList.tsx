import { Component } from 'react';
import { Link } from 'react-router-dom';

interface ServicoData {
    id: number;
    nome: string;
    preco: number;
    descricao: string;
    duracao: string;
    categoria: string;
}

interface State {
    servicos: ServicoData[];
    loading: boolean;
    mensagem: string;
}

export default class ServicosList extends Component<object, State> {
    constructor(props: object) {
        super(props);
        this.state = {
            servicos: [],
            loading: true,
            mensagem: ''
        };
    }

    componentDidMount() {
        fetch('/servicos.json')
            .then((res) => {
                if (!res.ok) throw new Error('Erro ao buscar os serviços');
                return res.json();
            })
            .then((data: ServicoData[]) => {
                this.setState({ servicos: data });
            })
            .catch((err) => this.setState({ mensagem: `Erro: ${err.message}` }))
            .finally(() => this.setState({ loading: false }));
    }

    render() {
        const { loading, mensagem, servicos } = this.state;

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
                    <h2>Lista de Serviços</h2>
                    <Link to="/servicos/novo" className="btn btn-primary">
                        <i className="bi bi-plus-circle me-2"></i>
                        Novo Serviço
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
                                <th>Duração</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {servicos.map((servico) => (
                                <tr key={servico.id}>
                                    <td>#{servico.id}</td>
                                    <td>{servico.nome}</td>
                                    <td>{servico.categoria}</td>
                                    <td>R$ {servico.preco.toFixed(2)}</td>
                                    <td>{servico.duracao}</td>
                                    <td>
                                        <div className="btn-group">
                                            <Link
                                                to={`/servicos/${servico.id}`}
                                                className="btn btn-sm btn-outline-primary"
                                            >
                                                <i className="bi bi-eye"></i>
                                            </Link>
                                            <Link
                                                to={`/servicos/${servico.id}/editar`}
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