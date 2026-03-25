// sistema via cep

let cep = [
  {
    cep: "06320000",
    cidade: "Carapicuiba",
    estado: "SP",
    bairro: "Centro",
    rua: "Inocencio Seráfico",
    número: "847",
  },
  {
    cep: "04101000",
    cidade: "São Paulo",
    estado: "SP",
    bairro: "Vila Mariana",
    rua: "Rua Vergueiro",
    número: "3185",
  },
  {
    cep: "22021001",
    cidade: "Rio de Janeiro",
    estado: "RJ",
    bairro: "Copacabana",
    rua: "Avenida Atlântica",
    número: "1702",
  },
];

function buscarEndereco() {
  let cepDigitado = document.getElementById("cep").value;

  let enderecoEncontrado = cep.find((c) => c.cep == cepDigitado);

  if (enderecoEncontrado) {
    document.getElementById("cidade").innerText = enderecoEncontrado.cidade;
    document.getElementById("bairro").innerText = enderecoEncontrado.bairro;
    document.getElementById("rua").innerText = enderecoEncontrado.rua;
    document.getElementById("numero").innerText = enderecoEncontrado.número;
  } else {
    document.getElementById("cidade").innerText = "Endereço não encontrado.";
    document.getElementById("bairro").innerText = "";
    document.getElementById("rua").innerText = "";
    document.getElementById("numero").innerText = "";
  }
}
