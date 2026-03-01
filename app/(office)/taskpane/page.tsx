import { EnvironmentGate } from "@/components/EnvironmentGate";
import { SharedDashboard } from "@/components/SharedDashboard";

export default function TaskpanePage() {
  return (
    <EnvironmentGate>
      <SharedDashboard experience="taskpane" />
    </EnvironmentGate>
  );
}
