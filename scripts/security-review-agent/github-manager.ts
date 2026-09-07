import { Octokit } from '@octokit/rest';
import { SecurityScanResult, SecurityIssue, SeverityLevel } from './types.js';
import { groupIssuesBySeverity } from './scanner.js';

/**
 * GitHub Issues Manager for Security Review Agent
 * Creates and updates security issues in GitHub repository
 */

interface GitHubConfig {
  owner: string;
  repo: string;
  token: string;
}

const ISSUE_LABEL_PREFIX = 'security';
const SEVERITY_LABELS: Record<SeverityLevel, string> = {
  CRITICAL: 'security-critical',
  HIGH: 'security-high',
  MEDIUM: 'security-medium',
  LOW: 'security-low',
  INFO: 'security-info',
};

const SEVERITY_EMOJIS: Record<SeverityLevel, string> = {
  CRITICAL: '🔴',
  HIGH: '🟠',
  MEDIUM: '🟡',
  LOW: '🟢',
  INFO: 'ℹ️',
};

export class GitHubSecurityManager {
  private octokit: Octokit;
  private owner: string;
  private repo: string;

  constructor(config: GitHubConfig) {
    this.octokit = new Octokit({ auth: config.token });
    this.owner = config.owner;
    this.repo = config.repo;
  }

  /**
   * Create or update security issues based on scan results
   */
  async syncSecurityIssues(scanResult: SecurityScanResult): Promise<void> {
    console.log('\n🔄 Sincronizando issues de seguridad con GitHub...');

    // Ensure labels exist
    await this.ensureLabelsExist();

    // Group issues by severity
    const issuesBySeverity = groupIssuesBySeverity(scanResult.issues);

    // Create/update one issue per severity level (if issues exist)
    for (const [severity, issues] of issuesBySeverity.entries()) {
      if (issues.length === 0) continue;

      await this.createOrUpdateSeverityIssue(severity, issues, scanResult);
    }

    // Create summary issue
    await this.createOrUpdateSummaryIssue(scanResult);

    console.log('✅ Sincronización con GitHub completada\n');
  }

  /**
   * Create or update issue for a specific severity level
   */
  private async createOrUpdateSeverityIssue(
    severity: SeverityLevel,
    issues: SecurityIssue[],
    scanResult: SecurityScanResult
  ): Promise<void> {
    const title = `${SEVERITY_EMOJIS[severity]} Security Review: ${severity} Priority Issues`;
    const body = this.generateSeverityIssueBody(severity, issues, scanResult);
    const labels = [SEVERITY_LABELS[severity], 'security-review', 'automated'];

    // Check if issue already exists
    const existingIssue = await this.findIssueByTitle(title);

    if (existingIssue) {
      // Update existing issue
      await this.octokit.issues.update({
        owner: this.owner,
        repo: this.repo,
        issue_number: existingIssue.number,
        body,
        labels,
        state: issues.length > 0 ? 'open' : 'closed',
      });
      console.log(`  📝 Issue actualizado: ${title} (#${existingIssue.number})`);
    } else {
      // Create new issue
      const { data } = await this.octokit.issues.create({
        owner: this.owner,
        repo: this.repo,
        title,
        body,
        labels,
      });
      console.log(`  ✨ Issue creado: ${title} (#${data.number})`);
    }
  }

  /**
   * Create or update summary issue
   */
  private async createOrUpdateSummaryIssue(scanResult: SecurityScanResult): Promise<void> {
    const title = '🛡️ Security Review Summary';
    const body = this.generateSummaryIssueBody(scanResult);
    const labels = ['security-review', 'security-summary', 'automated'];

    const existingIssue = await this.findIssueByTitle(title);

    if (existingIssue) {
      await this.octokit.issues.update({
        owner: this.owner,
        repo: this.repo,
        issue_number: existingIssue.number,
        body,
        labels,
        state: scanResult.passedScan ? 'closed' : 'open',
      });
      console.log(`  📝 Summary issue actualizado (#${existingIssue.number})`);
    } else {
      const { data } = await this.octokit.issues.create({
        owner: this.owner,
        repo: this.repo,
        title,
        body,
        labels,
      });
      console.log(`  ✨ Summary issue creado (#${data.number})`);
    }
  }

