import { useMemo, useState } from 'react'
import { type Path, useForm } from 'react-hook-form'
import type { ZodIssue } from 'zod'

import {
  addressStepSchema,
  identityStepSchema,
  storePreconfigurationPayloadSchema,
} from '../schemas/storePreconfigurationSchema'
import {
  submitStorePreconfiguration,
  type SubmitStorePreconfiguration,
} from '../services/storePreconfigurationService'
import type {
  StepNavigationTarget,
  StorePreconfigurationFormValues,
  StorePreconfigurationPayload,
  StorePreconfigurationResult,
  StorePreconfigurationStep,
  StorePreconfigurationStepKey,
} from '../types/storePreconfiguration'

const stepByKey = {
  identity: 1,
  address: 2,
  review: 3,
} as const satisfies Record<StorePreconfigurationStepKey, StorePreconfigurationStep>

const defaultValues: StorePreconfigurationFormValues = {
  storeName: '',
  businessDocument: '',
  businessHours: {
    startDay: '',
    endDay: '',
    opensAt: '',
    closesAt: '',
  },
  address: {
    state: '',
    city: '',
    neighborhood: '',
    street: '',
    number: '',
  },
}

type UseStorePreconfigurationFormOptions = {
  submitStore?: SubmitStorePreconfiguration
  onBackToRegister?: () => void
  onSuccess?: (result: Extract<StorePreconfigurationResult, { ok: true }>) => void
}

const resolveStep = (target: StepNavigationTarget): StorePreconfigurationStep => {
  if (typeof target === 'number') {
    return target
  }

  return stepByKey[target]
}

const toFieldPath = (issue: ZodIssue): Path<StorePreconfigurationFormValues> | null => {
  if (issue.path.length === 0) {
    return null
  }

  return issue.path.join('.') as Path<StorePreconfigurationFormValues>
}

const toSlug = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const toDigits = (value: string) => value.replace(/\D/g, '')

const toAddressLine = (address: StorePreconfigurationFormValues['address']) =>
  `${address.street.trim()}, ${address.number.trim()} - ${address.neighborhood.trim()}, ${address.city.trim()} - ${address.state.trim().toUpperCase()}`

export const useStorePreconfigurationForm = ({
  submitStore = submitStorePreconfiguration,
  onBackToRegister,
  onSuccess,
}: UseStorePreconfigurationFormOptions = {}) => {
  const [currentStep, setCurrentStep] = useState<StorePreconfigurationStep>(1)
  const [submissionError, setSubmissionError] = useState<string | null>(null)

  const form = useForm<StorePreconfigurationFormValues>({
    mode: 'onTouched',
    shouldUnregister: false,
    defaultValues,
  })

  const progress = useMemo(
    () => ({
      currentStep,
      totalSteps: 3,
      percentage: Math.round((currentStep / 3) * 100),
    }),
    [currentStep],
  )

  const applyValidationIssues = (issues: ZodIssue[]) => {
    issues.forEach((issue) => {
      const fieldPath = toFieldPath(issue)

      if (!fieldPath) {
        return
      }

      form.setError(fieldPath, {
        type: 'manual',
        message: issue.message,
      })
    })
  }

  const validateStep = async (step: StorePreconfigurationStep = currentStep) => {
    const values = form.getValues()
    form.clearErrors()

    const result =
      step === 1
        ? identityStepSchema.safeParse(values)
        : step === 2
          ? addressStepSchema.safeParse(values)
          : storePreconfigurationPayloadSchema.safeParse(values)

    if (result.success) {
      setSubmissionError(null)
      return true
    }

    applyValidationIssues(result.error.issues)
    setSubmissionError('Revise os campos destacados antes de continuar para a proxima etapa.')
    return false
  }

  const goToStep = async (target: StepNavigationTarget) => {
    const nextStep = resolveStep(target)

    if (nextStep <= currentStep) {
      setCurrentStep(nextStep)
      return true
    }

    const isCurrentStepValid = await validateStep(currentStep)

    if (!isCurrentStepValid) {
      return false
    }

    setCurrentStep(nextStep)
    return true
  }

  const goToNextStep = async () => {
    if (currentStep === 3) {
      return false
    }

    const isCurrentStepValid = await validateStep(currentStep)

    if (!isCurrentStepValid) {
      return false
    }

    const nextStep: StorePreconfigurationStep = currentStep === 1 ? 2 : 3
    setCurrentStep(nextStep)
    return true
  }

  const goToPreviousStep = () => {
    if (currentStep === 1) {
      onBackToRegister?.()
      return
    }

    setCurrentStep((currentStep - 1) as StorePreconfigurationStep)
  }

  const buildPayload = (): StorePreconfigurationPayload | null => {
    const result = storePreconfigurationPayloadSchema.safeParse(form.getValues())

    if (!result.success) {
      applyValidationIssues(result.error.issues)
      return null
    }

    const businessDocument = toDigits(result.data.businessDocument)

    return {
      tenant: {
        document: businessDocument || null,
      },
      store: {
        slug: toSlug(result.data.storeName),
        storeName: result.data.storeName.trim(),
        horarioAbertura: result.data.businessHours.opensAt,
        horarioFechamento: result.data.businessHours.closesAt,
        endereco: toAddressLine(result.data.address),
        city: result.data.address.city.trim(),
        state: result.data.address.state.trim().toUpperCase(),
        descricao: null,
        logoUrl: null,
      },
      source: {
        businessDocument: businessDocument || null,
        businessHours: result.data.businessHours,
        address: result.data.address,
      },
    }
  }

  const submit = form.handleSubmit(async () => {
    setSubmissionError(null)

    if (currentStep !== 3) {
      await goToNextStep()
      return null
    }

    const payload = buildPayload()

    if (!payload) {
      return null
    }

    const result = await submitStore(payload)

    if (!result.ok) {
      setSubmissionError('Nao foi possivel finalizar o pre-registro. Revise os dados e tente novamente.')
      return result
    }

    if (onSuccess) {
      form.reset(defaultValues)
      onSuccess(result)
    }

    return result
  })

  return {
    form,
    currentStep,
    progress,
    submissionError,
    isSubmitting: form.formState.isSubmitting,
    validateStep,
    goToStep,
    goToNextStep,
    goToPreviousStep,
    buildPayload,
    submit,
  }
}
