import React, { useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { tids } from "tids";
import "./style.css";

export default function App() {
  const descricao = useRef(null);
  const valor = useRef(null);
  const tipo = useRef(null);

  const [receitas, setReceitas] = useState(0);
  const [despesas, setDespesas] = useState(0);

  function add() {
    const n = Number(valor.current.value);
    const t = tipo.current.value;

    if (!n || n <= 0) return;

    if (t === "receita") setReceitas(r => r + n);
    else setDespesas(d => d + n);
  }

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

      <table className="bordaboa">
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
            <td>R$ {(receitas - despesas).toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);