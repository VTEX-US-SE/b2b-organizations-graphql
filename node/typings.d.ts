interface ReqContext {
  account: string
  workspace: string
  authToken: string
  region: string
  production: boolean
  userAgent: string
}

interface Logger {
  log(content: string, level: LogLevel, details?: any): PromiseLike<void>
}

interface OperationState {
  orderFormId: string
  ctx: ReqContext
  data?: OperationData
  logger: Logger
}

interface OperationData {
  orderForm?: any
  userProfileId: string
  cookie: string
}

type ProcessPaymentStep = (
  state: OperationState,
  next: () => Promise<void>
) => Promise<void>

type LogLevel = 'info' | 'error' | 'warning'

type Timings = { [middleware: string]: [number, number] }

declare module '*.json' {
  const value: any
  export default value
}
interface Seller {
  id: string
  name: string
}

interface OrganizationInput {
  name: string
  tradeName?: string
  b2bCustomerAdmin: B2BCustomerInput
  defaultCostCenter?: DefaultCostCenterInput
  costCenters?: DefaultCostCenterInput[]
  paymentTerms?: PaymentTerm[]
  priceTables?: Price[]
  salesChannel?: string
  sellers?: Seller[]
}

interface B2BCustomerInput {
  firstName: string
  lastName: string
  email: string
}

interface DefaultCostCenterInput {
  name: string
  address: AddressInput
  phoneNumber?: string
  businessDocument?: string
  stateRegistration?: string
}

interface CostCenterInput {
  name: string
  addresses?: AddressInput[]
  paymentTerms?: PaymentTerm[]
  phoneNumber?: string
  businessDocument?: string
  stateRegistration?: string
}

interface AddressInput {
  addressId: string
  addressType: string
  postalCode: string
  country: string
  receiverName: string
  city: string
  state: string
  street: string
  number: string
  complement: string
  neighborhood: string
  geoCoordinates: [number]
}

interface OrganizationRequest {
  costCenters: DefaultCostCenterInput[]
  name: string
  tradeName?: string
  defaultCostCenter: DefaultCostCenterInput
  b2bCustomerAdmin: B2BCustomerInput
  status: string
  created: string
  paymentTerms?: PaymentTerm[]
  priceTables?: Price[]
  salesChannel?: string
  sellers?: Seller[]
}

interface Organization {
  id: string
  name: string
  tradeName?: string
  costCenters: string[]
  paymentTerms: PaymentTerm[]
  status: string
  created: string
}

interface CostCenter {
  id: string
  name: string
  organization: string
  addresses: Address[]
  paymentTerms: PaymentTerm[]
  salesChannel: string
  priceTables: Price[]
  phoneNumber?: string
  businessDocument?: string
}

interface Address {
  addressId: string
  addressType: string
  addressQuery: string
  postalCode: string
  country: string
  receiverName: string
  city: string
  state: string
  street: string
  number: string
  complement: string
  neighborhood: string
  geoCoordinates: number[]
  reference: string
  checked?: boolean
}

interface B2BSetting {
  autoApprove: boolean
  defaultPaymentTerms: PaymentTerm[]
  defaultPriceTables: [string]
}

interface UserArgs {
  id?: string
  roleId: string
  userId?: string
  orgId?: string
  costId?: string
  clId?: string
  canImpersonate?: boolean
  name: string
  email: string
}

interface PaymentTerm {
  name: string
  id: string
}

interface Price {
  name: string
  id: string
}

interface UISettings {
  showModal: boolean
  clearCart: boolean
}

interface B2BSettingsInput {
  autoApprove: boolean
  defaultPaymentTerms: PaymentTerm[]
  defaultPriceTables: Price[]
  uiSettings: UISettings
}
