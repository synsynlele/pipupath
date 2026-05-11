export async function callAI(prompt){

  const controller = new AbortController();

  const timer = setTimeout(
    () => controller.abort(),
    25000
  );

  try {

    const res = await fetch("/api/path", {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        prompt
      }),

      signal: controller.signal

    });

    clearTimeout(timer);

    if(!res.ok){

      throw new Error("API request failed");

    }

    return await res.json();

  } finally {

    clearTimeout(timer);

  }

}