import { Button } from "@chakra-ui/button";
import { useColorMode } from "@chakra-ui/color-mode";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

export default function ToggleColorMode() {
  // change 'color mode' text
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Button
      onClick={() => toggleColorMode()}
      pos="absolute"
      top="0"
      right="0"
      m="1rem"
    >
      {/* conditional for color mode */}
      {colorMode === "dark" ? (
        <SunIcon color="orange.400" />
      ) : (
        <MoonIcon color="blue.700" />
      )}
    </Button>
  );
}
