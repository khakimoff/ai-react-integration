import { Button } from "antd";
import useWindowSize from "@rooks/use-window-size";

type ClearProps = {
  onClick: () => void;
}

export default function Clear({ onClick }: ClearProps) {
  const { innerWidth } = useWindowSize();
  const title = innerWidth as number < 640 ? "Clear" : "Clear History"

  return (
    <Button type="dashed" block onClick={onClick} danger style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
      {title}
    </Button>
  );
}

