import type { IOContext, InstanceOptions } from '@vtex/api'
import { JanusClient } from '@vtex/api'

export default class Logistics extends JanusClient {
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(ctx, {
      ...options,
      headers: {
        ...options?.headers,
        //VtexIdClientAutCookie: ctx.authToken,
        "X-VTEX-API-AppKey":"vtexappkey-demoaccount17-HKMFKR",
        "X-VTEX-API-AppToken":"FXCJNAMUNCAEIWWVUVQWIYBDYSOICPOWBXOXRZFDZOLCFUCUASHCJFIVNWJRADBISELHEGJCCVMTGICKAOPHGQKIXSQTUQKMVCHZMFXDVUUITHOYRSOIUURBGHFGQUJO"
      },
    })
  }

  public async listShippingPolicies() {
    
    try {
      const response = await this.http.get<any>(
        'api/logistics/pvt/shipping-policies'
      )
      return response
    } catch (error) {
      // Log detailed error
      console.error('listShippingPolicies-error:', {
        message: error?.message,
        status: error?.response?.status,
        statusText: error?.response?.statusText,
        url: error?.config?.url,
        method: error?.config?.method,
        data: error?.response?.data,
      })

      // Optional: throw a new custom error
      throw new Error(
        `Failed to fetch shipping policies: ${error?.response?.status} ${error?.response?.statusText}`
      )
    }
  }
}
