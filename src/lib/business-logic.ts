import { hc } from 'hono/client'
import type { AppType } from 'business-logic-service/app'

const businessLogicBaseUrl =
  import.meta.env.VITE_BUSINESS_LOGIC_URL ?? 'http://localhost:3000'

export const businessLogicClient = hc<AppType>(businessLogicBaseUrl)