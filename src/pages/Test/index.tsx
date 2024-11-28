import Flex from "@/components/atoms/Flex";
import Typography from "@/components/atoms/Typography";
import { useState } from "react";

export default function Test() {
  const [k, setK] = useState<number>(0)

  const [r, setR] = useState<number>(0)
  const [t, setT] = useState<number>(0)
  const [d, setD] = useState<number>(1)

  return (
    <div className="p-3">
      <Flex className="items-center gap-1">
        <Typography>k</Typography>
        <input type="text" value={k} onChange={(e) => setK(Number(e.target.value))} className="border"/>
      </Flex>
      <Flex className="items-center gap-1">
        <Typography>r</Typography>
        <input type="text" value={r} onChange={(e) => setR(Number(e.target.value))} className="border"/>
      </Flex>
      <Flex className="items-center gap-1">
        <Typography>d</Typography>
        <input type="text" className="border" value={d} onChange={(e) => setD(Number(e.target.value))}/>
      </Flex>
      <Flex className="items-center gap-1">
        <Typography>t</Typography>
        <input type="text" className="border" value={t} onChange={(e) => setT(Number(e.target.value))}/>
      </Flex>


      <div className="mt-3">
        { k* r * t / d}
      </div>
    </div>
  )
}
