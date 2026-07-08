export type StorePreconfigurationStep = 1 | 2 | 3

export type StorePreconfigurationStepKey = 'identity' | 'address' | 'review'

export type Weekday =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday'

export type WeekdayOption = {
  value: Weekday
  label: string
}

export type BusinessHoursFormValues = {
  startDay: Weekday | ''
  endDay: Weekday | ''
  opensAt: string
  closesAt: string
}

export type StoreAddressFormValues = {
  state: string
  city: string
  neighborhood: string
  street: string
  number: string
}

export type StorePreconfigurationFormValues = {
  storeName: string
  contactEmail: string
  businessHours: BusinessHoursFormValues
  address: StoreAddressFormValues
}

export type StorePreconfigurationPayload = {
  storeName: string
  contactEmail: string
  businessHours: {
    startDay: Weekday
    endDay: Weekday
    opensAt: string
    closesAt: string
  }
  address: StoreAddressFormValues
}

export type StorePreconfigurationResult =
  | {
      ok: true
      payload: StorePreconfigurationPayload
    }
  | {
      ok: false
      message: string
    }

export type StepNavigationTarget = StorePreconfigurationStep | StorePreconfigurationStepKey
