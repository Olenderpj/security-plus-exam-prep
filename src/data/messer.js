// Section-header suggestions for Notes, modelled on Professor Messer's SY0-701 video titles
// ("1.2 - Zero Trust"). These were written from memory and NOT checked against his site, so
// some wording may differ slightly; headers stay fully editable. The official exam-objective
// names from domains.js are appended as a fallback so every objective has a header.
import { DOMAINS, objectivesOf } from './domains.js'

const videos = `
1.1 - Security Controls
1.2 - The CIA Triad
1.2 - Non-repudiation
1.2 - Authentication, Authorization, and Accounting
1.2 - Gap Analysis
1.2 - Zero Trust
1.2 - Physical Security
1.2 - Deception and Disruption Technology
1.3 - Business Processes Impacting Security Operations
1.3 - Technical Implications of Changes
1.3 - Documenting Changes
1.3 - Version Control
1.4 - Cryptographic Concepts
1.4 - Symmetric and Asymmetric Encryption
1.4 - Hashing and Digital Signatures
1.4 - Public Key Infrastructure
1.4 - Encrypting Data
1.4 - Key Exchange
1.4 - Encryption Technologies
1.4 - Obfuscation
1.4 - Blockchain Technology
1.4 - Certificates
2.1 - Threat Actors and Motivations
2.2 - Common Threat Vectors
2.2 - Phishing
2.2 - Impersonation
2.2 - Watering Hole Attacks
2.2 - Other Social Engineering Attacks
2.3 - Memory Injections
2.3 - Buffer Overflows
2.3 - Race Conditions
2.3 - Malicious Updates
2.3 - Operating System Vulnerabilities
2.3 - SQL Injection
2.3 - Cross-site Scripting
2.3 - Hardware Vulnerabilities
2.3 - Virtualization Vulnerabilities
2.3 - Cloud-specific Vulnerabilities
2.3 - Supply Chain Vulnerabilities
2.3 - Misconfiguration Vulnerabilities
2.3 - Mobile Device Vulnerabilities
2.3 - Zero-day Attacks
2.4 - Malware Attacks
2.4 - Ransomware
2.4 - Trojans
2.4 - Rootkits
2.4 - Viruses and Worms
2.4 - Spyware
2.4 - Bloatware
2.4 - Keyloggers
2.4 - Logic Bombs
2.4 - Physical Attacks
2.4 - Denial of Service
2.4 - DNS Attacks
2.4 - Wireless Attacks
2.4 - On-path Attacks
2.4 - Replay Attacks
2.4 - Malicious Code
2.4 - Application Attacks
2.4 - Cryptographic Attacks
2.4 - Password Attacks
2.4 - Indicators of Compromise
2.5 - Segmentation and Access Control
2.5 - Mitigating an Attack
2.5 - Hardening Techniques
3.1 - Cloud Infrastructures
3.1 - Infrastructure as Code
3.1 - Serverless Computing
3.1 - Microservices and APIs
3.1 - Infrastructure Considerations
3.1 - Network Infrastructure Concepts
3.1 - Other Infrastructure Concepts
3.2 - Infrastructure Security
3.2 - Intrusion Prevention Systems
3.2 - Network Appliances
3.2 - Port Security
3.2 - Firewall Types
3.2 - Secure Communication
3.3 - Data Types and Classifications
3.3 - States of Data
3.3 - Protecting Data
3.3 - Data Sovereignty
3.4 - Resilience and Recovery
3.4 - Capacity Planning
3.4 - Recovery Testing
3.4 - Backups
3.4 - Power Resiliency
4.1 - Secure Baselines
4.1 - Mobile Device Security
4.1 - Wireless Security Settings
4.1 - Application Security
4.1 - Sandboxing
4.1 - Monitoring
4.2 - Asset Management
4.2 - Data Destruction and Media Sanitization
4.3 - Vulnerability Scanning
4.3 - Penetration Testing
4.3 - Analyzing Vulnerabilities
4.3 - Vulnerability Remediation
4.4 - Security Monitoring
4.4 - Security Tools
4.4 - Alerting
4.5 - Firewalls
4.5 - Web Filtering
4.5 - Operating System Security
4.5 - Secure Protocols
4.5 - Email Security
4.5 - Endpoint Security
4.5 - Identity and Access Management
4.6 - Provisioning and Deprovisioning
4.6 - Federation
4.6 - Single Sign-on
4.6 - Access Controls
4.6 - Multifactor Authentication
4.6 - Password Security
4.6 - Privileged Access Management
4.7 - Scripting and Automation
4.8 - Incident Response
4.8 - Digital Forensics
4.9 - Log Data
4.9 - Data Sources
5.1 - Security Policies
5.1 - Security Standards
5.1 - Security Procedures
5.1 - Security Governance
5.1 - Governance Considerations
5.1 - Data Roles and Responsibilities
5.2 - Risk Management
5.2 - Risk Analysis
5.2 - Risk Management Strategies
5.2 - Business Impact Analysis
5.3 - Third-party Risk Assessment
5.3 - Agreement Types
5.4 - Compliance
5.4 - Privacy
5.5 - Audits and Assessments
5.5 - Penetration Testing
5.6 - Security Awareness
5.6 - User Training
`
  .trim()
  .split('\n')

const objectives = DOMAINS.flatMap((d) => objectivesOf(d).map((o) => `${o.code} - ${o.name}`))

// [{ title, domain }] in course order, objective names last, no duplicates.
export default [...new Set([...videos, ...objectives])].map((title) => ({ title, domain: Number(title[0]) }))
