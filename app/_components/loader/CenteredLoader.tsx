import { Center, Loader, type CenterProps } from "@mantine/core";

export default function CenteredLoader({ h = "100%" }: Pick<CenterProps, "h">) {
  return (
    <Center h={h}>
      <Loader />
    </Center>
  );
}
