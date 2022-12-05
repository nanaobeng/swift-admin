import DashboardSummary from "./SubPages/DashboardSummary";

import { getDashboardSummary } from "../../APIs/Dashboard/Dashboard";
import { dashboardSummaryProps, userTypeProps } from "../../Types/types";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [summary, setSummary] = useState<dashboardSummaryProps>();
  const getSummary = (data: userTypeProps) => {
    getDashboardSummary(data).then((res) => {
      if (res.error) {
        alert("error");
      } else {
        setSummary(res.data);
      }
    });
  };

  useEffect(() => {
    getSummary({ id: 1 });
  }, []);
  return (
    <>
      <div>Dashboard</div>
      <hr />

      <DashboardSummary
        available_properties={summary?.available_properties}
        pending_inquiries={summary?.pending_inquiries}
        pending_tasks={summary?.pending_tasks}
        matching_properties={summary?.matching_properties}
      />
      <hr />
    </>
  );
};

export default Dashboard;
