// Pegando os elementos do HTML
const form = document.getElementById('creature-form');
const nameInput = document.getElementById('name');
const typeInput = document.getElementById('type');
const descriptionInput = document.getElementById('description');
const imageFileInput = document.getElementById('image-file');
const fileNameSpan = document.getElementById('file-name'); 
const creaturesList = document.getElementById('creatures-list');
const randomCreatures = [
    {
        name: "Yuki-onna",
        type: "Espírito da Neve",
        description: "Uma mulher fantasmagórica que aparece durante nevascas, congelando suas vítimas com seu sopro gélido.",
        imageFile: "assets/yuki-onna.jpg"
    },
    {
        name: "Kappa",
        type: "Criatura Aquática",
        description: "Um ser anfíbio com casco de tartaruga que vive em rios e adora pepinos. Pode ser perigoso se provocado.",
        imageFile: "assets/kappa.jpg"
    },
    {
        name: "Tengu",
        type: "Espírito da Montanha",
        description: "Criaturas com rostos vermelhos e longos narizes, mestres das artes marciais e protetores das florestas.",
        imageFile: "assets/tengu.jpg"
    },
    {
        name: "Noppera-bō",
        type: "Sem Rosto",
        description: "Humanoides que parecem normais até se virarem e revelarem uma face completamente lisa e sem traços.",
        imageFile: "assets/noppera-bo.jpg"
    },
    {
        name: "Rokurokubi",
        type: "Youkai Metamorfo",
        description: "Mulheres aparentemente normais cujo pescoço se alonga durante a noite, espreitando silenciosamente.",
        imageFile: "assets/rokurokubi.jpg"
    },
    {
        name: "Jorōgumo",
        type: "Aranha Mulher",
        description: "Um monstro que se transforma em uma bela mulher para atrair homens e devorá-los em sua teia.",
        imageFile: "assets/jorogumo.jpg"
    },
    {
        name: "Oni",
        type: "Demônio",
        description: "Gigantes fortes com pele colorida, chifres e porretes de ferro. Representam o mal, mas também podem proteger.",
        imageFile: "assets/oni.jpg"
    },
    {
        name: "Yurei",
        type: "Fantasma",
        description: "Espíritos vingativos que não conseguiram descansar em paz. Geralmente vistos com cabelos longos e roupas brancas.",
        imageFile: "assets/yurei.jpg"
    },
    {
        name: "Nurarihyon",
        type: "Líder dos Youkai",
        description: "Criatura que se parece com um velho e age como se fosse dono da casa, entrando sorrateiramente em residências humanas.",
        imageFile: "assets/nurarihyon.jpg"
    },
    {
        name: "Kuchisake-onna",
        type: "Mulher da Boca Rasgada",
        description: "Aparece usando máscara e pergunta: 'Sou bonita?'. Sua boca rasgada até as orelhas revela sua verdadeira forma.",
        imageFile: "assets/kuchisake-onna.jpg"
    },
    {
        name: "Hitotsume-kozo",
        type: "Monstro de Um Olho",
        description: "Espírito travesso que assusta as pessoas com sua aparência de criança careca com um único olho no meio da testa.",
        imageFile: "assets/hitotsume-kozo.jpg"
    },
    {
        name: "Gashadokuro",
        type: "Esqueleto Gigante",
        description: "Formado por ossos de pessoas que morreram de fome ou sem funeral, vagueia à noite esmagando humanos.",
        imageFile: "assets/gashadokuro.jpg"
    },
    {
        name: "Tsukumogami",
        type: "Objetos com Alma",
        description: "Objetos domésticos antigos que ganharam vida após 100 anos, às vezes brincalhões, às vezes vingativos.",
        imageFile: "assets/tsukumogami.jpg"
    }
];


function addCreature(event){
    event.preventDefault(); // Evita que a página seja recarregada

    const name = nameInput.value.trim();
    const type = typeInput.value.trim();
    const description = descriptionInput.value.trim();
    const file = imageFileInput.files[0];
    let isValid = true;

    // Função auxiliar para validar cada campo
    function validateField(input, errorId) {
        const errorSpan = document.getElementById(errorId);
        if (!input.value.trim()) {
            input.classList.add('input-error');
            errorSpan.style.display = 'block';
            isValid = false;
        } else {
            input.classList.remove('input-error');
            errorSpan.style.display = 'none';
        }
    }

    validateField(nameInput, 'name-error');
    validateField(typeInput, 'type-error');
    validateField(descriptionInput, 'description-error');

    // Verifica se uma imagem foi selecionada
    if (!file) {
        alert("Por favor, selecione uma imagem.");
        isValid = false;
    }

    // Se qualquer campo for inválido, cancela o envio
    if (!isValid) return;

    // Criando um novo item na lista de criaturas
    const imageURL = URL.createObjectURL(file); // Cria uma URL temporária da imagem local
    criarElementoCriatura(name, type, description, imageURL);
    
    // Limpando os campos após adicionar
    nameInput.value = '';
    typeInput.value = '';
    descriptionInput.value = '';
    imageFileInput.value = '';
}

document.getElementById('creature-form').addEventListener('submit', addCreature);


function criarElementoCriatura(name, type, description, imageFile) {
    const li = document.createElement('li');
    li.classList.add('creature-item');

    // Container de texto
    const textContainer = document.createElement('div');
    textContainer.classList.add('creature-text');

    // Subcontainer para nome e tipo na mesma linha
    const headerText = document.createElement('div');
    headerText.classList.add('creature-header');

    const nameElem = document.createElement('strong');
    nameElem.textContent = name;

    const typeElem = document.createElement('span');
    typeElem.textContent = ` (${type})`;

    headerText.appendChild(nameElem);
    headerText.appendChild(typeElem);

    const descElem = document.createElement('em');
    descElem.textContent = description;

    textContainer.appendChild(headerText);
    textContainer.appendChild(descElem);

    // Imagem
    const img = document.createElement('img');
    img.src = imageFile;
    img.alt = name;
    img.classList.add('creature-image');

    // Botão de exclusão
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'X';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', () => {
        li.remove();
    });

    // Adiciona os elementos ao <li>
    li.appendChild(textContainer);
    li.appendChild(img);
    li.appendChild(deleteBtn);

    // Adiciona o <li> à lista
    creaturesList.prepend(li);
}


//Adicionando o evento ao formulário
form.addEventListener('submit', addCreature);
const randomButton = document.getElementById('random-creature');
randomButton.addEventListener('click', () => {
    if (randomCreatures.length === 0) {
        alert("Todas as criaturas aleatórias já foram usadas!");
        return;
    }

    // Sorteia um índice aleatório
    const index = Math.floor(Math.random() * randomCreatures.length);
    const creature = randomCreatures[index];

    // Cria o <li> com a criatura
    criarElementoCriatura(creature.name, creature.type, creature.description, creature.imageFile);

    // Remove essa criatura da lista para evitar repetições
    randomCreatures.splice(index, 1);
});

imageFileInput.addEventListener('change', () => {
    const file = imageFileInput.files[0];
    if (file) {
        fileNameSpan.textContent = file.name;
    } else {
        fileNameSpan.textContent = 'Nenhum arquivo selecionado';
    }
});