import type { InstanceOptions, IOContext } from '@vtex/api'
import { JanusClient } from '@vtex/api'

import { withAuthToken } from './utils'

interface AuditClientInterface {
  sendEvent: (
    auditEntry: AuditEntry,
    sessionMeta: any
  ) => Promise<void>
}

export class AuditClient extends JanusClient implements AuditClientInterface {
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(ctx, { headers: withAuthToken(options)(ctx), ...options })
  }

  public async sendEvent(
    auditEntry: AuditEntry,
    sessionMeta: any
  ): Promise<void> {
    console.log('sendEvent', auditEntry)
    const { meta, subjectId, operation, authorId } = auditEntry
    const { account, operationId, requestId, userAgent, logger } = this.context

    console.log('sendEvent account', account)

    const auditEvent = {
      mainAccountName: account,
      accountName: account,
      id: requestId,
      subjectId,
      authorId,
      application: 'vtex.b2b-organizations-graphql',
      operation,
      operationId,
      meta: {
        fowardFromVtexUserAgent: userAgent,
        ...meta,
      },
      date: new Date().toJSON(),
    }

    console.log('auditEvent', auditEvent)

    try {
      await this.http.post(
        `https://analytics.vtex.com/api/audit/events?an=${account}`,
        auditEvent,
        { headers: { 'content-type': 'application/json' } }
      )
    } catch (error) {
        console.log({
            message: `AUDIT_CLIENT_ERROR: ${operation} failed on ${sessionMeta.screen} screen.`,
            action: {
              authorId,
              entityBeforeAction: meta.entityBeforeAction,
              entityAfterAction: meta.entityAfterAction
            },
            code: `${operation}_AUDIT_FAILED`,
            error,
          })
      logger.error({
        message: `AUDIT_CLIENT_ERROR: ${operation} failed on ${sessionMeta.screen} screen.`,
        action: {
          authorId,
          entityBeforeAction: meta.entityBeforeAction,
          entityAfterAction: meta.entityAfterAction
        },
        code: `${operation}_AUDIT_FAILED`,
        error,
      })
    }
  }
}