function deleteProduct(id) {
    if (window.confirm("Voce tem certeza que deseja deletar essa proposta de emprego?")) {
      fetch(`/empregos/${id}`, {
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
  