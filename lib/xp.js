 function getLevelFromXP(xp){
  if (xp >= 1000) return "Founder Ready";
  if (xp >= 700) return "Builder";
  if (xp >= 300) return "Problem Solver";
  if (xp >= 100) return "Learner";
  return "Explorer";
}

function getNextLevel(level){
  if(level === "Explorer") return "Learner";
  if(level === "Learner") return "Problem Solver";
  if(level === "Problem Solver") return "Builder";
  if(level === "Builder") return "Founder Ready";
  return "Max Level";
}

function getNextXP(level){
  if(level === "Explorer") return 100;
  if(level === "Learner") return 300;
  if(level === "Problem Solver") return 700;
  if(level === "Builder") return 1000;
  return 1000;
}

function getLevelFloor(level){
  if(level === "Explorer") return 0;
  if(level === "Learner") return 100;
  if(level === "Problem Solver") return 300;
  if(level === "Builder") return 700;
  if(level === "Founder Ready") return 1000;
  return 0;
}