export async function loadPartials() {

    try {

        const header =
            document.getElementById(
                "mainHeader"
            );

        const footer =
            document.getElementById(
                "mainFooter"
            );

        if (header) {

            const headerResponse =
                await fetch(
                    "../partials/header.html"
                );

            header.innerHTML =
                await headerResponse.text();

        }

        if (footer) {

            const footerResponse =
                await fetch(
                    "../partials/footer.html"
                );

            footer.innerHTML =
                await footerResponse.text();

        }

    } catch (error) {

        console.error(
            "Error loading partials:",
            error
        );

    }

}