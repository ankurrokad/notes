// app/login/page.tsx
"use client";

import { Form, Input } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const handleSubmit = async (token: string) => {
    const res = await fetch("/api/authenticate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
    if (res.ok) {
      router.push("/");
    } else {
      setError("Invalid token");
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center">
      <div className="flex flex-col gap-2 justify-center items-center">
        <Form onFinish={handleSubmit} className="flex p-4">
          <Form.Item validateStatus={error ? "error" : ""} help={error}>
            <Input.OTP
              type="number"
              onChange={handleSubmit}
              length={6}
              className="!rounded-xl"
              rootClassName="!rounded-xl"
              size="large"
            />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
