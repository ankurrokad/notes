"use client";
import { Button } from "antd";
import { useState } from "react";

export default function CounterPage() {
  const [count, setCount] = useState(0);
  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      <div className="p-4 flex flex-col gap-2 items-center">
        <div className="text-4xl">{count}</div>
        <div className="flex gap-2">
          <Button className="" onClick={() => setCount(count - 1)}>
            -
          </Button>
          <Button className="" onClick={() => setCount(count + 1)}>
            +
          </Button>
          <Button className="" onClick={() => setCount(0)}>
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}
