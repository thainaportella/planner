//---------------------------------- SELECTORS ----------------------------------//

// ATUALIZAÇÃO DE NOME E DIA

const hoje = document.querySelector('.hoje')
const nome = document.querySelector('h1')
const box = document.querySelector('aside')
const botaoAbreFecha = document.querySelector('#atualizar')
const botaoFeito = document.querySelector('#feito')
const inputNome = document.querySelector('#nome')

// TAREFAS COMUNS

const containerTarefas = document.querySelector('.container-lista-de-tarefas')
const inputTarefa = document.querySelector('.input-tarefa')
const botaoAddTarefa = document.querySelector('.add-nova-tarefa')
inputTarefa.focus()

// ARRAYS

const botaoCheck = Array.from(document.querySelectorAll('.fa-regular'))
const botaoTiraPrioridade = Array.from(document.querySelectorAll('.container-prioridade .fa-solid'))
const prioridades = Array.from(document.querySelectorAll('.item-p'))

//---------------------------------- FUNCTIONS ----------------------------------//

// FUNÇÃO DE CORREÇÃO DE ENVIO

const validaNome = () => {
  return inputNome.value.trim().length > 0
}

const validaTarefa = () => {
  return inputTarefa.value.trim().length > 0
}

// FUNÇÃO DE UPDATE DA DATA DO DIA

const dataDeHoje = () => {
  const today = new Date()
  const dia = today.getDate()
  const mes = today.getMonth() + 1
  const ano = today.getFullYear()

  hoje.innerText = dia + '/' + mes + '/' + ano
}

// FUNÇÃO PARA ABRIR O BOX DE ATUALIZAÇÃO

const abreFechaAtt = () => {
  if (!box.classList.contains('clicked')) {
    box.classList.add('clicked')
  } else {
    box.classList.remove('clicked')
  }
}

// FUNÇÃO PARA ATUALIZAR NOME

const attNome = () => {

  const nomeValidado = validaNome()
  
  if(!nomeValidado) {
    inputNome.classList.add('erro')
  } else {
    nome.innerText = inputNome.value;
    
    inputNome.value = '';
  }

  updateLocalStorageTarefa()
}

// FUNÇÃO PARA ADICIONAR TAREFA COMUM

const addTarefa = () => {

  const tarefaValidada = validaTarefa()

  if(!tarefaValidada) {
    inputTarefa.classList.add('erro')
  } else {
    const novoContainerDeTarefa = document.createElement('article')
    
    const botaoPrioridade = document.createElement('i')
    botaoPrioridade.classList.add('fa-solid')
    botaoPrioridade.classList.add('fa-star')
    botaoPrioridade.classList.add('fa-xl')
    
    botaoPrioridade.addEventListener('click', () => addPrioridade(novoContainerDeTarefa, itemTarefa))
    
    const botaoCheck = document.createElement('i')
    botaoCheck.classList.add('fa-regular') // tirar esse
    botaoCheck.classList.add('fa-circle')
    botaoCheck.classList.add('fa-xl')

    // adicionar if (task.isCompleted) botaoCheck.classList.add('fa-circle-checked') else botaoCheck.classList.add(fa-regular)
    
    botaoCheck.addEventListener('click', () => tarefaRealizada(botaoCheck))
    
    const itemTarefa = document.createElement('p')
    itemTarefa.innerText = inputTarefa.value // trocar o inner text para content do map
    
    const botaoDeletar = document.createElement('i')
    botaoDeletar.classList.add('fa-solid')
    botaoDeletar.classList.add('fa-trash-can')
    botaoDeletar.classList.add('fa-xl')
    
    botaoDeletar.addEventListener('click', () => deletarTarefa(novoContainerDeTarefa, itemTarefa))
    
    novoContainerDeTarefa.appendChild(botaoPrioridade)
    novoContainerDeTarefa.appendChild(botaoCheck)
    novoContainerDeTarefa.appendChild(itemTarefa)
    novoContainerDeTarefa.appendChild(botaoDeletar)
    
    containerTarefas.appendChild(novoContainerDeTarefa)
    
    inputTarefa.value = '';
    inputTarefa.focus()

    updateLocalStorageTarefa()
  }
}

