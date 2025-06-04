const REGISTER_URL = "https://mrtimi-api.onrender.com/api/register";

document.getElementById("register-form").addEventListener("submit", async e => {
  e.preventDefault();

  const username = document.getElementById("new-username").value;
  const password = document.getElementById("new-password").value;
  const email = document.getElementById("new-email").value;
  const msg = document.getElementById("register-message");

  try {
    const res = await fetch(REGISTER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, email })
    });

    const result = await res.json();

    if (result.success) {
      msg.style.color = "green";
      msg.textContent = "Conta criada com sucesso! Redirecionando...";
      setTimeout(() => {
        window.location.href = "index.html";
      }, 2000);
    } else {
      msg.style.color = "red";
      msg.textContent = result.message || "Erro ao registrar.";
    }
  } catch (err) {
    msg.style.color = "red";
    msg.textContent = "Erro ao conectar com a API.";
    console.error(err);
  }
});
