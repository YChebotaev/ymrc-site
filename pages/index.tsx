import { useState } from "react";
import { useRouter } from 'next/router'
import { PincodeInput } from "../components";

export default function Home() {
  const router = useRouter()
  const [pincode, setPincode] = useState<string[]>([]);

  const completeHandler = (pincode: string[]) => {
    router.push(`/${pincode.join('')}`)
  }

  return (
    <main
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: "100vw",
        minHeight: "100vh",
      }}
    >
      <div>
        <PincodeInput
          length={8}
          value={pincode}
          inputStyle={{ fontSize: 18, width: "2rem", height: '2rem', textAlign: "center" }}
          onChange={setPincode}
          onComplete={completeHandler}
        />
      </div>
    </main>
  );
}