// FUNÇÃO PARA DELETAR TAREFA COMUM

const deletarTarefa = (novoContainerDeTarefa, itemTarefa) => {
  const tarefas = novoContainerDeTarefa.childNodes
  
  for (const tarefa of tarefas) {
    const tarefaAtualSendoClicada = tarefa.isEqualNode(itemTarefa);
    
    if (tarefaAtualSendoClicada) {
      novoContainerDeTarefa.remove()
    }
  }

  updateLocalStorageTarefa()
}

// FUNÇÃO PARA TRANSFERIR TAREFA COMUM PARA PRIORIDADE

const addPrioridade = (novoContainerDeTarefa, itemTarefa) => {

  for(i = 0; i < prioridades.length; i++) {
    if(prioridades[i].innerText.length == 0) {
      prioridades[i].innerText = itemTarefa.innerText
      prioridades[i].parentNode.childNodes[1].classList.remove('hidden')
      prioridades[i].parentNode.childNodes[5].classList.remove('hidden')
      updateLocalStorageTarefa()
      deletarTarefa(novoContainerDeTarefa, itemTarefa)
      break
    } else {
      if(i == 2) {
        alert('Não há espaço nas prioridades. Retire alguma existente para adicionar uma nova.')
      } else {
      continue
      }
    }
  }
}

// FUNÇÃO PARA DAR CHECK NA TAREFA REALIZADA

const tarefaRealizada = (botaoCheck) => {
  
  if(botaoCheck.classList.contains('fa-circle')) {
    botaoCheck.classList.remove('fa-circle')
    botaoCheck.classList.add('fa-circle-check')
  } else {
    botaoCheck.classList.remove('fa-circle-check')
    botaoCheck.classList.add('fa-circle')
  }

  updateLocalStorageTarefa()
  
}

// FUNÇÃO PARA TRANSFERIR PRIORIDADE PARA TAREFA COMUM

const retiraPrioridade = (botaoSendoClicado) => {
  const container = botaoSendoClicado.parentNode
  const texto = container.childNodes[3]
  
  //criar novo elemento nas tarefas comuns
  
  const novoContainerDeTarefa = document.createElement('article')
  
  const botaoPrioridade = document.createElement('i')
  botaoPrioridade.classList.add('fa-solid')
  botaoPrioridade.classList.add('fa-star')
  botaoPrioridade.classList.add('fa-xl')
  
  botaoPrioridade.addEventListener('click', () => addPrioridade(novoContainerDeTarefa, itemTarefa))
  
  const botaoCheck = document.createElement('i')
  botaoCheck.classList.add('fa-regular')
  botaoCheck.classList.add('fa-circle')
  botaoCheck.classList.add('fa-xl')
  
  botaoCheck.addEventListener('click', () => tarefaRealizada(botaoCheck))
  
  const itemTarefa = document.createElement('p')
  itemTarefa.innerText = texto.innerText
  
  const botaoDeletar = document.createElement('i')
  botaoDeletar.classList.add('fa-solid')
  botaoDeletar.classList.add('fa-trash-can')
  botaoDeletar.classList.add('fa-xl')
  
  botaoDeletar.addEventListener('click', () => deletarTarefa(novoContainerDeTarefa, itemTarefa))
  
  novoContainerDeTarefa.appendChild(botaoPrioridade)
  novoContainerDeTarefa.appendChild(botaoCheck)
  novoContainerDeTarefa.appendChild(itemTarefa)
  novoContainerDeTarefa.appendChild(botaoDeletar)
  
  containerTarefas.appendChild(novoContainerDeTarefa)
  
  texto.innerText = ''

  container.childNodes[1].classList.add('hidden')
  container.childNodes[5].classList.add('hidden')

  updateLocalStorageTarefa()

}

// UPDATE LOCAL STORAGE

