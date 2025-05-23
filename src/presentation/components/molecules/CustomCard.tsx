import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface ICustomCard{
  title: string;
  children: ReactNode;
}

export const CustomCard: React.FC<ICustomCard> = ({ 
  title,
  children
}) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-xl uppercase">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      {children}
    </CardContent>
  </Card>
)