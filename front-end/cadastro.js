document.getElementById("form-cadastro").addEventListener("submit", async (event) => {
  event.preventDefault();

  const inputs = document.querySelectorAll("#form-cadastro input");
  const nome = inputs[0].value.trim();
  const sobrenome = inputs[1].value.trim();
  const email = inputs[2].value.trim();
  const nascimento = inputs[3].value.trim();
  const senha = inputs[4].value;
  const confirmar = inputs[5].value;

  if (!nome || !sobrenome || !email || !nascimento || !senha || !confirmar) {
    alert("Preencha todos os campos.");
    return;
  }

  if (senha !== confirmar) {
    alert("As senhas não coincidem!");
    return;
  }

  try {
    const response = await fetch("https://dress-code-backend.onrender.com/cadastro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, sobrenome, email, nascimento, senha })
    });

    const resultado = await response.json();

    if (response.ok && resultado.success) {
      alert("Cadastro realizado com sucesso!");
      window.location.href = "index.html"; 
    } else {
      alert(resultado.mensagem || "Erro ao cadastrar.");
    }
  } catch (error) {
    console.error("Erro de rede:", error);
    alert("Erro ao conectar com o servidor.");
  }
});