  /**
   * Generate issue body for a specific severity level
   */
  private generateSeverityIssueBody(
    severity: SeverityLevel,
    issues: SecurityIssue[],
    scanResult: SecurityScanResult
  ): string {
    const emoji = SEVERITY_EMOJIS[severity];
    let body = `# ${emoji} Security Issues - ${severity} Priority\n\n`;
    
    body += `**Scan Date:** ${new Date(scanResult.timestamp).toLocaleString()}\n`;
    body += `**Issues Found:** ${issues.length}\n`;
    body += `**Overall Risk:** ${scanResult.overallRisk}\n\n`;

    body += `---\n\n`;

    // Group by category
    const byCategory = new Map<string, SecurityIssue[]>();
    issues.forEach(issue => {
      if (!byCategory.has(issue.category)) {
        byCategory.set(issue.category, []);
      }
      byCategory.get(issue.category)!.push(issue);
    });

    // List issues by category
    for (const [category, categoryIssues] of byCategory.entries()) {
      body += `## ${category}\n\n`;
      body += `**Issues:** ${categoryIssues.length}\n\n`;

      categoryIssues.forEach((issue, index) => {
        body += `### ${index + 1}. ${issue.title}\n\n`;
        body += `**ID:** \`${issue.id}\`\n`;
        body += `**File:** \`${issue.file}:${issue.line}\`\n`;
        if (issue.cweId) {
          body += `**CWE:** [${issue.cweId}](https://cwe.mitre.org/data/definitions/${issue.cweId.replace('CWE-', '')}.html)\n`;
        }
        body += `\n**Description:**\n${issue.description}\n\n`;
        body += `**Recommendation:**\n${issue.recommendation}\n\n`;
        
        if (issue.codeSnippet) {
          body += `**Code Snippet:**\n\`\`\`typescript\n${issue.codeSnippet}\n\`\`\`\n\n`;
        }

        if (issue.references && issue.references.length > 0) {
          body += `**References:**\n`;
          issue.references.forEach(ref => body += `- ${ref}\n`);
          body += `\n`;
        }

        body += `---\n\n`;
      });
    }

    body += `\n## 📋 Action Items\n\n`;
    body += `- [ ] Review all ${severity} priority issues\n`;
    body += `- [ ] Implement recommended fixes\n`;
    body += `- [ ] Re-run security scan\n`;
    body += `- [ ] Close this issue when all items are resolved\n\n`;

    body += `---\n`;
    body += `*This issue was automatically generated by the Security Review Agent based on OWASP Top 10 2021.*\n`;
    body += `*Last updated: ${new Date().toLocaleString()}*\n`;

    return body;
  }

