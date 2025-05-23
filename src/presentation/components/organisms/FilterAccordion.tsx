import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/presentation/components/ui/accordion";
import { Button } from "../ui/button";
import { CustomDateRange } from "./CustomDateRange";
import { CustomSelect } from "../molecules";
import { ReactNode } from "react";

interface IFilterAccordion {
  search(formData: FormData): void;
  selectCategory?: ReactNode;
  selectProducts?: ReactNode;
}

export const FilterAccordion: React.FC<IFilterAccordion> = ({
  search,
  selectCategory,
  selectProducts
}) => {  
  return (
    <form action={search}>
      <Accordion type="single" defaultValue="item-1" collapsible className="w-full border-b-2 border-neutral-300 mb-4">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-xl [&>svg]:w-6 [&>svg]:h-6 uppercase cursor-pointer">Filters</AccordionTrigger>
          <AccordionContent className="grid md:grid-cols-3 grid-cols-1 gap-4">
              <CustomDateRange name="daterange" />
              <CustomSelect name="category" label="Categories">
                {selectCategory}
              </CustomSelect>
              <CustomSelect name="product" label="Products">
                {selectProducts}
              </CustomSelect>
              <Button data-testid="clear-filters-button" className="uppercase cursor-pointer">Clear</Button>
              <Button type="submit" data-testid="filter-button" className="uppercase cursor-pointer">Filter</Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </form>
  );
}