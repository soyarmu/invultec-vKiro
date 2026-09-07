import { SecurityRule, SecurityIssue } from './types.js';

/**
 * Security Rules based on OWASP Top 10 2021
 * Each rule checks for specific vulnerabilities
 */

let issueCounter = 0;
const generateId = () => `SEC-${String(++issueCounter).padStart(4, '0')}`;

export const securityRules: SecurityRule[] = [
  // A01: Broken Access Control
  {
    id: 'A01-001',
    name: 'Missing Authentication Check',
    category: 'A01:2021-Broken-Access-Control',
    severity: 'CRITICAL',
    description: 'API routes sin verificación de autenticación',
    check: (content: string, filePath: string): SecurityIssue[] => {
      const issues: SecurityIssue[] = [];
      
      if (filePath.includes('app/api/') && filePath.endsWith('route.ts')) {
        // Check if auth is imported or used
        const hasAuth = /supabase.*auth|getServerSession|getSession|requireAuth|authenticate/i.test(content);
        const isPublicEndpoint = /\/api\/(health|public)/i.test(filePath);
        
        if (!hasAuth && !isPublicEndpoint && !filePath.includes('/leads/')) {
          const lines = content.split('\n');
          const exportLine = lines.findIndex(line => /export\s+async\s+function\s+(GET|POST|PUT|DELETE|PATCH)/.test(line));
          
          issues.push({
            id: generateId(),
            file: filePath,
            line: exportLine + 1,
            severity: 'CRITICAL',
            category: 'A01:2021-Broken-Access-Control',
            title: 'API route sin verificación de autenticación',
            description: 'Este endpoint de API no valida la autenticación del usuario antes de procesar la solicitud.',
            recommendation: 'Implementar verificación de autenticación usando Supabase Auth o middleware de Next.js. Ejemplo: const { data: { user } } = await supabase.auth.getUser()',
            cweId: 'CWE-287',
            references: ['https://owasp.org/Top10/A01_2021-Broken_Access_Control/'],
          });
        }
      }
      
      return issues;
    },
  },

  // A02: Cryptographic Failures
  {
    id: 'A02-001',
    name: 'Hardcoded Secrets',
    category: 'A02:2021-Cryptographic-Failures',
    severity: 'CRITICAL',
    description: 'Secretos o credenciales hardcodeadas en el código',
    check: (content: string, filePath: string): SecurityIssue[] => {
      const issues: SecurityIssue[] = [];
      
      // Patterns for secrets
      const secretPatterns = [
        { pattern: /api[_-]?key\s*=\s*['"][^'"]+['"]/gi, name: 'API Key' },
        { pattern: /password\s*=\s*['"][^'"]+['"]/gi, name: 'Password' },
        { pattern: /secret\s*=\s*['"][^'"]+['"]/gi, name: 'Secret' },
        { pattern: /private[_-]?key\s*=\s*['"][^'"]+['"]/gi, name: 'Private Key' },
        { pattern: /access[_-]?token\s*=\s*['"][^'"]{20,}['"]/gi, name: 'Access Token' },
      ];
      
      const lines = content.split('\n');
      
      secretPatterns.forEach(({ pattern, name }) => {
        lines.forEach((line, index) => {
          // Skip if it's using env variable
          if (/process\.env|import\.meta\.env/.test(line)) return;
          // Skip comments
          if (line.trim().startsWith('//') || line.trim().startsWith('*')) return;
          
          if (pattern.test(line)) {
            issues.push({
              id: generateId(),
              file: filePath,
              line: index + 1,
              severity: 'CRITICAL',
              category: 'A02:2021-Cryptographic-Failures',
              title: `${name} hardcodeada detectada`,
              description: `Credencial sensible encontrada directamente en el código fuente.`,
              recommendation: `Usar variables de entorno: process.env.${name.toUpperCase().replace(/\s/g, '_')}`,
              cweId: 'CWE-798',
              codeSnippet: line.trim(),
              references: ['https://owasp.org/Top10/A02_2021-Cryptographic_Failures/'],
            });
          }
        });
      });
      
      return issues;
    },
  },

  // A02: Weak Cryptography
  {
    id: 'A02-002',
    name: 'Weak Cryptography',
    category: 'A02:2021-Cryptographic-Failures',
    severity: 'HIGH',
    description: 'Uso de algoritmos criptográficos débiles',
    check: (content: string, filePath: string): SecurityIssue[] => {
      const issues: SecurityIssue[] = [];
      const lines = content.split('\n');
      
      const weakAlgorithms = ['MD5', 'SHA1', 'DES', 'RC4'];
      
      lines.forEach((line, index) => {
        weakAlgorithms.forEach(algo => {
          if (new RegExp(`\\b${algo}\\b`, 'i').test(line) && !line.trim().startsWith('//')) {
            issues.push({
              id: generateId(),
              file: filePath,
              line: index + 1,
              severity: 'HIGH',
              category: 'A02:2021-Cryptographic-Failures',
              title: `Algoritmo criptográfico débil: ${algo}`,
              description: `Se detectó el uso de ${algo}, que es considerado criptográficamente inseguro.`,
              recommendation: 'Usar algoritmos modernos como SHA-256, SHA-3, o bcrypt para hashing de contraseñas.',
              cweId: 'CWE-327',
              codeSnippet: line.trim(),
            });
          }
        });
      });
      
      return issues;
    },
  },

  // A03: Injection
  {
    id: 'A03-001',
    name: 'SQL Injection Risk',
    category: 'A03:2021-Injection',
    severity: 'CRITICAL',
    description: 'Posible vulnerabilidad de SQL Injection',
    check: (content: string, filePath: string): SecurityIssue[] => {
      const issues: SecurityIssue[] = [];
      const lines = content.split('\n');
      
      lines.forEach((line, index) => {
        // Check for string concatenation in SQL queries
        if (/sql|query|execute|from\s+\w+\s+where/i.test(line)) {
          if (/[`'"].*\$\{.*\}.*[`'"]|\+\s*req\.|concat.*req\./i.test(line)) {
            issues.push({
              id: generateId(),
              file: filePath,
              line: index + 1,
              severity: 'CRITICAL',
              category: 'A03:2021-Injection',
              title: 'Posible SQL Injection',
              description: 'Se detectó concatenación de strings en una query SQL con datos de usuario.',
              recommendation: 'Usar queries parametrizadas o prepared statements. Con Supabase, usar .eq(), .filter() en vez de raw SQL.',
              cweId: 'CWE-89',
              codeSnippet: line.trim(),
              references: ['https://owasp.org/Top10/A03_2021-Injection/'],
            });
          }
        }
      });
      
      return issues;
    },
  },

  // A03: XSS Prevention
  {
    id: 'A03-002',
    name: 'XSS Risk - Dangerous HTML Rendering',
    category: 'A03:2021-Injection',
    severity: 'HIGH',
    description: 'Riesgo de Cross-Site Scripting (XSS)',
    check: (content: string, filePath: string): SecurityIssue[] => {
      const issues: SecurityIssue[] = [];
      const lines = content.split('\n');
      
      lines.forEach((line, index) => {
        // Check for dangerouslySetInnerHTML
        if (/dangerouslySetInnerHTML/.test(line)) {
          issues.push({
            id: generateId(),
            file: filePath,
            line: index + 1,
            severity: 'HIGH',
            category: 'A03:2021-Injection',
            title: 'Uso de dangerouslySetInnerHTML detectado',
            description: 'dangerouslySetInnerHTML puede permitir ataques XSS si el contenido no está sanitizado.',
            recommendation: 'Sanitizar el HTML con DOMPurify o evitar usar dangerouslySetInnerHTML. Preferir renderizar React components.',
            cweId: 'CWE-79',
            codeSnippet: line.trim(),
          });
        }
        
        // Check for eval usage
        if (/\beval\s*\(/.test(line) && !line.trim().startsWith('//')) {
          issues.push({
            id: generateId(),
            file: filePath,
            line: index + 1,
            severity: 'CRITICAL',
            category: 'A03:2021-Injection',
            title: 'Uso de eval() detectado',
            description: 'eval() ejecuta código arbitrario y es un vector de ataque para code injection.',
            recommendation: 'Eliminar eval() completamente. Usar alternativas seguras como JSON.parse para datos.',
            cweId: 'CWE-95',
            codeSnippet: line.trim(),
          });
        }
      });
      
      return issues;
    },
  },

  // A05: Security Misconfiguration
  {
    id: 'A05-001',
    name: 'Sensitive Data in Logs',
    category: 'A05:2021-Security-Misconfiguration',
    severity: 'MEDIUM',
    description: 'Datos sensibles en logs',
    check: (content: string, filePath: string): SecurityIssue[] => {
      const issues: SecurityIssue[] = [];
      const lines = content.split('\n');
      
      lines.forEach((line, index) => {
        if (/console\.(log|error|warn|info)/.test(line)) {
          const sensitivePatterns = /(password|token|secret|key|credential|auth|ssn|credit.*card)/i;
          if (sensitivePatterns.test(line)) {
            issues.push({
              id: generateId(),
              file: filePath,
              line: index + 1,
              severity: 'MEDIUM',
              category: 'A05:2021-Security-Misconfiguration',
              title: 'Posible log de datos sensibles',
              description: 'Se detectó un log que podría contener información sensible.',
              recommendation: 'Evitar loggear datos sensibles. Si es necesario, usar un logger que redacte automáticamente campos sensibles.',
              cweId: 'CWE-532',
              codeSnippet: line.trim(),
            });
          }
        }
      });
      
      return issues;
    },
  },

  // A05: CORS Misconfiguration
  {
    id: 'A05-002',
    name: 'Permissive CORS Configuration',
    category: 'A05:2021-Security-Misconfiguration',
    severity: 'HIGH',
    description: 'Configuración permisiva de CORS',
    check: (content: string, filePath: string): SecurityIssue[] => {
      const issues: SecurityIssue[] = [];
      const lines = content.split('\n');
      
      lines.forEach((line, index) => {
        if (/Access-Control-Allow-Origin.*\*/.test(line)) {
          issues.push({
            id: generateId(),
            file: filePath,
            line: index + 1,
            severity: 'HIGH',
            category: 'A05:2021-Security-Misconfiguration',
            title: 'CORS configurado con wildcard (*)',
            description: 'Allow-Origin: * permite requests desde cualquier dominio, exponiendo la API.',
            recommendation: 'Especificar dominios permitidos explícitamente o usar un whitelist de dominios.',
            cweId: 'CWE-346',
            codeSnippet: line.trim(),
          });
        }
      });
      
      return issues;
    },
  },

  // A07: Authentication Failures
  {
    id: 'A07-001',
    name: 'Weak Password Requirements',
    category: 'A07:2021-Identification-Authentication-Failures',
    severity: 'MEDIUM',
    description: 'Requisitos débiles de contraseña',
    check: (content: string, filePath: string): SecurityIssue[] => {
      const issues: SecurityIssue[] = [];
      const lines = content.split('\n');
      
      lines.forEach((line, index) => {
        // Check for weak password validation
        if (/password.*length.*[<>]=?\s*[1-5]|password.*\.length\s*<\s*6/.test(line)) {
          issues.push({
            id: generateId(),
            file: filePath,
            line: index + 1,
            severity: 'MEDIUM',
            category: 'A07:2021-Identification-Authentication-Failures',
            title: 'Validación de contraseña débil',
            description: 'La longitud mínima de contraseña es menor a 8 caracteres.',
            recommendation: 'Establecer mínimo de 8 caracteres para contraseñas. Idealmente 12+ caracteres con requisitos de complejidad.',
            cweId: 'CWE-521',
            codeSnippet: line.trim(),
          });
        }
      });
      
      return issues;
    },
  },

  // A07: Rate Limiting
  {
    id: 'A07-002',
    name: 'Missing Rate Limiting',
    category: 'A07:2021-Identification-Authentication-Failures',
    severity: 'MEDIUM',
    description: 'Falta de rate limiting en endpoints críticos',
    check: (content: string, filePath: string): SecurityIssue[] => {
      const issues: SecurityIssue[] = [];
      
      // Check API routes for rate limiting
      if (filePath.includes('app/api/') && filePath.includes('auth')) {
        const hasRateLimit = /rateLimit|rate.*limit|throttle|isRateLimited/i.test(content);
        
        if (!hasRateLimit) {
          issues.push({
            id: generateId(),
            file: filePath,
            line: 1,
            severity: 'MEDIUM',
            category: 'A07:2021-Identification-Authentication-Failures',
            title: 'Endpoint de autenticación sin rate limiting',
            description: 'Endpoint crítico no implementa rate limiting, vulnerable a brute force.',
            recommendation: 'Implementar rate limiting (ej: max 5 intentos por minuto por IP). Ver implementación en /api/leads.',
            cweId: 'CWE-307',
          });
        }
      }
      
      return issues;
    },
  },

  // A09: Logging and Monitoring
  {
    id: 'A09-001',
    name: 'Insufficient Error Handling',
    category: 'A09:2021-Security-Logging-Monitoring-Failures',
    severity: 'LOW',
    description: 'Manejo insuficiente de errores',
    check: (content: string, filePath: string): SecurityIssue[] => {
      const issues: SecurityIssue[] = [];
      
      if (filePath.includes('app/api/')) {
        const hasTryCatch = /try\s*\{[\s\S]*catch/.test(content);
        const hasExport = /export\s+async\s+function/.test(content);
        
        if (hasExport && !hasTryCatch) {
          issues.push({
            id: generateId(),
            file: filePath,
            line: 1,
            severity: 'LOW',
            category: 'A09:2021-Security-Logging-Monitoring-Failures',
            title: 'API route sin try-catch',
            description: 'Endpoint no tiene manejo de errores adecuado. Errores no controlados pueden exponer información sensible.',
            recommendation: 'Envolver el código en try-catch y retornar errores genéricos al cliente.',
            cweId: 'CWE-755',
          });
        }
      }
      
      return issues;
    },
  },

  // Custom: Environment Variable Validation
  {
    id: 'CUSTOM-001',
    name: 'Unvalidated Environment Variables',
    category: 'A05:2021-Security-Misconfiguration',
    severity: 'LOW',
    description: 'Variables de entorno sin validación',
    check: (content: string, filePath: string): SecurityIssue[] => {
      const issues: SecurityIssue[] = [];
      const lines = content.split('\n');
      
      lines.forEach((line, index) => {
        // Check for env usage without validation
        if (/process\.env\.\w+(?!\s*\|\|)(?!\?)/.test(line) && !/\/\//.test(line)) {
          const match = line.match(/process\.env\.(\w+)/);
          if (match && !content.includes(`if (!process.env.${match[1]})`)) {
            issues.push({
              id: generateId(),
              file: filePath,
              line: index + 1,
              severity: 'LOW',
              category: 'A05:2021-Security-Misconfiguration',
              title: 'Variable de entorno sin validación',
              description: `process.env.${match[1]} usada sin verificar si existe.`,
              recommendation: `Agregar validación: const ${match[1]} = process.env.${match[1]} || 'default-value' o verificar al inicio de la app.`,
              cweId: 'CWE-754',
              codeSnippet: line.trim(),
            });
          }
        }
      });
      
      return issues;
    },
  },
];
