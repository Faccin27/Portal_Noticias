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

  function updateAdminStatus(id, isAdmin) {
    const newRole = isAdmin ? 'admin' : 'user';
    
    fetch(`usuarios/update/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role: newRole }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Falha na atualização do status de admin');
        }
        window.location.reload();
        return response.json();
    })
    .then(data => {
        console.log('Status de admin atualizado com sucesso:', data);
        // Aqui você pode adicionar código para atualizar a interface do usuário, se necessário
    })
    .catch(error => {
        console.error('Erro ao atualizar status de admin:', error);
        // Reverta o estado da checkbox em caso de erro
        const checkbox = document.querySelector(`input[type="checkbox"][onchange*="updateAdminStatus(${id},"]`);
        if (checkbox) {
            checkbox.checked = !isAdmin;
        }
        alert('Falha ao atualizar o status de admin. Por favor, tente novamente.');
    });
}