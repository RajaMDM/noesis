export interface HierarchyNode {
  level: number; // 0=root, 1=child, 2=grandchild, 3=great-grandchild, 4=deep
  name: string;
  description?: string; // short annotation, optional
}

export interface CrossDomainRelationship {
  targetSlug: string;
  targetName: string;
  dataFlow: string; // what data crosses the boundary (one line)
  withoutThis: string; // what breaks if this link is dirty (one line)
}

export interface DomainEntity {
  name: string;
  definition: string;
  example: string; // a concrete, realistic data example shown alongside the definition
}

export interface DomainIntegration {
  name: string;
  category: string; // e.g. 'ERP', 'CDP', 'DaaS', 'POS', 'HRIS'
  description: string;
}

export interface BurningScenario {
  title: string;
  narrative: string; // 3 punchy sentences max — hook, complication, data management implication
  dmConcepts: string[];
}

export interface DomainJourneyStep {
  technique: string; // the DM stage name
  why: string; // why THIS stage matters for THIS domain specifically
  exampleChallenge: string; // one concrete example challenge in this domain at this stage
}

export interface DomainContent {
  slug: string;
  name: string;
  tagline: string;
  analogy: string;
  entities: DomainEntity[];
  hierarchy: HierarchyNode[];
  dmJourney: DomainJourneyStep[]; // ALWAYS 6 steps: Sources, Integration, Quality, Governance, MDM, Reverse Integration
  integrations: DomainIntegration[];
  scenarios: BurningScenario[];
  crossDomainRelationships: CrossDomainRelationship[];
}

