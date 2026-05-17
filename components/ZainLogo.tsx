import Image from "next/image";

export function ZainLogo() {
  return (
    <div className="brand-mark" aria-label="Zain Iraq">
      <Image src="/brand/zain-logo.png" width={111} height={30} alt="Zain" priority />
    </div>
  );
}
