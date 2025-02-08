document.getElementById("checkGrammar").addEventListener("click", async () => {
    let text = document.getElementById("textInput").value;
    if (!text) return alert("Enter some text!");

    document.getElementById("output").innerText = "Checking grammar...";

    try {
        const response = await fetch("https://api.languagetool.org/v2/check", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                text: text,
                language: "en-US"
            })
        });

        const data = await response.json();
        if (data.matches.length === 0) {
            document.getElementById("output").innerText = "✅ No grammar mistakes!";
        } else {
            let errors = data.matches.map(match => `⚠️ ${match.message}`).join("\n");
            document.getElementById("output").innerText = `Grammar Issues Found:\n${errors}`;
        }
    } catch (error) {
        document.getElementById("output").innerText = `⚠️ Error: ${error.message}`;
    }
});

document.getElementById("rewriteText").addEventListener("click", async () => {
    let text = document.getElementById("textInput").value;
    if (!text) return alert("Enter some text!");

    document.getElementById("output").innerText = "Rewriting text...";

    try {
        const response = await fetch("https://api.languagetool.org/v2/check", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                text: text,
                language: "en-US"
            })
        });

        const data = await response.json();
        if (data.matches.length === 0) {
            document.getElementById("output").innerText = "✅ No grammar mistakes!";
        } else {
            let correctedText = text;
            data.matches.forEach(match => {
                if (match.replacements.length > 0) {
                    correctedText = correctedText.replace(match.context.text, match.replacements[0].value);
                }
            });
            document.getElementById("output").innerText = `✅ Rewritten: ${correctedText}`;
        }
    } catch (error) {
        document.getElementById("output").innerText = `⚠️ Error: ${error.message}`;
    }
});