  /**
   * Generate summary issue body
   */
  private generateSummaryIssueBody(scanResult: SecurityScanResult): string {
    let body = `# 🛡️ Security Review Summary\n\n`;
    
    body += `**Scan Date:** ${new Date(scanResult.timestamp).toLocaleString()}\n`;
    body += `**Files Scanned:** ${scanResult.filesScanned}\n`;
    body += `**Total Issues:** ${scanResult.issuesFound}\n`;
    body += `**Overall Risk:** ${scanResult.overallRisk}\n`;
    body += `**Status:** ${scanResult.passedScan ? '✅ PASSED' : '❌ FAILED'}\n\n`;

    body += `---\n\n`;

    body += `## 📊 Issues by Severity\n\n`;
    body += `| Severity | Count | Status |\n`;
    body += `|----------|-------|--------|\n`;
    body += `| 🔴 Critical | ${scanResult.summary.critical} | ${scanResult.summary.critical === 0 ? '✅' : '❌'} |\n`;
    body += `| 🟠 High | ${scanResult.summary.high} | ${scanResult.summary.high === 0 ? '✅' : '⚠️'} |\n`;
    body += `| 🟡 Medium | ${scanResult.summary.medium} | ${scanResult.summary.medium === 0 ? '✅' : 'ℹ️'} |\n`;
    body += `| 🟢 Low | ${scanResult.summary.low} | ℹ️ |\n`;
    body += `| ℹ️ Info | ${scanResult.summary.info} | ℹ️ |\n\n`;

    if (!scanResult.passedScan) {
      body += `## ⚠️ Scan Failed\n\n`;
      body += `This scan **failed** because it detected **${scanResult.summary.critical} critical** and **${scanResult.summary.high} high** priority issues.\n\n`;
      body += `**Required Actions:**\n`;
      body += `1. Review and fix all CRITICAL priority issues\n`;
      body += `2. Review and fix all HIGH priority issues\n`;
      body += `3. Re-run the security scan\n\n`;
    } else {
      body += `## ✅ Scan Passed\n\n`;
      body += `No critical or high priority issues detected. The codebase meets minimum security standards.\n\n`;
      if (scanResult.summary.medium > 0 || scanResult.summary.low > 0) {
        body += `However, there are still some medium/low priority issues that should be addressed for improved security posture.\n\n`;
      }
    }

    body += `## 📝 Related Issues\n\n`;
    if (scanResult.summary.critical > 0) {
      body += `- See issues tagged with \`security-critical\`\n`;
    }
    if (scanResult.summary.high > 0) {
      body += `- See issues tagged with \`security-high\`\n`;
    }
    if (scanResult.summary.medium > 0) {
      body += `- See issues tagged with \`security-medium\`\n`;
    }
    if (scanResult.summary.low > 0) {
      body += `- See issues tagged with \`security-low\`\n`;
    }

    body += `\n---\n`;
    body += `*This summary was automatically generated by the Security Review Agent.*\n`;
    body += `*Based on OWASP Top 10 2021 security standards.*\n`;
    body += `*Last updated: ${new Date().toLocaleString()}*\n`;

    return body;
  }

  /**
   * Find issue by title
   */
  private async findIssueByTitle(title: string): Promise<{ number: number } | null> {
    try {
      const { data } = await this.octokit.issues.listForRepo({
        owner: this.owner,
        repo: this.repo,
        state: 'all',
        labels: 'security-review',
        per_page: 100,
      });

      const issue = data.find(i => i.title === title);
      return issue ? { number: issue.number } : null;
    } catch (error) {
      console.error('Error buscando issue:', error);
      return null;
    }
  }

  /**
   * Ensure all required labels exist
   */
  private async ensureLabelsExist(): Promise<void> {
    const labels = [
      { name: 'security-review', color: '8B0000', description: 'Security review automated issue' },
      { name: 'security-summary', color: '4B0082', description: 'Security review summary' },
      { name: 'security-critical', color: 'B60205', description: 'Critical security issue' },
      { name: 'security-high', color: 'D93F0B', description: 'High priority security issue' },
      { name: 'security-medium', color: 'FBCA04', description: 'Medium priority security issue' },
      { name: 'security-low', color: '0E8A16', description: 'Low priority security issue' },
      { name: 'security-info', color: '1D76DB', description: 'Security information' },
      { name: 'automated', color: '666666', description: 'Automated issue' },
    ];

    for (const label of labels) {
      try {
        await this.octokit.issues.createLabel({
          owner: this.owner,
          repo: this.repo,
          ...label,
        });
      } catch (error: any) {
        // Label might already exist, ignore error
        if (error.status !== 422) {
          console.error(`Error creando label ${label.name}:`, error.message);
        }
      }
    }
  }
}
