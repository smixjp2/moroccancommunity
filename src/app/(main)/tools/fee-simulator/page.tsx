import FeeSimulator from "../fee-simulator";

export default function FeeSimulatorPage() {
  return (
    <div className="container py-12 md:py-16">
       <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="font-headline text-4xl font-bold md:text-5xl">Simulateur d'Impact des Frais</h1>
        <p className="mt-4 text-muted-foreground md:text-lg">
            Voyez comment les frais bancaires et les commissions affectent vos rendements d'investissement dans le temps.
        </p>
      </div>
      <FeeSimulator />
    </div>
  );
}
