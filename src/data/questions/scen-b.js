// System-analysis scenarios, part 2: insider data theft, DNS tunnelling and C2 beaconing, ARP poisoning, evil twin.
export default [
  // ───────────── 5. insider data exfiltration ─────────────
  {
    d: 2, t: 'match', o: '2.4', lv: 6.4,
    x: 'Systems: WS-ENG-12 (engineer laptop), DLP-GW (data loss prevention gateway), VPN-GW01, HR-SYS (HR records)',
    p: [
      {
        name: 'HR-SYS', role: 'HR records · context',
        s: [['Employee record: mrivera (Senior Engineer)', `Status:           Active
Resignation:      submitted 2026-03-10, last day 2026-03-21
Access level:     read access to /Engineering/Designs and /Engineering/Customers
Normal hours:     Mon–Fri 08:30–17:30 (office)`]]
      },
      {
        name: 'VPN-GW01', role: 'VPN gateway',
        s: [['Session log, mrivera', `2026-03-11 08:41 - 17:20   office network (no VPN)
2026-03-12 22:47 - 23:55   VPN from 198.51.100.140 (home ISP)
2026-03-13 23:12 - 02:48   VPN from 198.51.100.140   bytes_out: 3.9 GB
2026-03-14 00:03 - 03:15   VPN from 198.51.100.140   bytes_out: 6.1 GB`]]
      },
      {
        name: 'WS-ENG-12', role: 'Engineer laptop · mrivera',
        s: [
          ['Windows event log (selected)', `2026-03-13 23:20  6416  A new external device was recognized: SanDisk Ultra USB 3.0 (serial 4C5300 ...)
2026-03-13 23:21  4663  Object access: copy  \\\\fs-eng\\Designs\\Product-X\\*   files: 4,310
2026-03-13 23:58  Process: 7z.exe  a  D:\\x.7z  \\\\fs-eng\\Customers\\*  -p
2026-03-14 00:07  Process: rclone.exe copy D:\\x.7z  personal-drive:backup`],
          ['Proxy log', `2026-03-14 00:07  mrivera  CONNECT  www.googleapis.com:443   upload bytes: 5.8 GB
2026-03-14 00:41  mrivera  GET      https://jobs.competitor.example/careers/senior-engineer`]
        ]
      },
      {
        name: 'DLP-GW', role: 'Data loss prevention gateway',
        s: [['Alerts, 14 Mar', `00:07  HIGH  Policy: Source code and design files   Action: ALERT ONLY (blocking disabled)  User: mrivera
00:07  HIGH  Policy: Customer PII (>1,000 records)   Action: ALERT ONLY               User: mrivera
00:19  INFO  Large upload to personal cloud storage   User: mrivera   5.8 GB`]]
      }
    ],
    q: 'A resignation, large transfers and a competitor web page point to a possible data theft. Review the systems and complete the tasks.',
    choices: ['Insider threat (data exfiltration)', 'External attacker using stolen credentials', 'Ransomware', 'Shadow IT'],
    items: [
      ['Most likely threat', 'Insider threat (data exfiltration)'],
      ['Primary motivation', 'Financial gain or competitive advantage', ['Financial gain or competitive advantage', 'Political activism', 'Service disruption', 'Espionage on behalf of a state']],
      ['Exfiltration channels seen (select the best description)', 'USB storage and upload to personal cloud storage', ['USB storage and upload to personal cloud storage', 'Email attachments only', 'DNS tunneling', 'Wireless access point']],
      ['Indicator that most suggests intent rather than error', 'After-hours access plus compressing and encrypting customer files before uploading', ['Using a USB drive', 'After-hours access plus compressing and encrypting customer files before uploading', 'Using the company VPN', 'Visiting a job board once']],
      ['Control gap that let this succeed', 'DLP set to alert only, with no blocking', ['DLP set to alert only, with no blocking', 'Weak VPN encryption', 'Missing antivirus on the laptop', 'No SIEM']],
      ['Best next step', 'Preserve evidence and involve HR and legal before confronting the employee', ['Wipe the laptop and reissue it', 'Preserve evidence and involve HR and legal before confronting the employee', 'Delete the cloud account', 'Ignore it: the employee has legitimate access']]
    ],
    e: 'No external intrusion is needed to explain this: the user is leaving (resignation, last day 21 March), is working at night from home, plugs in a USB drive, copies 4,310 design files, compresses and password-protects the customer folder with 7-Zip, and uploads 5.8 GB to a personal cloud with rclone, with a competitor careers page in the proxy log. That is an insider threat with a financial or competitive motive. Using a USB drive or the VPN alone is not suspicious; the pattern (after-hours volume, staging and encrypting, uploading to personal storage) shows intent. The DLP gateway detected both policy hits but was set to alert only, so nothing was blocked. Preserve evidence and bring in HR and legal before any confrontation; wiping the device or deleting accounts destroys evidence.',
    w: ['Investigate whether this employee is stealing data. Review all four systems.', 'Use the HR context and the technical evidence to answer the tasks.']
  },

  // ───────────── 6. DNS tunnelling and C2 beaconing ─────────────
  {
    d: 2, t: 'match', o: '2.4', lv: 7.6,
    x: 'Network: user VLAN (WS-ENG-04 10.2.6.14, WS-ENG-09 10.2.6.19, WS-MKT-02 10.2.7.5) -> DNS01 10.0.0.53 -> Internet ; EDGE-FW',
    p: [
      {
        name: 'DNS01', role: 'Internal DNS resolver · 10.0.0.53',
        s: [['Query log (excerpt, 60 minutes)', `03:14:02  10.2.6.14  TXT  a9f3k2lq0p.x7v1.t.cdn-update.example
03:14:04  10.2.6.14  TXT  q2m8d0z7rb.u4c9.t.cdn-update.example
03:14:06  10.2.6.14  TXT  h5t1y6w3ne.k8s2.t.cdn-update.example
03:14:08  10.2.6.14  TXT  z0p4n9c2vx.j1r7.t.cdn-update.example
... 3,812 more queries from 10.2.6.14 to *.t.cdn-update.example (avg label length 48 chars)
09:12:11  10.2.7.5   A    www.company.com
09:12:14  10.2.6.19  A    updates.vendor-software.example
Typical per-host DNS volume: 150 queries / hour. 10.2.6.14: 3,816 queries / hour.`]]
      },
      {
        name: 'WS-ENG-04', role: 'Engineer workstation · 10.2.6.14',
        s: [['netstat -ano (excerpt)', `Proto  Local Address        Foreign Address      State        PID
UDP    10.2.6.14:55432      10.0.0.53:53         *:*          2288
UDP    10.2.6.14:55433      10.0.0.53:53         *:*          2288
TCP    10.2.6.14:49822      0.0.0.0:0            LISTENING    2288`],
        ['tasklist /svc (PID 2288)', 'svchost-update.exe  PID 2288  Path: C:\\Users\\Public\\Libraries\\svchost-update.exe\nParent: explorer.exe   Signed: no']]
      },
      {
        name: 'WS-ENG-09', role: 'Engineer workstation · 10.2.6.19',
        s: [['netstat -ano (excerpt)', `Proto  Local Address        Foreign Address      State          PID
TCP    10.2.6.19:50331      203.0.113.200:443    ESTABLISHED    4410
TCP    10.2.6.19:50340      203.0.113.200:443    TIME_WAIT      0
TCP    10.2.6.19:50352      203.0.113.200:443    ESTABLISHED    4410
(new connection to 203.0.113.200:443 every 60 s, ~310 bytes out / ~190 bytes in)`],
        ['tasklist /svc (PID 4410)', 'msedgeupdate.exe  PID 4410  Path: C:\\ProgramData\\Microsoft\\EdgeUpdate\\msedgeupdate.exe\nParent: services.exe   Signed: yes (invalid certificate chain)']]
      },
      {
        name: 'WS-MKT-02', role: 'Marketing workstation · 10.2.7.5',
        s: [['netstat -ano (excerpt)', `TCP    10.2.7.5:51002   52.97.x.x:443     ESTABLISHED   7124   (outlook.exe)
TCP    10.2.7.5:51044   13.107.x.x:443    ESTABLISHED   3320   (teams.exe)
TCP    10.2.7.5:51077   151.101.x.x:443   ESTABLISHED   9012   (chrome.exe)`],
        ['Notes', 'All processes signed and in their normal install paths.\nDNS volume: 140 queries / hour.']]
      }
    ],
    q: 'The security team has two network anomalies. Review the DNS server and each workstation and complete the tasks.',
    choices: ['Compromised: DNS tunneling', 'Compromised: C2 beaconing', 'Not affected'],
    items: [
      ['WS-ENG-04', 'Compromised: DNS tunneling'],
      ['WS-ENG-09', 'Compromised: C2 beaconing'],
      ['WS-MKT-02', 'Not affected'],
      ['Evidence of DNS tunneling', 'Long, random-looking subdomains of one domain, mostly TXT queries, at about 25 times the normal rate', ['Many A queries for popular sites', 'Long, random-looking subdomains of one domain, mostly TXT queries, at about 25 times the normal rate', 'NXDOMAIN responses for mistyped names', 'DNS queries only during office hours']],
      ['Evidence of C2 beaconing on WS-ENG-09', 'A small connection to the same external IP at a fixed 60-second interval', ['A large upload to a cloud service', 'A small connection to the same external IP at a fixed 60-second interval', 'A listening port on a server', 'A failed logon']],
      ['Control that would have blocked the DNS tunnel', 'Force all clients to the internal resolver and filter DNS by domain reputation and query anomalies', ['Force all clients to the internal resolver and filter DNS by domain reputation and query anomalies', 'Encrypt DNS with DNSSEC', 'Block TCP port 53 only', 'Increase the DHCP lease time']]
    ],
    e: 'DNS01 shows 10.2.6.14 generating 3,816 queries per hour (normal 150), almost all TXT queries for random 40–50 character labels under one domain (cdn-update.example): data encoded into DNS names and answers, i.e., DNS tunneling, with an unsigned binary running from C:\\Users\\Public. WS-ENG-09 holds a connection to 203.0.113.200:443 that repeats every 60 seconds with tiny, uniform payloads, under a process that is signed with an invalid chain and masquerades as an Edge updater: C2 beaconing. WS-MKT-02 has only normal signed applications and normal DNS volume. DNSSEC authenticates answers but does not stop a client from tunneling; the useful controls are forcing clients through a monitored resolver, and DNS filtering/analytics for reputation, length and volume anomalies.',
    w: ['Two hosts are behaving strangely on the network. Investigate and complete the tasks.', 'Review the DNS logs and each workstation to find the infected systems and their techniques.']
  },

  // ───────────── 7. ARP poisoning / on-path attack ─────────────
  {
    d: 2, t: 'match', o: '2.4', lv: 6.6,
    x: 'LAN 192.168.10.0/24: gateway 192.168.10.1 (aa:bb:cc:00:00:01), SW1 (access switch), clients PC-A .21, PC-B .22, PC-C .23, and one unknown device',
    p: [
      {
        name: 'PC-A', role: 'Client · 192.168.10.21',
        s: [['arp -a', `Interface: 192.168.10.21
  Internet Address     Physical Address      Type
  192.168.10.1         de:ad:be:ef:00:66     dynamic
  192.168.10.22        aa:bb:cc:00:00:22     dynamic
  192.168.10.66        de:ad:be:ef:00:66     dynamic`],
        ['tracert -d 8.8.8.8', `  1     1 ms     1 ms     1 ms  192.168.10.66
  2     2 ms     2 ms     2 ms  192.168.10.1
  3     8 ms     7 ms     8 ms  203.0.113.1`]]
      },
      {
        name: 'PC-B', role: 'Client · 192.168.10.22',
        s: [['arp -a', `  192.168.10.1         de:ad:be:ef:00:66     dynamic
  192.168.10.21        aa:bb:cc:00:00:21     dynamic
  192.168.10.66        de:ad:be:ef:00:66     dynamic`]]
      },
      {
        name: 'GW', role: 'Default gateway · 192.168.10.1',
        s: [['ARP table', `192.168.10.21   aa:bb:cc:00:00:21
192.168.10.22   aa:bb:cc:00:00:22
192.168.10.23   aa:bb:cc:00:00:23
192.168.10.66   de:ad:be:ef:00:66   (unknown host)`]]
      },
      {
        name: 'SW1', role: 'Access switch',
        s: [['Syslog', `%SW_MATM-4-MACFLAP_NOTIF: Host de:ad:be:ef:00:66 in vlan 10 is flapping between port Gi0/7 and port Gi0/9
SPAN capture on Gi0/7: 14 unsolicited ARP replies in 20 s: "192.168.10.1 is-at de:ad:be:ef:00:66"
%DHCP_SNOOPING: no DHCP binding for 192.168.10.66 on Gi0/7 (static address)
DHCP snooping: disabled on vlan 10     Dynamic ARP Inspection: disabled on vlan 10`]]
      }
    ],
    q: 'Users report slow connections and certificate warnings. Review the evidence and complete the tasks.',
    choices: ['ARP poisoning (on-path attack)', 'MAC flooding', 'DHCP starvation', 'VLAN hopping'],
    items: [
      ['Attack in progress', 'ARP poisoning (on-path attack)'],
      ['Attacker\'s IP address', '192.168.10.66', ['192.168.10.1', '192.168.10.22', '192.168.10.66', '192.168.10.23']],
      ['Evidence in PC-A\'s ARP table', 'The gateway IP is mapped to the attacker\'s MAC address', ['The gateway IP is mapped to the attacker\'s MAC address', 'The table is empty', 'Two clients share one IP address', 'The gateway MAC address changed vendor']],
      ['What the attacker can now do', 'Intercept and modify traffic between clients and the gateway', ['Intercept and modify traffic between clients and the gateway', 'Crash the switch by filling its CAM table', 'Exhaust the DHCP address pool', 'Send traffic to other VLANs']],
      ['Preventive controls to enable on the switch', 'Dynamic ARP inspection with DHCP snooping', ['Dynamic ARP inspection with DHCP snooping', 'A longer DHCP lease', 'Larger MAC address table', 'Spanning tree portfast']]
    ],
    e: 'PC-A and PC-B both map the gateway (192.168.10.1) to de:ad:be:ef:00:66 instead of aa:bb:cc:00:00:01, and the same MAC owns 192.168.10.66. The traceroute from PC-A shows 192.168.10.66 as the first hop, so traffic is being relayed through the attacker. The gateway\'s own table is correct, which is how the attack stays hidden. The switch confirms it: MAC flapping, 14 unsolicited ARP replies claiming that the gateway lives at the attacker\'s MAC, and no DHCP binding for .66. This is ARP poisoning (an on-path attack), allowing interception and modification of traffic, which also explains certificate warnings. MAC flooding would fill the switch table; DHCP starvation would drain the pool. Enable DHCP snooping and Dynamic ARP Inspection (both currently disabled on VLAN 10) to drop forged ARP replies.',
    w: ['Clients are seeing certificate warnings on the LAN. Investigate and complete the tasks.', 'Use the ARP tables, traceroute and switch logs to work out what is happening.']
  },

  // ───────────── 8. evil twin ─────────────
  {
    d: 2, t: 'match', o: '2.2', lv: 7.0,
    x: 'Corporate Wi-Fi: SSID "CorpWiFi" (WPA3-Enterprise) on AP-1 (BSSID 00:11:22:33:44:01) and AP-2 (BSSID 00:11:22:33:44:02)',
    p: [
      {
        name: 'WLC', role: 'Wireless controller',
        s: [['Event log', `10:02:11  WIDS  Rogue AP detected: SSID "CorpWiFi"  BSSID 66:77:88:99:aa:01  channel 6  security: OPEN  signal: -41 dBm
10:02:13  WIDS  Deauthentication flood: source 66:77:88:99:aa:01  targets: 14 clients on AP-1  frames/s: 210
10:02:25  AP-1  client 5c:e0:c5:12:34:56 disassociated (reason 7: class 3 frame from non-associated station)
10:02:31  AP-1  client 5c:e0:c5:12:34:56 not associated (last seen 10:02:25)`]]
      },
      {
        name: 'LAPTOP-JS', role: 'Employee laptop · jsmith',
        s: [['WLAN event log', `10:02:25  Disconnected from CorpWiFi (BSSID 00:11:22:33:44:01)
10:02:29  Connecting to CorpWiFi (BSSID 66:77:88:99:aa:01) ... Connected (no authentication required)
10:02:31  DHCP lease: IP 172.20.5.37, gateway 172.20.5.1, DNS 172.20.5.1
10:03:02  Browser: certificate warning for mail.company.com (issuer: untrusted)`],
        ['ipconfig', `Wireless LAN adapter Wi-Fi:
   SSID . . . . . . : CorpWiFi
   Default Gateway . : 172.20.5.1
   DNS Servers . . . : 172.20.5.1
Corporate LAN uses 10.1.0.0/16`]]
      },
      {
        name: 'LAPTOP-AK', role: 'Employee laptop · akhan (wired in office)',
        s: [['Status', `Ethernet connected 10.1.4.55   Wi-Fi: off
No certificate warnings. DNS 10.1.0.53.`]]
      },
      {
        name: 'RADIUS01', role: 'RADIUS / 802.1X server',
        s: [['Authentication log, 10:00–10:05', `10:01:58  jsmith@company.com  EAP-TLS  Accept  (AP-1)
10:02:29-10:03:40  no authentication requests from LAPTOP-JS
10:02:11-10:05:00  authentications from 14 clients: 0 (typical: 9 per minute)`]]
      }
    ],
    q: 'Wi-Fi users are being disconnected and prompted with certificate warnings. Review the systems and complete the tasks.',
    choices: ['Evil twin with deauthentication', 'Jamming only', 'Bluesnarfing', 'Rogue switch'],
    items: [
      ['Attack in progress', 'Evil twin with deauthentication'],
      ['Why the laptop joined without authenticating', 'The attacker\'s access point is open and shares the legitimate SSID', ['The attacker\'s access point is open and shares the legitimate SSID', 'WPA3-Enterprise allows guests', 'RADIUS is down', 'The laptop uses a static IP']],
      ['Evidence that the laptop\'s traffic is on the attacker\'s network', 'A gateway and DNS server in 172.20.5.0/24 instead of the 10.1.0.0/16 corporate range', ['A gateway and DNS server in 172.20.5.0/24 instead of the 10.1.0.0/16 corporate range', 'A short DHCP lease', 'A weak signal', 'The wired laptop has no warnings']],
      ['LAPTOP-AK status', 'Not affected (wired)', ['Compromised', 'Under attack', 'Not affected (wired)']],
      ['Best control for the organization', 'Require 802.1X with server certificate validation on clients, and use WIDS/WIPS to contain rogue APs', ['Hide the SSID', 'Require 802.1X with server certificate validation on clients, and use WIDS/WIPS to contain rogue APs', 'Switch to MAC address filtering', 'Lower the AP transmit power']]
    ],
    e: 'The WIDS reports an open rogue AP broadcasting the same SSID with a very strong signal (-41 dBm) plus a deauthentication flood (210 frames/s) aimed at clients on AP-1: the attacker kicks clients off the real AP so they reconnect to the stronger fake one, an evil twin. LAPTOP-JS reconnects to the rogue BSSID without authentication (the fake network is open), receives a 172.20.5.0/24 address with the attacker\'s gateway and DNS (not the 10.1.0.0/16 corporate range), and then sees certificate warnings for mail.company.com because traffic is being intercepted. RADIUS shows no authentications at all from those clients. The wired laptop is unaffected. Hiding the SSID or MAC filtering does nothing against an impersonator; 802.1X with server certificate validation stops clients from trusting a fake network, and WIDS/WIPS detects and contains rogue APs.',
    w: ['Wireless clients are being kicked off the network. Investigate the evidence and complete the tasks.', 'Determine what is happening to the Wi-Fi users and how to prevent it.']
  }
]
