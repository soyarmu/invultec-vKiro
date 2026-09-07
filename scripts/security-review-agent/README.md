# 🛡️ Security Review Agent

Agente automatizado de revisión de seguridad basado en **OWASP Top 10 2021**. Se ejecuta después del Testing Agent y valida que el código cumpla con estándares de seguridad antes de aprobar el deployment.

## 📋 Características

- ✅ **Escaneo automático** basado en OWASP Top 10 2021
- 🔍 **11 reglas de seguridad** cubriendo vulnerabilidades críticas
- 📊 **Reportes detallados** con severidad, CWE IDs y recomendaciones
- 🐙 **Integración con GitHub** - Crea/actualiza issues automáticamente
- 🚦 **Gate de aprobación** - Bloquea deployment si hay issues críticos
- 📈 **Historial de escaneos** - Guarda resultados en `security-reports/`

## 🎯 Reglas Implementadas

### A01: Broken Access Control
- **A01-001**: Missing Authentication Check - Detecta API routes sin autenticación

### A02: Cryptographic Failures
- **A02-001**: Hardcoded Secrets - Detecta credenciales en código
- **A02-002**: Weak Cryptography - Detecta algoritmos débiles (MD5, SHA1, DES)

### A03: Injection
- **A03-001**: SQL Injection Risk - Detecta concatenación de strings en SQL
- **A03-002**: XSS Risk - Detecta `dangerouslySetInnerHTML`, `eval()`

### A05: Security Misconfiguration
- **A05-001**: Sensitive Data in Logs - Detecta logs de datos sensibles
- **A05-002**: Permissive CORS - Detecta CORS con wildcard (*)
- **CUSTOM-001**: Unvalidated Environment Variables - Variables sin validación

### A07: Authentication Failures
- **A07-001**: Weak Password Requirements - Detecta validaciones débiles
- **A07-002**: Missing Rate Limiting - Detecta endpoints sin rate limiting

### A09: Logging & Monitoring Failures
- **A09-001**: Insufficient Error Handling - API routes sin try-catch

## 🚀 Uso

### Local

```bash
# Ejecutar escaneo de seguridad
npm run security-review

# Con GitHub sync (requiere GITHUB_TOKEN)
GITHUB_TOKEN=ghp_xxxx npm run security-review
```

### CI/CD (GitHub Actions)

El workflow `.github/workflows/security-review.yml` se ejecuta automáticamente:

1. **On push** a `main` o `develop`
2. **On pull request** a `main` o `develop`
3. **Manual trigger** via workflow_dispatch

#### Flujo del Workflow

```
┌─────────────────┐
│   Run Tests     │
│  (npm test)     │
└────────┬────────┘
         │ ✅ PASS
         ▼
┌─────────────────┐
│ Security Scan   │
│  (OWASP rules)  │
└────────┬────────┘
         │
         ├─── ✅ PASS (no critical/high) ──► Approval ──► Deploy
         │
         └─── ❌ FAIL (critical/high) ──► Block ──► Create Issues
```

## 📊 Niveles de Severidad

| Severidad | Emoji | Acción | Deployment |
|-----------|-------|--------|-----------|
| 🔴 **CRITICAL** | CWE crítico | Fix inmediato | ❌ Bloqueado |
| 🟠 **HIGH** | Vulnerabilidad seria | Fix urgente | ❌ Bloqueado |
| 🟡 **MEDIUM** | Issue de seguridad | Fix programado | ✅ Permitido |
| 🟢 **LOW** | Mejora recomendada | Fix opcional | ✅ Permitido |
| ℹ️ **INFO** | Información | Revisar | ✅ Permitido |

## 🐙 Integración GitHub

### Issues Creados

El agente crea/actualiza automáticamente estos issues:

1. **Security Summary** (`security-summary`)
   - Resumen general del escaneo
   - Estado: PASSED/FAILED
   - Issues por severidad
   - Riesgo general

2. **Issues por Severidad** (uno por nivel con issues)
   - `security-critical` - Issues críticos
   - `security-high` - Issues de alta prioridad
   - `security-medium` - Issues de prioridad media
   - `security-low` - Issues de baja prioridad

### Estructura de Issues

Cada issue incluye:
- 📍 **Ubicación**: File path y línea
- 📝 **Descripción**: Qué es el problema
- 💡 **Recomendación**: Cómo solucionarlo
- 🔗 **CWE ID**: Link a Common Weakness Enumeration
- 📚 **Referencias**: Links a OWASP documentation
- 💻 **Code Snippet**: Código problemático

### Labels Creados

- `security-review` - Issue de revisión de seguridad
- `security-critical` - Crítico
- `security-high` - Alta prioridad
- `security-medium` - Prioridad media
- `security-low` - Baja prioridad
- `security-info` - Información
- `security-summary` - Resumen general
- `automated` - Generado automáticamente

