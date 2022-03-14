import DashboardIcon from './icons/dashboard.png';
import DashboardIconActive from './icons/dashboard_active.png';


const routes = [
    {
      label: "Dashboard",
      path: "/",
      icon: DashboardIcon,
      activeIcon: DashboardIconActive,
      component: Dashboard,
    },
];

export default routes;
