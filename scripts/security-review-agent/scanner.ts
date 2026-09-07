import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import { SecurityScanResult, SecurityIssue, SeverityLevel } from './types.js';
import { securityRules } from './security-rules.js';

/**
 * Security Scanner
 * Scans codebase for security vulnerabilities based on OWASP Top 10
 */

const SCAN_PATTERNS = [
  'app/**/*.{ts,tsx,js,jsx}',
  'lib/**/*.{ts,tsx,js,jsx}',
  'components/**/*.{ts,tsx,js,jsx}',
  'pages/**/*.{ts,tsx,js,jsx}',
  '!**/*.test.{ts,tsx,js,jsx}',
  '!**/__tests__/**',
  '!**/node_modules/**',
  '!**/.next/**',
];

export async function scanCodebase(): Promise<SecurityScanResult> {
  console.log('🔍 Iniciando escaneo de seguridad...');
  
  // Find all files to scan
  const files = await glob(SCAN_PATTERNS, { 
    ignore: ['node_modules/**', '.next/**', 'tests/**'],
    absolute: false,
  });

  console.log(`📁 Archivos a escanear: ${files.length}`);
  
  const allIssues: SecurityIssue[] = [];
  let filesScanned = 0;

  // Scan each file
  for (const file of files) {
    try {
      const content = fs.readFileSync(file, 'utf-8');
      const fileIssues = scanFile(file, content);
      allIssues.push(...fileIssues);
      filesScanned++;
      
      if (fileIssues.length > 0) {
        console.log(`  ⚠️  ${file}: ${fileIssues.length} issue(s) encontrado(s)`);
      }
    } catch (error) {
      console.error(`Error escaneando ${file}:`, error);
    }
  }

  // Calculate summary
  const summary = {
    critical: allIssues.filter(i => i.severity === 'CRITICAL').length,
    high: allIssues.filter(i => i.severity === 'HIGH').length,
    medium: allIssues.filter(i => i.severity === 'MEDIUM').length,
    low: allIssues.filter(i => i.severity === 'LOW').length,
    info: allIssues.filter(i => i.severity === 'INFO').length,
  };

  // Determine overall risk
  const overallRisk = calculateOverallRisk(summary);
  
  // Pass scan if no critical or high issues
  const passedScan = summary.critical === 0 && summary.high === 0;

  const result: SecurityScanResult = {
    timestamp: new Date().toISOString(),
    filesScanned,
    issuesFound: allIssues.length,
    issues: allIssues,
    summary,
    overallRisk,
    passedScan,
  };

  console.log('\n📊 Resumen del escaneo:');
  console.log(`  🔴 Crítico: ${summary.critical}`);
  console.log(`  🟠 Alto: ${summary.high}`);
  console.log(`  🟡 Medio: ${summary.medium}`);
  console.log(`  🟢 Bajo: ${summary.low}`);
  console.log(`  ℹ️  Info: ${summary.info}`);
  console.log(`\n  Riesgo general: ${overallRisk}`);
  console.log(`  ✅ Aprobado: ${passedScan ? 'SÍ' : 'NO'}\n`);

  return result;
}

function scanFile(filePath: string, content: string): SecurityIssue[] {
  const issues: SecurityIssue[] = [];

  // Run all security rules against the file
  for (const rule of securityRules) {
    try {
      const ruleIssues = rule.check(content, filePath);
      issues.push(...ruleIssues);
    } catch (error) {
      console.error(`Error ejecutando regla ${rule.id} en ${filePath}:`, error);
    }
  }

  return issues;
}

function calculateOverallRisk(summary: Record<SeverityLevel | 'info', number>): SecurityScanResult['overallRisk'] {
  if (summary.critical > 0) return 'CRITICAL';
  if (summary.high >= 3) return 'HIGH';
  if (summary.high > 0 || summary.medium >= 5) return 'MODERATE';
  if (summary.medium > 0 || summary.low >= 5) return 'LOW';
  return 'MINIMAL';
}

/**
 * Get issues grouped by category
 */
export function groupIssuesByCategory(issues: SecurityIssue[]): Map<string, SecurityIssue[]> {
  const grouped = new Map<string, SecurityIssue[]>();
  
  issues.forEach(issue => {
    const category = issue.category;
    if (!grouped.has(category)) {
      grouped.set(category, []);
    }
    grouped.get(category)!.push(issue);
  });
  
  return grouped;
}

/**
 * Get issues grouped by severity
 */
export function groupIssuesBySeverity(issues: SecurityIssue[]): Map<SeverityLevel, SecurityIssue[]> {
  const grouped = new Map<SeverityLevel, SecurityIssue[]>();
  
  const severities: SeverityLevel[] = ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW', 'INFO'];
  severities.forEach(severity => grouped.set(severity, []));
  
  issues.forEach(issue => {
    grouped.get(issue.severity)!.push(issue);
  });
  
  return grouped;
}

/**
 * Save scan results to file
 */
export function saveScanResults(result: SecurityScanResult, outputPath: string): void {
  fs.writeFileSync(outputPath, JSON.stringify(result, null, 2), 'utf-8');
  console.log(`💾 Resultados guardados en: ${outputPath}`);
}
