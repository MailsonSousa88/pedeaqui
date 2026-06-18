import { useEffect, useState } from "react";
import { StoreContactForm, type StoreSetupStep } from "../components/StoreContactForm";
import "./StoreContactFormPage.css";

const STEP_COPY: Record<StoreSetupStep, { title: string; subtitle: string }> = {
  1: {
    title: "Configure sua loja",
    subtitle: "Comece pelos dados principais que identificam sua vitrine.",
  },
  2: {
    title: "Configure sua loja",
    subtitle: "Preencha o endereço em campos separados para evitar confusão.",
  },
  3: {
    title: "Configure sua loja",
    subtitle: "Defina como e quando seus clientes podem falar com sua loja.",
  },
};

export function StoreContactPage() {
  const [step, setStep] = useState<StoreSetupStep>(1);
  const copy = STEP_COPY[step];

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [step]);

  function goToNextStep() {
    setStep((currentStep) =>
      currentStep === 3 ? currentStep : ((currentStep + 1) as StoreSetupStep),
    );
  }

  function goToPreviousStep() {
    setStep((currentStep) =>
      currentStep === 1 ? currentStep : ((currentStep - 1) as StoreSetupStep),
    );
  }

  return (
    <main className="store-contact-page">
      <section className="store-contact-page__shell">
        <header className="store-contact-page__header">
          <img
            alt="PedeAqui"
            className="store-contact-page__logo"
            src="/logoPedeAqui.jpeg"
          />

          <span className="store-contact-page__badge">Etapa {step} de 3</span>

          <div
            className="store-contact-page__progress"
            aria-label="Progresso da configuração da loja"
          >
            {[1, 2, 3].map((progressStep) => (
              <span
                className={
                  progressStep <= step
                    ? "store-contact-page__progress-bar store-contact-page__progress-bar--active"
                    : "store-contact-page__progress-bar"
                }
                key={progressStep}
              />
            ))}
          </div>

          <h1>{copy.title}</h1>
          <p>{copy.subtitle}</p>
        </header>

        <StoreContactForm
          onBack={goToPreviousStep}
          onNext={goToNextStep}
          step={step}
        />
      </section>
    </main>
  );
}
