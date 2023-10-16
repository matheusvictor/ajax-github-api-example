$(document).ready(function () {

    $("#submitButton").click(function() {

        var username = getUsername();

        if (isUsernameBlank(username)) {
            alert("Por favor, insira um nome de usuário do GitHub.");
            return;
        }
        
        const isDevelopment = window.location.hostname === 'localhost';

        // Configura a URL da API com base no ambiente
        const apiUrl = isDevelopment
            ? 'http://localhost:3000/profiles/'
            : 'https://api.github.com/users/';

        if (isDevelopment) {
            switch (username) {
                case "octocat":
                    username = 1
                    break;
                default:
                    username = 1
                    break;
            }
        }
        
        $.ajax({
            url: apiUrl + username,
            method: 'GET',
            statusCode: {
            url: apiUrl + username,
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
        <p><strong class="container_userLabelInfo">Login:</strong> ${user.login}</p>
        <p><strong class="container_userLabelInfo">Nome:</strong> ${user.name || 'Não informado'}</p>
        <p><strong class="container_userLabelInfo">Seguidores:</strong> ${user.followers}</p>
        <p><strong class="container_userLabelInfo">Repositórios públicos:</strong> ${user.public_repos}</p>
    `;

    $(".container_userAvatar").attr('src', user.avatar_url);
    $(".container_userAvatar").show();
    
    $(".container_userDetails").html(userInfoString);
}

function displayError(message) {
    $(".container_userAvatar").hide();
    $(".container_userDetails").html(`<p style="color: red; font-size: 14px; font-weight: bold;">${message}</p>`);
}
