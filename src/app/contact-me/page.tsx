'use client'

import { useState } from "react";
import CodeBlock from '../../components/code-block/CodeBlock'

import './page.scss'

export default function ContactMe() {

  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  let [inputMessage, setInputMessage] = useState("");
  var limitePorLinha = 34;
  var linhas = [];
  var linhaAtual = "";
  var palavras = inputMessage.split(" ");

  let date = new Date().toLocaleDateString();

  var palavras = inputMessage.split(" ");
  for (var i = 0; i < palavras.length; i++) {
    var palavra = palavras[i];

    if (linhaAtual.length + (linhaAtual.length > 0 ? 1 : 0) + palavra.length <= limitePorLinha) {
      if (linhaAtual.length > 0) {
        linhaAtual += " ";
      }
      linhaAtual += palavra;
    } else {
      linhas.push(linhaAtual);
      linhaAtual = palavra;
    }
  }
  
  if (linhaAtual.length > 0) {
    linhas.push(linhaAtual);
  }

  inputMessage = linhas.join("\n" + "                  ");

  const meuCodigo = `
    const button = document.querySelector('#sendBtn');

    const message = {
    	name: "${inputName}",
    	email: "${inputEmail}",
    	message: "${inputMessage}",
    	date: "${date}"
    }

    button.addEventListener('click', () => {
    	form.send(message);
    })
`


  return (
    <main className="contact_page">
      <section className="contact_form">
        <div className="form">
          <label htmlFor="inputName">_name: </label><br></br>
          <input className="inputName" type="text" onChange={(e) => setInputName(e.target.value)} /><br></br>
          <label htmlFor="inputEmail">_email: </label><br></br>
          <input className="inputEmail" type="text" onChange={(e) => setInputEmail(e.target.value)} /><br></br>
          <label htmlFor="inputMessage">_message: </label><br></br>
          <textarea className="inputMessage" onChange={(e) => setInputMessage(e.target.value)} /><br></br>
          <button id="sendBtn">submit-message</button>
        </div>
      </section>
      <div className="contact_stroke"></div>
      <section className="contact_code">
        <CodeBlock language='language-js'>
          {meuCodigo}
        </CodeBlock>
      </section>
    </main>
  )
}