export enum CheckResult {
  Valid = '✅',
  Invalid = '❌'
}

export type FieldMapping = Record<string, number>

export interface CSVFields {
  id: string // can be a number, a randomUUID or an email
  firstName: string
  lastName: string
  narrative: string
  evidenceNarrative: string
  evidenceUrl: string // 'http://example.com
  issueDate: string // date with 'yyyy-MM-dd' format
  expirationDate: string // date with 'yyyy-MM-dd' format
}

export enum OurColumnsMapping {
  id = 'Identifier',
  firstName = 'First Name',
  lastName = 'Last Name',
  narrative = 'Narrative',
  evidenceNarrative = 'Evidence Narrative',
  evidenceUrl = 'Evidence Url',
  issueDate = 'Issue Date',
  expirationDate = 'Expiration Date'
}

export enum JSONTable {
  name = 'NAME',
  id = 'IDENTIFIER',
  evidenceUrl = 'EVIDENCE URL',
  issueDate = 'ISSUE DATE',
  expirationDate = 'EXPIRATION DATE',
  narrative = 'NARRATIVE'
}
