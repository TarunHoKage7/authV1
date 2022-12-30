let signUpButton = document.querySelector(".signUp");
let name = document.getElementById("name");
let email = document.getElementById("email");
let pwd = document.getElementById("password");

signUpButton.addEventListener("click", signUpFn());

async function signUpFn(){
    let user = {
        name: name.value,
        email: email.value,
        password: pwd.value,
    };

    console.log(user);

    let request = await fetch("/api/v1/signup", {
        method: "POST",
        headers:{
            "Content-Type": "application/json",
        },
        crossDomain: true,
        body: JSON.stringify(user),
    });
    let message = await request.text();

    console.log(message);

    alert(message);
};

