/*----------------------MENU----------------------*/
const btnPlay = document.getElementById('btnPlay');
if (btnPlay) {
    btnPlay.addEventListener('click', () => {
        location.href = 'fase1.html';
    });
}

const btnRegras = document.getElementById('btnRegras');
if (btnRegras) {
    btnRegras.addEventListener('click', () => {
        location.href = 'regras.html';
    });
}

const btnVoltarRegras = document.getElementById('btnVRegras');
if (btnVoltarRegras) {
    btnVoltarRegras.addEventListener('click', () => {
        location.href = 'index.html';
    });
}

/*----------------------QUIZ----------------------*/
export function iniciarQuiz(perguntas, proximaFase = null, isUltimaFase = false) {
    let perguntaAtual = 0;
    let pontuacao = 0;

    function atualizarPontuacao() {
        const pontuacaoSpan = document.getElementById('pontuacao');
        if (pontuacaoSpan) pontuacaoSpan.textContent = pontuacao;
    }

    function mostrarPergunta() {
        const perguntaObj = perguntas[perguntaAtual];
        const enunciado = document.getElementById('enunciado');
        const alternativasDiv = document.getElementById('alternativas');

        if (!perguntaObj) {
            if (pontuacao >= 45) {
                if (isUltimaFase) {
                    enunciado.textContent = `Parabéns! Você concluiu o quiz!`;
                    alternativasDiv.innerHTML = "";
                } else {
                    enunciado.textContent = "Parabéns! Você terminou todas as perguntas e passou de fase. Aguarde para iniciar a próxima fase.";
                    alternativasDiv.innerHTML = "";
                    setTimeout(() => {
                        window.location.href = proximaFase;
                    }, 3000);
                }
            } else {
                enunciado.textContent = `Você fez ${pontuacao} pontos. É necessário pelo menos 45 pontos para passar de fase. Tente novamente!`;
                alternativasDiv.innerHTML = "";
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            }
            atualizarPontuacao();
            return;
        }

        enunciado.innerHTML = `<span class="numeroBolha">${perguntaAtual + 1}</span> ${perguntaObj.pergunta}`;
        alternativasDiv.innerHTML = "";

        perguntaObj.alternativas.forEach(alternativa => {
            const btn = document.createElement('button');
            btn.textContent = alternativa;
            btn.className = "btnAlternativa";
            btn.onclick = () => {
                if (alternativa === perguntaObj.correta) {
                    btn.style.backgroundColor = "#ed7d3a";
                    btn.style.color = "#ece2d0";
                    btn.style.border = "none";
                    pontuacao += 10;
                    atualizarPontuacao();
                    setTimeout(() => {
                        perguntaAtual++;
                        mostrarPergunta();
                    }, 700);
                } else {
                    btn.style.backgroundColor = "#92140c";
                    btn.style.color = "#ece2d0";
                    btn.disabled = true;
                    pontuacao -= 5;
                    if (pontuacao < 0) pontuacao = 0;
                    atualizarPontuacao();
                }
            };
            alternativasDiv.appendChild(btn);
        });
        atualizarPontuacao();
    }

    if (document.getElementById('enunciado')) {
        mostrarPergunta();
    }
}
