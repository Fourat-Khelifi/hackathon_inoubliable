async function test() {
    const response = await fetch("https://d1c15ecb7ab1.ngrok.app/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: "User message here" }),
    });

    const data = await response.json();
    console.log(data);
}

test();
