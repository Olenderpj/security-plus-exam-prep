// Domain 4: Security Operations (additional questions)
export default [
  {
    o: '4.1',
    q: 'A company wants to ensure its newly deployed servers continue to match the approved secure configuration over time. Which of the following activities should be performed regularly?',
    a: ['Baseline maintenance and drift monitoring', 'Tabletop exercises', 'Due diligence', 'Penetration testing only'],
    c: 0,
    e: 'Secure baselines must be established, deployed, and maintained, with systems checked for configuration drift.'
  },
  {
    o: '4.1',
    q: 'A security team wants to prevent users from connecting smartphones to corporate Wi-Fi unless the devices are enrolled in management. Which of the following should be used?',
    a: ['NAC with MDM integration', 'WPA2-PSK', 'MAC address randomization', 'Captive portal with no authentication'],
    c: 0,
    e: 'Network access control can check MDM enrollment and posture before allowing a device on the network.'
  },
  {
    o: '4.1',
    q: 'A developer runs an application and feeds it large volumes of random, malformed input to see whether it crashes. Which of the following testing methods is this?',
    a: ['Fuzzing', 'Static code analysis', 'Code signing', 'Peer review'],
    c: 0,
    e: 'Fuzzing sends unexpected or random data to a running program to uncover crashes and vulnerabilities.'
  },
  {
    o: '4.1',
    q: 'Which of the following wireless authentication methods uses a RADIUS server and individual user credentials rather than a shared passphrase?',
    a: ['WPA3-Enterprise (802.1X)', 'WPA3-Personal (SAE)', 'WPS', 'Open authentication'],
    c: 0,
    e: 'Enterprise mode uses 802.1X/EAP with a RADIUS server so each user authenticates individually.'
  },
  {
    o: '4.1',
    q: 'An administrator is hardening a Linux web server. Which of the following actions would BEST reduce the attack surface?',
    a: ['Removing unnecessary software packages', 'Enabling root login over SSH', 'Opening all high ports', 'Disabling log rotation'],
    c: 0,
    e: 'Removing unneeded software reduces the number of potential vulnerabilities.'
  },
  {
    o: '4.1',
    q: 'Before a site survey for a new office, the network team wants to visualize wireless signal strength and identify dead zones. Which of the following should the team produce?',
    a: ['Heat map', 'Network diagram', 'Risk register', 'Data flow diagram'],
    c: 0,
    e: 'A wireless heat map shows signal coverage and helps with AP placement.'
  },
  {
    o: '4.2',
    q: 'Before disposing of hard drives that will be reused within the organization, IT overwrites every sector multiple times. Which of the following processes is this?',
    a: ['Sanitization', 'Destruction', 'Certification', 'Data retention'],
    c: 0,
    e: 'Sanitization (wiping) removes data so the media can be safely reused.'
  },
  {
    o: '4.2',
    q: 'Which of the following should an organization define to determine how long data must be kept before it can be disposed of?',
    a: ['Data retention policy', 'Acceptable use policy', 'Incident response plan', 'Change management policy'],
    c: 0,
    e: 'A data retention policy specifies how long different types of data must be kept to meet legal and business needs.'
  },
  {
    o: '4.2',
    q: 'An organization automatically detects every new device that connects to its network and adds it to the asset database. Which of the following asset management practices is this?',
    a: ['Enumeration/discovery', 'Decommissioning', 'Acquisition', 'Classification'],
    c: 0,
    e: 'Automated enumeration/discovery keeps the asset inventory complete and current.'
  },
  {
    o: '4.3',
    q: 'A vulnerability scan did not report a known vulnerability that exists on a server. Which of the following BEST describes this result?',
    a: ['False negative', 'False positive', 'True positive', 'True negative'],
    c: 0,
    e: 'A false negative is a failure to detect a real vulnerability.'
  },
  {
    o: '4.3',
    q: 'An organization subscribes to a feed of indicators of compromise shared by other companies in the same industry. Which of the following BEST describes this source?',
    a: ['Threat intelligence feed (ISAC)', 'Bug bounty', 'Penetration test', 'Static analysis'],
    c: 0,
    e: 'Information Sharing and Analysis Centers (ISACs) share threat intelligence within an industry sector.'
  },
  {
    o: '4.3',
    q: 'A critical vulnerability cannot be patched until next quarter because of vendor certification requirements. The risk committee formally documents its decision to allow the system to run temporarily. Which of the following is this?',
    a: ['Exception/exemption', 'Transference', 'Avoidance', 'Validation'],
    c: 0,
    e: 'An exception (exemption) formally accepts the risk of not meeting a requirement for a period of time.'
  },
  {
    o: '4.3',
    q: 'A security analyst needs a list of publicly disclosed vulnerabilities with unique identifiers to reference in a report. Which of the following should the analyst use?',
    a: ['CVE', 'CVSS', 'SOAR', 'NetFlow'],
    c: 0,
    e: 'Common Vulnerabilities and Exposures (CVE) provides standard identifiers for known vulnerabilities.'
  },
  {
    o: '4.3',
    q: 'Which of the following factors should a security team consider when prioritizing vulnerabilities for remediation? (Select TWO).',
    a: ['Exposure of the affected system', 'CVSS severity', 'The color of the scanner dashboard', 'Alphabetical order of hostnames', 'Vendor logo', 'Number of characters in the CVE ID'],
    c: [0, 1],
    e: 'Severity scores, exposure, environmental factors, and asset criticality drive remediation priority.'
  },
  {
    o: '4.4',
    q: 'A SOC analyst wants to collect logs from many Linux servers and network devices into a central server using a standard protocol. Which of the following should be used?',
    a: ['Syslog', 'SNMP traps only', 'SMTP', 'LDAP'],
    c: 0,
    e: 'Syslog is a standard protocol for sending log messages to a central collector.'
  },
  {
    o: '4.4',
    q: 'Which of the following tools is designed to monitor cloud application usage, enforce policies, and detect shadow IT across SaaS services?',
    a: ['CASB', 'IDS', 'NetFlow collector', 'Jump server'],
    c: 0,
    e: 'A cloud access security broker (CASB) provides visibility and policy enforcement for cloud/SaaS usage.'
  },
  {
    o: '4.4',
    q: 'A security analyst needs to keep logs for one year to meet a compliance requirement. Which of the following alerting and monitoring activities does this describe?',
    a: ['Archiving/retention', 'Quarantine', 'Alert tuning', 'Aggregation'],
    c: 0,
    e: 'Archiving logs for the required retention period supports compliance and later investigations.'
  },
  {
    o: '4.4',
    q: 'An agent installed on each server checks file integrity and reports when system binaries are modified. Which of the following tools is this?',
    a: ['File integrity monitoring', 'Load balancer', 'DLP', 'Proxy'],
    c: 0,
    e: 'File integrity monitoring (FIM) detects unauthorized changes to critical files by comparing hashes.'
  },
  {
    o: '4.5',
    q: 'An email gateway checks whether incoming messages are signed with a valid domain key and then applies the sender domain\'s published policy to quarantine failures. Which of the following are being used? (Select TWO).',
    a: ['DKIM', 'DMARC', 'SNMP', 'LDAP', 'RDP', 'TFTP'],
    c: [0, 1],
    e: 'DKIM provides the cryptographic signature; DMARC publishes the policy for handling messages that fail SPF/DKIM.'
  },
  {
    o: '4.5',
    q: 'A company wants to block employees from accessing gambling and malware sites based on website categories. Which of the following should be implemented?',
    a: ['Web/URL filtering', 'File integrity monitoring', 'Full-disk encryption', 'Port security'],
    c: 0,
    e: 'Web filtering (category-based URL filtering) blocks access to websites by category or reputation.'
  },
  {
    o: '4.5',
    q: 'Which of the following technologies analyzes normal user and device behavior and alerts on deviations, such as a user suddenly downloading large amounts of data?',
    a: ['UEBA', 'SPF', 'NAT', 'VPN'],
    c: 0,
    e: 'User and entity behavior analytics (UEBA) baselines normal behavior and detects anomalies.'
  },
  {
    o: '4.5',
    q: 'A firewall administrator creates a rule to allow only TCP port 443 from the internet to the web server and denies everything else. Which of the following principles does the final rule represent?',
    a: ['Implicit deny', 'Fail-open', 'Separation of duties', 'Job rotation'],
    c: 0,
    e: 'Implicit deny blocks all traffic that is not explicitly allowed.'
  },
  {
    o: '4.5',
    q: 'Which of the following DNS security extensions uses digital signatures to verify that DNS responses have not been tampered with?',
    a: ['DNSSEC', 'DNS over port 53 only', 'Dynamic DNS', 'Split DNS'],
    c: 0,
    e: 'DNSSEC signs DNS records so resolvers can validate their authenticity and integrity, mitigating DNS poisoning.'
  },
  {
    o: '4.5',
    q: 'A switch is configured to allow only a specific number of MAC addresses per port and to shut down the port if an unknown device connects. Which of the following is this?',
    a: ['Port security', '802.1Q tagging', 'Spanning Tree Protocol', 'Link aggregation'],
    c: 0,
    e: 'Port security restricts which and how many MAC addresses can use a switch port.'
  },
  {
    o: '4.6',
    q: 'When an employee is hired, an automated workflow creates their accounts and grants access based on their job title. When they leave, access is removed. Which of the following processes does this describe?',
    a: ['Provisioning and deprovisioning', 'Attestation', 'Federation', 'Single sign-on'],
    c: 0,
    e: 'Provisioning grants access at onboarding; deprovisioning removes it at offboarding or role change.'
  },
  {
    o: '4.6',
    q: 'A mobile app wants permission to post to a user\'s social media account without ever receiving the user\'s password. Which of the following protocols is designed for this?',
    a: ['OAuth', 'RADIUS', 'Kerberos', 'TACACS+'],
    c: 0,
    e: 'OAuth is an authorization framework that grants delegated access via tokens without sharing credentials.'
  },
  {
    o: '4.6',
    q: 'An access policy allows contractors to view project files only during business hours and only from company-managed devices. Which of the following access control models does this BEST describe?',
    a: ['Attribute-based access control', 'Discretionary access control', 'Mandatory access control', 'Role-based access control'],
    c: 0,
    e: 'ABAC evaluates multiple attributes (user type, time, device) to make access decisions.'
  },
  {
    o: '4.6',
    q: 'Which of the following authentication methods is MOST resistant to phishing?',
    a: ['FIDO2 security key', 'SMS one-time code', 'Security questions', 'Email one-time link'],
    c: 0,
    e: 'FIDO2/WebAuthn hardware keys are bound to the legitimate site\'s origin, so credentials cannot be relayed to a phishing site.'
  },
  {
    o: '4.6',
    q: 'A manager reviews a quarterly report listing all users with access to the finance application and confirms each user still requires it. Which of the following is this?',
    a: ['Access recertification/attestation', 'Provisioning', 'Federation', 'Password vaulting'],
    c: 0,
    e: 'Periodic access reviews (attestation) verify that users\' permissions remain appropriate.'
  },
  {
    o: '4.6',
    q: 'A privileged access management solution grants an administrator elevated permissions for 30 minutes to complete a task, after which the permissions are automatically revoked. Which of the following is this?',
    a: ['Just-in-time permissions', 'Permanent admin rights', 'Federation', 'Password complexity'],
    c: 0,
    e: 'Just-in-time (JIT) access grants privileges only when needed and for a limited time.'
  },
  {
    o: '4.7',
    q: 'A company uses scripts to automatically create user accounts, assign groups, and provision resources when new employees are added to the HR system. Which of the following benefits does this PRIMARILY provide?',
    a: ['Efficiency and consistency', 'Increased complexity', 'Single point of failure', 'Higher cost'],
    c: 0,
    e: 'Automating provisioning saves time and applies changes consistently, reducing human error.'
  },
  {
    o: '4.7',
    q: 'Which of the following uses of automation would BEST support enforcing security baselines across hundreds of servers?',
    a: ['Configuration management scripts that apply and verify settings', 'Manual checklist reviews', 'Annual audits only', 'Emailing administrators reminders'],
    c: 0,
    e: 'Automated configuration management continuously enforces baselines at scale.'
  },
  {
    o: '4.8',
    q: 'After an incident has been resolved, the team meets to discuss what happened, what worked, and how to improve. Which phase of incident response is this?',
    a: ['Lessons learned', 'Containment', 'Detection', 'Preparation'],
    c: 0,
    e: 'Lessons learned (post-incident activity) identifies improvements to processes and controls.'
  },
  {
    o: '4.8',
    q: 'An incident responder removes malware, deletes unauthorized accounts, and patches the exploited vulnerability. Which phase of incident response is this?',
    a: ['Eradication', 'Containment', 'Recovery', 'Analysis'],
    c: 0,
    e: 'Eradication removes the root cause and artifacts of the incident from the environment.'
  },
  {
    o: '4.8',
    q: 'A security team determines the underlying reason an incident occurred so that it can prevent it from happening again. Which of the following is this?',
    a: ['Root cause analysis', 'Threat hunting', 'Legal hold', 'E-discovery'],
    c: 0,
    e: 'Root cause analysis identifies the fundamental cause of an incident to prevent recurrence.'
  },
  {
    o: '4.8',
    q: 'Analysts proactively search through logs and endpoint data for signs of an attacker that existing tools have not alerted on. Which of the following is this?',
    a: ['Threat hunting', 'Vulnerability scanning', 'Tabletop exercise', 'Change management'],
    c: 0,
    e: 'Threat hunting is a proactive search for threats that evaded automated detection.'
  },
  {
    o: '4.8',
    q: 'A forensic analyst creates a bit-by-bit copy of a hard drive and calculates a hash of both the original and the copy. Which of the following is the PRIMARY purpose of the hash?',
    a: ['To prove the copy is identical and unaltered', 'To encrypt the evidence', 'To compress the image', 'To identify the attacker'],
    c: 0,
    e: 'Matching hashes demonstrate the integrity of the forensic image, supporting admissibility.'
  },
  {
    o: '4.8',
    q: 'A company must locate and produce electronic documents relevant to a lawsuit. Which of the following processes is this?',
    a: ['E-discovery', 'Threat hunting', 'Sandboxing', 'Tokenization'],
    c: 0,
    e: 'Electronic discovery (e-discovery) is the identification and collection of electronic data for legal proceedings.'
  },
  {
    o: '4.9',
    q: 'An analyst investigating a phishing incident wants to know which users clicked the malicious link. Which of the following data sources would MOST likely provide this information?',
    a: ['Web proxy logs', 'Vulnerability scan results', 'Firewall rule base', 'Asset inventory'],
    c: 0,
    e: 'Proxy logs record outbound web requests by user, showing who visited the malicious URL.'
  },
  {
    o: '4.9',
    q: 'A security analyst needs to determine which process created a suspicious file and which user account ran it on a Windows workstation. Which of the following data sources is BEST?',
    a: ['Endpoint logs (EDR/OS event logs)', 'NetFlow', 'Firewall logs', 'DNS server logs'],
    c: 0,
    e: 'Endpoint and OS security logs record process creation, user context, and file activity on the host.'
  },
  {
    o: '4.9',
    q: 'An analyst wants a single view showing real-time trends of alerts, top attacked hosts, and incident counts for the SOC. Which of the following should be used?',
    a: ['Dashboard', 'Packet capture', 'Chain of custody form', 'Legal hold'],
    c: 0,
    e: 'Dashboards summarize data visually, helping analysts spot trends and prioritize work.'
  }
]
