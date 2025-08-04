import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Box, Flex } from "@radix-ui/themes";

export default function Page() {

  return (

    <Flex direction={"column"} gap={"4"}>
      <Header />
      <Box p="4" className="text-center">
        <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSeFbI-Bu-RsuYg1SP3_-L7wo5OOIfp5XR7H4E7jYgullaCm7g/viewform?embedded=true" className="w-full h-full" >Loading…</iframe>
      </Box>
      <Footer />
    </Flex>

  )
}