const updateLocalStorageTarefa = () => {
  const tarefas = containerTarefas.childNodes

  const tarefasLocalStorage = [ ... tarefas ].map((tarefas) => {
    const conteudoT = tarefas.childNodes[2]
    const checkedT = tarefas.childNodes[1].classList.contains('fa-circle-check')
       
    return { description: conteudoT.innerText, checkedT }
  })
  
  localStorage.setItem('tarefas', JSON.stringify(tarefasLocalStorage))
  
  const prioridadesLocalStorage = [ ... prioridades ].map((prioridades) => {
    const contPri = prioridades.parentNode
    const checkedP = contPri.childNodes[1].classList.contains('fa-circle-check')
    
    return { description: prioridades.innerText, checkedP }
  })

  localStorage.setItem('prioridades', JSON.stringify(prioridadesLocalStorage))

  const textoNome = nome.innerText
  localStorage.setItem('nome', JSON.stringify(textoNome))
  
}

const refreshUsingLocalStorage = () => {
  const tarefasLocalStorage = JSON.parse(localStorage.getItem('tarefas'))
  const prioridadesLocalStorage = JSON.parse(localStorage.getItem('prioridades'))
  const nomeLocalStorage = JSON.parse(localStorage.getItem('nome'))

  if (!tarefasLocalStorage && !prioridadesLocalStorage && !nomeLocalStorage) return

  nome.innerText = nomeLocalStorage

  for(const prioridade of prioridadesLocalStorage) {
    if(prioridade.description.length > 0) {
      for(i = 0; i < prioridades.length; i++) {
        if(prioridades[i].innerText.length == 0) {
          prioridades[i].innerText = prioridade.description
          prioridades[i].parentNode.childNodes[1].classList.remove('hidden')
          prioridades[i].parentNode.childNodes[5].classList.remove('hidden')
          if(prioridade.checkedP) {
            prioridades[i].parentNode.childNodes[1].classList.remove('fa-circle')
            prioridades[i].parentNode.childNodes[1].classList.add('fa-circle-check')
          }
          break
        }
      }
    }
    
  }
  
  for(const tarefa of tarefasLocalStorage) {
    const novoContainerDeTarefa = document.createElement('article')
    
    const botaoPrioridade = document.createElement('i')
    botaoPrioridade.classList.add('fa-solid')
    botaoPrioridade.classList.add('fa-star')
    botaoPrioridade.classList.add('fa-xl')
    
    botaoPrioridade.addEventListener('click', () => addPrioridade(novoContainerDeTarefa, itemTarefa))
    
    const botaoCheck = document.createElement('i')
    botaoCheck.classList.add('fa-regular')
    botaoCheck.classList.add('fa-xl')

    if(tarefa.checkedT) {
      botaoCheck.classList.add('fa-circle-check') 
    } else { 
      botaoCheck.classList.add('fa-circle')
    }
    
    botaoCheck.addEventListener('click', () => tarefaRealizada(botaoCheck))
    
    const itemTarefa = document.createElement('p')
    itemTarefa.innerText = tarefa.description 
    
    const botaoDeletar = document.createElement('i')
    botaoDeletar.classList.add('fa-solid')
    botaoDeletar.classList.add('fa-trash-can')
    botaoDeletar.classList.add('fa-xl')
    
    botaoDeletar.addEventListener('click', () => deletarTarefa(novoContainerDeTarefa, itemTarefa))
    
    novoContainerDeTarefa.appendChild(botaoPrioridade)
    novoContainerDeTarefa.appendChild(botaoCheck)
    novoContainerDeTarefa.appendChild(itemTarefa)
    novoContainerDeTarefa.appendChild(botaoDeletar)
    
    containerTarefas.appendChild(novoContainerDeTarefa)
  } 

}

//---------------------------------- MAIN ----------------------------------//

refreshUsingLocalStorage()
dataDeHoje()

// abre e fecha o box de atualização de nome
botaoAbreFecha.addEventListener('click', () => abreFechaAtt())
// atualiza nome
botaoFeito.addEventListener('click', () => attNome())
// adiciona tarefa comum
botaoAddTarefa.addEventListener('click', () => addTarefa())
// marca tarefa realizada
for(i=0; i < botaoCheck.length; i++) {
  const botaoSendoClicado = botaoCheck[i]
  botaoSendoClicado.addEventListener('click', () => tarefaRealizada(botaoSendoClicado))
}
// retira prioridade
for(i=0; i < botaoTiraPrioridade.length; i++) {
  const botaoSendoClicado = botaoTiraPrioridade[i]
  botaoSendoClicado.addEventListener('click', () => retiraPrioridade(botaoSendoClicado))
}