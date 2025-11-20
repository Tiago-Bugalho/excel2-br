import React, { useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { tids } from "tids";
import "./style.css";

export default function App() {
  const descricao = useRef(null);
  const valor = useRef(null);
  const tipo = useRef(null);

  const [itens, setItens] = useState([]);

  function add() {
    const nome = descricao.current.value;
    const n = Number(valor.current.value);
    const t = tipo.current.value;

    if (!nome.trim() || !n || n <= 0) return;

    setItens(i => [...i, { nome, valor: n, tipo: t }]);
  }

  const receitas = itens.filter(i => i.tipo === "receita").reduce((a, b) => a + b.valor, 0);
  const despesas = itens.filter(i => i.tipo === "despesa").reduce((a, b) => a + b.valor, 0);
  const total = receitas - despesas;

  return (
    <div>
      <img className="excel2" src="img/excel2.png" alt="" />

      <h1>Excel 2</h1>
      <h2 className="first">Administre suas finanças de forma eficaz agora mesmo!</h2>

      <section className="dinheiro">
        <input ref={descricao} type="text" placeholder="Descrição" />
        <input ref={valor} className="numero" type="number" placeholder="0,00" />

        <h1></h1>

        <select ref={tipo}>
          <option value="receita">Receita📈</option>
          <option value="despesa">Despesa📉</option>
        </select>

        <h1></h1>

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
          {itens.map((i, index) => (
            <tr key={index}>
              <td>{i.nome}</td>
              <td>R$ {i.valor.toFixed(2)}</td>
              <td>{i.tipo}</td>
            </tr>
          ))}

          <tr>
            <td><strong>Receitas</strong></td>
            <td colSpan="2">R$ {receitas.toFixed(2)}</td>
          </tr>
          <tr>
            <td><strong>Despesas</strong></td>
            <td colSpan="2">R$ {despesas.toFixed(2)}</td>
          </tr>
          <tr>
            <td><strong>Total</strong></td>
            <td colSpan="2">R$ {total.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);
