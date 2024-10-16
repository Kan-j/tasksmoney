import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"

const FAQAccordion = ({ faqData }:any) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      {faqData.map((item:any, index:any) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger className="text-lg font-semibold">
            {item.title}
          </AccordionTrigger>
          <AccordionContent className="text-gray-700">
            {item.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FAQAccordion;
