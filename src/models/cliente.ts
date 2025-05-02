import CPF from "./cpf"
import Pet from "./pet"
import Produto from "./produto"
import RG from "./rg"
import Servico from "./servico"
import Telefone from "./telefone"
import User from "./user"

export default class Cliente extends User {
    private produtosConsumidos: Produto[];
    private servicosConsumidos: Servico[];
    private pets: Pet[];
    private itensConsumidos: number;
    private valorConsumido: number;

    constructor(
        nome: string,
        nomeSocial: string,
        cpf: CPF,
        rg: RG | null = null,
        dataCadastro: Date = new Date(),
        telefones: Telefone[] = [],
        email: string | null = null,
        produtosConsumidos: Produto[] = [],
        servicosConsumidos: Servico[] = [],
        pets: Pet[] = [],
        itensConsumidos: number = 0,
        valorConsumido: number = 0
    ) {
        super(nome, nomeSocial, cpf, rg, dataCadastro, telefones, email);
        this.produtosConsumidos = produtosConsumidos;
        this.servicosConsumidos = servicosConsumidos;
        this.pets = pets;
        this.itensConsumidos = itensConsumidos;
        this.valorConsumido = valorConsumido;
    }

    public adicionaPet(pet:Pet){
        this.pets.push(pet);
    }

    public adicionaProduto(produto:Produto, quantidade:number){
        if (quantidade > produto.getQuantidadeEstoque) {
            throw new Error('Quantidade solicitada maior que o estoque disponível');
        }
        this.produtosConsumidos.push(produto);
        this.itensConsumidos += quantidade;
        this.valorConsumido += produto.getPreco * quantidade;
    }

    public adicionaServico(servico:Servico){
        this.servicosConsumidos.push(servico);
        this.itensConsumidos += 1;
        this.valorConsumido += servico.getPreco;
    }

    public listarPets(){
        this.pets.forEach(pet => {
            console.log(pet.descrever());
        });
    }

    public listarPrincipaisAtributos(){
        console.log("--------------------------------");
        console.log(`Nome do cliente: ${this.getNome}`);
        console.log(`CPF do cliente: ${this.getCpf}`);
        console.log('Pets:');
        this.pets.forEach(pet => {
            console.log(`   nome do pet: ${pet.getNome}`)
        });
        console.log(`Quatidade de itens consumidos: ${this.getItensConsumidos}`);
        console.log(`Valor consumido: ${this.valorConsumido}`);
        console.log("--------------------------------");
    }
    
    public get getProdutosConsumidos(): Array<Produto> {
        return this.produtosConsumidos
    }
    
    public get getServicosConsumidos(): Array<Servico> {
        return this.servicosConsumidos
    }
    
    public get getPets(): Array<Pet> {
        return this.pets
    }
    
    public get getItensConsumidos(){
        return this.itensConsumidos;
    }

    public get getValorConsumido(){
        return this.valorConsumido;
    }
    
    public setProdutosConsumidos(produtos: Array<Produto>) {
        this.produtosConsumidos = produtos
    }
    
    public setServicosConsumidos(servicos: Array<Servico>) {
        this.servicosConsumidos = servicos
    }
    
    public setPets(pets: Array<Pet>) {
        this.pets = pets
    }
}