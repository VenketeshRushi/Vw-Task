import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";

// This Accordion Section For All Orders
export const OrderSection = ({ date, time, children }) => {
  return (
    <AccordionItem mt={6}>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            Order on {date} at {time}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>{children}</AccordionPanel>
    </AccordionItem>
  );
};
