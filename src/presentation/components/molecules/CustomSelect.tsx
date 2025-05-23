import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel } from "@/presentation/components/ui/select";
import { ReactNode, useState } from "react";

interface ICustomSelect {
  name: string;
  label: string;
  children: ReactNode;
}

export const CustomSelect: React.FC<ICustomSelect> = ({
  name,
  label,
  children
}) => {
  const [value, setValue] = useState("");

  return (
    <>
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger className="w-full cursor-pointer" data-testid={`select-${name}-trigger`}>
          <SelectValue data-testid={`select-${name}-placeholder`} placeholder={`Select a ${name}`} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{label}</SelectLabel>
            {children}
          </SelectGroup>
        </SelectContent>
      </Select>
      <input type="hidden" name={name} value={value}/>
    </>
  )
}