export const domainContent: Record<string, DomainContent> = {
  customer: {
    slug: 'customer',
    name: 'Customer',
    tagline: 'Every business thinks it knows its customers. Almost none of them do.',
    analogy:
      '🪞 The Customer domain is the mirror your business holds up to reality. If the reflection is blurry — duplicate records, wrong emails, merged households — every downstream decision is distorted.',
    entities: [
      {
        name: 'Individual',
        definition: 'A unique person, regardless of how many times they appear in your systems.',
        example: 'CUST-00012847 | Sarah Mitchell | DOB: 1985-04-12 | Gold Loyalty Member',
      },
      {
        name: 'Household',
        definition: 'Grouped individuals sharing an address — a commercial and analytical unit.',
        example: 'HH-00834 | 14 Elm Grove, London SE22 | Members: Sarah Mitchell + Tom Mitchell',
      },
      {
        name: 'Loyalty Member',
        definition: 'A customer enrolled in a structured rewards programme with tier and point balance.',
        example: 'Loyalty ID: NFGLOY-48291 | Tier: Gold | Points: 3,420 | Joined: 2019-03-01',
      },
      {
        name: 'B2B Account',
        definition: 'A company as a commercial customer — with its own contacts, spend history, and credit terms.',
        example: 'ACC-8821 | Acme Catering Ltd | Credit Limit: £25,000 | Account Manager: James Chen',
      },
      {
        name: 'Contact',
        definition: 'A named individual within a B2B account — the person you actually deal with.',
        example: 'CON-2241 | Helen Rogers | Acme Catering Ltd | Role: Head of Procurement | h.rogers@acme.co.uk',
      },
      {
        name: 'Golden Record',
        definition: 'The single, authoritative, de-duplicated view of a customer — the output of MDM.',
        example: 'Survived record: CUST-00012847 (merged from 3 duplicates: CUST-00008821, CUST-01129, CUST-00012847)',
      },
    ],
    hierarchy: [
      { level: 0, name: 'Customer Domain' },
      { level: 1, name: 'B2C (Business-to-Consumer)' },
      { level: 2, name: 'Individual', description: 'unique person' },
      { level: 3, name: 'Loyalty Member', description: 'enrolled, with tier and points' },
      { level: 3, name: 'Online Profile', description: 'email/password, behavioural data' },
      { level: 2, name: 'Household', description: 'co-located group' },
      { level: 3, name: 'Household Wallet', description: 'combined spend view' },
      { level: 1, name: 'B2B (Business-to-Business)' },
      { level: 2, name: 'Contact', description: 'named individual' },
      { level: 2, name: 'Account', description: 'the company entity' },
      { level: 3, name: 'Parent Account', description: 'multi-site or regional group' },
      { level: 4, name: 'Ultimate Parent', description: 'holding company (linked via D&B DUNS)' },
    ],
    dmJourney: [
      {
        technique: 'Data Sources',
        why: 'CRM (Salesforce/HubSpot), loyalty platform, e-commerce, call centre, point-of-sale. Each creates customer records independently, with no shared key.',
        exampleChallenge:
          "Sarah Mitchell exists as 'S. Mitchell' in Salesforce, 'Sarah M' in the loyalty app, and 'Sarah Mitchell-Jones' in the e-commerce platform — three systems, zero consensus.",
      },
      {
        technique: 'Data Integration',
        why: 'Customer events must flow from touchpoints → data warehouse → CDP in near real-time. Batch overnight feeds miss same-day interactions.',
        exampleChallenge:
          "Sarah purchases at Oxford Street at 6pm. The email campaign fires at 7pm promoting the same item. The batch feed hasn't run yet. She gets a 'buy now' email for something she just bought.",
      },
      {
        technique: 'Data Quality',
        why: 'Email deliverability, phone validity, address standardisation, completeness scoring, deduplication rate. Quality = trust = activation.',
        exampleChallenge:
          "14% of Noesis Foods Group's loyalty base has an invalid email address. Every campaign misfires on 14% of sends. Nobody knows because open rate is calculated on delivered, not sent.",
      },
      {
        technique: 'Data Governance',
        why: 'Consent management (GDPR/CCPA), data retention rules, right-to-erasure, PII access controls, data classification.',
        exampleChallenge:
          "Sarah opts out of marketing in-app. The opt-out writes to the loyalty platform. It doesn't propagate to Salesforce or the campaign tool. She receives 3 more emails. Article 17 gives 30 days to respond to her complaint.",
      },
      {
        technique: 'Master Data Management',
        why: 'Match/merge across systems, survivor rules, golden record creation, household linkage, B2B hierarchy assembly.',
        exampleChallenge:
          'Post-acquisition of a regional coffee chain: 400,000 new customer records, 30% estimated overlap with existing base, no shared customer ID. Matching must happen before the loyalty migration deadline.',
      },
      {
        technique: 'Reverse Integration',
        why: 'Golden records flow back to CRM for sales teams, to CDP for campaign activation, to personalisation engines, to loyalty platform for consistent tier display.',
        exampleChallenge:
          'The golden record says Sarah is Gold tier. The loyalty app still reads from its own database and shows Silver. She complains at the counter.',
      },
    ],
    integrations: [
      {
        name: 'Salesforce / HubSpot',
        category: 'CRM',
        description: 'Primary CRM — source of B2B account and contact records; receives golden record updates via reverse integration.',
      },
      {
        name: 'Segment / mParticle',
        category: 'CDP',
        description: 'Customer Data Platform — unifies behavioural events from web, app, and POS for real-time activation.',
      },
      {
        name: 'Experian / Acxiom',
        category: 'DaaS',
        description: 'Third-party data enrichment — appends demographics, contact validation, and address standardisation to customer records.',
      },
      {
        name: 'OneTrust',
        category: 'Consent Management',
        description: 'Consent and preference management — GDPR/CCPA opt-in/out records that must propagate to all downstream activation systems.',
      },
      {
        name: 'Twilio Lookup',
        category: 'Data Quality',
        description: 'Phone number validation API — confirms number format, carrier, and line type before campaign sends.',
      },
    ],
    scenarios: [
      {
        title: '3 Systems, 3 Customer Counts, 1 Board Meeting',
        narrative:
          'Your CRM says 2.1 million customers. Your loyalty platform says 890,000 members. Your CEO asks for "total customers" in the board pack. You have 30 minutes. There is no golden record. Every number is defensible and all of them are wrong.',
        dmConcepts: ['MDM', 'Data Quality', 'Data Governance'],
      },
      {
        title: 'The GDPR Opt-Out That Wasn\'t',
        narrative:
          'Sarah Mitchell opts out of marketing on the app in January. Your campaign platform sends her 14 emails between January and March. In April she complains. Article 17 gives you 30 days to respond. Your consent data lives in four systems, none of them the same.',
        dmConcepts: ['Data Governance', 'Data Integration', 'Data Quality'],
      },
      {
        title: 'The Acquisition That Doubled Your Data Problem',
        narrative:
          'You acquire a coffee chain with 400,000 customers. 30% likely overlap with your base. None use the same ID format. 60% have email only. The loyalty migration go-live is in 8 weeks. You haven\'t started matching yet.',
        dmConcepts: ['MDM', 'Data Integration', 'Data Quality'],
      },
    ],
    crossDomainRelationships: [
      {
        targetSlug: 'location',
        targetName: 'Location',
        dataFlow: 'Customer address → store catchment matching → footfall attribution',
        withoutThis: "Catchment analysis is impossible — you can't link customers to their nearest stores",
      },
      {
        targetSlug: 'financial',
        targetName: 'Financial Domain',
        dataFlow: 'Customer ID → transaction → GL revenue line → segment P&L',
        withoutThis: "Revenue by customer segment is a guess; customer profitability analysis doesn't exist",
      },
      {
        targetSlug: 'product-hospitality',
        targetName: 'F&B · Hospitality',
        dataFlow: 'Customer purchase history → product affinity → personalised recommendation',
        withoutThis: 'Personalisation is impossible; every customer gets the same email',
      },
      {
        targetSlug: 'supplier',
        targetName: 'Supplier',
        dataFlow: 'B2B customer and supplier may be the same legal entity — party master must link them',
        withoutThis: 'A company gets treated as a new customer AND a supplier simultaneously, with no relationship visibility',
      },
    ],
  },

  supplier: {
    slug: 'supplier',
    name: 'Supplier',
    tagline: "You can't manage what you haven't mastered. Most supplier databases are archaeological sites.",
    analogy:
      '🔗 The supplier domain is the spine of your supply chain. Corrupt data here — a wrong bank account, an expired certificate, a mis-categorised product — sends shockwaves through procurement, finance, and compliance simultaneously.',
    entities: [
      {
        name: 'Supplier / Vendor',
        definition: 'The company that provides goods or services.',
        example: 'SUP-0892 | Sysco UK Ltd | Type: Food Distributor | Status: Active | D&B DUNS: 21-345-6789',
      },
      {
        name: 'Supplier Site',
        definition: 'A specific physical facility from which supply originates.',
        example: 'SITE-0892-03 | Sysco UK — Heathrow Distribution Centre | Delivery Lead Time: 2 days | Min Order: £500',
      },
      {
        name: 'Contact',
        definition: 'The key individual at the supplier — commercial, logistics, or quality.',
        example: 'CON-0892-07 | Mark Davies | Sysco UK | Role: Account Manager | m.davies@sysco.co.uk | Mobile: 07712 334 455',
      },
      {
        name: 'Product Listing',
        definition: 'What this supplier supplies — linked to your internal product master.',
        example: 'PLI-9921 | Sysco SKU: SYS-BB-6OZ | Internal: Beef Patty Frozen 6oz | Price: £2.34/unit | Case: 24 units',
      },
      {
        name: 'Compliance Certificate',
        definition: 'A regulatory or quality document with an expiry date.',
        example: 'CERT-0892-12 | Food Hygiene Rating 5 | Issued: 2024-09-01 | Expires: 2026-08-31 | Issuer: FSA',
      },
      {
        name: 'Contract',
        definition: 'The commercial agreement governing terms, pricing, and SLAs.',
        example: 'CTR-0892-2024 | Sysco UK Framework Agreement | Start: 2024-01-01 | End: 2026-12-31 | Payment Terms: 30 days net',
      },
    ],
    hierarchy: [
      { level: 0, name: 'Supplier Domain' },
      { level: 1, name: 'Ultimate Parent (D&B Global Ultimate)' },
      { level: 2, name: 'Legal Entity / Head Office', description: 'registered company' },
      { level: 3, name: 'Supplier Site', description: 'physical supply facility' },
      { level: 4, name: 'Contact', description: 'key individual at site' },
      { level: 4, name: 'Product Listing', description: 'what this site supplies' },
      { level: 4, name: 'Compliance Certificate', description: 'regulatory docs with expiry' },
      { level: 3, name: 'Contract', description: 'commercial agreement' },
      { level: 1, name: 'Independent Supplier (no parent group)' },
      { level: 2, name: 'Supplier Site' },
      { level: 3, name: 'Contact' },
      { level: 3, name: 'Product Listing' },
    ],
    dmJourney: [
      {
        technique: 'Data Sources',
        why: "Supplier onboarding forms, procurement portals (Coupa/Ariba), Companies House/GLEIF (legal entity validation), D&B (enrichment), legacy supplier spreadsheets.",
        exampleChallenge:
          "Sysco UK is onboarded in three systems: the ERP (as 'Sysco UK Ltd'), the procurement portal (as 'SYSCO UK LIMITED'), and a legacy spreadsheet (as 'Sysco'). Three records, one supplier.",
      },
      {
        technique: 'Data Integration',
        why: 'Supplier portal → procurement system → ERP → AP; certificate documents → compliance tracker; price lists → product master.',
        exampleChallenge:
          'Sysco updates their price list quarterly. It arrives as a PDF. Someone manually keys the changes into the ERP. Three products are keyed incorrectly. COGS is wrong for the whole quarter.',
      },
      {
        technique: 'Data Quality',
        why: 'Bank account completeness (payment accuracy), VAT/tax ID validation, contact completeness, certificate expiry tracking, product listing accuracy.',
        exampleChallenge:
          "Audit season. Prove every food supplier holds a current food hygiene certificate. Your supplier database has 847 vendors. Certificate expiry dates are in a free-text field: some say '2024', some 'March 2025', some are blank.",
      },
      {
        technique: 'Data Governance',
        why: 'New supplier approval workflow (who can onboard?), certificate renewal reminders, bank detail change authorisation (fraud risk), procurement policy enforcement.',
        exampleChallenge:
          "A supplier requests a bank account change via email. AP updates it in the payment system. It doesn't update in the supplier master. Three months later, £340,000 is paid to the wrong account.",
      },
      {
        technique: 'Master Data Management',
        why: 'Supplier golden record across procurement + ERP + AP; parent-child hierarchy (site vs corporate entity); D&B DUNS as global identifier; post-acquisition supplier master consolidation.',
        exampleChallenge:
          'Post-merger: two supplier masters, 1,200 combined vendors, 300 apparent duplicates. Some duplicates are different sites of the same parent company. Some are genuinely different companies with similar names. D&B DUNS resolves 60% automatically. The rest needs manual review.',
      },
      {
        technique: 'Reverse Integration',
        why: 'Clean supplier records → AP (accurate payments), → procurement catalogue (correct pricing), → sustainability reporting platforms, → risk dashboards.',
        exampleChallenge:
          'The ESG report needs Scope 3 emissions by supplier. Clean supplier data with parent-child hierarchy and D&B linkage makes this a database query. Dirty data makes it a 6-week manual exercise.',
      },
    ],
    integrations: [
      {
        name: 'D&B / Dun & Bradstreet',
        category: 'DaaS',
        description: 'DUNS number, global parent-child hierarchy, financial risk scores, and entity validation for supplier master enrichment.',
      },
      {
        name: 'Coupa / SAP Ariba',
        category: 'Procurement',
        description: 'Supplier onboarding portal, procurement catalogue management, and purchase order workflow — primary source of supplier transactional data.',
      },
      {
        name: 'EcoVadis',
        category: 'ESG',
        description: 'Supplier sustainability ratings — CSR, environmental, labour, and ethics scores linked to supplier master for ESG reporting.',
      },
      {
        name: 'GLEIF',
        category: 'DaaS',
        description: 'Global Legal Entity Identifier Foundation — authoritative source for LEI codes and registered legal entity names across jurisdictions.',
      },
      {
        name: 'DocuSign / Icertis',
        category: 'Contract Management',
        description: 'Contract lifecycle management — supplier agreements linked to the supplier master with term dates and renewal alerts.',
      },
    ],
    scenarios: [
      {
        title: 'The Wrong Bank Account',
        narrative:
          "A supplier emails to say their bank details have changed. AP updates the payment system. Nobody updates the supplier master. Three months and four payments later, £340,000 has gone to an account the supplier doesn't recognise. The supplier master said the old details were correct.",
        dmConcepts: ['Data Governance', 'Data Quality', 'MDM'],
      },
      {
        title: 'Certificate Roulette',
        narrative:
          "Audit season. Prove every food supplier has a current food hygiene cert. 847 suppliers. Expiry dates stored in a free-text field — '2024', 'March 2025', blank. You have two days.",
        dmConcepts: ['Data Quality', 'Data Governance'],
      },
      {
        title: 'The Merger Supplier Swamp',
        narrative:
          'Two supplier masters. 1,200 combined vendors. 300 apparent duplicates — some are different sites of the same parent company, some are genuinely different companies with similar names. DUNS resolves 60%. Go-live is in 3 weeks.',
        dmConcepts: ['MDM', 'Data Integration', 'Data Quality'],
      },
    ],
    crossDomainRelationships: [
      {
        targetSlug: 'financial',
        targetName: 'Financial Domain',
        dataFlow: 'Supplier master → payment terms → AP journal → COGS',
        withoutThis: 'Wrong payment terms paid; COGS corrupted; supplier disputes take months to resolve',
      },
      {
        targetSlug: 'product-hospitality',
        targetName: 'F&B · Hospitality',
        dataFlow: 'Supplier site → product listing → recipe ingredient → logistical variant',
        withoutThis: 'Recipe costs are wrong; supply chain risk by ingredient is invisible',
      },
      {
        targetSlug: 'location',
        targetName: 'Location',
        dataFlow: 'Supplier site → delivery zone → store coverage map',
        withoutThis: 'Cannot identify which stores are at risk if a specific supplier fails',
      },
      {
        targetSlug: 'customer',
        targetName: 'Customer',
        dataFlow: 'A B2B customer and a supplier may be the same legal entity',
        withoutThis: 'No relationship visibility; commercial negotiations happen in silos',
      },
    ],
  },

  employee: {
    slug: 'employee',
    name: 'Employee',
    tagline: 'Headcount is simple arithmetic. Employee data is not.',
    analogy:
      '👥 Employee data is deceptively simple — name, role, department. Until you reconcile it across payroll, HRIS, Active Directory, access control, and an expense system. Then it becomes the most politically sensitive data in the organisation.',
    entities: [
      {
        name: 'Employee',
        definition: 'A person in an employment relationship with the organisation.',
        example: 'EMP-0441 | James Chen | Operations Manager | Status: Active | Start: 2019-07-01 | Cost Centre: CC-3042',
      },
      {
        name: 'Position',
        definition: 'The role/job family an employee holds — distinct from the person.',
        example: 'POS-0812 | Operations Manager — Hospitality | Grade: M3 | Band: Manager | Department: Store Operations',
      },
      {
        name: 'Cost Centre',
        definition: "The financial unit to which the employee's costs are attributed.",
        example: 'CC-3042 | Oxford Street Store — Operations | Division: Hospitality UK | P&L Owner: Regional Director',
      },
      {
        name: 'Organisational Unit',
        definition: 'The team, department, or division the employee belongs to.',
        example: 'ORG-218 | Store Operations — London Region | Head Count: 142 | Manager: VP Ops (EMP-0089)',
      },
      {
        name: 'Contract',
        definition: 'The employment terms — type, hours, compensation.',
        example: 'CTR-EMP-0441 | Full Time, Permanent | Hours: 40pw | Salary: Grade M3 | Probation End: 2019-10-01',
      },
      {
        name: 'Skills / Competencies',
        definition: 'Verified capabilities linked to L&D records and LinkedIn.',
        example: 'SKILL-0441 | Data Management ✓ | P&L Accountability ✓ | HACCP Certified ✓ | Last Reviewed: 2024-10',
      },
    ],
    hierarchy: [
      { level: 0, name: 'Employee Domain — Noesis Foods Group' },
      { level: 1, name: 'Legal Entity (Noesis Foods UK Ltd)' },
      { level: 2, name: 'Division (Hospitality UK)' },
      { level: 3, name: 'Region (London Region)' },
      { level: 4, name: 'Department / Function (Store Operations)' },
      { level: 5, name: 'Team (Oxford Street Ops)' },
      { level: 6, name: 'Position (Operations Manager)' },
      { level: 7, name: 'Employee (James Chen — EMP-0441)' },
      { level: 8, name: 'Contract (terms, hours, grade)' },
      { level: 8, name: 'Skills & Competencies' },
    ],
    dmJourney: [
      {
        technique: 'Data Sources',
        why: 'HRIS (Workday/SuccessFactors), recruitment ATS (Greenhouse/Lever), payroll (ADP/Ceridian), Active Directory/Entra ID, badge/access control systems.',
        exampleChallenge:
          "James Chen's manager changes. HR updates Workday. Payroll is updated. Active Directory still shows the old manager. The organisation chart tool shows a third name. Three systems, three managers.",
      },
      {
        technique: 'Data Integration',
        why: 'HRIS → payroll → Active Directory → facilities → analytics; joiner/mover/leaver events trigger provisioning across 8+ downstream systems.',
        exampleChallenge:
          "James moves from Oxford Street to the Regional Office. HRIS is updated. The facilities system isn't connected to the JML workflow. His access card still opens Oxford Street. His Regional Office access isn't provisioned for 3 weeks.",
      },
      {
        technique: 'Data Quality',
        why: "Cost centre assignment accuracy, job title standardisation (is 'Senior Manager' the same as 'Principal'?), leavers correctly terminated, location assignment current.",
        exampleChallenge:
          "James transfers from Finance to Operations. His cost centre in the expenses system doesn't update for 2 months. His expenses hit the Finance budget. Marketing shows one person short in headcount.",
      },
      {
        technique: 'Data Governance',
        why: 'PII and sensitive data classification (salary, medical, disciplinary — access tiers); GDPR right to erasure on termination; data retention (7 years in many jurisdictions); audit trails.',
        exampleChallenge:
          "A data breach investigation reveals 23 ex-employees still have active system access — one for over 2 years post-termination. The leaver process fired a ServiceNow ticket. Three systems weren't connected to the JML workflow.",
      },
      {
        technique: 'Master Data Management',
        why: 'Employee golden record across HRIS, payroll, and Active Directory; post-merger employee master consolidation; job title and grade normalisation across organisations. Note: for smaller orgs with a single HRIS, DQ + Governance may suffice — MDM becomes critical at scale or post-acquisition.',
        exampleChallenge:
          "Post-merger: two HRIS instances, 1,400 employees to consolidate into one Workday instance, 340 with duplicate entries from cross-company project work. 'Senior Manager' in Company A = 'Principal' in Company B. Go-live in 6 weeks.",
      },
      {
        technique: 'Reverse Integration',
        why: 'Clean employee data → payroll (salary accuracy), → Active Directory (system access), → facilities (desk booking, access badges), → L&D platforms, → workforce analytics.',
        exampleChallenge:
          'The workforce analytics dashboard shows London Region headcount as 139. The HRIS says 142. Payroll says 141. Three different feeds, three different cut-off dates. The board pack shows whichever number someone chose this quarter.',
      },
    ],
    integrations: [
      {
        name: 'Workday / SAP SuccessFactors',
        category: 'HRIS',
        description: 'Core HR system of record — employee master, organisational hierarchy, position management, and JML event source.',
      },
      {
        name: 'ADP / Ceridian',
        category: 'Payroll',
        description: 'Payroll processing — receives employee and cost centre data from HRIS; must stay synchronised for accurate salary and labour cost posting.',
      },
      {
        name: 'Microsoft Entra ID / Okta',
        category: 'Identity',
        description: 'Identity and access management — provisioned from HRIS JML events; governs system access across all enterprise applications.',
      },
      {
        name: 'ServiceNow',
        category: 'ITSM',
        description: 'JML ticketing — joiner/mover/leaver workflows trigger access provisioning and de-provisioning across connected systems.',
      },
      {
        name: 'LinkedIn Talent Insights',
        category: 'DaaS',
        description: 'Skills benchmarking and external labour market data — enriches internal skills/competency records with external market context.',
      },
    ],
    scenarios: [
      {
        title: 'The Transfer Nobody Told Systems About',
        narrative:
          "James Chen moves from Finance to Operations. HR updates the HRIS. The expenses system doesn't update for 2 months. His costs hit the Finance budget. Operations is one person short in headcount. Finance is one over. The CFO asks why Finance headcount is exceeding plan.",
        dmConcepts: ['Data Quality', 'Data Integration', 'Data Governance'],
      },
      {
        title: 'Ghost Accounts',
        narrative:
          '23 ex-employees still have active system access. One for over 2 years. The leaver process fired a ServiceNow ticket. Three systems weren\'t on the JML workflow. A routine access audit finds it before a breach does. This time.',
        dmConcepts: ['Data Governance', 'Data Integration'],
      },
      {
        title: 'The Merger Org Collapse',
        narrative:
          'Two HRIS instances, 1,400 employees, 340 duplicates, mismatched job grades, cost centres that don\'t map. Workday go-live in 6 weeks. The first payroll run in the new system will either pay everyone correctly or not.',
        dmConcepts: ['MDM', 'Data Integration', 'Data Quality'],
      },
    ],
    crossDomainRelationships: [
      {
        targetSlug: 'location',
        targetName: 'Location',
        dataFlow: 'Employee → location assignment → cost centre → store P&L',
        withoutThis: 'Labour costs hit wrong store budgets; headcount by location is unreliable',
      },
      {
        targetSlug: 'financial',
        targetName: 'Financial Domain',
        dataFlow: 'Employee cost centre → payroll journal → P&L',
        withoutThis: 'Labour cost per department/store is wrong; performance bonuses calculated on incorrect baselines',
      },
      {
        targetSlug: 'customer',
        targetName: 'Customer',
        dataFlow: 'Employee (service staff) → interaction → customer experience',
        withoutThis: 'No link between staff performance data and customer satisfaction metrics',
      },
    ],
  },

  'product-hospitality': {
    slug: 'product-hospitality',
    name: 'F&B · Hospitality',
    tagline: 'A menu item is not just a name and a price. It is a data contract between your kitchen, your supplier, and your customer.',
    analogy:
      '🍽️ Think of a menu as an iceberg. What the customer sees — name, price, photo — is 10%. Below the waterline: recipes, ingredients, allergens, nutritional values, logistical variants, and the integration layer that keeps all of it legally compliant and commercially accurate.',
    entities: [
      {
        name: 'Menu Item',
        definition: 'The consumer-facing product: name, description, price, photography, dietary badges.',
        example: 'MNU-0042 | Classic Beef Burger | £10.99 | Available: Dine-In, Takeaway, Delivery | Dietary: N/A',
      },
      {
        name: 'Logistical Variant',
        definition: 'The purchasable form of an ingredient as it arrives from a supplier — distinct from how it\'s used in a recipe. One of the most misunderstood entities in F&B data.',
        example: 'LV-0821 | Beef Patty, Frozen, 6oz, Case of 24 | Supplier: Sysco UK (SITE-0892-03) | Price: £2.34/unit',
      },
      {
        name: 'Recipe',
        definition: 'The ingredient-level breakdown of a Menu Item, including portion weights, cooking instructions, and yield factors.',
        example: 'RCP-0042 | Classic Beef Burger: Beef Patty 170g + Brioche Bun 1pc + Cheddar 20g + Iceberg Lettuce 15g + Beef Tomato 30g + House Sauce 25ml',
      },
      {
        name: 'Ingredient',
        definition: 'An input to a recipe with allergen flags, INCI/nutritional links, and supplier origin.',
        example: 'ING-0319 | Brioche Bun | Allergens: GLUTEN (Wheat), Eggs, Milk, Soy | Supplier: Allied Bakeries | Unit: 1 piece | Weight: 85g',
      },
      {
        name: 'Sub-Menu',
        definition: 'A grouping of Menu Items within a Menu — time-based (Breakfast/Lunch/Dinner) or category-based (Starters/Mains/Desserts/Drinks).',
        example: 'SMNU-003 | Mains | Display Order: 2 | Items: 14 | Available: All Day | Brand: Noesis Burger Co.',
      },
      {
        name: 'Menu',
        definition: 'The published collection of all items available at a brand or site, with a version and effective date.',
        example: 'MENU-2025-Q1 | Noesis Burger Co. UK | Version: 4.2 | Effective: 2025-01-06 | Sites: 47 | Status: Active',
      },
      {
        name: 'Modifier',
        definition: 'A customer-requested customisation applied to a Menu Item at point of order — captured at transaction level.',
        example: 'MOD-0042-001 | Classic Beef Burger → Extra Cheese +£0.80 | No Lettuce | Sauce: Peri Peri',
      },
      {
        name: 'Nutritional Profile',
        definition: "Per-portion calorie, macro, and allergen declaration. Regulatory in many markets (calorie labelling, Natasha's Law UK).",
        example: 'NUT-0042 | Classic Beef Burger | 687 kcal | Protein 42g | Carbs 48g | Fat 36g | Salt 2.1g | Allergens: Gluten, Milk, Eggs, Soy',
      },
      {
        name: 'Portion Yield',
        definition: 'The expected output weight or volume from a recipe after cooking loss is accounted for. Raw weight ≠ served weight.',
        example: 'YLD-0042 | Beef Patty: Raw 200g → Cooked 170g | Cooking Loss Factor: 15% | Method: Flat Grill 3min each side',
      },
    ],
    hierarchy: [
      { level: 0, name: 'Product Domain — Food & Beverage — Hospitality' },
      { level: 1, name: 'Menu', description: 'published collection — Noesis Burger Co. UK, Version 4.2' },
      { level: 2, name: 'Sub-Menu', description: 'Breakfast / Mains / Sides / Drinks / Desserts' },
      { level: 3, name: 'Menu Item', description: 'Classic Beef Burger — MNU-0042' },
      { level: 4, name: 'Modifier', description: 'Extra Cheese, No Lettuce, Sauce swap' },
      { level: 4, name: 'Nutritional Profile', description: '687 kcal | Allergens: Gluten, Milk, Eggs, Soy' },
      { level: 1, name: 'Recipe', description: 'ingredient-level makeup — RCP-0042' },
      { level: 2, name: 'Ingredient', description: 'Brioche Bun — ING-0319' },
      { level: 3, name: 'Allergen Declaration', description: 'Gluten, Eggs, Milk, Soy' },
      { level: 3, name: 'Logistical Variant', description: 'Brioche Bun, Sliced, 85g, Box 48 — from Allied Bakeries' },
      { level: 4, name: 'Supplier Site', description: 'Allied Bakeries — Northampton DC' },
      { level: 2, name: 'Portion Yield', description: 'Beef Patty: raw 200g → cooked 170g, 15% loss' },
      { level: 1, name: 'Logistical Variant', description: 'standalone purchasable unit' },
      { level: 2, name: 'Supplier Site', description: 'source of supply' },
      { level: 2, name: 'Product Specification', description: 'weight, format, pack size, temperature regime' },
    ],
    dmJourney: [
      {
        technique: 'Data Sources',
        why: 'Recipe management system (Fourth/Crunchtime), POS (Oracle Simphony/NCR Aloha), supplier ingredient lists, nutritional DaaS (Nutritics), menu CMS.',
        exampleChallenge:
          "The Classic Beef Burger recipe lives in Crunchtime. The supplier ingredient spec for the beef patty lives in a PDF from Sysco. The allergen declaration lives in a spreadsheet. They haven't been reconciled in 14 months.",
      },
      {
        technique: 'Data Integration',
        why: 'Recipe system → nutritional calculation platform → menu CMS → POS → digital menu boards → delivery platforms (Uber Eats, Deliveroo). One recipe change must cascade across all.',
        exampleChallenge:
          'Allied Bakeries changes the brioche bun formulation. New bun contains sesame. The recipe system is updated. The nutritional API isn\'t triggered. Digital menus still show the old allergen profile for 34 items that use the bun.',
      },
      {
        technique: 'Data Quality',
        why: "Allergen declaration accuracy (life-critical), nutritional value precision (regulatory), portion yield consistency, ingredient coverage (every recipe has defined ingredients), logistical variant → recipe mapping completeness.",
        exampleChallenge:
          "Natasha's Law audit: every pre-packed menu item needs a complete allergen label. 23 items have incomplete ingredients. 8 have no recipe defined. 3 have ingredients but missing allergen flags. Trading standards deadline is in 6 weeks.",
      },
      {
        technique: 'Data Governance',
        why: "Who can change allergen information? Change control for recipe modifications (approval workflow before publish). Regulatory compliance (calorie labelling, Natasha's Law, EU FIC). Version control on recipes.",
        exampleChallenge:
          'A chef modifies the house sauce recipe on-site, adding a new ingredient that contains celery (a major allergen). There is no recipe change approval workflow. The menu stays live with an incorrect allergen profile for 3 weeks.',
      },
      {
        technique: 'Master Data Management',
        why: 'Menu item golden record across brands and sites; logistical variant → menu item mapping; ingredient master (one canonical \'Chicken Breast\' definition); recipe consolidation after acquisition.',
        exampleChallenge:
          'Post-acquisition of a restaurant chain: 800 new menu items to integrate with 600 existing. 150 are similar but not identical — different portion sizes, same dish name. Without a logistical variant model, you can\'t reconcile costs or allergens across the merged estate.',
      },
      {
        technique: 'Reverse Integration',
        why: 'Clean menu data → POS (transaction accuracy), → digital menu boards, → delivery platforms (Uber Eats/Deliveroo must show correct calories and allergens), → nutritional compliance reports, → food cost analysis.',
        exampleChallenge:
          "Uber Eats shows the Classic Beef Burger as containing peanuts. The internal system doesn't. The allergen mismatch came from a manual data entry on the Uber Eats portal 18 months ago. Nobody audited the delivery platform data against the recipe master.",
      },
    ],
    integrations: [
      {
        name: 'Nutritics',
        category: 'Nutritional DaaS',
        description: 'Nutritional calculation platform — connects recipes to EU/FDA nutrient databases; outputs calorie and macro declarations per portion.',
      },
      {
        name: 'Oracle Simphony / NCR Aloha',
        category: 'POS',
        description: 'Point-of-sale — receives menu item master including prices, modifiers, and availability; source of transaction data for food cost analysis.',
      },
      {
        name: 'Fourth / Crunchtime',
        category: 'Recipe Management',
        description: 'Recipe and food cost management — central repository for recipes, ingredient specs, portion yields, and theoretical food cost calculations.',
      },
      {
        name: 'Allergen Bureau / FoodSwitch',
        category: 'Allergen Verification',
        description: 'Third-party allergen data verification — cross-references declared allergens against ingredient databases to catch declaration errors.',
      },
      {
        name: 'Uber Eats / Deliveroo API',
        category: 'Delivery Platform',
        description: 'Delivery platform content sync — menu items, descriptions, photos, prices, calorie counts, and allergens pushed from internal menu CMS.',
      },
    ],
    scenarios: [
      {
        title: 'The Sauce That Changed Everything',
        narrative:
          'A supplier reformulates a pre-made sauce used in 34 menu items across 3 brands. The new version contains sesame. The recipe system is updated. The allergen declaration cascade isn\'t triggered. For 6 weeks, 34 menu items carry an incorrect allergen profile on your digital menu, your website, and Deliveroo.',
        dmConcepts: ['Data Quality', 'Data Integration', 'Data Governance'],
      },
      {
        title: "The 150 Menu Items Nobody Can Classify",
        narrative:
          "You've acquired a restaurant chain. 800 items to integrate with 600 existing. 150 are similar but not identical — same dish, different portion, different recipe variant. Without a logistical variant model, you can't reconcile ingredients, costs, or allergens. The MDM project hasn't started. The systems migration has.",
        dmConcepts: ['MDM', 'Data Integration', 'Data Quality'],
      },
      {
        title: 'Calorie Labelling Deadline in 6 Weeks',
        narrative:
          'Regulation requires calorie counts on every menu item sold by outlets with 250+ employees. Your nutritional data comes from Nutritics, calculated per recipe. Your menu system displays per portion. The conversion logic lives in a spreadsheet with 3 owners and no version history.',
        dmConcepts: ['Data Governance', 'Data Quality', 'Data Integration'],
      },
    ],
    crossDomainRelationships: [
      {
        targetSlug: 'supplier',
        targetName: 'Supplier',
        dataFlow: 'Logistical variant → supplier site → ingredient spec → allergen declaration',
        withoutThis: 'Recipe allergen accuracy is only as good as the ingredient data from the supplier. If supplier data is wrong, the allergen label is wrong.',
      },
      {
        targetSlug: 'location',
        targetName: 'Location',
        dataFlow: 'Menu item → site ranging → pricing by location',
        withoutThis: 'A menu item discontinued at one site stays live on delivery platforms for that site because location-menu mapping was never updated',
      },
      {
        targetSlug: 'customer',
        targetName: 'Customer',
        dataFlow: 'Menu item → purchase history → customer preference → personalisation',
        withoutThis: "Cannot identify Sarah Mitchell's dietary preferences or allergen history from transaction data",
      },
      {
        targetSlug: 'financial',
        targetName: 'Financial Domain',
        dataFlow: 'Recipe cost (ingredients × portion yield) → food cost % → gross margin by menu item',
        withoutThis: 'Without accurate recipe and logistical variant data, food cost is a guess. Menu pricing decisions are made on wrong margins.',
      },
    ],
  },

  'product-apparel': {
    slug: 'product-apparel',
    name: 'Apparel & Accessories',
    tagline: 'A blue t-shirt in size medium is actually dozens of data attributes held together by brittle convention.',
    analogy:
      '👕 In apparel, the product domain is a size-colour matrix sitting on top of a supply chain. Get the matrix wrong and you can\'t count your stock. Get the supply chain wrong and you can\'t source it. Get both wrong simultaneously — which is common — and you have a data crisis dressed as a buying crisis.',
    entities: [
      {
        name: 'Style',
        definition: 'The base product concept — a garment design independent of colour or size.',
        example: 'STY-0082 | Classic Crew-Neck Sweatshirt | Season: AW25 | Range: Essentials | Brand: Noesis Basics',
      },
      {
        name: 'Colourway',
        definition: 'A colour variant of a style, with canonical name and Pantone/hex reference.',
        example: "CLR-0082-04 | Sage | Pantone: 7494 C | Hex: #9CAF88 | Aliases: 'Sage Green' (AU), 'Kaki Sauge' (FR)",
      },
      {
        name: 'SKU',
        definition: 'The atomic sellable unit: Style + Colourway + Size. The thing that goes on a hanger and gets a barcode.',
        example: 'SKU-0082-04-M | Classic Crew-Neck | Sage | UK10/EU38/US8 | EAN: 5060123487291 | RRP: £45.00',
      },
      {
        name: 'Size',
        definition: 'The size variant with market-specific equivalents and measurement spec.',
        example: 'SZ-M | UK: 12 | EU: 40 | US: 8 | AU: 14 | Chest: 96cm | Waist: 80cm | Length: 68cm',
      },
      {
        name: 'Season',
        definition: 'The commercial planning cycle — links styles to a buying season and range plan.',
        example: 'SEA-AW25 | Autumn/Winter 2025 | Buying Deadline: 2025-02-28 | Drop 1: 2025-08-01 | Drop 2: 2025-10-01',
      },
      {
        name: 'Range Plan',
        definition: 'The strategic product assortment plan for a season — how many styles, at what price architecture, for which markets.',
        example: 'RNG-AW25-ESS | Essentials Range | AW25 | Styles: 42 | SKUs: ~840 | Price Architecture: £25-£75 | Markets: UK, EU, AU',
      },
    ],
    hierarchy: [
      { level: 0, name: 'Product Domain — Apparel & Accessories' },
      { level: 1, name: 'Brand (Noesis Basics)' },
      { level: 2, name: 'Season (AW25)' },
      { level: 3, name: 'Range / Collection (Essentials)' },
      { level: 4, name: 'Style', description: 'Classic Crew-Neck Sweatshirt — STY-0082' },
      { level: 5, name: 'Colourway', description: 'Sage — CLR-0082-04' },
      { level: 6, name: 'SKU', description: 'STY-0082 + Sage + UK12 = SKU-0082-04-M' },
      { level: 5, name: 'Material / Fabric', description: '80% Cotton, 20% Polyester | GSM: 280 | Care: 30° Machine Wash' },
    ],
    dmJourney: [
      {
        technique: 'Data Sources',
        why: 'PLM (Centric/Gerber AccuMark), supplier tech packs, GS1/GTIN registration, buying office range plans, ERP style master.',
        exampleChallenge:
          "The AW25 Essentials range has 42 styles. Each style starts in the PLM as a tech pack. By the time it reaches the ERP, it's been re-keyed twice — once by the buying team and once by the data team. 12% have discrepancies.",
      },
      {
        technique: 'Data Integration',
        why: 'PLM → ERP (style master) → OMS → warehouse management → e-commerce PDP → wholesale portals. Each system needs different attribute sets.',
        exampleChallenge:
          "The ERP has the style master. The e-commerce platform needs 28 additional attributes the ERP doesn't hold. These are maintained in a separate spreadsheet by a single merchandiser. When she's on leave, nothing gets updated.",
      },
      {
        technique: 'Data Quality',
        why: 'Size chart standardisation across markets (UK/US/EU/AU), colour naming consistency (Sage ≠ Sage Green ≠ Dark Sage ≠ Khaki Sage), GTIN completeness, supplier spec accuracy.',
        exampleChallenge:
          "The Classic Crew-Neck comes in 5 colours across 6 sizes: 30 SKUs. Colour names were entered by three different buyers across two seasons. 'Sage' now exists as 4 different colour names in the product master. All 4 are the same hex code.",
      },
      {
        technique: 'Data Governance',
        why: 'Who owns style master data? (Buying vs. data team — a constant conflict.) New season style creation approval workflow. Seasonal data archiving policy.',
        exampleChallenge:
          'A new buyer creates 8 styles in the ERP before the data team has received the approved tech packs. 3 are duplicates of existing core styles from last season. The ERP now has parallel records for the same physical product.',
      },
      {
        technique: 'Master Data Management',
        why: 'Style master as golden record (one canonical record per style across buying, merchandising, logistics, retail); size master (one authoritative size chart per market); colour master (one canonical colour name with market aliases).',
        exampleChallenge:
          'Two brands merge into one. Brand A has 600 styles. Brand B has 400. 80 appear to be the same garment with different style codes. Without MDM, both go to market simultaneously, splitting demand and confusing allocation.',
      },
      {
        technique: 'Reverse Integration',
        why: 'Clean style/SKU data → e-commerce PDPs (product detail pages), → wholesale portals (NuOrder/Joor), → warehouse for pick/pack, → POS for scanning, → buying analytics for margin tracking.',
        exampleChallenge:
          "An e-commerce platform shows the Classic Crew-Neck as 'In Stock' in Sage UK12. The warehouse shows 0 units. The OMS shows 4 units reserved. The ERP shows 6 on a PO. All four systems are correct and none agree.",
      },
    ],
    integrations: [
      {
        name: 'GS1 / GTIN',
        category: 'Barcode Standard',
        description: 'Global Trade Item Number registration — every sellable SKU needs a GTIN before it can be scanned, listed online, or shipped to wholesale.',
      },
      {
        name: 'Akeneo / Contentful',
        category: 'PIM',
        description: 'Product Information Management — centralises enriched product attributes (descriptions, images, size guides) for distribution to e-commerce and wholesale channels.',
      },
      {
        name: 'Centric PLM / Gerber AccuMark',
        category: 'PLM',
        description: 'Product Lifecycle Management — tech pack repository, sourcing, and development workflows; upstream source of style and specification data.',
      },
      {
        name: 'NuOrder / Joor',
        category: 'Wholesale',
        description: 'Digital wholesale ordering platforms — receive style and SKU data from the product master for B2B buyer presentations and order management.',
      },
      {
        name: 'Shopify / Salesforce Commerce Cloud',
        category: 'E-Commerce',
        description: 'Direct-to-consumer e-commerce — receives enriched SKU data including size guides, imagery, and availability; source of consumer demand signal.',
      },
    ],
    scenarios: [
      {
        title: 'One Style, Four Colour Names',
        narrative:
          "The Classic Crew-Neck comes in Sage. It's been entered as 'Sage', 'Sage Green', 'Dark Sage', and 'Khaki Sage' across four buying seasons by three different buyers. All four are the same hex code. Your product master has four colour records for one colourway. Your e-commerce shows four variants. Customers are filtering by colour and missing the product.",
        dmConcepts: ['Data Quality', 'Data Governance', 'MDM'],
      },
      {
        title: 'The Mislabelled Knitwear',
        narrative:
          "A new supplier's size specifications use different chest measurements. Their 'Medium' is your 'Small'. The buying team knows. The data team doesn't. 4,000 units arrive. They're labelled, photographed, and listed online. The returns start on day one.",
        dmConcepts: ['Data Quality', 'Data Integration', 'Data Governance'],
      },
      {
        title: 'The E-Commerce Phantom Stock',
        narrative:
          "The website shows Sage UK12 in stock. Warehouse: 0 units. OMS: 4 units reserved. ERP: 6 units on an incoming PO. Customer buys it. It's not there. The complaint is about availability. The cause is four systems with four different truths about one SKU.",
        dmConcepts: ['Data Integration', 'Data Quality', 'MDM'],
      },
    ],
    crossDomainRelationships: [
      {
        targetSlug: 'supplier',
        targetName: 'Supplier',
        dataFlow: 'Style → supplier tech pack → fabric spec → GTIN → delivery lead time',
        withoutThis: 'Cannot de-risk supply chain by style; cannot identify which products are at risk if a supplier fails',
      },
      {
        targetSlug: 'location',
        targetName: 'Location',
        dataFlow: 'Style → range plan → site ranging → allocation',
        withoutThis: 'Wrong ranging means wrong stock in wrong stores; allocation decisions are made on incorrect product hierarchy',
      },
      {
        targetSlug: 'financial',
        targetName: 'Financial Domain',
        dataFlow: 'SKU → sell-through → revenue → margin by style/range',
        withoutThis: 'Margin analysis by range is impossible; buying decisions are made on estimated not actual contribution',
      },
      {
        targetSlug: 'customer',
        targetName: 'Customer',
        dataFlow: 'SKU purchase history → size preference → personalised recommendation',
        withoutThis: 'Size recommendation engines fail; returns rates stay high; personalisation is guesswork',
      },
    ],
  },

  location: {
    slug: 'location',
    name: 'Location',
    tagline: 'A store address seems simple. The data reality of location is anything but.',
    analogy:
      '📍 Location data is the skeleton of retail. Everything else — demand, footfall, range, compliance — hangs off it. A broken bone doesn\'t announce itself until weight is applied.',
    entities: [
      {
        name: 'Site / Store',
        definition: 'The individual trading location — the atomic unit of the location domain.',
        example: 'STR-0042 | Oxford Street | Format: Large | Status: Trading | Opened: 2018-03-01 | Area: 4,200 sqft',
      },
      {
        name: 'Trading Area',
        definition: 'The commercial zone surrounding a site, defined by proximity or spend data.',
        example: 'TA-0042 | Oxford Street Trading Area | Radius: 800m walk | Population: 142,000 | Daytime Workers: 89,000',
      },
      {
        name: 'Catchment',
        definition: 'The customer draw zone — typically defined as 5/10/20 minute travel isochrones.',
        example: 'CA-0042 | 10-min Isochrone | Drive: 3.8km | Walk: 800m | Est. Customer Households: 28,400',
      },
      {
        name: 'District',
        definition: "An operational grouping of stores — the area manager's territory.",
        example: 'DST-007 | Central London District | Stores: 12 | Area Manager: Rachel Wong | Format Mix: 3 Large, 9 Standard',
      },
      {
        name: 'Region',
        definition: "A business unit grouping of districts — the regional director's P&L.",
        example: 'RGN-002 | London Region | Districts: 4 | Stores: 47 | RD: Tom Okafor | Revenue: £48.2M LTM',
      },
      {
        name: 'Digital Listing',
        definition: 'The online presence of a physical site — managed via YEXT and synced to 200+ platforms.',
        example: 'DL-0042 | Oxford Street | YEXT ID: YXT-STR0042 | Google CID: 1829374652 | Last Sync: 2025-03-14 12:31',
      },
    ],
    hierarchy: [
      { level: 0, name: 'Location Domain — Noesis Foods Group' },
      { level: 1, name: 'Division / Brand (Noesis Burger Co.)' },
      { level: 2, name: 'Country / Market (United Kingdom)' },
      { level: 3, name: 'Region', description: 'London Region — RGN-002' },
      { level: 4, name: 'District', description: 'Central London — DST-007' },
      { level: 5, name: 'Site / Store', description: 'Oxford Street — STR-0042' },
      { level: 6, name: 'Trading Area', description: '800m walk zone' },
      { level: 6, name: 'Catchment', description: '10-min isochrone — 28,400 households' },
      { level: 6, name: 'Digital Listing', description: 'YEXT ID: YXT-STR0042' },
      { level: 6, name: 'Cost Centre', description: 'CC-3042 — bridges to Financial Domain' },
      { level: 1, name: 'Format (Large / Standard / Express / Drive-Thru)' },
      { level: 2, name: 'Site', description: 'multiple sites share a format' },
    ],
    dmJourney: [
      {
        technique: 'Data Sources',
        why: 'Property management system (lease dates, sqft, landlord), planning applications (new openings), Google Business Profile, YEXT, internal store master spreadsheets.',
        exampleChallenge:
          "Oxford Street's opening hours exist in: the store master (correct), the YEXT console (3 months out of date), Google Business Profile (wrong since a manual edit in 2023), and the delivery platform (never set up).",
      },
      {
        technique: 'Data Integration',
        why: 'Location master → ERP (for financial reporting) → POS (for store configuration) → loyalty platform (for store-based offers) → YEXT (for digital listings sync to 200+ platforms).',
        exampleChallenge:
          'A new store opens. Data must flow to 9 systems in sequence before trading day: Location master → ERP → POS → Loyalty → YEXT → Google → Delivery Platforms → CRM → Analytics. One failure blocks the chain.',
      },
      {
        technique: 'Data Quality',
        why: 'Address standardisation (SmartyStreets/Loqate), coordinate validation, opening hours completeness, format accuracy, trading status currency.',
        exampleChallenge:
          '340 stores. YEXT reports all synced to Google. A mystery shopper audit finds 23 stores with wrong opening hours on Google Maps. 8 of those have no opening hours in the location master. YEXT synced a blank.',
      },
      {
        technique: 'Data Governance',
        why: 'Who can change location data? (Operations vs. IT vs. Marketing — a 3-way dispute). Change management for store attribute updates (format change triggers 11 downstream updates). Which system is the SOR for each attribute?',
        exampleChallenge:
          'Oxford Street changes format from Large to Express after refurbishment. Format is updated in the store master. Not updated in: ranging allocation, marketing suppression, delivery radius, ERP reporting. 11 systems, 1 update.',
      },
      {
        technique: 'Master Data Management',
        why: 'Location golden record — one authoritative record per site with a canonical site ID; hierarchy management (district/region/country); duplicate detection (same site appearing under two brand codes); YEXT as the publication/MDM layer for digital presence.',
        exampleChallenge:
          'Post-merger: two location masters, 340 + 210 sites. 40 sites appear in both — acquired brand\'s locations that overlap geographically with our own. They need distinct IDs but linked parent records.',
      },
      {
        technique: 'Reverse Integration',
        why: 'YEXT pushes clean location data to 200+ platforms (Google, Apple Maps, Bing, TripAdvisor, Uber Eats). Clean location hierarchy flows to ERP, analytics, loyalty, and delivery radius engines.',
        exampleChallenge:
          "A store closes temporarily for refurbishment. Status is updated in the location master. YEXT sync is scheduled for midnight. At 8pm, a customer arrives. Google still shows 'Open'. The YEXT sync hadn't run.",
      },
    ],
    integrations: [
      {
        name: 'YEXT',
        category: 'Location Intelligence',
        description: 'Digital listings management across 200+ platforms — syncs location master attributes (hours, address, status) to Google, Apple Maps, Bing, TripAdvisor, and delivery platforms.',
      },
      {
        name: 'Google Business Profile API',
        category: 'Digital Presence',
        description: "Manages Google's representation of each physical site — primary source of consumer discovery; discrepancies from the location master directly impact foot traffic.",
      },
      {
        name: 'HERE / Mapbox',
        category: 'Geocoding',
        description: 'Geocoding and isochrone analysis — converts addresses to coordinates and generates catchment travel-time polygons for commercial analysis.',
      },
      {
        name: 'SmartyStreets / Loqate',
        category: 'Address Validation',
        description: 'Address standardisation and validation API — ensures address data conforms to postal authority formats before it enters the location master.',
      },
      {
        name: 'Placer.ai / Verint',
        category: 'DaaS',
        description: 'Footfall analytics — mobile signal data transformed into store visit counts and trading area dwell times; linked to location master for site performance benchmarking.',
      },
    ],
    scenarios: [
      {
        title: 'YEXT Said Synced. Google Said Open.',
        narrative:
          "340 stores. YEXT console reports 100% sync. A mystery shopper audit finds 23 stores with wrong hours on Google Maps. 8 have no opening hours in the location master at all. YEXT synced a blank. Google defaulted to 'Open'. Customers arrive to closed doors for 4 months.",
        dmConcepts: ['Data Quality', 'Data Integration', 'Data Governance'],
      },
      {
        title: 'The Format Change Cascade Nobody Planned',
        narrative:
          'Oxford Street changes from Large to Express. Format is updated in the store master. Ranging allocation still treats it as Large. Marketing suppression still uses Large thresholds. Delivery radius is wrong. 11 downstream systems, 1 update.',
        dmConcepts: ['Data Governance', 'Data Integration'],
      },
      {
        title: "The New Store That Couldn't Trade",
        narrative:
          "New store opening. Data needs to flow across 9 systems in sequence before day one. System 4 (loyalty platform) rejects the store record — postcode format validation fails. The chain stops. POS isn't configured. The store opens without a loyalty system for 3 days.",
        dmConcepts: ['Data Quality', 'Data Integration'],
      },
    ],
    crossDomainRelationships: [
      {
        targetSlug: 'financial',
        targetName: 'Financial Domain',
        dataFlow: 'Location hierarchy → cost centre hierarchy → store P&L',
        withoutThis: "Regional P&Ls compare different baskets of stores when location moves district but cost centre doesn't",
      },
      {
        targetSlug: 'customer',
        targetName: 'Customer',
        dataFlow: 'Store catchment → customer address → footfall attribution',
        withoutThis: 'Cannot link customers to their nearest store; catchment analysis is impossible; personalisation by location fails',
      },
      {
        targetSlug: 'supplier',
        targetName: 'Supplier',
        dataFlow: "Store location → supplier delivery zone → supply coverage map",
        withoutThis: "Cannot identify which stores are at risk if a specific supplier's distribution centre is disrupted",
      },
      {
        targetSlug: 'product-hospitality',
        targetName: 'F&B · Hospitality',
        dataFlow: 'Store → menu ranging → site-specific menu version',
        withoutThis: 'A discontinued item stays live on delivery platforms because location-menu sync wasn\'t triggered',
      },
    ],
  },

  financial: {
    slug: 'financial',
    name: 'Financial Domain',
    tagline: "Every number in your P&L traces back to a data record. Bad records, wrong numbers — forever.",
    analogy:
      '📊 The financial domain is the ledger that everything else posts to. Clean product data posts clean revenue. Clean location hierarchy generates clean store P&L. Clean supplier data generates accurate COGS. Dirty data anywhere upstream doesn\'t just cause a data problem — it causes a financial misstatement.',
    entities: [
      {
        name: 'GL Account',
        definition: 'The atomic unit of financial recording. Every transaction maps to one. Proliferate without governance and you can\'t consolidate.',
        example: 'GL-4100 | Food & Beverage Revenue — UK | Account Group: Revenue | P&L Line: Net Revenue | Status: Active',
      },
      {
        name: 'Account Group',
        definition: 'Logical grouping of GL accounts.',
        example: 'AG-40 | Revenue Group | Accounts: GL-4000 to GL-4999 | Mapped to: P&L Line 1 (Net Revenue) | Owner: CFO Office',
      },
      {
        name: 'Cost Centre',
        definition: 'The organisational unit to which costs are attributed. Must match operational reality or every cost allocation is wrong.',
        example: 'CC-3042 | Oxford Street Store — Operations | District: Central London | Region: London | P&L Owner: Regional Director',
      },
      {
        name: 'Profit Centre',
        definition: 'The unit of commercial P&L accountability — a store, a category, a channel.',
        example: 'PC-0108 | London Region — Dine-In Format | Revenue: £28.4M LTM | Margin: 14.2% | Owner: Tom Okafor',
      },
      {
        name: 'Legal Entity / Company Code',
        definition: 'The registered legal company. Post-acquisition, you may have 15 entities with inconsistent CoA mappings.',
        example: 'LE-0042 | Noesis Foods UK Ltd | Reg No: 09812345 | ERP Code: UK01 | Currency: GBP | Consolidation Group: Noesis Foods Group',
      },
      {
        name: 'Chart of Accounts',
        definition: 'The master reference list of all GL accounts. The most foundational reference data in finance. Rarely governed properly.',
        example: 'COA-UK-v3.2 | Noesis Foods UK | Total Accounts: 4,200 | Account Groups: 8 | Last Governed: 2022-01-01 | Pending Review: 340 accounts',
      },
      {
        name: 'Budget Hierarchy',
        definition: 'The planning structure for financial targets — often mirrors the operational hierarchy but diverges in practice.',
        example: 'BUD-FY26 | FY2026 | Structure: Group → Region → District → Store | Tool: Anaplan | Approved: 2025-11-30',
      },
    ],
    hierarchy: [
      { level: 0, name: 'Financial Domain — Noesis Foods Group' },
      { level: 1, name: 'Legal Entity (Noesis Foods UK Ltd — LE-0042)' },
      { level: 2, name: 'Chart of Accounts', description: 'UK CoA v3.2 — 4,200 accounts' },
      { level: 3, name: 'Account Group', description: 'Revenue: GL-4000–4999' },
      { level: 4, name: 'GL Account', description: 'GL-4100 | F&B Revenue — UK' },
      { level: 2, name: 'Cost Centre Hierarchy' },
      { level: 3, name: 'Region (London Region)' },
      { level: 4, name: 'District (Central London)' },
      { level: 5, name: 'Cost Centre', description: 'CC-3042 | Oxford Street Ops' },
      { level: 2, name: 'Profit Centre Hierarchy' },
      { level: 3, name: 'Channel (Dine-In / Delivery / Drive-Thru)' },
      { level: 4, name: 'Region', description: 'London Region — PC-0108' },
      { level: 5, name: 'District → Store (Oxford Street profit centre)' },
      { level: 2, name: 'Budget Hierarchy', description: 'FY26: Group → Region → District → Store' },
    ],
    dmJourney: [
      {
        technique: 'Data Sources',
        why: 'ERP systems (SAP S/4HANA, Oracle Fusion), FP&A tools (Anaplan, Adaptive Insights), acquired legacy accounting platforms, manual GL journals, intercompany netting feeds.',
        exampleChallenge:
          "Post-acquisition: Noesis Foods UK runs SAP. The acquired company runs Sage 200. Chart of accounts don't align. Revenue account GL-4100 in SAP maps to three different accounts in Sage depending on the revenue type. Nobody mapped them before the migration started.",
      },
      {
        technique: 'Data Integration',
        why: 'ERP → consolidation platform → reporting layer; budget tool → actuals → variance analysis; intercompany elimination feeds; period-end close data flows between entities.',
        exampleChallenge:
          'The period-end close requires intercompany eliminations across 6 legal entities. Two entities use different transaction reference formats. Automated matching covers 78%. The remaining 22% is manual — 3 accountants, 4 days, every month.',
      },
      {
        technique: 'Data Quality',
        why: 'Account code completeness (is every transaction coded?), cost centre assignment accuracy (are costs hitting the right CC?), duplicate account detection, intercompany elimination accuracy.',
        exampleChallenge:
          "Oxford Street's refurbishment costs are split across 3 cost centres — the store CC, the CapEx project code, and a regional overhead CC — because the coding guidance wasn't communicated before the project started. The store's P&L overstates OpEx.",
      },
      {
        technique: 'Data Governance',
        why: 'Who can create a new GL account? (The most contested governance question in finance — operations wants new codes for everything, Finance wants control.) Who approves cost centre changes? Change control for legal entity restructures.',
        exampleChallenge:
          "A new product line launches. The finance business partner creates 12 new GL accounts 'just in case'. 4 are duplicates of existing accounts. 3 are used inconsistently across markets. Quarter-end takes an extra 3 days to close.",
      },
      {
        technique: 'Master Data Management',
        why: "CoA harmonisation post-acquisition; legal entity hierarchy management (OpCo → HoldCo → Ultimate Parent); cost centre golden record across ERP and FP&A tool; budget hierarchy synchronisation.",
        exampleChallenge:
          "Post-merger: Company A has 2,400 GL accounts. Company B has 1,800. Finance mandates a single CoA in 6 months. 600 accounts appear to overlap but have different definitions. 'Revenue: Food' in Company A maps to 3 accounts in Company B by channel. The ERP migration starts in 3 months. The mapping isn't done.",
      },
      {
        technique: 'Reverse Integration',
        why: 'Clean financial hierarchy → BI/analytics (Power BI/Tableau) → executive dashboards; consolidated P&L → FP&A for next-year planning; intercompany-free actuals → group reporting tool; store P&L → regional performance dashboards.',
        exampleChallenge:
          "The board pack shows London Region revenue as £48.2M. The CFO's Anaplan model shows £47.8M. The difference is 4 stores that moved district in Q3. The location master was updated. The cost centre hierarchy in the ERP wasn't. The ERP is wrong. Both numbers are 'right'.",
      },
    ],
    integrations: [
      {
        name: 'SAP S/4HANA / Oracle Fusion',
        category: 'ERP',
        description: 'Financial system of record — GL, AP, AR, and asset accounting; source of all transaction data and the home of the Chart of Accounts master.',
      },
      {
        name: 'Anaplan / Adaptive Insights / Pigment',
        category: 'FP&A',
        description: 'Financial planning and analysis — rolling forecasts, budget hierarchies, and variance analysis; must stay synchronised with ERP actuals.',
      },
      {
        name: 'BlackLine',
        category: 'Close Automation',
        description: 'Account reconciliation and close management — automates matching of intercompany transactions and flags unreconciled items before period-end.',
      },
      {
        name: 'Workiva',
        category: 'Regulatory Reporting',
        description: 'Statutory and compliance reporting — connects ERP data to formatted financial statements; used for external audit and regulatory submissions.',
      },
      {
        name: 'OneStream / Oracle Hyperion EPM',
        category: 'Consolidation',
        description: "Group financial consolidation — aggregates legal entity P&Ls, applies intercompany eliminations, and produces the group's consolidated financial statements.",
      },
    ],
    scenarios: [
      {
        title: 'The Post-Acquisition CoA Nightmare',
        narrative:
          "Two companies merge. Company A: 2,400 GL accounts. Company B: 1,800. 'Revenue: Food' maps to three accounts in Company B by channel. The ERP migration starts in 3 months. The Chart of Accounts mapping isn't done. The first consolidated P&L will be wrong. It takes 11 weeks to find all the variances.",
        dmConcepts: ['MDM', 'Data Integration', 'Data Governance'],
      },
      {
        title: 'The Restructure Nobody Told Finance',
        narrative:
          "40 stores move to a new district configuration. Operations updates the org chart. Finance doesn't update the cost centre hierarchy in the ERP for 2 months. Two quarters of regional P&Ls compare different baskets of stores. The CFO's YoY performance review is comparing apples to oranges.",
        dmConcepts: ['Data Quality', 'Data Governance', 'Location Domain'],
      },
      {
        title: '12 GL Accounts, Zero Governance',
        narrative:
          "A new product line launches. The finance business partner creates 12 new GL accounts. 4 are duplicates. 3 are coded inconsistently across markets. Quarter-end takes an extra 3 days. The product line's P&L is split across 9 account codes. By the time someone notices, 2 quarters of data are wrong.",
        dmConcepts: ['Data Governance', 'Data Quality'],
      },
    ],
    crossDomainRelationships: [
      {
        targetSlug: 'location',
        targetName: 'Location',
        dataFlow: 'Location hierarchy → cost centre hierarchy → store P&L',
        withoutThis: "Regional P&Ls compare different baskets of stores when stores move district but their cost centres don't follow",
      },
      {
        targetSlug: 'supplier',
        targetName: 'Supplier',
        dataFlow: 'Supplier master → payment terms → AP journal → COGS',
        withoutThis: 'Wrong payment terms mean wrong cash flow forecast and incorrect COGS — margin calculations are corrupted',
      },
      {
        targetSlug: 'customer',
        targetName: 'Customer',
        dataFlow: 'Customer ID → transaction → GL revenue → segment P&L',
        withoutThis: "Revenue by customer segment is impossible; customer profitability analysis doesn't exist",
      },
      {
        targetSlug: 'product-hospitality',
        targetName: 'F&B · Hospitality',
        dataFlow: 'Menu item → recipe cost → food cost % → gross margin by item',
        withoutThis: 'Without accurate recipe costs, menu pricing decisions are made on estimated — not actual — margins',
      },
      {
        targetSlug: 'employee',
        targetName: 'Employee',
        dataFlow: 'Employee → cost centre → payroll journal → labour cost by store',
        withoutThis: 'Labour cost per department is wrong; performance bonuses calculated on incorrect baselines',
      },
    ],
  },
};
