console.log("Script all-news carregado!");

function deleteProduct(id) {
  if (window.confirm("Voce tem certeza que deseja deletar essa noticia?")) {
    fetch(`/noticias/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        location.reload();
      })
      .catch((error) => console.error("Erro:", error));
  }
}
