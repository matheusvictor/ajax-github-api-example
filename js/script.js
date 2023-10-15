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
                $("#userAvatar").attr('src', response.avatar_url);
    $("#userAvatar").show();
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
    `;
    
    $("#userInfo").html(userInfoString);
}

function displayError(message) {
    $("#userInfo").html(`<p style="color: red;">${message}</p>`);
    $("#userAvatar").hide();
}

function getMockResponse() {
    return {
        "login": "octocat",
        "id": 1,
        "node_id": "MDQ6VXNlcjE=",
        "avatar_url": "https://octodex.github.com/images/privateinvestocat.jpg",
        "gravatar_id": "",
        "url": "https://api.github.com/users/octocat",
        "html_url": "https://github.com/octocat",
        "followers_url": "https://api.github.com/users/octocat/followers",
        "following_url": "https://api.github.com/users/octocat/following{/other_user}",
        "gists_url": "https://api.github.com/users/octocat/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/octocat/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/octocat/subscriptions",
        "organizations_url": "https://api.github.com/users/octocat/orgs",
        "repos_url": "https://api.github.com/users/octocat/repos",
        "events_url": "https://api.github.com/users/octocat/events{/privacy}",
        "received_events_url": "https://api.github.com/users/octocat/received_events",
        "type": "User",
        "site_admin": false,
        "name": "monalisa octocat",
        "company": "GitHub",
        "blog": "https://github.com/blog",
        "location": "San Francisco",
        "email": "octocat@github.com",
        "hireable": false,
        "bio": "There once was...",
        "twitter_username": "monatheoctocat",
        "public_repos": 2,
        "public_gists": 1,
        "followers": 20,
        "following": 0,
        "created_at": "2008-01-14T04:33:35Z",
        "updated_at": "2008-01-14T04:33:35Z",
        "private_gists": 81,
        "total_private_repos": 100,
        "owned_private_repos": 100,
        "disk_usage": 10000,
        "collaborators": 8,
        "two_factor_authentication": true,
        "plan": {
          "name": "Medium",
          "space": 400,
          "private_repos": 20,
          "collaborators": 0
        }
    }

    /*
    r = {
        "login": "matheusvictor",
        "id": 12521391,
        "node_id": "MDQ6VXNlcjEyNTIxMzkx",
        "avatar_url": "https://avatars.githubusercontent.com/u/12521391?v=4",
        "gravatar_id": "",
        "url": "https://api.github.com/users/matheusvictor",
        "html_url": "https://github.com/matheusvictor",
        "followers_url": "https://api.github.com/users/matheusvictor/followers",
        "following_url": "https://api.github.com/users/matheusvictor/following{/other_user}",
        "gists_url": "https://api.github.com/users/matheusvictor/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/matheusvictor/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/matheusvictor/subscriptions",
        "organizations_url": "https://api.github.com/users/matheusvictor/orgs",
        "repos_url": "https://api.github.com/users/matheusvictor/repos",
        "events_url": "https://api.github.com/users/matheusvictor/events{/privacy}",
        "received_events_url": "https://api.github.com/users/matheusvictor/received_events",
        "type": "User",
        "site_admin": false,
        "name": "Matheus Victor",
        "company": "CI&T",
        "blog": "https://matheusvictor.github.io",
        "location": "Brazil - Salvador - Bahia",
        "email": null,
        "hireable": true,
        "bio": "Student at Universidade Federal da Bahia (UFBA). ",
        "twitter_username": null,
        "public_repos": 77,
        "public_gists": 2,
        "followers": 53,
        "following": 86,
        "created_at": "2015-05-20T01:25:13Z",
        "updated_at": "2023-10-05T17:04:21Z"
    }
    **/
}