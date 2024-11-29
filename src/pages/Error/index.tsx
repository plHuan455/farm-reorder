import Flex from "@/components/atoms/Flex";
import Typography from "@/components/atoms/Typography";

export default function Error() {
  return (
    <Flex center className="h-full container">
      <Typography className="font-semibold text-center leading-6">Network error, please close the app and try again.</Typography>
    </Flex>
  )
}
