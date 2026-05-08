import { getImprovementScore } from "@/lib/helpers";

export function calculateRiskScore({
  history,
  streak,
  weeklyMission
}){

  let score = 0;

  const trend = getImprovementScore(history);

  if(trend === "Declining ⚠️") score += 40;
  if(trend === "Stable ⚖️") score += 10;

  if(streak === 0) score += 30;
  if(streak <= 2) score += 15;

  if(!weeklyMission || !weeklyMission.solve) score += 20;

  return score;
}

export function getEscalationLevel({
  history,
  streak,
  weeklyMission
}){

  const risk = calculateRiskScore({
    history,
    streak,
    weeklyMission
  });

  if(risk >= 80) return 4;
  if(risk >= 60) return 3;
  if(risk >= 40) return 2;

  return 1;
}

export function shouldTriggerNortnspoil({
  history,
  streak,
  weeklyMission
}){

  const trend = getImprovementScore(history);

  if(trend === "Declining ⚠️"){
    return {
      trigger: "declining_performance",
      message: "You are slipping. Intervene now."
    };
  }

  if(streak === 0){
    return {
      trigger: "no_momentum",
      message: "You are idle. Restart immediately."
    };
  }

  if(weeklyMission && !weeklyMission.solve){
    return {
      trigger: "no_active_direction",
      message: "You are drifting. Get a mission."
    };
  }

  return null;
}