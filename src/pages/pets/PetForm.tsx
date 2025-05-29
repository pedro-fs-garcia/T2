import { Component } from 'react';
import { Link } from 'react-router-dom';

interface ClienteData {
    id: number;
    nome: string;
    email: string;
    telefone: string;
}

interface PetData {
    nome: string;
    especie: string;
    raca: string;
    idade: number;
    peso: number;
    clienteId: number;
    observacoes: string;
}

interface State {
    clientes: ClienteData[];
    pet: PetData;
    loading: boolean;
    mensagem: string;
}

export default class PetForm extends Component<object, State> {
    constructor(props: object) {
        super(props);
        this.state = {
            clientes: [],
            pet: {
                nome: '',
                especie: '',
                raca: '',
                idade: 0,
                peso: 0,
                clienteId: 0,
                observacoes: ''
            },
            loading: true,
            mensagem: ''
        };
    }

    componentDidMount() {
        this.carregarClientes();
    }

    carregarClientes = async () => {
        try {
            const response = await fetch('/clientes.json');
            if (!response.ok) throw new Error('Erro ao buscar os dados dos clientes');
            const data = await response.json();
            this.setState({ clientes: data });
        } catch (err) {
            this.setState({ mensagem: `Erro: ${err instanceof Error ? err.message : 'Erro desconhecido'}` });
        } finally {
            this.setState({ loading: false });
        }
    };

    handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        this.setState(prevState => ({
            pet: {
                ...prevState.pet,
                [name]: name === 'idade' || name === 'peso' || name === 'clienteId' 
                    ? parseFloat(value) 
                    : value
            }
        }));
    };

    handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const { pet } = this.state;
        
        // Validações básicas
        if (!pet.nome.trim()) {
            this.setState({ mensagem: 'O nome do pet é obrigatório' });
            return;
        }
        if (!pet.especie.trim()) {
            this.setState({ mensagem: 'A espécie do pet é obrigatória' });
            return;
        }
        if (!pet.raca.trim()) {
            this.setState({ mensagem: 'A raça do pet é obrigatória' });
            return;
        }
        if (pet.idade <= 0) {
            this.setState({ mensagem: 'A idade do pet deve ser maior que zero' });
            return;
        }
        if (pet.peso <= 0) {
            this.setState({ mensagem: 'O peso do pet deve ser maior que zero' });
            return;
        }
        if (!pet.clienteId) {
            this.setState({ mensagem: 'O dono do pet é obrigatório' });
            return;
        }

        // Aqui você implementaria a lógica para salvar o pet
        this.setState({
            mensagem: 'Pet registrado com sucesso!',
            pet: {
                nome: '',
                especie: '',
                raca: '',
                idade: 0,
                peso: 0,
                clienteId: 0,
                observacoes: ''
            }
        });
    };

    render() {
        const { clientes, pet, loading, mensagem } = this.state;

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

        return (
            <div className="container py-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2>Registrar Novo Pet</h2>
                    <Link to="/pets" className="btn btn-outline-secondary">
                        <i className="bi bi-arrow-left me-2"></i>
                        Voltar
                    </Link>
                </div>

                {mensagem && (
                    <div className="alert alert-success" role="alert">
                        {mensagem}
                    </div>
                )}

                <div className="card shadow-sm">
                    <div className="card-header bg-success text-white">
                        <h5 className="mb-0">Informações do Pet</h5>
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Nome do Pet</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="nome"
                                    value={pet.nome}
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Espécie</label>
                                <select
                                    className="form-select"
                                    name="especie"
                                    value={pet.especie}
                                    onChange={this.handleChange}
                                    required
                                >
                                    <option value="">Selecione a espécie</option>
                                    <option value="Cachorro">Cachorro</option>
                                    <option value="Gato">Gato</option>
                                    <option value="Ave">Ave</option>
                                    <option value="Peixe">Peixe</option>
                                    <option value="Outro">Outro</option>
                                </select>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Raça</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="raca"
                                    value={pet.raca}
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Idade (anos)</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="idade"
                                        value={pet.idade}
                                        onChange={this.handleChange}
                                        min="0"
                                        step="0.1"
                                        required
                                    />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Peso (kg)</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="peso"
                                        value={pet.peso}
                                        onChange={this.handleChange}
                                        min="0"
                                        step="0.1"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Dono</label>
                                <select
                                    className="form-select"
                                    name="clienteId"
                                    value={pet.clienteId}
                                    onChange={this.handleChange}
                                    required
                                >
                                    <option value="">Selecione o dono</option>
                                    {clientes.map(cliente => (
                                        <option key={cliente.id} value={cliente.id}>
                                            {cliente.nome}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Observações</label>
                                <textarea
                                    className="form-control"
                                    name="observacoes"
                                    value={pet.observacoes}
                                    onChange={this.handleChange}
                                    rows={3}
                                />
                            </div>

                            <div className="d-grid">
                                <button type="submit" className="btn btn-success">
                                    <i className="bi bi-save me-2"></i>
                                    Registrar Pet
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
} 