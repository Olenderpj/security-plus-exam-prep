// CompTIA Security+ SY0-701 exam domains and their official weightings.
export const DOMAINS = [
  {
    id: 1,
    name: 'General Security Concepts',
    weight: 12,
    objectives: [
      '1.1 Security control categories and types',
      '1.2 Fundamental security concepts',
      '1.3 Change management processes',
      '1.4 Cryptographic solutions'
    ]
  },
  {
    id: 2,
    name: 'Threats, Vulnerabilities, and Mitigations',
    weight: 22,
    objectives: [
      '2.1 Threat actors and motivations',
      '2.2 Threat vectors and attack surfaces',
      '2.3 Types of vulnerabilities',
      '2.4 Indicators of malicious activity',
      '2.5 Mitigation techniques'
    ]
  },
  {
    id: 3,
    name: 'Security Architecture',
    weight: 18,
    objectives: [
      '3.1 Architecture models',
      '3.2 Securing enterprise infrastructure',
      '3.3 Protecting data',
      '3.4 Resilience and recovery'
    ]
  },
  {
    id: 4,
    name: 'Security Operations',
    weight: 28,
    objectives: [
      '4.1 Security techniques for computing resources',
      '4.2 Asset management',
      '4.3 Vulnerability management',
      '4.4 Alerting and monitoring',
      '4.5 Enterprise capabilities to enhance security',
      '4.6 Identity and access management',
      '4.7 Automation and orchestration',
      '4.8 Incident response',
      '4.9 Data sources for investigations'
    ]
  },
  {
    id: 5,
    name: 'Security Program Management and Oversight',
    weight: 20,
    objectives: [
      '5.1 Security governance',
      '5.2 Risk management',
      '5.3 Third-party risk',
      '5.4 Security compliance',
      '5.5 Audits and assessments',
      '5.6 Security awareness practices'
    ]
  }
]

export const domainById = (id) => DOMAINS.find((d) => d.id === Number(id))

// Real exam: max 90 questions, 90 minutes, 100–900 scale, 750 to pass.
export const EXAM = { questions: 90, minutes: 90, passScaled: 750 }
