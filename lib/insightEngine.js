export async function generateAdaptiveInsight(
  payload
) {

  try {

    const response =
      await fetch(

        "/api/insight",

        {

          method: "POST",

          headers: {

            "Content-Type":
              "application/json",
          },

          body:
            JSON.stringify(
              payload
            ),
        }
      );

    const data =
      await response.json();

    return (
      data?.insight ||

      "Your behavioral environment is stabilizing."
    );

  }

  catch (error) {

    console.error(error);

    return "Your behavioral environment is stabilizing.";
  }
}