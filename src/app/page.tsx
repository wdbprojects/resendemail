import ReactHookForm from "@/components/ReactHookForm";
import { Toaster } from "@/components/ui/sonner";

export default function Home() {
  return (
    <main className="py-24">
      <div className="container">
        <h1 className="mb-16 text-center text-2xl font-medium">
          React Hook Forms
        </h1>
        <ReactHookForm />
      </div>
      <Toaster richColors position="top-right" closeButton />
    </main>
  );
}
