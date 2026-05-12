export async function generateIdentityReport(
  archetype
) {

  const prompts = {

    SOLVER: {
      title:
        "You naturally move toward difficult problems.",
      strength:
        "You create value by resolving friction.",
      warning:
        "Overthinking can delay execution.",
      leverage:
        "Build expertise people depend on.",
      mission:
        "Solve one real problem for someone this week.",
    },

    MAKER: {
      title:
        "You are wired to build useful things.",
      strength:
        "You learn best through creation.",
      warning:
        "Perfectionism can slow momentum.",
      leverage:
        "Ship small useful projects consistently.",
      mission:
        "Create and publish one useful thing.",
    },

    VOICE: {
      title:
        "Your words and presence influence people.",
      strength:
        "You move ideas emotionally.",
      warning:
        "Attention without substance becomes weakness.",
      leverage:
        "Learn persuasion and communication deeply.",
      mission:
        "Teach one idea publicly this week.",
    },

    MERCHANT: {
      title:
        "You naturally recognize opportunity and value.",
      strength:
        "You understand exchange instinctively.",
      warning:
        "Chasing money without skill creates fragility.",
      leverage:
        "Develop rare and useful capabilities.",
      mission:
        "Make your first small sale or offer.",
    },

    ARCHITECT: {
      title:
        "You think in systems and long-term leverage.",
      strength:
        "You organize complexity clearly.",
      warning:
        "Planning without execution becomes stagnation.",
      leverage:
        "Build systems others can operate.",
      mission:
        "Design a repeatable system this week.",
    },

    HEALER: {
      title:
        "You are motivated by reducing human pain.",
      strength:
        "People trust your care and insight.",
      warning:
        "Neglecting yourself creates burnout.",
      leverage:
        "Develop skills that create measurable impact.",
      mission:
        "Help someone solve a meaningful problem.",
    },

    CONNECTOR: {
      title:
        "You create leverage through relationships.",
      strength:
        "You align people and opportunities naturally.",
      warning:
        "Too much social energy can reduce focus.",
      leverage:
        "Build strong strategic networks.",
      mission:
        "Create one valuable introduction this week.",
    },

    PERFORMER: {
      title:
        "You shape emotion, energy and culture.",
      strength:
        "You create memorable experiences.",
      warning:
        "Validation seeking can weaken discipline.",
      leverage:
        "Turn creativity into consistent output.",
      mission:
        "Publish one creative piece publicly.",
    },
  };

  return prompts[archetype];
}