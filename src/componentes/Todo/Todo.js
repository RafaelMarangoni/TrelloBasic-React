import React from 'react';

import Botao from '../Botao/Botao';
import Tarefa from '../Tarefa/Tarefa';
import Input from '../Input/Input';


import './Todo.css';

class Todo extends React.Component {
    state = {
        tarefas: []
    }

    componentDidMount = () => {
        this.listarTarefas();
    }

    listarTarefas = () => {
        let tarefasLocal = localStorage.getItem("tarefas");

        if (tarefasLocal === null) {
            localStorage.setItem("tarefas", JSON.stringify([]));
        } else {
            this.setState({ tarefas: JSON.parse(tarefasLocal) })
        }
    }
    // roots
    // verificarData = data =>{
    //     let dataAtual = new Date();
    //     let dia = dataAtual.getDate();
    //     let mes = dataAtual.getMonth()+1;
    //     let ano = dataAtual.getFullYear();

    //     if (dia.toString().length == 1){
    //         dia = "0"+dia;
    //     }
    //      if (mes.toString().length == 1){
    //         mes = "0"+mes;
    //     }
        
    //     //return dia+"/"+mes+"/"+ano;
    //     console.log(ano+"-"+mes+"-"+dia);
        
    // };

    verificarData = data =>{
        let dataAtual = new Date();
        let dia = String(dataAtual.getDate());
        let mes = String(dataAtual.getMonth()+1);
        let ano = String(dataAtual.getFullYear());

        let dataFormatada = `${ano}-${mes.padStart(2,"0")}-${dia.padStart(2,"0")}`;

        return Date.parse(dataFormatada) >= Date.parse(data);
    };
         
        


  

    adicionarTarefa = (evento) => {

        evento.preventDefault();



        let novaTarefa = evento.target.firstElementChild.value
        let novaData = evento.target.firstElementChild.nextElementSibling.value

        if(this.verificarData(novaData)){
            return alert('Data invalida');
        }

        evento.target.firstElementChild.value = "";
        evento.target.firstElementChild.focus();

        if (novaTarefa === "") {
            return alert('Opa não pode adicionar vazio');
        }

        let tarefasLocal = localStorage.getItem("tarefas");
        let arrayTarefas = JSON.parse(tarefasLocal);

        let dataDivida = novaData.split("-");
        let dataFormatada = dataDivida.reverse().join('/');

        arrayTarefas.push({
            titulo: novaTarefa,
            data:dataFormatada,
            status: "Fazendo"
        
        });

        arrayTarefas = arrayTarefas.reverse();

        localStorage.setItem("tarefas", JSON.stringify(arrayTarefas));

        this.setState({ tarefas: arrayTarefas })
    }

    removerTarefas = () => {
        localStorage.setItem("tarefas", JSON.stringify([]));
        this.setState({tarefas: []})
    }

    atualizarTarefa = (index) => {
        let tarefasLocal = localStorage.getItem("tarefas");

        let arrayTarefas = JSON.parse(tarefasLocal);

        let statusTarefa = arrayTarefas[index].status;

        if (statusTarefa === "Fazendo") {
            arrayTarefas[index].status = "Feito";
        } else {
            arrayTarefas[index].status = "Fazendo";
        }

        localStorage.setItem("tarefas", JSON.stringify(arrayTarefas));
        this.setState({ tarefas: arrayTarefas })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.adicionarTarefa}>
                    <Input class="tarefa"tipo="text" caixaTexto="Digite sua tarefa"/>
                    <Input tipo="date"/>
                    <Botao
                        classe="add"
                        titulo="Adicionar"
                        tipo="submit"
                    />
                </form>
                <Botao
                    classe="removeAll"
                    titulo="Remover todas as tarefas"
                    tipo="button"
                    aoClicar={this.removerTarefas}
                />
                { this.state.tarefas.map((tarefa, index) => {
                    return (
                        <Tarefa
                            key={index}
                            tituloTarefa={tarefa.titulo}
                            tituloData={tarefa.data}
                            tituloStatus={tarefa.status}
                            classeStatus={tarefa.status}
                            aoClicar={ () => {this.atualizarTarefa(index)} }
                        />
                    );
                }) }
            </div>
        );
    }
}

export default Todo;