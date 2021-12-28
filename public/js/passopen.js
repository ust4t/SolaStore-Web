const ikon = document.querySelector("svg");
const pass = document.querySelector("#password");
        ikon.addEventListener("click", function () {
                this.classList.toggle("close");
                setTimeout(() => {
                    pass.type = pass.type === "password" ? "text" : "password";
                }, 125);
            });
