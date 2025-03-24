import type { IOContext } from '@vtex/api'
import { AuthenticationError } from '@vtex/api'

export const withAuthToken =
  (currentHeaders = {}) =>
  ({ adminUserAuthToken, authToken }: IOContext) => {
    if (!adminUserAuthToken) {
      throw new AuthenticationError('User is not logged in!')
    }

    return {
      ...currentHeaders,
      Authorization: authToken,
      'Proxy-Authorization': adminUserAuthToken,
      VtexIdclientAutCookie: adminUserAuthToken,
      'X-Vtex-Use-Https': 'true',
      cookie: `_ssid=${adminUserAuthToken}`,
    }
  }