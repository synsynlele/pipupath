export const QUESTIONS = [

  {
    question:
      "What naturally energizes you most?",

    options: [
      {
        text: "Solving difficult problems",
        type: "SOLVER",
      },

      {
        text: "Building things people use",
        type: "MAKER",
      },

      {
        text: "Leading or influencing people",
        type: "VOICE",
      },

      {
        text: "Creating opportunities or money",
        type: "MERCHANT",
      },
    ],
  },

  {
    question:
      "What frustrates you most?",

    options: [
      {
        text: "Inefficiency and confusion",
        type: "ARCHITECT",
      },

      {
        text: "People not reaching potential",
        type: "HEALER",
      },

      {
        text: "Lack of progress",
        type: "SOLVER",
      },

      {
        text: "Creative limitations",
        type: "PERFORMER",
      },
    ],
  },

  {
    question:
      "What kind of work feels meaningful?",

    options: [
      {
        text: "Helping people improve",
        type: "HEALER",
      },

      {
        text: "Designing systems",
        type: "ARCHITECT",
      },

      {
        text: "Building businesses",
        type: "MERCHANT",
      },

      {
        text: "Making ideas move people",
        type: "VOICE",
      },
    ],
  },

  {
    question:
      "What do people naturally rely on you for?",

    options: [
      {
        text: "Getting things done",
        type: "MAKER",
      },

      {
        text: "Solving problems",
        type: "SOLVER",
      },

      {
        text: "Connecting people",
        type: "CONNECTOR",
      },

      {
        text: "Creative expression",
        type: "PERFORMER",
      },
    ],
  },

  {
    question:
      "What future feels most exciting?",

    options: [
      {
        text: "Owning scalable systems",
        type: "ARCHITECT",
      },

      {
        text: "Building wealth through value",
        type: "MERCHANT",
      },

      {
        text: "Mastering a valuable craft",
        type: "MAKER",
      },

      {
        text: "Changing lives meaningfully",
        type: "HEALER",
      },
    ],
  },
];

export const ARCHETYPES = {

  SOLVER: {
    name: "The Solver",
    emoji: "⚡",
  },

  MAKER: {
    name: "The Maker",
    emoji: "🔨",
  },

  VOICE: {
    name: "The Voice",
    emoji: "🔥",
  },

  MERCHANT: {
    name: "The Merchant",
    emoji: "💎",
  },

  ARCHITECT: {
    name: "The Architect",
    emoji: "🏛️",
  },

  HEALER: {
    name: "The Healer",
    emoji: "🌱",
  },

  CONNECTOR: {
    name: "The Connector",
    emoji: "🌐",
  },

  PERFORMER: {
    name: "The Performer",
    emoji: "✨",
  },
};

export function calculateArchetype(
  answers
) {

  const scores = {};

  answers.forEach((type) => {

    scores[type] =
      (scores[type] || 0) + 1;
  });

  return Object.keys(scores).reduce(
    (a, b) =>
      scores[a] > scores[b]
        ? a
        : b
  );
}