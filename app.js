const APKEY = process.env.OPENAI_API_KEY;  

async function getCompletion(prompt) {
  try {
    const response = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${APKEY}`, 
      },
      body: JSON.stringify({
        model: "text-curie-001",  
        prompt: prompt.trim(),   
        max_tokens: 20,          
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Error HTTP! Estado: ${response.status}, Detalles: ${errorBody}`);
    }

    const data = await response.json();
    console.log("Respuesta de la API:", data);
    return data;
  } catch (error) {
    console.error("Error al obtener datos de la API:", error);
    return null;
  }
}


const promptElement = document.querySelector("#prompt");
const button = document.querySelector("#generate");
const output = document.querySelector("#output");


button.addEventListener("click", async () => {
  const userPrompt = promptElement.value;

  
  if (!userPrompt || userPrompt.trim().length === 0) {
    alert("Por favor, ingresa un prompt válido.");
    return;
  }

  
  const response = await getCompletion(userPrompt);

  
  if (response && response.choices && response.choices.length > 0) {
    output.textContent = response.choices[0].text.trim();  
  } else {
    output.textContent = "rror.";
  }
});