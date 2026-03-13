import Image from "next/image";

export function Disclaimer() {
  return (
    <section className="py-14">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <div className="glass-panel rounded-3xl p-8 md:p-10">
          <div className="flex items-center gap-3 mb-6">
            <Image src="/logo.png?v=2" alt="Softtooles Logo" width={150} height={150} />
            <h1 className="text-3xl font-bold">Disclaimer</h1>
          </div>
          <p className="text-muted-foreground leading-7 mb-4">
            While we strive for accuracy, tool output may not be error-free in all edge cases.
          </p>
          <p className="text-muted-foreground leading-7 mb-4">
            Always validate critical output before using it in production or legal workflows.
          </p>
          <p className="text-muted-foreground leading-7">
            Softtooles is not liable for losses resulting from tool usage decisions.
          </p>
        </div>
      </div>
    </section>
  );
}
