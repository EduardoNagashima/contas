import inquirer from 'inquirer';

async function getValues() {
  const perguntas = [
    {
      type: 'input',
      name: 'mercado',
      message: 'Valor do mercado:',
      validate: (input) => {
        const valor = input.replace(',', '.');
        if (valor === '' || isNaN(Number(valor)) || Number(valor) < 0) {
          return 'Por favor, insira um valor válido.';
        }
        return true;
      },
      filter: (input) => parseFloat(Number(input.replace(',', '.'))),
    },
    {
      type: 'input',
      name: 'aluguel',
      message: 'Valor do aluguel:',
      validate: (input) => {
        const valor = input.replace(',', '.');
        if (valor === '' || isNaN(Number(valor)) || Number(valor) < 0) {
          return 'Por favor, insira um valor válido.';
        }
        return true;
      },
      filter: (input) => parseFloat(Number(input.replace(',', '.'))),
    },
    {
      type: 'input',
      name: 'luz',
      message: 'Valor da luz:',
      validate: (input) => {
        const valor = input.replace(',', '.');
        if (valor === '' || isNaN(Number(valor)) || Number(valor) < 0) {
          return 'Por favor, insira um valor válido.';
        }
        return true;
      },
      filter: (input) => parseFloat(Number(input.replace(',', '.'))),
    },
    {
      type: 'input',
      name: 'condominio',
      message: 'Valor do condomínio:',
      validate: (input) => {
        const valor = input.replace(',', '.');
        if (valor === '' || isNaN(Number(valor)) || Number(valor) < 0) {
          return 'Por favor, insira um valor válido.';
        }
        return true;
      },
      filter: (input) => parseFloat(Number(input.replace(',', '.'))),
    },
    {
      type: 'input',
      name: 'internet',
      message: 'Valor da internet:',
      filter: (input) =>
        input ? parseFloat(Number(input.replace(',', '.'))) : parseFloat(82.8),
    },
  ];

  try {
    const respostas = await inquirer.prompt(perguntas);

    calcularValores(respostas);
  } catch (err) {
    console.error('Erro:', err);
    return;
  }
}

function calcularValores(respostas) {
  const { mercado, aluguel, luz, condominio, internet } = respostas;

  const METADE_MERCADO = parseFloat(mercado) / 2;

  const TOTAL_CONTAS =
    parseFloat(aluguel) +
    parseFloat(luz) +
    parseFloat(condominio) +
    parseFloat(internet);

  let RENDA_PERCENTUAL_PRIMEIRA_PESSOA = 0.54;
  let RENDA_PERCENTUAL_SEGUNDA_PESSOA = 0.46;

  const VALOR_PRIMEIRA_PESSOA = RENDA_PERCENTUAL_PRIMEIRA_PESSOA * TOTAL_CONTAS;
  const VALOR_SEGUNDA_PESSOA = RENDA_PERCENTUAL_SEGUNDA_PESSOA * TOTAL_CONTAS;
  const VALOR_TOTAL_SEGUNDA_PESSOA = VALOR_SEGUNDA_PESSOA + METADE_MERCADO;

  console.log(
    `TOTAL: R$${parseFloat(VALOR_PRIMEIRA_PESSOA + VALOR_SEGUNDA_PESSOA).toFixed(2)}`
  );
  console.log(`Valor de Eduardo: R$${VALOR_PRIMEIRA_PESSOA.toFixed(2)}`);
  console.log(`Valor de Anna: R$${VALOR_TOTAL_SEGUNDA_PESSOA.toFixed(2)}`);
}

getValues();
