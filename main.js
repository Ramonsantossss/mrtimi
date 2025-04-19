const API_URL = "http://localhost:3000/api/login"; // Substitua pela sua API real

// Função para salvar o login nos cookies
function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + (days*24*60*60*1000));
  const expires = "expires=" + d.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Função para pegar valor de cookie
function getCookie(name) {
  const cname = name + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for(let c of ca) {
    while (c.charAt(0) === ' ') c = c.substring(1);
    if (c.indexOf(cname) === 0) return c.substring(cname.length, c.length);
  }
  return "";
}

// Verifica se já tem login salvo
window.onload = async () => {
  const savedUser = getCookie("username");
  const savedPass = getCookie("password");

  if (savedUser && savedPass) {
    try {
      const res = await login(savedUser, savedPass);
      if (res.success) {
        window.location.href = "/index.html"; // redireciona se sucesso
      }
    } catch (err) {
      console.log("Erro ao logar automaticamente:", err);
    }
  }
};

async function login(username, password) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  return await res.json();
}

document.getElementById("login-form").addEventListener("submit", async e => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const msg = document.getElementById("message");

  try {
    const result = await login(username, password);
    if (result.success) {
      setCookie("username", username, 7);
      setCookie("password", password, 7);
      window.location.href = "/index.html"; // redireciona se sucesso
    } else {
      msg.textContent = "Usuário ou senha incorretos.";
    }
  } catch (err) {
    msg.textContent = "Erro ao conectar com a API.";
    console.error(err);
  }
});





