export function matchBuilders(
  currentBuilder,
  builders
) {

  if (!currentBuilder)
    return [];

  const scoredBuilders =
    builders.map((builder) => {

      let score = 0;

      // SKILLS MATCH

      const currentSkills =
        currentBuilder.skills || [];

      const builderSkills =
        builder.skills || [];

      currentSkills.forEach(
        (skill) => {

          if (
            builderSkills.includes(
              skill
            )
          ) {

            score += 2;
          }
        }
      );

      // FOCUS MATCH

      if (

        currentBuilder.current_focus &&
        builder.current_focus &&

        currentBuilder
          .current_focus
          .toLowerCase()

          .includes(

            builder
              .current_focus
              .toLowerCase()
          )

      ) {

        score += 2;
      }

      // MOMENTUM MATCH

      if (

        currentBuilder
          .momentum_state ===

        builder
          .momentum_state

      ) {

        score += 1;
      }

      // COLLAB MATCH

      if (

        currentBuilder
          .collaboration_interest &&

        builder
          .collaboration_interest

      ) {

        score += 3;
      }

      return {

        ...builder,

        matchScore:
          score,
      };
    });

  return scoredBuilders

    .filter(
      (builder) =>

        builder.id !==
          currentBuilder.id &&

        builder.matchScore > 0
    )

    .sort(
      (a, b) =>

        b.matchScore -
        a.matchScore
    )

    .slice(0, 6);
}