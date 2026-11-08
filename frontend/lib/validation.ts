/**
 * Shared validation utilities for CarbonIQ frontend forms.
 */

/**
 * Checks a practical email format for frontend feedback.
 * Trims surrounding whitespace; supports plus tags and hyphenated domains.
 * Rejects empty values, malformed dot placement, and invalid domain labels.
 * This is a format check, not proof that the mailbox exists.
 */
export function isValidEmail(email: string | null | undefined): boolean {
  if (typeof email !== 'string') return false

  const trimmed = email.trim()
  if (!trimmed || trimmed.length > 254) return false

  const parts = trimmed.split('@')
  if (parts.length !== 2) return false
  const [local, domain] = parts
  if (!local || local.length > 64 || !domain) return false
  if (!/^[a-zA-Z0-9_%+-]+(?:[.][a-zA-Z0-9_%+-]+)*$/.test(local)) return false

  const labels = domain.split('.')
  if (labels.length < 2 || !/^[a-zA-Z]{2,}$/.test(labels[labels.length - 1])) return false
  return labels.every(label =>
    label.length <= 63 && /^[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/.test(label)
  )
}
