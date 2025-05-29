import { Component } from 'react';
import { Link } from 'react-router-dom';

interface Cliente {
    id: number;
    nome: string;
    email: string;
    telefone: string;
}

interface Pet {
    id: number;
    nome: string;
    especie: string;
    raca: string;
    idade: number;
    peso: number;
    cliente: Cliente;
    observacoes: string;
}

interface State {
    pet: Pet | null;
    loading: boolean;
    mensagem: string;
    editando: boolean;
}

export default class DetalhePet extends Component<{ id: string }, State> {
    constructor(props: { id: string }) {
        super(props);
        this.state = {
            pet: {
                id: 1,
                nome: "Rex",
                especie: "Cachorro",
                raca: "Labrador",
                idade: 3,
                peso: 25.5,
                cliente: {
                    id: 1,
                    nome: "João Silva",
                    email: "joao.silva@email.com",
                    telefone: "(11) 98765-4321"
                },
                observacoes: "Pet muito dócil e brincalhão. Gosta de brincar com bolinha."
            },
            loading: false,
            mensagem: '',
            editando: false
        };
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        this.setState(prevState => ({
            pet: prevState.pet ? { ...prevState.pet, [name]: value } : null
        }));
    };

    handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const { pet } = this.state;

        if (!pet) return;

        this.setState({
            mensagem: 'Pet atualizado com sucesso!',
            editando: false
        });
    };

    render() {
        const { pet, loading, mensagem, editando } = this.state;

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
                    <div className="alert alert-success" role="alert">
                        {mensagem}
                    </div>
                    <Link to="/pets" className="btn btn-outline-secondary">
                        <i className="bi bi-arrow-left me-2"></i>
                        Voltar para Pets
                    </Link>
                </div>
            );
        }

        if (!pet) {
            return (
                <div className="container py-4">
                    <div className="alert alert-warning" role="alert">
                        Pet não encontrado
                    </div>
                    <Link to="/pets" className="btn btn-outline-secondary">
                        <i className="bi bi-arrow-left me-2"></i>
                        Voltar para Pets
                    </Link>
                </div>
            );
        }

        return (
            <div className="container py-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2>Detalhes do Pet #{pet.id}</h2>
                    <div>
                        <Link to="/pets" className="btn btn-outline-secondary me-2">
                            <i className="bi bi-arrow-left me-2"></i>
                            Voltar
                        </Link>
                        <button
                            className="btn btn-primary"
                            onClick={() => this.setState({ editando: !editando })}
                        >
                            <i className="bi bi-pencil me-2"></i>
                            {editando ? 'Cancelar Edição' : 'Editar'}
                        </button>
                    </div>
                </div>

                <div className="card shadow-sm">
                    <div className="card-header bg-primary text-white">
                        <h5 className="mb-0">Informações do Pet</h5>
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Nome</label>
                                    {editando ? (
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="nome"
                                            value={pet.nome}
                                            onChange={this.handleChange}
                                            required
                                        />
                                    ) : (
                                        <p className="form-control-plaintext">{pet.nome}</p>
                                    )}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Espécie</label>
                                    {editando ? (
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="especie"
                                            value={pet.especie}
                                            onChange={this.handleChange}
                                            required
                                        />
                                    ) : (
                                        <p className="form-control-plaintext">{pet.especie}</p>
                                    )}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Raça</label>
                                    {editando ? (
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="raca"
                                            value={pet.raca}
                                            onChange={this.handleChange}
                                            required
                                        />
                                    ) : (
                                        <p className="form-control-plaintext">{pet.raca}</p>
                                    )}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Idade (anos)</label>
                                    {editando ? (
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="idade"
                                            value={pet.idade}
                                            onChange={this.handleChange}
                                            required
                                        />
                                    ) : (
                                        <p className="form-control-plaintext">{pet.idade}</p>
                                    )}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Peso (kg)</label>
                                    {editando ? (
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="peso"
                                            value={pet.peso}
                                            onChange={this.handleChange}
                                            step="0.1"
                                            required
                                        />
                                    ) : (
                                        <p className="form-control-plaintext">{pet.peso}</p>
                                    )}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Dono</label>
                                    <p className="form-control-plaintext">{pet.cliente.nome}</p>
                                </div>

                                <div className="col-12 mb-3">
                                    <label className="form-label">Observações</label>
                                    {editando ? (
                                        <textarea
                                            className="form-control"
                                            name="observacoes"
                                            value={pet.observacoes}
                                            onChange={this.handleChange}
                                            rows={3}
                                        />
                                    ) : (
                                        <p className="form-control-plaintext">{pet.observacoes}</p>
                                    )}
                                </div>
                            </div>

                            {editando && (
                                <div className="d-flex justify-content-end">
                                    <button type="submit" className="btn btn-primary">
                                        <i className="bi bi-check-lg me-2"></i>
                                        Salvar Alterações
                                    </button>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        );
    }
} 