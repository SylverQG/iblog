export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const action = body?.action
  const issue = body?.issue

  if (!issue || !action) {
    throw createError({ statusCode: 400, message: 'Invalid webhook payload' })
  }

  console.log(`[Webhook] Issue #${issue.number} ${action}: ${issue.title}`)

  return { received: true, action, issueNumber: issue.number }
})
