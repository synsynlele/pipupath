export function getWeekKey(){

  const now = new Date();

  const firstJan = new Date(now.getFullYear(),0,1);

  const days = Math.floor(
    (now - firstJan) / (24 * 60 * 60 * 1000)
  );

  const week = Math.ceil((days + firstJan.getDay() + 1) / 7);

  return `${now.getFullYear()}-W${week}`;
}

export function getImprovementScore(history){

  if(!history || history.length < 2){
    return "Stable ⚖️";
  }

  const latest = history[history.length - 1];
  const previous = history[history.length - 2];

  if(latest > previous){
    return "Improving 📈";
  }

  if(latest < previous){
    return "Declining ⚠️";
  }

  return "Stable ⚖️";
}