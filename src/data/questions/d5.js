// Domain 5: Security Program Management and Oversight
export default [
  {
    o: '5.1',
    q: 'Which of the following documents provides mandatory, specific requirements such as "passwords must be at least 14 characters"?',
    a: ['Standard', 'Guideline', 'Policy', 'Procedure'],
    c: 0,
    e: 'Standards define mandatory technical requirements that support policies. Guidelines are recommendations; procedures are step-by-step instructions.'
  },
  {
    o: '5.1',
    q: 'A company documents step-by-step instructions for onboarding new employees, including account creation and badge issuance. Which of the following BEST describes this document?',
    a: ['Procedure/playbook', 'Policy', 'Standard', 'Guideline'],
    c: 0,
    e: 'Procedures (and playbooks) provide detailed, step-by-step instructions for performing a task.'
  },
  {
    o: '5.1',
    q: 'Within a data governance program, which of the following roles is ultimately accountable for a specific data set and determines its classification?',
    a: ['Data owner', 'Data custodian', 'Data processor', 'Data subject'],
    c: 0,
    e: 'The data owner (usually a senior manager) is accountable for the data and decides its classification and who may access it.'
  },
  {
    o: '5.1',
    q: 'A system administrator performs backups and applies access controls to a database according to the data owner\'s instructions. Which of the following roles does the administrator fulfill?',
    a: ['Data custodian', 'Data controller', 'Data owner', 'Data subject'],
    c: 0,
    e: 'The data custodian/steward implements and maintains the security controls on behalf of the data owner.'
  },
  {
    o: '5.1',
    q: 'A cloud payroll provider processes employee data on behalf of a company that decides how and why the data is used. Under GDPR, which of the following roles does the payroll provider hold?',
    a: ['Data processor', 'Data controller', 'Data owner', 'Data subject'],
    c: 0,
    e: 'The controller determines the purposes and means of processing; the processor processes data on the controller\'s behalf.'
  },
  {
    o: '5.2',
    q: 'An asset is worth $100,000 and a fire would destroy 40% of it. A fire is expected once every 10 years. What is the annualized loss expectancy (ALE)?',
    a: ['$4,000', '$40,000', '$10,000', '$400,000'],
    c: 0,
    e: 'SLE = AV × EF = $100,000 × 0.4 = $40,000. ARO = 0.1. ALE = SLE × ARO = $4,000.'
  },
  {
    o: '5.2',
    q: 'A company purchases cybersecurity insurance to cover potential losses from a data breach. Which of the following risk management strategies is this?',
    a: ['Transfer', 'Accept', 'Avoid', 'Mitigate'],
    c: 0,
    e: 'Risk transference shifts the financial impact of a risk to a third party, such as an insurer.'
  },
  {
    o: '5.2',
    q: 'A company decides to stop offering a service because the associated risks are too high to justify its revenue. Which of the following risk strategies is this?',
    a: ['Avoid', 'Transfer', 'Accept', 'Mitigate'],
    c: 0,
    e: 'Risk avoidance eliminates the risk by discontinuing the activity that causes it.'
  },
  {
    o: '5.2',
    q: 'Which of the following documents lists identified risks along with their owners, likelihood, impact, and planned responses?',
    a: ['Risk register', 'Business impact analysis', 'Service-level agreement', 'Memorandum of understanding'],
    c: 0,
    e: 'A risk register tracks identified risks, their ratings, owners, and treatment status.'
  },
  {
    o: '5.2',
    q: 'The amount of risk an organization is willing to accept in pursuit of its objectives is known as which of the following?',
    a: ['Risk appetite', 'Risk tolerance', 'Residual risk', 'Inherent risk'],
    c: 0,
    e: 'Risk appetite is the overall level of risk an organization is willing to pursue or accept. Tolerance is the acceptable deviation for a specific risk.'
  },
  {
    o: '5.2',
    q: 'After implementing new controls, some risk remains. Which of the following terms describes this remaining risk?',
    a: ['Residual risk', 'Inherent risk', 'Risk appetite', 'Risk exception'],
    c: 0,
    e: 'Residual risk is the risk remaining after controls are applied. Inherent risk is the risk before controls.'
  },
  {
    o: '5.2',
    q: 'A business impact analysis determines that a payment system must be restored within 2 hours of an outage. Which of the following metrics does this represent?',
    a: ['RTO', 'RPO', 'MTBF', 'ARO'],
    c: 0,
    e: 'Recovery time objective (RTO) is the maximum acceptable time to restore a system after an outage.'
  },
  {
    o: '5.2',
    q: 'A risk assessment uses ratings of "high," "medium," and "low" rather than dollar amounts. Which of the following types of risk analysis is this?',
    a: ['Qualitative', 'Quantitative', 'Annualized', 'Inherent'],
    c: 0,
    e: 'Qualitative analysis uses subjective ratings; quantitative analysis uses numeric/monetary values such as SLE and ALE.'
  },
  {
    o: '5.3',
    q: 'Before signing a contract with a new managed service provider, a company reviews the vendor\'s security practices, financial stability, and past breaches. Which of the following is this?',
    a: ['Due diligence', 'Due care', 'Right-to-audit', 'Rules of engagement'],
    c: 0,
    e: 'Due diligence is the investigation and assessment of a vendor before entering into an agreement.'
  },
  {
    o: '5.3',
    q: 'Which of the following agreements specifies measurable performance requirements such as 99.9% uptime and response times between a provider and a customer?',
    a: ['SLA', 'MOU', 'NDA', 'BPA'],
    c: 0,
    e: 'A service-level agreement (SLA) defines measurable service levels and often penalties for not meeting them.'
  },
  {
    o: '5.3',
    q: 'Two organizations want to document a non-binding mutual understanding of their intent to collaborate on a project. Which of the following should be used?',
    a: ['MOU', 'SLA', 'MSA', 'SOW'],
    c: 0,
    e: 'A memorandum of understanding (MOU) expresses intent and is typically not legally binding.'
  },
  {
    o: '5.3',
    q: 'A company wants a contract clause allowing it to inspect a vendor\'s security controls at any time. Which of the following should be included?',
    a: ['Right-to-audit clause', 'Non-disclosure agreement', 'Work order', 'Rules of engagement'],
    c: 0,
    e: 'A right-to-audit clause grants the customer the contractual right to assess the vendor\'s controls.'
  },
  {
    o: '5.3',
    q: 'Which of the following agreements defines the specific tasks, deliverables, and timeline for a particular project under an existing master agreement?',
    a: ['SOW/Work order', 'MSA', 'MOA', 'NDA'],
    c: 0,
    e: 'A statement of work (SOW) or work order details the scope and deliverables of specific work, usually under an MSA.'
  },
  {
    o: '5.4',
    q: 'A company that processes credit card payments must comply with which of the following?',
    a: ['PCI DSS', 'HIPAA', 'FERPA', 'SOX'],
    c: 0,
    e: 'The Payment Card Industry Data Security Standard (PCI DSS) applies to entities that store, process, or transmit cardholder data.'
  },
  {
    o: '5.4',
    q: 'Under GDPR, a customer requests that a company delete all of their personal data. Which of the following rights is the customer exercising?',
    a: ['Right to be forgotten', 'Right to audit', 'Data portability only', 'Attestation'],
    c: 0,
    e: 'The right to be forgotten (erasure) allows individuals to request deletion of their personal data.'
  },
  {
    o: '5.4',
    q: 'Which of the following are potential consequences of non-compliance with regulations? (Select TWO).',
    a: ['Fines', 'Loss of license', 'Increased risk appetite', 'Lower insurance premiums', 'Improved reputation', 'Reduced audit scope'],
    c: [0, 1],
    e: 'Consequences of non-compliance include fines, sanctions, reputational damage, loss of license, and contractual impacts.'
  },
  {
    o: '5.5',
    q: 'A penetration tester is given full network diagrams, source code, and credentials before starting the test. Which of the following BEST describes this test environment?',
    a: ['Known environment', 'Unknown environment', 'Partially known environment', 'Passive reconnaissance'],
    c: 0,
    e: 'In a known environment (white box) test, the tester has full knowledge of the systems.'
  },
  {
    o: '5.5',
    q: 'Before a penetration test begins, the tester and client agree on the scope, testing hours, and systems that are off-limits. Which of the following documents captures this?',
    a: ['Rules of engagement', 'Service-level agreement', 'Attestation', 'Risk register'],
    c: 0,
    e: 'Rules of engagement define what testers can and cannot do, including scope, timing, and communication.'
  },
  {
    o: '5.5',
    q: 'A penetration tester searches social media and public company websites to identify employee names and email formats without interacting with the target\'s systems. Which of the following is this?',
    a: ['Passive reconnaissance', 'Active reconnaissance', 'Exploitation', 'Lateral movement'],
    c: 0,
    e: 'Passive reconnaissance gathers information (OSINT) without directly interacting with target systems.'
  },
  {
    o: '5.5',
    q: 'During a security exercise, one team attacks the organization while another defends, and a third team works with both to share findings and improve defenses. Which of the following is the third team?',
    a: ['Purple team', 'White team', 'Red team', 'Blue team'],
    c: 0,
    e: 'Purple teams facilitate collaboration between red (offense) and blue (defense) teams. White teams referee and manage the exercise.'
  },
  {
    o: '5.5',
    q: 'An independent firm reviews a company\'s controls and issues a formal statement that the controls meet a standard. Which of the following BEST describes this statement?',
    a: ['Attestation', 'Self-assessment', 'Internal audit', 'Gap analysis'],
    c: 0,
    e: 'Attestation is a formal declaration by an auditor, often external, that controls meet requirements.'
  },
  {
    o: '5.6',
    q: 'The security team sends simulated phishing emails to employees and tracks who clicks the links. Which of the following is the PRIMARY purpose of this activity?',
    a: ['Measure and improve security awareness', 'Collect employee credentials', 'Test the email server\'s uptime', 'Satisfy data sovereignty requirements'],
    c: 0,
    e: 'Phishing campaigns measure susceptibility and provide targeted training to improve awareness.'
  },
  {
    o: '5.6',
    q: 'An employee notices an unfamiliar person following closely behind them through a secure door. According to security awareness training, which of the following should the employee do?',
    a: ['Report the tailgating attempt following company procedure', 'Hold the door to be polite', 'Ignore it if the person is well-dressed', 'Post about it on social media'],
    c: 0,
    e: 'Users should recognize and report suspicious activity such as tailgating, following the organization\'s reporting procedures.'
  },
  {
    o: '5.6',
    q: 'Which of the following security awareness topics BEST addresses the risk of employees working from coffee shops?',
    a: ['Remote work and public Wi-Fi risks', 'Data center physical access', 'Change management', 'Hardware tokenization'],
    c: 0,
    e: 'Training on hybrid/remote work covers risks like public Wi-Fi, shoulder surfing, and the use of VPNs.'
  }
]
