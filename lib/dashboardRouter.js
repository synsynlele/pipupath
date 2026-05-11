export function getDashboardRoute(path){

  switch(path){

    case "Student":
      return "/dashboard/student";

    case "Founder":
      return "/dashboard/founder";

    case "Professional":
      return "/dashboard/professional";

    case "Creator":
      return "/dashboard/creator";

    case "School Leader":
      return "/dashboard/school";

    default:
      return "/dashboard";

  }

}