let signInButton = document.querySelector(".signIn");
let email = document.getElementById("email");
let pwd = document.getElementById("password");

signInButton.addEventListener("click", signInFn());

async function signInFn(){
    let user = {
        email: email.value,
        password: pwd.value,
    };

    console.log(user);

    let request = await fetch("/api/v1/signin", {
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

