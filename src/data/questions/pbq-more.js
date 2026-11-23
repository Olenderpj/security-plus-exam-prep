// More performance-based questions, covering formats that show up in practice: network placement, hardening,
// email-header and certificate analysis, access reviews, vulnerability triage, cloud rule review, forensics and
// incident-response workflow, recovery tiers, scan interpretation, code review, protocol replacement, event IDs.
// Same format as pbq.js (match: items = [label, correct choice, own choices?]; order: items in correct order).
export default [
  // 1. Where does each system belong?
  {
    d: 3, t: 'match', o: '3.2', lv: 6.6,
    q: 'Place each system in the network zone where it belongs in a secure enterprise design.',
    choices: ['Internet edge', 'DMZ', 'Internal server network', 'Management network', 'User network'],
    items: [
      ['Perimeter firewall', 'Internet edge'],
      ['Public web server', 'DMZ'],
      ['Reverse proxy / web application firewall', 'DMZ'],
      ['HR database server', 'Internal server network'],
      ['Jump server used by administrators', 'Management network'],
      ['SIEM log collector', 'Management network'],
      ['Employee laptops', 'User network']
    ],
    e: 'The firewall sits at the Internet edge. Systems that must accept connections from the Internet (public web server, reverse proxy or WAF) go in the DMZ (screened subnet), so a compromise does not land directly on the internal network. The HR database is never exposed to the Internet and belongs on the internal server network behind another firewall. Administration tools such as the jump server and SIEM collector sit on a separate management network reachable only by administrators, and employee devices live on a user network with restricted access to servers.',
    w: ['Drag each system into the correct network segment.', 'Assign each device to the zone that best limits the damage if it is compromised.']
  },

  // 2. Hardening decisions
  {
    d: 4, t: 'match', o: '4.1', lv: 5.9,
    q: 'A new server has been audited. For each finding, choose the hardening action that should be taken.',
    choices: ['Disable', 'Enable', 'Change', 'Keep as is'],
    items: [
      ['Telnet service is running', 'Disable'],
      ['SSH allows direct root login', 'Disable'],
      ['SMBv1 is enabled', 'Disable'],
      ['The default administrator password has not been changed', 'Change'],
      ['Host firewall is on with a default-deny inbound policy', 'Keep as is'],
      ['Automatic security updates are turned off', 'Enable'],
      ['An unused FTP server is running', 'Disable'],
      ['Full-disk encryption is enabled', 'Keep as is']
    ],
    e: 'Remove or disable what is not needed (Telnet, unused FTP, SMBv1, direct root SSH) to reduce the attack surface and replace insecure protocols. Default credentials must be changed. Automatic security updates should be enabled so patches are not missed. A default-deny host firewall and full-disk encryption are already good practice and should be kept.',
    w: ['Choose the correct hardening action for each audit finding.', 'Decide what to do about each configuration problem on the new server.']
  },

  // 3. Email header analysis
  {
    d: 2, t: 'match', o: '2.2', lv: 7.2,
    x: `Received: from mail.c0mpany-support.net (203.0.113.77) by mx.company.com
Authentication-Results: mx.company.com;
    spf=fail (sender IP 203.0.113.77 is not permitted) smtp.mailfrom=billing@company.com;
    dkim=none;
    dmarc=fail (p=quarantine) header.from=company.com
From:     "Accounts Payable" <billing@company.com>
Reply-To: pay-now@c0mpany-support.net
Subject:  Invoice 88213 is overdue - wire payment today
X-Mailer: bulk-sender 3.1`,
    q: 'Analyze the email headers in the exhibit and answer each question.',
    choices: ['Pass', 'Fail', 'No signature present'],
    items: [
      ['SPF result for company.com', 'Fail'],
      ['DKIM result', 'No signature present'],
      ['DMARC result', 'Fail'],
      ['Most likely nature of this message', 'Spoofed phishing / business email compromise attempt', ['Legitimate invoice reminder', 'Spoofed phishing / business email compromise attempt', 'Spam from a marketing list', 'A message altered in transit by the mail server']],
      ['Where replies will go', 'To the attacker-controlled lookalike domain', ['To billing@company.com', 'To the attacker-controlled lookalike domain', 'To the recipient\'s own mailbox', 'To the mail gateway']],
      ['Best handling', 'Quarantine, report it and warn the finance team not to pay', ['Pay the invoice to avoid penalties', 'Quarantine, report it and warn the finance team not to pay', 'Reply asking if it is real', 'Whitelist the sender']]
    ],
    e: 'SPF fails because 203.0.113.77 is not an authorized sender for company.com, there is no DKIM signature, and DMARC fails for the From domain: the sender address was spoofed. The Reply-To points to a lookalike domain (c0mpany-support.net) so any reply goes to the attacker, and the urgent wire-payment wording is typical business email compromise. Quarantine and report it, warn the finance team, and never pay from an unverified request.',
    w: ['Read the message headers and answer the questions about authentication and intent.', 'Determine whether this email is genuine using the exhibit.']
  },

  // 4. Access review
  {
    d: 4, t: 'match', o: '4.6', lv: 7.0,
    x: `User        Dept     Status       Entitlements                                  Last login
jlee        Finance  Active       Create vendor; Approve payment                2026-03-12
mpatel      Finance  Active       Approve payment                               2026-03-13
tgreen      Sales    Terminated   VPN; CRM                                      2026-01-20
svc-web     -        Active       Domain Admin (runs the web application)       2026-03-14
sales-team  Sales    Active       One shared password used by 6 people          2026-03-14
bkim        IT       Active       Help-desk password resets; Server admin       2026-03-10`,
    q: 'Perform the quarterly access review. Select the finding that best describes each account.',
    choices: ['Separation of duties violation', 'Orphaned account (should be disabled)', 'Excessive privilege (least privilege)', 'Shared account (no accountability)', 'Compliant'],
    items: [
      ['jlee', 'Separation of duties violation'],
      ['mpatel', 'Compliant'],
      ['tgreen', 'Orphaned account (should be disabled)'],
      ['svc-web', 'Excessive privilege (least privilege)'],
      ['sales-team', 'Shared account (no accountability)'],
      ['bkim', 'Excessive privilege (least privilege)']
    ],
    e: 'jlee can both create vendors and approve payments, so one person could commit fraud alone: separation of duties. mpatel only approves, which is acceptable. tgreen is terminated but still has VPN and CRM access and logged in after leaving the company (an orphaned account that should have been disabled). svc-web runs a web application as a domain administrator, far beyond what it needs (least privilege). A single shared password makes it impossible to attribute actions to a person. bkim holds both help-desk and server administration rights, which is privilege creep.',
    w: ['Review these accounts and identify the problem, if any, with each.', 'For each user in the access review, choose the matching finding.']
  },

  // 5. Vulnerability triage (ordering)
  {
    d: 4, t: 'order', o: '4.3', lv: 7.4,
    q: 'Order these findings from the vulnerability scan by remediation priority, highest priority first. Consider exposure, exploitability and business impact.',
    items: [
      'Internet-facing VPN appliance: remote code execution, CVSS 9.8, exploited in the wild',
      'Internet-facing web application: SQL injection, CVSS 8.6, public proof of concept',
      'Domain controller (internal): privilege escalation, CVSS 8.8, no known exploit',
      'Internal file server: SMB signing not required, CVSS 5.3',
      'Printer on an isolated VLAN: default SNMP community string, CVSS 5.0',
      'Intranet wiki: missing HTTP security headers, CVSS 3.1'
    ],
    e: 'Prioritize by real-world risk, not the score alone. An internet-facing flaw that attackers are already exploiting comes first, then another internet-facing flaw with a public exploit. An internal, critical flaw on a domain controller follows (high impact, but not exposed and not yet exploited). Medium findings on internal systems come next, and a low-severity header issue on an internal wiki last.',
    w: ['Rank these scan results for remediation, most urgent first.', 'Put the vulnerabilities in the order they should be fixed.']
  },

  // 6. Cloud security-group review
  {
    d: 3, t: 'match', o: '3.1', lv: 7.1,
    x: `Rule  Source           Port   Protocol  Attached to
1     0.0.0.0/0        443    TCP       web-sg     (public web tier)
2     0.0.0.0/0        22     TCP       web-sg
3     0.0.0.0/0        3306   TCP       db-sg      (production database)
4     10.0.20.0/24     3306   TCP       db-sg
5     0.0.0.0/0        3389   TCP       app-sg
6     203.0.113.10/32  22     TCP       bastion-sg (office egress IP)
7     0.0.0.0/0        ALL    ALL       dev-sg`,
    q: 'Review each cloud security-group rule in the exhibit and choose the action.',
    choices: ['Acceptable', 'Restrict to admin or bastion addresses', 'Remove the rule'],
    items: [
      ['Rule 1', 'Acceptable'],
      ['Rule 2', 'Restrict to admin or bastion addresses'],
      ['Rule 3', 'Remove the rule'],
      ['Rule 4', 'Acceptable'],
      ['Rule 5', 'Restrict to admin or bastion addresses'],
      ['Rule 6', 'Acceptable'],
      ['Rule 7', 'Remove the rule']
    ],
    e: 'Public HTTPS to the web tier (rule 1) is the intended exposure. Administrative ports (SSH 22, RDP 3389) must never be open to the whole Internet: limit them to a bastion or admin addresses. A production database must not accept connections from anywhere (rule 3); only the app subnet (rule 4) should reach it. Rule 6 allows SSH only from one office IP to the bastion, which is the right pattern. Rule 7 allows all traffic from any source, which should be removed even on a development group.',
    w: ['Check these cloud firewall rules and decide what to do with each.', 'Which rules are acceptable, and which need to be restricted or removed?']
  },

  // 7. Forensic evidence workflow
  {
    d: 4, t: 'order', o: '4.8', lv: 6.8,
    q: 'A suspect laptop must be preserved for investigation. Place the forensic steps in the correct order.',
    items: [
      'Secure the scene and identify the device',
      'Photograph and document the system state',
      'Capture volatile data (memory) from the running system',
      'Create a forensic image of the drive using a write blocker',
      'Hash the original and the image and record the values',
      'Seal the evidence, record chain of custody and store it securely',
      'Analyze the copy, never the original'
    ],
    e: 'Preserve first, analyze last: secure and document the scene, capture the most volatile evidence (RAM) before it is lost, image the disk through a write blocker so the original is not altered, hash both to prove the copy is identical, then seal and log the evidence with chain of custody. Analysis happens only on the verified copy.',
    w: ['Arrange the evidence-handling steps for a suspect laptop in order.', 'Put the digital forensics workflow into the correct sequence.']
  },

  // 8. Incident-response phases
  {
    d: 4, t: 'match', o: '4.8', lv: 6.0,
    q: 'Match each activity to the incident-response phase it belongs to.',
    choices: ['Preparation', 'Detection and analysis', 'Containment', 'Eradication', 'Recovery', 'Lessons learned'],
    items: [
      ['Running a ransomware tabletop exercise with the response team', 'Preparation'],
      ['An analyst confirms that a SIEM alert is a true positive', 'Detection and analysis'],
      ['Isolating the infected host with the EDR console', 'Containment'],
      ['Removing the malware and patching the exploited vulnerability', 'Eradication'],
      ['Restoring systems from clean backups and monitoring them', 'Recovery'],
      ['A post-incident review that finds the root cause', 'Lessons learned']
    ],
    e: 'Preparation covers plans, tools and training (including tabletop exercises). Detection and analysis confirms and scopes the incident. Containment stops the spread (isolation). Eradication removes the cause: the malware and the vulnerability that allowed it. Recovery restores normal operations from clean sources and watches for recurrence. Lessons learned reviews what happened and improves the plan.',
    w: ['Assign each activity to the correct incident-response phase.', 'Which phase does each of these actions belong to?']
  },

  // 9. BIA and recovery sites
  {
    d: 3, t: 'match', o: '3.4', lv: 6.5,
    q: 'Based on the business impact analysis, choose the most appropriate recovery site for each system.',
    choices: ['Hot site', 'Warm site', 'Cold site'],
    items: [
      ['Payment processing: RTO 15 minutes, RPO 0', 'Hot site'],
      ['Customer portal: RTO 1 hour, RPO 5 minutes', 'Hot site'],
      ['Email: RTO 8 hours, RPO 1 hour', 'Warm site'],
      ['Order reporting: RTO 48 hours, RPO 12 hours', 'Warm site'],
      ['Internal wiki: RTO 5 days, RPO 24 hours', 'Cold site'],
      ['Document archive: RTO 2 weeks', 'Cold site']
    ],
    e: 'A hot site has equipment running and near-current data, so it fits very short RTO and RPO values. A warm site has hardware and connectivity but needs data restored, fitting recovery measured in hours to a couple of days. A cold site offers space and power only and fits systems that can wait days or weeks. The shorter the tolerable downtime and data loss, the more expensive the site type that is justified.',
    w: ['Match each system to the recovery site that fits its RTO and RPO.', 'Choose hot, warm or cold for each system based on its recovery objectives.']
  },

  // 10. Reading a port scan
  {
    d: 4, t: 'match', o: '4.1', lv: 6.9,
    x: `Starting Nmap scan report for 10.0.30.14
PORT     STATE   SERVICE      VERSION
21/tcp   open    ftp          vsftpd 2.3.4
22/tcp   open    ssh          OpenSSH 9.6
23/tcp   open    telnet
80/tcp   open    http         Apache httpd 2.2.8
443/tcp  open    ssl/http     Apache httpd (OpenSSL 1.0.1f - vulnerable to Heartbleed)
3306/tcp open    mysql        MySQL 5.7 (accepting connections from any address)
3389/tcp closed  ms-wbt-server`,
    q: 'Review the scan results for the server in the exhibit and choose the remediation for each port.',
    choices: ['Disable or replace with a secure protocol', 'Patch or upgrade the software', 'Restrict to trusted hosts', 'No action needed'],
    items: [
      ['21/tcp FTP (vsftpd 2.3.4)', 'Disable or replace with a secure protocol'],
      ['22/tcp SSH (OpenSSH 9.6)', 'No action needed'],
      ['23/tcp Telnet', 'Disable or replace with a secure protocol'],
      ['443/tcp HTTPS (OpenSSL 1.0.1f)', 'Patch or upgrade the software'],
      ['3306/tcp MySQL, open to any address', 'Restrict to trusted hosts'],
      ['3389/tcp RDP, closed', 'No action needed']
    ],
    e: 'FTP and Telnet send credentials in clear text (and vsftpd 2.3.4 contains a well-known backdoor), so they should be disabled or replaced with SFTP and SSH. OpenSSL 1.0.1f is vulnerable to Heartbleed and must be updated. A database should only accept connections from the application servers that need it, not any address. A current OpenSSH release needs no action, and a closed RDP port exposes nothing.',
    w: ['Interpret the scan output and pick the right remediation for each service.', 'For each port in the Nmap results, what should be done?']
  },

  // 11. Code review
  {
    d: 2, t: 'match', o: '2.3', mono: true, lv: 7.3,
    q: 'Match each vulnerable code line to the weakness it contains.',
    choices: ['SQL injection', 'Cross-site scripting', 'Hard-coded credentials', 'OS command injection', 'Path traversal', 'Insecure deserialization'],
    items: [
      ['query = "SELECT * FROM users WHERE name=\'" + name + "\'"', 'SQL injection'],
      ['html = "<div>" + request.args["comment"] + "</div>"', 'Cross-site scripting'],
      ['DB_PASSWORD = "Winter2025!"', 'Hard-coded credentials'],
      ['os.system("ping -c 1 " + host)', 'OS command injection'],
      ['open("/var/app/files/" + filename)', 'Path traversal'],
      ['obj = pickle.loads(request.data)', 'Insecure deserialization']
    ],
    e: 'Concatenating user input into a query is SQL injection (use parameterized queries). Writing request data into HTML without encoding is cross-site scripting (encode output). A secret in the source is a hard-coded credential (use a secrets manager). Passing user input to a shell is OS command injection (avoid the shell, validate input). Appending a user-controlled name to a path allows ../ sequences (path traversal: normalize and restrict the path). Deserializing untrusted data can execute attacker-controlled objects.',
    w: ['Identify the weakness in each code snippet.', 'Which vulnerability does each line of code introduce?']
  },

  // 12. Replace insecure protocols
  {
    d: 3, t: 'match', o: '3.2', lv: 5.8,
    q: 'Choose the secure replacement for each insecure protocol.',
    choices: ['SSH', 'HTTPS (TLS)', 'SFTP or FTPS', 'LDAPS', 'SNMPv3', 'IMAPS / POP3S (TLS)'],
    items: [
      ['Telnet', 'SSH'],
      ['HTTP', 'HTTPS (TLS)'],
      ['FTP', 'SFTP or FTPS'],
      ['LDAP (clear text)', 'LDAPS'],
      ['SNMPv1 / SNMPv2c', 'SNMPv3'],
      ['IMAP / POP3 (clear text)', 'IMAPS / POP3S (TLS)']
    ],
    e: 'Each insecure protocol has a counterpart that adds encryption and authentication: SSH for remote administration, TLS for web traffic, SFTP or FTPS for file transfer, LDAPS for directory queries, SNMPv3 for management (authentication and encryption, unlike the community strings of v1 and v2c), and TLS-wrapped IMAP and POP3 for mail.',
    w: ['Replace each clear-text protocol with its secure equivalent.', 'Match every insecure protocol with the protocol that should replace it.']
  },

  // 13. Windows event IDs
  {
    d: 4, t: 'match', o: '4.9', lv: 6.7,
    q: 'Match each Windows security event ID to what it records.',
    choices: ['Successful logon', 'Failed logon', 'Process creation', 'User account created', 'Audit log cleared', 'Account locked out', 'Service installed'],
    items: [
      ['4624', 'Successful logon'],
      ['4625', 'Failed logon'],
      ['4688', 'Process creation'],
      ['4720', 'User account created'],
      ['1102', 'Audit log cleared'],
      ['4740', 'Account locked out'],
      ['7045', 'Service installed']
    ],
    e: 'These are the Windows events analysts see most: 4624/4625 successful and failed logons, 4688 process creation (with command-line auditing), 4720 a new user account, 4740 an account lockout, 1102 the security log being cleared (a defense-evasion indicator) and 7045 a new service installed (a common persistence technique).',
    w: ['Identify each Windows event ID.', 'What does each of these event IDs indicate?']
  },

  // 14. Certificate troubleshooting
  {
    d: 1, t: 'match', o: '1.4', lv: 7.0,
    x: `Today: 2026-03-14
Site                  Subject CN / SAN        Issuer                 Valid to    OCSP status
shop.example.com      shop.example.com        Public CA R3           2026-09-01  good
mail.example.com      mail.example.org        Public CA R3           2026-09-01  good
intranet.example.com  intranet.example.com    intranet.example.com   2027-01-01  n/a (self-signed)
vpn.example.com       vpn.example.com         Public CA R3           2026-01-15  good
portal.example.com    portal.example.com      Public CA R3           2026-10-10  revoked`,
    q: 'Users report browser warnings on several sites. Use the exhibit to choose the cause for each site.',
    choices: ['Certificate is valid', 'Hostname mismatch (CN/SAN)', 'Untrusted issuer (self-signed)', 'Expired certificate', 'Revoked certificate'],
    items: [
      ['shop.example.com', 'Certificate is valid'],
      ['mail.example.com', 'Hostname mismatch (CN/SAN)'],
      ['intranet.example.com', 'Untrusted issuer (self-signed)'],
      ['vpn.example.com', 'Expired certificate'],
      ['portal.example.com', 'Revoked certificate']
    ],
    e: 'shop.example.com matches its name, comes from a trusted CA, is in date and is not revoked. mail.example.com presents a certificate for a different name (mail.example.org), so the browser reports a name mismatch. intranet.example.com is issued by itself, so no trusted CA vouches for it (self-signed). vpn.example.com expired on 2026-01-15, before today\'s date. portal.example.com is otherwise valid but its OCSP status is revoked, so it must not be trusted.',
    w: ['Diagnose the certificate problem on each site in the exhibit.', 'Which certificate error explains the warning on each site?']
  }
]
