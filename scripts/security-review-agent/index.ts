#!/usr/bin/env node

/**
 * Security Review Agent - Entry Point
 * 
 * Automated security scanning based on OWASP Top 10 2021
 * Runs after testing agent and creates GitHub issues for findings
 */

import chalk from 'chalk';
import { scanCodebase, saveScanResults } from './scanner.js';
import { GitHubSecurityManager } from './github-manager.js';

const RESULTS_DIR = 'security-reports';
const RESULTS_FILE = `${RESULTS_DIR}/security-scan-${Date.now()}.json`;
const LATEST_FILE = `${RESULTS_DIR}/latest.json`;

async function main() {
  console.log(chalk.cyan.bold('\n🛡️  Security Review Agent\n'));
  console.log(chalk.gray('Based on OWASP Top 10 2021\n'));

  try {
    // Ensure results directory exists
    const fs = await import('fs');
    if (!fs.existsSync(RESULTS_DIR)) {
      fs.mkdirSync(RESULTS_DIR, { recursive: true });
    }

    // Run security scan
    console.log(chalk.blue('Step 1: Scanning codebase...\n'));
    const scanResult = await scanCodebase();

    // Save results
    console.log(chalk.blue('\nStep 2: Saving results...\n'));
    saveScanResults(scanResult, RESULTS_FILE);
    saveScanResults(scanResult, LATEST_FILE);

    // Sync with GitHub (if configured)
    const githubToken = process.env.GITHUB_TOKEN;
    const repoInfo = parseGitHubRepo();

    if (githubToken && repoInfo) {
      console.log(chalk.blue('\nStep 3: Syncing with GitHub...\n'));
      const githubManager = new GitHubSecurityManager({
        token: githubToken,
        owner: repoInfo.owner,
        repo: repoInfo.repo,
      });
      await githubManager.syncSecurityIssues(scanResult);
    } else {
      console.log(chalk.yellow('\n⚠️  GitHub sync skipped (GITHUB_TOKEN not set or repo info not found)\n'));
      console.log(chalk.gray('To enable GitHub sync:'));
      console.log(chalk.gray('  1. Set GITHUB_TOKEN environment variable'));
      console.log(chalk.gray('  2. Ensure .git/config has remote origin URL\n'));
    }

    // Print final summary
    console.log(chalk.cyan.bold('\n' + '='.repeat(60)));
    console.log(chalk.cyan.bold('  SCAN COMPLETE'));
    console.log(chalk.cyan.bold('='.repeat(60) + '\n'));

    printSummary(scanResult);

    // Exit with appropriate code
    if (!scanResult.passedScan) {
      console.log(chalk.red.bold('\n❌ Security scan FAILED\n'));
      console.log(chalk.yellow('Fix critical and high priority issues before deploying.\n'));
      process.exit(1);
    } else {
      console.log(chalk.green.bold('\n✅ Security scan PASSED\n'));
      
      if (scanResult.issuesFound > 0) {
        console.log(chalk.yellow('Consider addressing medium/low priority issues for better security.\n'));
      } else {
        console.log(chalk.green('No security issues detected! 🎉\n'));
      }
      
      process.exit(0);
    }

  } catch (error) {
    console.error(chalk.red.bold('\n❌ Error during security scan:\n'));
    console.error(error);
    process.exit(1);
  }
}

function printSummary(scanResult: any) {
  const { summary, filesScanned, issuesFound, overallRisk, passedScan } = scanResult;

  console.log(chalk.white('📊 Summary:'));
  console.log(chalk.gray('─────────────────────────────────────────────────────────\n'));
  
  console.log(chalk.white(`  Files Scanned:     ${filesScanned}`));
  console.log(chalk.white(`  Issues Found:      ${issuesFound}`));
  console.log(chalk.white(`  Overall Risk:      ${getRiskColor(overallRisk)(overallRisk)}`));
  console.log(chalk.white(`  Status:            ${passedScan ? chalk.green('✅ PASSED') : chalk.red('❌ FAILED')}`));
  
  console.log(chalk.white('\n  Issues by Severity:'));
  console.log(chalk.red(`    🔴 Critical:  ${summary.critical}`));
  console.log(chalk.hex('#FFA500')(`    🟠 High:      ${summary.high}`));
  console.log(chalk.yellow(`    🟡 Medium:    ${summary.medium}`));
  console.log(chalk.green(`    🟢 Low:       ${summary.low}`));
  console.log(chalk.blue(`    ℹ️  Info:      ${summary.info}`));

  if (!passedScan) {
    console.log(chalk.white('\n  Required Actions:'));
    if (summary.critical > 0) {
      console.log(chalk.red(`    • Fix ${summary.critical} CRITICAL issue(s)`));
    }
    if (summary.high > 0) {
      console.log(chalk.hex('#FFA500')(`    • Fix ${summary.high} HIGH issue(s)`));
    }
  }
}

function getRiskColor(risk: string): any {
  switch (risk) {
    case 'CRITICAL': return chalk.red.bold;
    case 'HIGH': return chalk.hex('#FFA500').bold;
    case 'MODERATE': return chalk.yellow.bold;
    case 'LOW': return chalk.green;
    case 'MINIMAL': return chalk.green.bold;
    default: return chalk.white;
  }
}

function parseGitHubRepo(): { owner: string; repo: string } | null {
  try {
    const { execSync } = require('child_process');
    const remoteUrl = execSync('git config --get remote.origin.url', { encoding: 'utf-8' }).trim();
    
    // Parse GitHub URL (supports both HTTPS and SSH)
    const httpsMatch = remoteUrl.match(/github\.com[:/]([^/]+)\/([^/.]+)/);
    if (httpsMatch) {
      return { owner: httpsMatch[1], repo: httpsMatch[2] };
    }
    
    return null;
  } catch (error) {
    return null;
  }
}

// Run the agent
main();
