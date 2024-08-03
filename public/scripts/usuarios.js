function deleteUser(id) {
    if (window.confirm("Voce tem certeza que deseja deletar esse usuario?")) {
      fetch(`/usuarios/${id}`, {
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

  