## 📁 Estructura de Archivos

```
scripts/security-review-agent/
├── index.ts              # Entry point del agente
├── types.ts              # Definiciones de tipos TypeScript
├── security-rules.ts     # Reglas OWASP implementadas
├── scanner.ts            # Scanner de código
├── github-manager.ts     # Gestión de GitHub Issues
└── README.md            # Esta documentación

security-reports/         # Generado al ejecutar
├── latest.json          # Último escaneo
└── security-scan-*.json # Historial de escaneos
```

## 🔧 Configuración

### Variables de Entorno

```bash
# Requerido para GitHub sync
GITHUB_TOKEN=ghp_your_token_here
```

### Patrón de Archivos Escaneados

```typescript
const SCAN_PATTERNS = [
  'app/**/*.{ts,tsx,js,jsx}',
  'lib/**/*.{ts,tsx,js,jsx}',
  'components/**/*.{ts,tsx,js,jsx}',
  'pages/**/*.{ts,tsx,js,jsx}',
];
```

### Archivos Excluidos

- `tests/**` - Tests no se escanean
- `node_modules/**` - Dependencias
- `.next/**` - Build output
- `**/*.test.{ts,tsx}` - Test files

## 📈 Reportes

### Formato JSON

```json
{
  "timestamp": "2024-01-01T00:00:00.000Z",
  "filesScanned": 42,
  "issuesFound": 5,
  "summary": {
    "critical": 0,
    "high": 1,
    "medium": 2,
    "low": 2,
    "info": 0
  },
  "overallRisk": "MODERATE",
  "passedScan": false,
  "issues": [...]
}
```

### Console Output

```
🛡️  Security Review Agent

📊 Summary:
─────────────────────────────────────────────────────────
  Files Scanned:     42
  Issues Found:      5
  Overall Risk:      MODERATE
  Status:            ❌ FAILED

  Issues by Severity:
    🔴 Critical:  0
    🟠 High:      1
    🟡 Medium:    2
    🟢 Low:       2
    ℹ️  Info:      0

❌ Security scan FAILED
Fix critical and high priority issues before deploying.
```

## 🎯 Criterios de Aprobación

El escaneo **PASA** si:
- ✅ `summary.critical === 0`
- ✅ `summary.high === 0`

El escaneo **FALLA** si:
- ❌ `summary.critical > 0` OR
- ❌ `summary.high > 0`

## 🔄 Workflow en CI/CD

1. **Developer** hace push a branch
2. **GitHub Actions** ejecuta workflow
3. **Tests** corren primero (`npm test`)
4. Si tests pasan ✅ → **Security Scan** ejecuta
5. Si scan pasa ✅ → **Approval** se otorga
6. Si scan falla ❌ → **Issues** se crean en GitHub

## 🛠️ Desarrollo

### Agregar Nueva Regla

```typescript
// En security-rules.ts
{
  id: 'A10-001',
  name: 'Server-Side Request Forgery',
  category: 'A10:2021-Server-Side-Request-Forgery',
  severity: 'HIGH',
  description: 'SSRF vulnerability detected',
  check: (content: string, filePath: string): SecurityIssue[] => {
    // Tu lógica de detección aquí
    return issues;
  },
}
```

### Testing del Agente

```bash
# Ejecutar contra el codebase actual
npm run security-review

# Ver resultados
cat security-reports/latest.json | jq
```

## 📚 Referencias

- [OWASP Top 10 2021](https://owasp.org/Top10/)
- [CWE - Common Weakness Enumeration](https://cwe.mitre.org/)
- [OWASP Secure Coding Practices](https://owasp.org/www-project-secure-coding-practices-quick-reference-guide/)
- [GitHub Security Best Practices](https://docs.github.com/en/code-security)

## 🤝 Relación con Testing Agent

```
┌──────────────────────┐
│   Testing Agent      │  ← Task 1-12: Tests unitarios, E2E, cobertura
│  (testing-review)    │
└──────────┬───────────┘
           │ ✅ Tests PASS
           ▼
┌──────────────────────┐
│  Security Agent      │  ← OWASP scan, vulnerabilities
│ (security-review)    │
└──────────┬───────────┘
           │ ✅ Security PASS
           ▼
┌──────────────────────┐
│   APPROVED           │  ← Ready for deployment
│   for Deploy         │
└──────────────────────┘
```

## 📝 Notas

- El agente **NO** reemplaza auditorías de seguridad profesionales
- Es una **primera línea de defensa** automatizada
- Detecta **vulnerabilidades comunes** basadas en patrones
- **False positives** pueden ocurrir - revisar manualmente
- Actualizar reglas periódicamente según OWASP updates

---

**Versión**: 1.0.0  
**Basado en**: OWASP Top 10 2021  
**Mantenido por**: Security Review Agent  
**Última actualización**: 2024
