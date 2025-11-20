import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

export default function App() {
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [tipo, setTipo] = useState("receita");
  const [lista, setLista] = useState([]);

  function add() {
    if (!descricao || !valor) return;

    const novo = {
      descricao,
      valor: parseFloat(valor),
      tipo
    };

    setLista([...lista, novo]);
    setDescricao("");
    setValor("");
    setTipo("receita");
  }

  const receitas = lista.filter(i => i.tipo === "receita").reduce((a, b) => a + b.valor, 0);
  const despesas = lista.filter(i => i.tipo === "despesa").reduce((a, b) => a + b.valor, 0);
  const total = receitas - despesas;

  return (
    <div>
      <img className="excel2" src="img/excel2.png" alt="" />
      <h1>Excel 2</h1>
      <h2 className="first">Administre suas finanças de forma eficaz agora mesmo!</h2>

      <div className="top">
        <table>
          <thead>
            <tr>
              <th>Receitas</th>
              <th>Despesas</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>R$ {receitas.toFixed(2)}</td>
              <td>R$ {despesas.toFixed(2)}</td>
              <td>R$ {total.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <section className="dinheiro">
        <input 
          type="text" 
          placeholder="Descrição" 
          value={descricao}
          onChange={e => setDescricao(e.target.value)}
        />

        <input 
          className="numero" 
          type="number" 
          placeholder="0,00"
          value={valor}
          onChange={e => setValor(e.target.value)}
        />

        <select value={tipo} onChange={e => setTipo(e.target.value)}>
          <option value="receita">Receita📈</option>
          <option value="despesa">Despesa📉</option>
        </select>

        <button onClick={add}>Adicionar</button>
      </section>

      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Valor</th>
            <th>Tipo</th>
          </tr>
        </thead>
        <tbody>
          {lista.map((item, index) => (
            <tr key={index}>
              <td>{item.descricao}</td>
              <td>R$ {item.valor.toFixed(2)}</td>
              <td>{item.tipo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);
