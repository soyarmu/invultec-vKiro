/**
 * Security Review Agent - Type Definitions
 * Based on OWASP Top 10 and security best practices
 */

export type SeverityLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFO';

export type OwaspCategory = 
  | 'A01:2021-Broken-Access-Control'
  | 'A02:2021-Cryptographic-Failures'
  | 'A03:2021-Injection'
  | 'A04:2021-Insecure-Design'
  | 'A05:2021-Security-Misconfiguration'
  | 'A06:2021-Vulnerable-Components'
  | 'A07:2021-Identification-Authentication-Failures'
  | 'A08:2021-Software-Data-Integrity-Failures'
  | 'A09:2021-Security-Logging-Monitoring-Failures'
  | 'A10:2021-Server-Side-Request-Forgery';

export interface SecurityIssue {
  id: string;
  file: string;
  line: number;
  column?: number;
  severity: SeverityLevel;
  category: OwaspCategory;
  title: string;
  description: string;
  recommendation: string;
  cweId?: string; // Common Weakness Enumeration ID
  references?: string[];
  codeSnippet?: string;
}

export interface SecurityScanResult {
  timestamp: string;
  filesScanned: number;
  issuesFound: number;
  issues: SecurityIssue[];
  summary: {
    critical: number;
    high: number;
    medium: number;
    low: number;
    info: number;
  };
  overallRisk: 'CRITICAL' | 'HIGH' | 'MODERATE' | 'LOW' | 'MINIMAL';
  passedScan: boolean; // true if no critical/high issues
}

export interface SecurityRule {
  id: string;
  name: string;
  category: OwaspCategory;
  severity: SeverityLevel;
  description: string;
  pattern?: RegExp;
  check: (content: string, filePath: string) => SecurityIssue[];
}

export interface SecurityRecommendation {
  category: OwaspCategory;
  severity: SeverityLevel;
  issues: SecurityIssue[];
  summary: string;
  actionItems: string[];
}
