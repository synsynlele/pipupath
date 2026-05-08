function getWeekKey() {
  const d = new Date();
  const year = d.getFullYear();

  const firstDay = new Date(year, 0, 1);
  const days = Math.floor((d - firstDay) / 86400000);

  const week = Math.ceil((days + firstDay.getDay() + 1) / 7);

  return `${year}-W${week}`;
}

function getImprovementScore(history){

 if(!history || history.length < 4) return "No Data Yet";

 const last3 = history.slice(0,3);

 const avg =
   last3.reduce((sum,x)=>sum + (x.readiness_score || 0),0)
   / last3.length;

 const prev3 = history.slice(3,6);

 if(prev3.length === 0) return "No Data Yet";

 const prevAvg =
   prev3.reduce((sum,x)=>sum + (x.readiness_score || 0),0)
   / prev3.length;

 const diff = avg - prevAvg;

 if(diff > 20) return "Rapid Growth 🚀";
 if(diff > 10) return "Strong Progress 📈";
 if(diff > 0) return "Improving 👍";
 if(diff === 0) return "Stable ⚖️";
 return "Declining ⚠️";
}