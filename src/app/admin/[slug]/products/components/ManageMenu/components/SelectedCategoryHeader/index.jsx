import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Grid, List } from "lucide-react";

const SelectedCategoryHeader = ({ title, viewMode, handleViewModeChange }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">{title}</CardTitle>
            <CardDescription>Gerencie os produtos desta tabela</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => handleViewModeChange("list")}
            >
              <List size={16} />
            </Button>
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => handleViewModeChange("grid")}
            >
              <Grid size={16} />
            </Button>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default SelectedCategoryHeader;
