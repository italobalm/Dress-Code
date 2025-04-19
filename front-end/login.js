document.getElementById("form-login").addEventListener("submit", async (event) => {
  event.preventDefault();

  const inputs = document.querySelectorAll("#form-login input");
  const email = inputs[0].value.trim();
  const senha = inputs[1].value;

  if (!email || !senha) {
    alert("Preencha todos os campos.");
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha })
    });

    const data = await response.json();

    if (response.ok && data.success) {
      window.location.href = "sugestaoCores.html"; 
    } else {
      alert(data.mensagem || "E-mail ou senha incorretos.");
    }
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    alert("Erro ao conectar com o servidor.");
  }
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js').then(reg => {
      console.log("✅ Service Worker registrado!", reg.scope);
    }).catch(err => {
      console.error("❌ Erro ao registrar Service Worker:", err);
    });
  });
}
