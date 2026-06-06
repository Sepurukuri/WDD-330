export async function loadPartials() {

    const header =
        document.getElementById("mainHeader");

    const footer =
        document.getElementById("mainFooter");

    if (header) {
        const response =
            await fetch("../partials/header.html");

        header.innerHTML =
            await response.text();
    }

    if (footer) {
        const response =
            await fetch("../partials/footer.html");

        footer.innerHTML =
            await response.text();
    }
}