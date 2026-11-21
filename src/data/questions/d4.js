// Domain 4: Security Operations
export default [
  {
    o: '4.1',
    q: 'A company wants to ensure all new servers are deployed with the same approved, hardened configuration. Which of the following should be created first?',
    a: ['Secure baseline', 'Incident response plan', 'Risk register', 'Data retention policy'],
    c: 0,
    e: 'A secure baseline defines the standard hardened configuration that systems are deployed with and measured against.'
  },
  {
    o: '4.1',
    q: 'A company issues smartphones to employees but wants the ability to remotely wipe them, enforce screen locks, and push applications. Which of the following should be implemented?',
    a: ['MDM', 'DLP', 'SIEM', 'NAC'],
    c: 0,
    e: 'Mobile device management (MDM) centrally manages mobile device policies, apps, and remote wipe.'
  },
  {
    o: '4.1',
    q: 'Which of the following deployment models allows employees to choose from a list of company-approved devices that the company purchases and owns?',
    a: ['CYOD', 'BYOD', 'COPE', 'VDI'],
    c: 0,
    e: 'Choose your own device (CYOD) lets users pick from approved devices that the company owns. COPE devices are company-owned, personally enabled, typically assigned rather than chosen.'
  },
  {
    o: '4.1',
    q: 'A security administrator is configuring a new wireless network for employees. Which of the following provides the STRONGEST security?',
    a: ['WPA3-Enterprise', 'WPA2-PSK', 'WEP', 'Open network with captive portal'],
    c: 0,
    e: 'WPA3-Enterprise uses 802.1X authentication with individual credentials and stronger encryption than previous standards.'
  },
  {
    o: '4.1',
    q: 'A developer wants to identify vulnerabilities in source code without executing the application. Which of the following should the developer use?',
    a: ['Static code analysis', 'Dynamic analysis', 'Fuzzing', 'Penetration testing'],
    c: 0,
    e: 'Static application security testing (SAST) examines source code without running it. Dynamic analysis and fuzzing test running code.'
  },
  {
    o: '4.1',
    q: 'A web developer wants to prevent injection attacks by ensuring user-supplied data matches an expected format before processing. Which of the following should be implemented?',
    a: ['Input validation', 'Code signing', 'Sandboxing', 'Obfuscation'],
    c: 0,
    e: 'Input validation checks that input conforms to expected types, lengths, and formats, mitigating injection attacks.'
  },
  {
    o: '4.2',
    q: 'A company is decommissioning laptops and needs proof that the hard drives were destroyed by a third-party vendor. Which of the following should the company obtain?',
    a: ['Certificate of destruction', 'Chain of custody form only', 'Data retention policy', 'Asset tag'],
    c: 0,
    e: 'A certificate of destruction documents that media was properly destroyed, providing evidence for compliance.'
  },
  {
    o: '4.2',
    q: 'Which of the following asset management activities ensures that every device is assigned to a responsible owner and tracked throughout its lifecycle?',
    a: ['Inventory and ownership assignment', 'Penetration testing', 'Tokenization', 'Threat hunting'],
    c: 0,
    e: 'Asset inventory with ownership assignment tracks hardware and software and establishes accountability.'
  },
  {
    o: '4.3',
    q: 'A vulnerability scan reports a critical vulnerability on a server, but upon investigation the administrator finds the affected software is not installed. Which of the following BEST describes this result?',
    a: ['False positive', 'False negative', 'True positive', 'True negative'],
    c: 0,
    e: 'A false positive is a reported issue that does not actually exist.'
  },
  {
    o: '4.3',
    q: 'A security analyst needs to prioritize remediation of vulnerabilities across the organization. Which of the following provides a standardized severity score for each vulnerability?',
    a: ['CVSS', 'CVE', 'SCAP', 'STIX'],
    c: 0,
    e: 'The Common Vulnerability Scoring System (CVSS) rates severity from 0–10. CVE provides identifiers, not scores.'
  },
  {
    o: '4.3',
    q: 'A vulnerability scanner logs in to target systems with administrative credentials to check installed patches and configurations. Which of the following scan types is this?',
    a: ['Credentialed scan', 'Non-credentialed scan', 'Passive scan', 'Port scan'],
    c: 0,
    e: 'Credentialed scans authenticate to systems, providing more accurate results with fewer false positives.'
  },
  {
    o: '4.3',
    q: 'After applying a patch for a reported vulnerability, what should the security team do NEXT?',
    a: ['Rescan to validate remediation', 'Close the ticket without verification', 'Purchase cyber insurance', 'Update the acceptable use policy'],
    c: 0,
    e: 'Validation through rescanning confirms that remediation was successful before closing the finding.'
  },
  {
    o: '4.3',
    q: 'A company offers rewards to external security researchers who responsibly disclose vulnerabilities in its web applications. Which of the following does this describe?',
    a: ['Bug bounty program', 'Red team exercise', 'Threat feed', 'Responsible use policy'],
    c: 0,
    e: 'Bug bounty programs pay independent researchers for responsibly reporting vulnerabilities.'
  },
  {
    o: '4.4',
    q: 'A security team wants a single platform that aggregates logs from firewalls, servers, and endpoints and correlates events to generate alerts. Which of the following should be deployed?',
    a: ['SIEM', 'DLP', 'MDM', 'WAF'],
    c: 0,
    e: 'A Security Information and Event Management (SIEM) system collects, aggregates, and correlates log data to detect threats.'
  },
  {
    o: '4.4',
    q: 'Which of the following versions of SNMP supports authentication and encryption and should be used to securely monitor network devices?',
    a: ['SNMPv3', 'SNMPv1', 'SNMPv2c', 'SNMP community strings'],
    c: 0,
    e: 'SNMPv3 adds authentication and encryption. v1 and v2c use plaintext community strings.'
  },
  {
    o: '4.4',
    q: 'A SOC analyst is receiving so many low-priority alerts that important alerts are being missed. Which of the following should the analyst do FIRST?',
    a: ['Tune the alert thresholds and rules', 'Disable the SIEM', 'Increase log retention', 'Add more log sources'],
    c: 0,
    e: 'Alert tuning reduces false positives and alert fatigue so that meaningful alerts are noticed.'
  },
  {
    o: '4.5',
    q: 'A company wants to prevent employees from emailing documents containing credit card numbers outside the organization. Which of the following should be implemented?',
    a: ['DLP', 'IDS', 'EDR', 'Proxy caching'],
    c: 0,
    e: 'Data loss prevention (DLP) detects and blocks sensitive data from leaving the organization.'
  },
  {
    o: '4.5',
    q: 'Which of the following email security mechanisms allows a domain owner to publish which mail servers are authorized to send email on its behalf?',
    a: ['SPF', 'DKIM', 'DMARC', 'S/MIME'],
    c: 0,
    e: 'Sender Policy Framework (SPF) is a DNS TXT record listing authorized sending servers. DKIM signs messages; DMARC defines policy and reporting.'
  },
  {
    o: '4.5',
    q: 'A security team wants a tool on each workstation that continuously monitors behavior, detects threats, and can automatically isolate the host from the network. Which of the following BEST meets this requirement?',
    a: ['EDR', 'Antivirus with signature-only detection', 'HIDS in passive mode', 'Host-based firewall'],
    c: 0,
    e: 'Endpoint detection and response (EDR) provides behavioral monitoring, investigation, and automated responses like isolation.'
  },
  {
    o: '4.5',
    q: 'A company redirects requests for known malicious domains to an internal IP address so infected hosts cannot reach command-and-control servers. Which of the following is this?',
    a: ['DNS sinkhole', 'DNSSEC', 'Honeynet', 'Reverse proxy'],
    c: 0,
    e: 'A DNS sinkhole returns a false/internal address for malicious domains, blocking access and helping identify infected hosts.'
  },
  {
    o: '4.6',
    q: 'Employees log in once to their workstation and can then access email, the HR portal, and the CRM without entering credentials again. Which of the following is being used?',
    a: ['Single sign-on', 'Multifactor authentication', 'Password vaulting', 'Attestation'],
    c: 0,
    e: 'Single sign-on (SSO) allows one authentication to grant access to multiple systems.'
  },
  {
    o: '4.6',
    q: 'A user enters a password and then approves a push notification on their phone. Which of the following authentication factors are being used? (Select TWO).',
    a: ['Something you know', 'Something you have', 'Something you are', 'Somewhere you are', 'Something you do', 'Something you exhibit'],
    c: [0, 1],
    e: 'A password is something you know; a phone receiving a push notification is something you have.'
  },
  {
    o: '4.6',
    q: 'An access control model assigns permissions based on job functions such as "Accountant" or "HR Manager." Which of the following models is this?',
    a: ['Role-based access control', 'Mandatory access control', 'Discretionary access control', 'Rule-based access control'],
    c: 0,
    e: 'RBAC assigns permissions to roles, and users inherit permissions based on their assigned roles.'
  },
  {
    o: '4.6',
    q: 'A government system labels data as Secret or Top Secret and grants access only to users with matching clearance levels. Which of the following access control models is in use?',
    a: ['Mandatory access control', 'Discretionary access control', 'Role-based access control', 'Attribute-based access control'],
    c: 0,
    e: 'MAC uses labels and clearances enforced by the system; owners cannot change access.'
  },
  {
    o: '4.6',
    q: 'A company wants administrators to check out privileged credentials only when needed, with passwords rotated automatically after use. Which of the following solutions should be implemented?',
    a: ['Privileged access management', 'Federation', 'Kerberos', 'LDAP'],
    c: 0,
    e: 'PAM solutions provide password vaulting, just-in-time access, and ephemeral credentials for privileged accounts.'
  },
  {
    o: '4.6',
    q: 'A company allows users to log in to a partner\'s web application using their corporate credentials via XML-based assertions. Which of the following protocols is MOST likely used?',
    a: ['SAML', 'RADIUS', 'TACACS+', 'Kerberos'],
    c: 0,
    e: 'SAML is an XML-based standard for exchanging authentication and authorization assertions between an identity provider and service provider (federation).'
  },
  {
    o: '4.7',
    q: 'A SOC wants to automatically enrich alerts, block malicious IPs on the firewall, and open tickets without analyst intervention. Which of the following should be implemented?',
    a: ['SOAR', 'SIEM only', 'NetFlow', 'UEBA'],
    c: 0,
    e: 'Security Orchestration, Automation, and Response (SOAR) uses playbooks to automate response actions across tools.'
  },
  {
    o: '4.7',
    q: 'Which of the following is a potential DRAWBACK of extensive security automation?',
    a: ['Technical debt and complexity', 'Faster reaction time', 'Enforced baselines', 'Workforce multiplier'],
    c: 0,
    e: 'Automation can introduce complexity, cost, a single point of failure, and technical debt if not maintained.'
  },
  {
    o: '4.8',
    q: 'A security analyst confirms that malware has infected several workstations. According to the incident response process, which of the following should the analyst do NEXT?',
    a: ['Containment', 'Eradication', 'Recovery', 'Lessons learned'],
    c: 0,
    e: 'The order is Preparation, Detection, Analysis, Containment, Eradication, Recovery, Lessons learned. After confirming (analysis), contain to stop the spread.'
  },
  {
    o: '4.8',
    q: 'A forensic investigator is collecting evidence from a running system. Which of the following should be collected FIRST?',
    a: ['CPU cache and RAM contents', 'Hard drive image', 'Backup tapes', 'Archived logs'],
    c: 0,
    e: 'Following the order of volatility, the most volatile data (CPU registers, cache, RAM) should be collected first.'
  },
  {
    o: '4.8',
    q: 'Which of the following documents tracks every person who handled a piece of evidence, when, and why?',
    a: ['Chain of custody', 'Legal hold', 'Incident report', 'Root cause analysis'],
    c: 0,
    e: 'Chain of custody documents evidence handling to ensure it remains admissible.'
  },
  {
    o: '4.8',
    q: 'The incident response team gathers stakeholders in a conference room to talk through their response to a hypothetical ransomware scenario. Which of the following is this?',
    a: ['Tabletop exercise', 'Simulation', 'Failover test', 'Penetration test'],
    c: 0,
    e: 'A tabletop exercise is a discussion-based walkthrough of a scenario without affecting systems.'
  },
  {
    o: '4.8',
    q: 'Legal counsel instructs IT to preserve all email and documents related to a pending lawsuit and suspend normal deletion schedules. Which of the following is this?',
    a: ['Legal hold', 'E-discovery', 'Chain of custody', 'Data retention policy'],
    c: 0,
    e: 'A legal hold requires preservation of potentially relevant data when litigation is anticipated.'
  },
  {
    o: '4.9',
    q: 'An analyst wants to determine which internal hosts communicated with a suspicious external IP and how much data was transferred, without capturing full packets. Which of the following data sources is BEST?',
    a: ['NetFlow/metadata', 'Application logs', 'Packet capture', 'Vulnerability scan'],
    c: 0,
    e: 'NetFlow provides flow metadata (source, destination, ports, bytes) without full packet payloads.'
  },
  {
    o: '4.9',
    q: 'An analyst needs to see the exact contents of a suspicious HTTP session to determine what data was exfiltrated. Which of the following data sources should be used?',
    a: ['Packet capture', 'NetFlow', 'Firewall allow logs', 'Dashboards'],
    c: 0,
    e: 'Full packet capture contains payload contents, allowing reconstruction of the session.'
  }
]
