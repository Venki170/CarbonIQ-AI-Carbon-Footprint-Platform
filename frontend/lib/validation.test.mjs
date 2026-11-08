import assert from 'node:assert/strict'
import { test } from 'node:test'
import { isValidEmail } from './validation.ts'

test('accepts practical email formats and trims whitespace', () => {
  for (const email of ['student@example.com', ' first.last+tag@my-domain.example.com ', 'a@x.co'])
    assert.equal(isValidEmail(email), true, email)
})
test('rejects malformed local parts and domain labels', () => {
  for (const email of [null, undefined, '', 'a b@example.com', '.a@example.com',
    'a.@example.com', 'a..b@example.com', 'a@@example.com', 'a@-example.com',
    'a@example-.com', 'a@example..com', 'a@example', 'a@exam_ple.com',
    'a'.repeat(65) + '@example.com', 'a@' + 'b'.repeat(64) + '.com'])
    assert.equal(isValidEmail(email), false, String(email))
})
