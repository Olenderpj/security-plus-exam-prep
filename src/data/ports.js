// Well-known ports for SY0-701 (objective 4.5: port and protocol selection, firewall rules). One list feeds the
// Ports flashcard deck and the generated port questions.
// port: number shown on the card; proto: TCP | UDP | TCP/UDP; name: protocol; full: what it stands for;
// use: what it does (never names the port, so the protocol side of a card doesn't give it away); split: what each
// number of a multi-port entry is for (shown on the port side); secure: encrypted by itself; alt: key of the secure replacement (insecure protocols only).
export const PORTS = [
  { key: 'ftp', port: '20/21', proto: 'TCP', name: 'FTP', full: 'File Transfer Protocol', use: 'file transfer with separate control and data channels; sends credentials in cleartext', split: '21 control, 20 data', secure: false, alt: 'sftp' },
  { key: 'ssh', port: '22', proto: 'TCP', name: 'SSH', full: 'Secure Shell', use: 'encrypted remote command line; SCP and SFTP also run over it', secure: true },
  { key: 'sftp', port: '22', proto: 'TCP', name: 'SFTP', full: 'SSH File Transfer Protocol', use: 'encrypted file transfer over SSH', secure: true, card: false },
  { key: 'telnet', port: '23', proto: 'TCP', name: 'Telnet', full: 'Telnet', use: 'remote command line in cleartext, including the password', secure: false, alt: 'ssh' },
  { key: 'smtp', port: '25', proto: 'TCP', name: 'SMTP', full: 'Simple Mail Transfer Protocol', use: 'server-to-server email relay; unencrypted unless STARTTLS is negotiated', secure: false, alt: 'smtps' },
  { key: 'tacacs', port: '49', proto: 'TCP', name: 'TACACS+', full: 'Terminal Access Controller Access-Control System Plus', use: 'AAA for network device administration; encrypts the whole payload', secure: true },
  { key: 'dns', port: '53', proto: 'TCP/UDP', name: 'DNS', full: 'Domain Name System', use: 'name resolution; UDP for queries, TCP for zone transfers and large replies', secure: false },
  { key: 'dhcp', port: '67/68', proto: 'UDP', name: 'DHCP', full: 'Dynamic Host Configuration Protocol', use: 'automatic IP addressing', split: '67 server, 68 client', secure: false },
  { key: 'tftp', port: '69', proto: 'UDP', name: 'TFTP', full: 'Trivial File Transfer Protocol', use: 'simple file transfer with no authentication (network boot, device configs)', secure: false, alt: 'sftp' },
  { key: 'http', port: '80', proto: 'TCP', name: 'HTTP', full: 'Hypertext Transfer Protocol', use: 'web traffic in cleartext', secure: false, alt: 'https' },
  { key: 'kerberos', port: '88', proto: 'TCP/UDP', name: 'Kerberos', full: 'Kerberos', use: 'ticket-based authentication in Active Directory', secure: true },
  { key: 'pop3', port: '110', proto: 'TCP', name: 'POP3', full: 'Post Office Protocol v3', use: 'downloading email in cleartext', secure: false, alt: 'pop3s' },
  { key: 'ntp', port: '123', proto: 'UDP', name: 'NTP', full: 'Network Time Protocol', use: 'clock synchronisation; accurate time matters for logs and Kerberos', secure: false },
  { key: 'netbios', port: '137–139', proto: 'TCP/UDP', name: 'NetBIOS', full: 'NetBIOS name, datagram and session services', use: 'legacy Windows name and session services; should never be exposed to the internet', secure: false },
  { key: 'imap', port: '143', proto: 'TCP', name: 'IMAP', full: 'Internet Message Access Protocol', use: 'reading mail kept on the server, in cleartext', secure: false, alt: 'imaps' },
  { key: 'snmp', port: '161/162', proto: 'UDP', name: 'SNMP', full: 'Simple Network Management Protocol', use: 'device monitoring; v1/v2c send community strings in cleartext, so use SNMPv3', split: '161 queries, 162 traps', secure: false },
  { key: 'ldap', port: '389', proto: 'TCP', name: 'LDAP', full: 'Lightweight Directory Access Protocol', use: 'directory queries in cleartext', secure: false, alt: 'ldaps' },
  { key: 'https', port: '443', proto: 'TCP', name: 'HTTPS', full: 'HTTP over TLS', use: 'encrypted web traffic; also most TLS/SSL VPNs', secure: true },
  { key: 'smb', port: '445', proto: 'TCP', name: 'SMB', full: 'Server Message Block', use: 'Windows file and printer sharing; a common ransomware and worm target', secure: false },
  { key: 'smtps', port: '465/587', proto: 'TCP', name: 'Secure SMTP', full: 'SMTP over TLS / mail submission', use: 'encrypted mail sending from clients', split: '465 implicit TLS, 587 submission with STARTTLS', secure: true },
  { key: 'ike', port: '500', proto: 'UDP', name: 'IKE (IPsec)', full: 'Internet Key Exchange', use: 'negotiates IPsec VPN keys', split: 'NAT traversal uses UDP 4500', secure: true },
  { key: 'syslog', port: '514', proto: 'UDP', name: 'Syslog', full: 'Syslog', use: 'sending logs to a collector, in cleartext', secure: false, alt: 'syslogtls' },
  { key: 'ldaps', port: '636', proto: 'TCP', name: 'LDAPS', full: 'LDAP over TLS', use: 'encrypted directory queries', secure: true },
  { key: 'ftps', port: '989/990', proto: 'TCP', name: 'FTPS', full: 'FTP over TLS', use: 'FTP with TLS encryption (implicit mode)', split: '989 data, 990 control', secure: true },
  { key: 'imaps', port: '993', proto: 'TCP', name: 'IMAPS', full: 'IMAP over TLS', use: 'encrypted access to mail kept on the server', secure: true },
  { key: 'pop3s', port: '995', proto: 'TCP', name: 'POP3S', full: 'POP3 over TLS', use: 'encrypted mail download', secure: true },
  { key: 'mssql', port: '1433', proto: 'TCP', name: 'Microsoft SQL Server', full: 'Microsoft SQL Server', use: 'database connections; should only be reachable from application servers', secure: false },
  { key: 'radius', port: '1812/1813', proto: 'UDP', name: 'RADIUS', full: 'Remote Authentication Dial-In User Service', use: 'AAA for VPN, Wi-Fi and 802.1X; encrypts only the password', split: '1812 authentication, 1813 accounting', secure: false },
  { key: 'mysql', port: '3306', proto: 'TCP', name: 'MySQL', full: 'MySQL', use: 'database connections', secure: false },
  { key: 'rdp', port: '3389', proto: 'TCP', name: 'RDP', full: 'Remote Desktop Protocol', use: 'graphical remote access to Windows; a top brute-force target when exposed', secure: true },
  { key: 'sip', port: '5060/5061', proto: 'TCP/UDP', name: 'SIP', full: 'Session Initiation Protocol', use: 'VoIP call setup', split: '5060 cleartext, 5061 over TLS', secure: false },
  { key: 'syslogtls', port: '6514', proto: 'TCP', name: 'Syslog over TLS', full: 'Syslog over TLS', use: 'encrypted log forwarding to a SIEM or collector', secure: true }
]
export const portByKey = Object.fromEntries(PORTS.map((p) => [p.key, p]))
