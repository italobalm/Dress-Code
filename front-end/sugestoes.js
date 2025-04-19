const eventoSelect = document.getElementById('eventoSelect');
const generoSelect = document.getElementById('generoSelect');

eventoSelect.addEventListener('change', buscarSugestoes);
generoSelect.addEventListener('change', buscarSugestoes);

async function buscarSugestoes() {
  const evento = eventoSelect.value;
  const genero = generoSelect.value;
  const container = document.getElementById('resultados');
  container.innerHTML = '';

  if (!evento || !genero) return;

  try {
    const resposta = await fetch(`http://localhost:3000/api/sugestoes/${evento}`);
    const dados = await resposta.json();

    const sugestoesFiltradas =
      genero === 'outro'
        ? dados.sugestoes
        : dados.sugestoes.filter(roupa => roupa.genero === genero);

    if (sugestoesFiltradas.length === 0) {
      container.innerHTML = `<p class="text-center text-muted">Nenhuma sugestão encontrada.</p>`;
      return;
    }

    sugestoesFiltradas.forEach(roupa => {
      const card = `
        <div class="col-md-4 col-sm-6">
          <div class="card h-100 shadow-sm border-0">
            <img src="${roupa.imagem}" class="card-img-top" alt="${roupa.tipo}" style="object-fit: cover; height: 300px;">
            <div class="card-body d-flex flex-column justify-content-between">
              <h5 class="card-title text-capitalize">${roupa.tipo}</h5>
            </div>
          </div>
        </div>
      `;
      container.innerHTML += card;
    });

  } catch (erro) {
    container.innerHTML = `<p class="text-danger text-center">Erro ao carregar sugestões.</p>`;
    console.error('Erro ao buscar sugestões:', erro);
  }
}
