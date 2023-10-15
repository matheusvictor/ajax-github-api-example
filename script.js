$(document).ready(function () {

    $("#submitButton").click(function() {

        var username = getUsername();

        if (isUsernameBlank(username)) {
            alert("Por favor, insira um nome de usuário do GitHub.");
            return;
        }

        $.ajax({
            url: "https://api.github.com/users/" + username,
            method: 'GET',
            statusCode: {
                404: function() {
                    displayError("Usuário não encontrado no GitHub.");
                },
                403: function() {
                    displayError("Limite de requisições atingido. Tente novamente mais tarde.");
                },
                500: function() {
                    displayError("Erro interno do servidor. Tente novamente mais tarde.");
                }
            },
            success: function(response) {
                console.log(response);
                displayUserInfo(response);
            },
            error: function(error) {
                console.log(error);
                displayError("Erro ao buscar informações do usuário do GitHub.");
            },
        });
        
    });

});

function getUsername() {
    return $("#username").val();
}

function isUsernameBlank(username) {
    return username === '';
}

function displayUserInfo(user) {
    var userInfoString = `
        <p><strong>Login:</strong> ${user.login}</p>
        <p><strong>Nome:</strong> ${user.name || 'Não informado'}</p>
        <p><strong>Seguidores:</strong> ${user.followers}</p>
        <p><strong>Repositórios públicos:</strong> ${user.public_repos}</p>
        <p><strong>Biografia:</strong> ${user.bio || 'Não informado'}</p>
    `;

    $("#userInfo").html(userInfoString);
}

function displayError(message) {
    $("#userInfo").html(`<p style="color: red;">${message}</p>`);
}
