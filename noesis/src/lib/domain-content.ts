export interface DomainEntity {
  name: string;
  definition: string;
}

export interface DomainDMStep {
  technique: string;
  why: string;
}

export interface DomainIntegration {
  name: string;
  category: string;
  description: string;
}

export interface DomainScenario {
  title: string;
  narrative: string;
  dmConcepts: string[];
}

export interface DomainContent {
  name: string;
  tagline: string;
  analogy: string;
  entities: DomainEntity[];
  dmJourney: DomainDMStep[];
  integrations: DomainIntegration[];
  scenarios: DomainScenario[];
}

export const domainContent: Record<string, DomainContent> = {
  customer: {
    name: 'Customer Domain',
    tagline: 'One customer, many faces — your job is to find the single truth.',
    analogy:
      'Managing customer data is like solving a jigsaw puzzle where half the pieces come from different boxes, some are upside down, and new ones keep arriving while you work.',
    entities: [
      {
        name: 'Individual / Person',
        definition:
          'A natural person who interacts with your organisation as a buyer, prospect, or loyalty member. The atomic unit of customer identity.',
      },
      {
        name: 'Household',
        definition:
          'A logical grouping of individuals sharing an address or financial relationship — critical for retail, utilities, and financial services targeting.',
      },
      {
        name: 'Organisation / Account',
        definition:
          'A legal entity that purchases on behalf of a company. In B2B contexts, a single organisation may have dozens of contacts and locations.',
      },
      {
        name: 'Contact Point',
        definition:
          'Email, phone, or address associated with a customer. Contact points change frequently and must be versioned, not overwritten.',
      },
      {
        name: 'Interaction / Event',
        definition:
          'A timestamped record of any engagement — purchase, click, call, or complaint. The raw material of behavioural analytics.',
      },
      {
        name: 'Golden Record',
        definition:
          'The single, authoritative, de-duplicated view of a customer assembled from all contributing source systems via MDM.',
      },
    ],
    dmJourney: [
      {
        technique: 'Data Sources',
        why: 'Customer data is born in fragments: CRM captures sales interactions, loyalty platforms hold purchase history, e-commerce records browsing and buying behaviour, call centres log service history, and CDPs aggregate digital events. Each system holds a partial truth. None holds the whole person.',
      },
      {
        technique: 'Data Integration',
        why: 'The customer identity graph is built by integrating CRM events, loyalty transactions, web/app behavioural streams, and third-party enrichment (Experian, Acxiom). Real-time and batch pipelines both apply — batch for nightly CRM syncs, real-time for consent and preference changes that must propagate instantly.',
      },
      {
        technique: 'Data Quality',
        why: 'Customer DQ is dominated by three failure modes: duplicates (same person, multiple records), incompleteness (missing email, invalid phone, unvalidated address), and staleness (data that was accurate two years ago). Each failure mode has a different fix — dedup requires matching logic; completeness requires enrichment or collection; staleness requires refresh triggers.',
      },
      {
        technique: 'Data Governance',
        why: 'Customer data governance is both a legal obligation and a competitive differentiator. GDPR and CCPA require documented consent, defined retention periods, and the ability to execute subject access and erasure requests. Governance here means: who owns each customer attribute, which system is the record of consent, and who can grant access to PII.',
      },
      {
        technique: 'Master Data Management',
        why: 'MDM creates the customer golden record — one authoritative identity per person, reconciled across CRM, loyalty, e-commerce, and service platforms. Survivor rules decide which system wins on each attribute. Match/merge handles the "John Smith / J. Smith / Jonathan T. Smith" problem at scale. The golden record is the foundation for every downstream activation.',
      },
      {
        technique: 'Reverse Integration',
        why: 'The golden customer record is only valuable when it flows back into operational systems. Clean records update the CRM, feed the CDP for audience segmentation, synchronise the loyalty platform, and drive personalisation engines. Consent changes must reverse-integrate within hours — not overnight batches — to avoid compliance breaches.',
      },
    ],
    integrations: [
      {
        name: 'Salesforce CRM',
        category: 'Source',
        description:
          'Primary source of B2B account and contact data. Often the "system of record" by default — but rarely the cleanest.',
      },
      {
        name: 'Shopify / Magento',
        category: 'Source',
        description:
          'E-commerce platforms that generate transactional customer records, often with duplicate guest checkouts and no deduplication.',
      },
      {
        name: 'Twilio Segment',
        category: 'CDP',
        description:
          'Customer Data Platform that collects behavioural events and attempts identity stitching across web, mobile, and offline touchpoints.',
      },
      {
        name: 'Informatica MDM',
        category: 'MDM Hub',
        description:
          'Enterprise MDM platform providing matching, merging, survivorship, and golden record publication for large-scale customer domains.',
      },
      {
        name: 'Experian / Acxiom',
        category: 'Enrichment',
        description:
          'Third-party data providers that append demographics, firmographics, and address verification to enrich thin customer records.',
      },
      {
        name: 'Snowflake',
        category: 'Warehouse',
        description:
          'Central analytical store where customer golden records are joined with behavioural, transactional, and third-party data for segmentation and analytics.',
      },
    ],
    scenarios: [
      {
        title: 'The Loyalty Duplicate Nightmare',
        narrative:
          'Your loyalty programme has 2.1 million members. Your CRM has 1.4 million contacts. Your CFO asks: "How many unique customers do we actually have?" No one can answer. Marketing has been emailing the same person three times with different discount codes. One customer complained she received four birthday emails.',
        dmConcepts: ['Identity Resolution', 'Deduplication', 'Golden Record', 'MDM'],
      },
      {
        title: 'GDPR Erasure Request at 3am',
        narrative:
          'A customer submits a right-to-erasure request. Your legal team has 30 days. The customer exists in: CRM, loyalty database, e-commerce platform, email marketing tool, data warehouse, and two analytics sandboxes. No one has mapped where customer PII lives. The clock is ticking.',
        dmConcepts: ['Data Governance', 'Privacy', 'Data Lineage', 'GDPR Compliance'],
      },
      {
        title: 'The Acquisition Integration',
        narrative:
          'You acquired a competitor. Their 800,000 customers must be merged into your customer master. Their data uses different naming conventions, a different address format, and no email validation. Overnight, your duplicate rate doubles and your golden record trust score collapses.',
        dmConcepts: ['MDM', 'Data Quality', 'Identity Resolution', 'Survivorship Rules'],
      },
    ],
  },

  location: {
    name: 'Location Domain',
    tagline: 'An address is a contract with geography — get it wrong and nothing arrives.',
    analogy:
      'Location data is like GPS coordinates on a treasure map — a single digit wrong and you\'re digging in the wrong field.',
    entities: [
      {
        name: 'Address',
        definition:
          'A structured representation of a physical location: street, city, postcode, country. Must be validated against postal authority reference data to be operationally useful.',
      },
      {
        name: 'Geographic Point',
        definition:
          'Latitude/longitude coordinates. The machine-readable truth behind an address — essential for routing, proximity calculations, and geospatial analytics.',
      },
      {
        name: 'Location / Site',
        definition:
          'A named physical place — store, warehouse, office, or customer premises — that persists over time and carries operational attributes like trading hours and capacity.',
      },
      {
        name: 'Administrative Hierarchy',
        definition:
          'The nested structure of regions: country → state/province → city → district → postcode. Critical for tax jurisdiction, regulatory compliance, and territory management.',
      },
      {
        name: 'Geofence / Zone',
        definition:
          'A defined geographic boundary used for delivery zoning, regulatory jurisdiction, or marketing audience segmentation.',
      },
      {
        name: 'Point of Interest (POI)',
        definition:
          'A categorised, named location — competitor store, landmark, transport hub — used in site selection, field sales, and competitive analysis.',
      },
    ],
    dmJourney: [
      {
        technique: 'Data Sources',
        why: 'Location data originates from property management systems (lease terms, physical dimensions), planning and permits databases, internal store opening project trackers, Google Business Profile, YEXT, and delivery platform merchant portals. Each source holds different attributes — and frequently contradicts the others on trading hours, address, or format.',
      },
      {
        technique: 'Data Integration',
        why: 'The location master must ingest from property systems, feed into ERP (for financial and allocation rules), POS (for transaction assignment), loyalty (for earn/burn zone rules), and digital listing platforms. The integration sequence on a new store opening is strict: location master must be populated before any downstream system can be configured — a broken chain delays trading.',
      },
      {
        technique: 'Data Quality',
        why: 'Location DQ centres on address standardisation (SmartyStreets, Loqate), coordinate validation (lat/long within expected bounds), trading hours completeness, and format/classification accuracy. A single wrong format code ("Express" instead of "Large") triggers incorrect range allocations, wrong delivery radius rules, and suppressed marketing campaigns — all silently.',
      },
      {
        technique: 'Data Governance',
        why: 'Who has authority to change a store attribute? Without governance, the property team updates trading hours in one system, the ops team updates another, and digital listings inherit whichever wins the last write. Location governance defines the system of record per attribute, the approval workflow for changes, and the propagation SLA — how quickly a change must reach all downstream systems.',
      },
      {
        technique: 'Master Data Management',
        why: 'Location MDM manages the hierarchy: store → district → region → country → brand. It maintains the golden record per site — one authoritative store ID that all systems reference. For multi-brand or post-acquisition estates, MDM resolves duplicate site records (two systems, same building, different IDs) and rationalises the hierarchy.',
      },
      {
        technique: 'Reverse Integration',
        why: 'Clean location data is published back to 200+ digital platforms via YEXT, to Google Business Profile API for search visibility, to delivery platforms (Uber Eats, Deliveroo) for trading hours and service radius, and to analytics platforms for estate-level reporting. This is one of the clearest examples of reverse integration in any domain — YEXT exists specifically to solve the "publish once, syndicate everywhere" problem.',
      },
    ],
    integrations: [
      {
        name: 'Google Maps Platform',
        category: 'Geocoding',
        description:
          'Industry-standard geocoding, address autocomplete, and place data API. High coverage globally but costs scale with volume.',
      },
      {
        name: 'HERE Technologies',
        category: 'Geocoding',
        description:
          'Enterprise alternative to Google for geocoding and routing, with stronger offline and logistics use cases.',
      },
      {
        name: 'Loqate / GBG',
        category: 'Address Validation',
        description:
          'Global address validation and standardisation service, used in checkout flows and CRM onboarding to prevent bad addresses at entry.',
      },
      {
        name: 'Esri ArcGIS',
        category: 'GIS',
        description:
          'Enterprise GIS platform for spatial analysis, territory management, and geofencing. The standard for site selection and regulatory mapping.',
      },
      {
        name: 'OpenStreetMap / Nominatim',
        category: 'Open Data',
        description:
          'Open-source geocoding and map data. Lower cost, community-maintained, appropriate for non-critical enrichment and analytics.',
      },
      {
        name: 'Avalara',
        category: 'Tax',
        description:
          'Tax compliance platform that consumes location data to determine applicable sales tax rates by jurisdiction — dependent on accurate geocoding.',
      },
    ],
    scenarios: [
      {
        title: 'The Delivery Black Hole',
        narrative:
          'Your e-commerce platform has a 4.2% failed delivery rate. Each failed delivery costs £18 in redelivery and customer service. The root cause: free-text address entry with no validation. "Flat 2A" becomes "Flat2A", "flat 2 a", and "apt 2A" — three records, none geocodable.',
        dmConcepts: ['Address Validation', 'Data Quality', 'Standardisation', 'Geocoding'],
      },
      {
        title: 'Tax Jurisdiction Misrouting',
        narrative:
          'A border postcode sits across two US state tax jurisdictions. Your system assigns all orders to the wrong state. After 18 months, a tax audit reveals $2.3M in under-collected sales tax. The fix requires retroactive geocoding of 400,000 historical orders and a renegotiation with two state revenue departments.',
        dmConcepts: ['Geocoding', 'Reference Data', 'Administrative Hierarchy', 'Data Quality'],
      },
    ],
  },

  supplier: {
    name: 'Supplier Domain',
    tagline: 'Your supply chain is only as reliable as your supplier data.',
    analogy:
      'Supplier data is like air traffic control — one wrong identifier and you\'re routing cargo to the wrong airport while the right one sits empty.',
    entities: [
      {
        name: 'Supplier / Vendor',
        definition:
          'A legal entity that provides goods or services. Must be uniquely identified across procurement, finance, and logistics systems — a surprisingly rare achievement.',
      },
      {
        name: 'Supplier Site / Location',
        definition:
          'A physical address where goods ship from or invoices originate. One supplier may have dozens of sites with different lead times and contacts.',
      },
      {
        name: 'Supplier Contact',
        definition:
          'Named individuals at the supplier — account manager, quality contact, invoicing. Contact data decays rapidly; supplier contacts change jobs often.',
      },
      {
        name: 'Contract / Agreement',
        definition:
          'The terms under which a supplier operates: pricing tiers, payment terms, SLAs, and compliance requirements. Contracts must link to the supplier master, not float independently.',
      },
      {
        name: 'Supplier Category',
        definition:
          'A taxonomy node classifying what the supplier provides — raw materials, logistics, professional services. Critical for spend analysis and risk aggregation.',
      },
      {
        name: 'Certification / Compliance Record',
        definition:
          'ISO certifications, ESG ratings, audit results, and regulatory approvals. These expire and must trigger re-qualification workflows when they do.',
      },
    ],
    dmJourney: [
      {
        technique: 'Data Sources',
        why: 'Supplier data enters through onboarding forms, supplier self-service portals, Companies House or GLEIF for legal entity validation, Dun & Bradstreet for global business identity, and ERP purchase order history. Certificate documents (ISO, organic, halal, food hygiene) arrive as PDFs, expiry dates buried in free-text fields or spreadsheets.',
      },
      {
        technique: 'Data Integration',
        why: 'The supplier master must feed procurement platforms (Coupa, SAP Ariba), ERP for purchase orders and goods receipt, accounts payable for payment execution, and sustainability reporting for ESG metrics. Certificate data must integrate with compliance tracking systems. When any of these integrations lag, the consequences range from delayed payments to regulatory exposure.',
      },
      {
        technique: 'Data Quality',
        why: 'Supplier DQ has a financial dimension that is often underestimated. Bank account completeness and accuracy is not an administrative nicety — wrong bank details mean payments to the wrong account. VAT and tax ID validation prevents fraudulent vendor creation. Certificate expiry tracking is a compliance obligation. Contact completeness determines whether your procurement team can actually reach the supplier.',
      },
      {
        technique: 'Data Governance',
        why: 'Supplier governance defines who can create, approve, and modify vendor records. Segregation of duties between the person who creates a supplier and the person who approves it is a core financial control (preventing fictitious vendor fraud). Certificate governance means defined owners for expiry alerts, escalation paths, and trading suspension triggers when certificates lapse.',
      },
      {
        technique: 'Master Data Management',
        why: 'Supplier MDM manages corporate family relationships — the same business can appear as a UK subsidiary, a European parent, and a US holding company, each needing different payment terms and contact details, but linked to the same ultimate beneficial owner. D&B DUNS numbers are the global ID layer. Post-acquisition, supplier master dedup is always one of the largest data migration workstreams.',
      },
      {
        technique: 'Reverse Integration',
        why: 'The clean supplier master publishes back to the procurement catalogue (so buyers see approved vendors), to the AP system (for payment accuracy), to sustainability platforms like EcoVadis (for ESG scoring), and to the contract management system for renewal tracking. Supplier data publication is often overlooked until a payment fails or a contract auto-renews at the wrong rate.',
      },
    ],
    integrations: [
      {
        name: 'SAP Ariba',
        category: 'Procurement',
        description:
          'End-to-end procurement platform that is both a source of supplier master data and a consumer of it. Supplier onboarding often starts here.',
      },
      {
        name: 'Dun & Bradstreet',
        category: 'Enrichment',
        description:
          'D-U-N-S numbers provide a globally unique legal entity identifier. D&B enrichment appends financials, corporate hierarchy, and risk scores to supplier records.',
      },
      {
        name: 'Coupa',
        category: 'Procurement',
        description:
          'Cloud-based spend management platform with supplier portal for self-service data maintenance — reducing the data entry burden on procurement teams.',
      },
      {
        name: 'EcoVadis',
        category: 'ESG',
        description:
          'Sustainability ratings platform. ESG scores from EcoVadis feed into supplier risk profiles and are increasingly required by large enterprise procurement policies.',
      },
      {
        name: 'SAP S/4HANA',
        category: 'ERP',
        description:
          'Core ERP system where vendor master data lives for accounts payable. Mismatches between procurement supplier master and ERP vendor master cause payment failures.',
      },
      {
        name: 'World-Check (Refinitiv)',
        category: 'Compliance',
        description:
          'Sanctions and PEP screening database. New suppliers and periodic re-screens run against World-Check as part of KYS (Know Your Supplier) compliance.',
      },
    ],
    scenarios: [
      {
        title: 'The Ghost Supplier Fraud',
        narrative:
          'An internal audit reveals £340,000 paid to a supplier no one in procurement recognises. Investigation shows a vendor record was created with a slight name variation — "Acme Services Ltd" vs existing "Acme Services Limited" — bypassing duplicate detection. The bank account was changed two weeks before payment without approval workflow.',
        dmConcepts: ['Supplier MDM', 'Data Governance', 'Deduplication', 'Workflow Controls'],
      },
      {
        title: 'Concentration Risk Invisible Until Crisis',
        narrative:
          'A geopolitical event disrupts a key region. Your risk team discovers that 14 of your "different" suppliers are subsidiaries of one parent entity headquartered there. Without corporate hierarchy data in your supplier master, this concentration was invisible — until $8M of orders were at risk simultaneously.',
        dmConcepts: ['Hierarchy Management', 'Risk Data', 'Supplier MDM', 'Data Governance'],
      },
      {
        title: 'Certification Expiry Cascade',
        narrative:
          'A food supplier\'s allergen management certification expired 47 days ago. Nobody noticed — because certifications were stored in a shared drive, not linked to the supplier master. Your quality team approved three purchase orders against an unqualified supplier. Regulatory exposure: significant.',
        dmConcepts: ['Reference Data', 'Data Quality', 'Supplier MDM', 'Governance Workflows'],
      },
    ],
  },

  fb: {
    name: 'Food & Beverage Domain',
    tagline: 'Every ingredient has a story — your data must tell it accurately, or someone gets hurt.',
    analogy:
      'F&B product data is like a nutritional label — one missing allergen and the consequences go well beyond a data quality score.',
    entities: [
      {
        name: 'Recipe / Formulation',
        definition:
          'The structured definition of a product\'s composition: ingredients, quantities, processing steps, and yield. The master recipe is the source of truth for everything downstream — costing, labelling, regulatory filing.',
      },
      {
        name: 'Ingredient / Raw Material',
        definition:
          'A purchased input with its own data profile: supplier, country of origin, allergen declarations, and shelf life. Ingredient changes cascade through every recipe that uses them.',
      },
      {
        name: 'Finished Product / SKU',
        definition:
          'The sellable unit with its own GTIN/barcode, packaging configuration, and regulatory registration. One recipe may produce multiple SKUs (sizes, markets, private label).',
      },
      {
        name: 'Nutritional Profile',
        definition:
          'Calculated or lab-measured nutritional values per serving and per 100g. Must match between recipe system, label, and retailer portal — three common sources of drift.',
      },
      {
        name: 'Allergen Declaration',
        definition:
          'The fourteen major allergens (EU) or nine major allergens (US) present in or may be present in the product. A single wrong declaration is a safety incident and potential product recall.',
      },
      {
        name: 'Shelf Life / Date Coding',
        definition:
          'Best before, use by, and shelf life parameters that drive distribution rules, waste management, and consumer safety. Must be managed at both recipe and batch level.',
      },
    ],
    dmJourney: [
      {
        technique: 'Data Sources',
        why: 'Menu and recipe data originates in recipe management systems (Fourth, Crunchtime), POS platforms (Oracle Simphony, NCR Aloha), supplier ingredient specifications, and nutritional calculation platforms (Nutritics). Logistical variants — the purchasable form from a supplier — live in the supply chain system and must be mapped to recipe ingredients. These sources rarely speak to each other natively.',
      },
      {
        technique: 'Data Integration',
        why: 'The integration chain is: supplier ingredient → recipe system → nutritional calculation (Nutritics API) → menu content management → POS → digital menu board → delivery platform. Every link matters. A supplier updating an ingredient specification must trigger a recalculation cascade — from recipe, through nutritional values, to allergen declarations on the published menu.',
      },
      {
        technique: 'Data Quality',
        why: 'In F&B, data quality is not just operational — it is a legal and safety obligation. Allergen declaration accuracy is governed by Natasha\'s Law and EU Food Information Regulations. Calorie labelling accuracy is mandatory in venues with 250+ employees. Portion yield consistency affects food cost calculations. Every recipe must have complete ingredient coverage — a recipe with missing ingredients is a compliance and cost risk simultaneously.',
      },
      {
        technique: 'Data Governance',
        why: 'Who has authority to change a recipe? In most hospitality businesses, this is dangerously informal. Governance defines the change control process for recipe modifications (especially allergen-impacting changes), the approval workflow for new menu items, the version history for recipes, and the publication sign-off before changes go live on digital menus or POS. Without governance, a chef\'s tweak becomes a compliance breach.',
      },
      {
        technique: 'Master Data Management',
        why: 'Menu item MDM becomes critical at scale — particularly after acquisitions. When two brands are merged, hundreds of menu items may be similar but not identical: different portion sizes, different recipe variants, different names for the same dish. MDM defines the golden menu item, maps logistical variants to the correct recipe, and manages the ingredient master (one canonical definition of "chicken breast" across all brands).',
      },
      {
        technique: 'Reverse Integration',
        why: 'Clean, governed menu and nutritional data must publish back to POS (for correct transaction recording and upsell prompts), digital menu boards, delivery platforms (Uber Eats, Deliveroo, Just Eat), the company website, and regulatory compliance reporting. Some brands manage this via a central menu content platform; others push directly. Either way, this is the publication layer where data quality failures become visible to customers.',
      },
    ],
    integrations: [
      {
        name: 'Aptean / Infor Food & Beverage ERP',
        category: 'ERP',
        description:
          'F&B-specific ERP systems with built-in recipe management, batch traceability, and shelf life tracking. The operational core for most mid-to-large F&B manufacturers.',
      },
      {
        name: 'Centric PLM',
        category: 'PLM',
        description:
          'Product lifecycle management for F&B: formulation, regulatory, and labelling workflows in one platform. Reduces the spreadsheet chaos of new product development.',
      },
      {
        name: '1WorldSync / Salsify',
        category: 'Product Content',
        description:
          'Global data pool / PIM platforms used to syndicate product content — including allergens, nutritionals, and images — to retailer portals and GS1 registries.',
      },
      {
        name: 'FoodChain ID',
        category: 'Regulatory',
        description:
          'Testing, certification, and regulatory data management for food safety compliance. Integrates with product master for certification status and expiry tracking.',
      },
      {
        name: 'SAP S/4HANA',
        category: 'ERP',
        description:
          'Large-enterprise ERP where material master, batch management, and quality management modules handle F&B product data at scale.',
      },
      {
        name: 'Trace One',
        category: 'PLM/Compliance',
        description:
          'Retailer-facing product specification and compliance platform. Where private label F&B data is exchanged between manufacturer and retailer.',
      },
    ],
    scenarios: [
      {
        title: 'The Undeclared Allergen',
        narrative:
          'A recipe reformulation substituted one ingredient for a cost-equivalent alternative. The new ingredient contained traces of sesame. The allergen declaration on the recipe system was updated. The label artwork was not. Three months later, a consumer with a sesame allergy was hospitalised. A product recall followed — 1.2 million units, across 4 markets.',
        dmConcepts: ['Allergen Data Management', 'Recipe Management', 'Data Quality', 'Change Control'],
      },
      {
        title: 'Retailer Portal Rejection Cascade',
        narrative:
          'A major supermarket chain upgraded its supplier portal to require 47 mandatory nutritional and allergen fields. Your product master has 31 of them. The remaining 16 are spread across recipe PDFs, spreadsheets, and one R&D scientist\'s inbox. 340 products were rejected from the portal, blocking £2.1M of ranging.',
        dmConcepts: ['Product MDM', 'Data Completeness', 'Data Quality', 'Product Content Syndication'],
      },
    ],
  },

  apparel: {
    name: 'Apparel Domain',
    tagline: 'One style, fifty variants — and every variant is a data management problem.',
    analogy:
      'Apparel data is like a matrix — style × colour × size — and a gap in any cell breaks an order, a replenishment, or a customer experience.',
    entities: [
      {
        name: 'Style / Parent Product',
        definition:
          'The design concept that exists independent of colour or size: "Women\'s Slim Fit Blazer". The parent that all variants inherit attributes from.',
      },
      {
        name: 'Colour / Colourway',
        definition:
          'A specific colourway of a style, with its own name (e.g., "Midnight Navy"), associated colour codes, and fabric references. A style typically has 3–12 colourways.',
      },
      {
        name: 'Size',
        definition:
          'A size variant within a colourway. Sizes differ by market (UK 12 ≠ US 12 ≠ EU 42) and by category (clothing vs footwear vs accessories). Size data is a global harmonisation problem.',
      },
      {
        name: 'SKU',
        definition:
          'The atomic sellable unit: one style, one colour, one size. A single collection with 200 styles × 6 colours × 10 sizes = 12,000 SKUs — each needing a full data record.',
      },
      {
        name: 'Material / BOM',
        definition:
          'The bill of materials: fabrics, trims, labels, and packaging. Material data drives sustainability reporting, country of origin calculation, and tariff classification.',
      },
      {
        name: 'Size Chart / Fit Data',
        definition:
          'Garment measurements for each size, used in e-commerce fit recommendations and returns reduction programmes. Inconsistently maintained and rarely linked to the product master.',
      },
    ],
    dmJourney: [
      {
        technique: 'Data Sources',
        why: 'Apparel product data is created across the entire product development lifecycle: range plans in Excel, specifications in PLM (Centric, Gerber), fabric and trim details from suppliers, size grading from technical design, GTINs from GS1 registration, and commercial content (descriptions, images) from creative teams. Each source introduces the product to a different system at a different stage — integration is not optional, it is the product\'s journey from concept to shelf.',
      },
      {
        technique: 'Data Integration',
        why: 'The apparel integration chain runs from PLM (where the product is designed) → ERP (where the style master is created and commercial terms are set) → OMS (where orders are taken) → WMS (where stock is received and picked) → e-commerce (where the product is sold). Breaking this chain — a style not yet in ERP when the warehouse receives stock, or an e-commerce platform without the size chart — creates operational failures that manifest as customer complaints.',
      },
      {
        technique: 'Data Quality',
        why: 'Apparel DQ has unique complexity: size charts are market-specific (S/M/L in UK, 8/10/12 in Australia, 36/38/40 in Europe), colour names are inconsistently applied across buying seasons and brands, and GTIN completeness is a retail trading requirement. A single missing or wrong GTIN stops a product from being scanned at POS or received into the warehouse. Supplier specification accuracy determines whether the garment produced matches what was ordered.',
      },
      {
        technique: 'Data Governance',
        why: 'Apparel governance defines who can create a new style, what mandatory attributes must be complete before a style can progress to the next stage (e.g. no purchase order can be raised without a complete size chart), how seasonal data is archived, and how colour and size master records are controlled. Without governance, buying teams create styles ad hoc, size naming drifts, and the product data estate becomes archaeological.',
      },
      {
        technique: 'Master Data Management',
        why: 'Style master MDM creates one authoritative definition of each product across buying, merchandising, supply chain, and retail. The size master normalises size naming across markets. The colour master maintains canonical colour names with regional aliases. For multi-brand retailers, MDM resolves cases where the same product appears under different style codes in different brands — consolidating or maintaining as deliberate parallel records.',
      },
      {
        technique: 'Reverse Integration',
        why: 'Complete, governed product data publishes back to e-commerce PDPs (product detail pages with correct images, descriptions, and size guides), wholesale portals (NuOrder, Joor) for B2B ordering, retail POS for scanning and RFID, warehouse management for receiving and picking, and buying analytics for margin and range performance reporting. The quality of the reverse integration determines the quality of the customer experience — literally.',
      },
    ],
    integrations: [
      {
        name: 'Centric PLM',
        category: 'PLM',
        description:
          'Fashion and apparel product lifecycle management — from concept sketch to production handoff. Source of style, colour, and material master data.',
      },
      {
        name: 'Akeneo PIM',
        category: 'PIM',
        description:
          'Product Information Management platform widely adopted in apparel for managing SKU attributes, digital assets, and multi-channel syndication at variant level.',
      },
      {
        name: 'Shopify / SFCC',
        category: 'E-commerce',
        description:
          'Direct-to-consumer platforms that consume product data — variants, images, descriptions, and sizing — from the PIM or product master.',
      },
      {
        name: 'Manhattan Associates WMS',
        category: 'WMS',
        description:
          'Warehouse management system that requires SKU-level data (dimensions, weights, storage rules) to allocate pick locations and manage replenishment.',
      },
      {
        name: 'GS1 / GXS',
        category: 'Standards',
        description:
          'Global trade item number (GTIN/EAN/UPC) registry. Each SKU requires a registered barcode — the first step in any retailer onboarding process.',
      },
      {
        name: 'Lectra / Gerber',
        category: 'Pattern / Grading',
        description:
          'CAD systems for pattern making and size grading. Measurement data from these systems should feed the fit data master — but rarely does without integration.',
      },
    ],
    scenarios: [
      {
        title: 'The Size Chaos Launch',
        narrative:
          'Your brand entered the US market. UK sizes were mapped to US sizes by a spreadsheet maintained by one person who left the company. For six months, US customers received garments one size too small. Return rates hit 34%. Marketplace seller ratings fell below threshold. The root cause: no size harmonisation table in the product master — just a spreadsheet that no one could trust.',
        dmConcepts: ['Size Harmonisation', 'Product MDM', 'Data Quality', 'Reference Data'],
      },
      {
        title: 'The Image-SKU Mismatch',
        narrative:
          'A product photography batch was uploaded with filenames generated by the studio — not by your SKU codes. The DAM team matched by colour name, not colour code. "Midnight Navy" and "Dark Navy" exist in your taxonomy. 847 SKUs ended up with the wrong product image live on site for 11 days before a customer spotted it. By then, 4,200 orders had been placed.',
        dmConcepts: ['Digital Asset Management', 'Product MDM', 'Data Quality', 'Taxonomy'],
      },
      {
        title: 'Customs Classification Failure',
        narrative:
          'A 10,000-unit shipment was held at the port. The customs broker requested HS tariff codes, fibre content percentages, and country of origin for each of 340 styles. None of these fields existed in your ERP. They were in a spreadsheet the buyer had created, without the correct formatting for customs declarations. The shipment sat for 19 days. The cost: £180,000 in demurrage and missed sell-through.',
        dmConcepts: ['Data Completeness', 'Product MDM', 'Reference Data', 'Data Governance'],
      },
    ],
  },

  employee: {
    name: 'Employee Domain',
    tagline: 'HR data is the most sensitive in the enterprise — and the most fragmented.',
    analogy:
      'Employee data is like a personnel file kept in twelve different cabinets by twelve different departments — each with a slightly different name on the folder.',
    entities: [
      {
        name: 'Person / Worker',
        definition:
          'The individual — full-time employee, contractor, or agency worker. The atomic unit. Must be uniquely identified across HR, payroll, IT, and facilities systems.',
      },
      {
        name: 'Position / Role',
        definition:
          'The job role that exists in the organisational structure, independent of who fills it. Positions can be vacant. One person can hold multiple positions in a matrix organisation.',
      },
      {
        name: 'Organisational Unit',
        definition:
          'Department, team, or cost centre. The hierarchical unit that determines reporting lines, budget ownership, and access controls. Restructures make org hierarchy the most volatile data in the enterprise.',
      },
      {
        name: 'Employment Record',
        definition:
          'The contract of employment: start date, employment type, hours, compensation, and termination data. Must be maintained with legal precision — it is the source of truth for payroll and statutory obligations.',
      },
      {
        name: 'Identity / Access Record',
        definition:
          'The digital identity of the employee: Active Directory account, email, system access rights, and MFA enrolment. Tightly coupled to employment status — a joiners/movers/leavers process failure is a security incident.',
      },
      {
        name: 'Skills / Competency Profile',
        definition:
          'Structured records of qualifications, certifications, and competencies. Essential for workforce planning, role matching, and learning & development — but among the least reliably maintained employee data.',
      },
    ],
    dmJourney: [
      {
        technique: 'Data Sources',
        why: 'Employee data originates in the HRIS (Workday, SuccessFactors) as the intended system of record, but in practice it is fragmented across payroll (ADP, Ceridian), identity management (Microsoft Entra ID, Okta), facilities (desk booking, access control), expense management, and the ATS used for recruitment. Joiners arrive in the HRIS before other systems are ready. Leavers exit the HRIS before all system access is revoked. The gap between these events is where risk accumulates.',
      },
      {
        technique: 'Data Integration',
        why: 'The joiner/mover/leaver (JML) process is the critical integration workflow. A new hire trigger in the HRIS should automatically provision Active Directory access, create a payroll record, assign a cost centre in finance, and generate a facilities ticket. When these integrations are manual, the failure rate is measured in stale access, missed payroll entries, and wrong cost centre allocations. ServiceNow or similar ITSM platforms often orchestrate the JML chain.',
      },
      {
        technique: 'Data Quality',
        why: 'Employee DQ failures are often invisible until they cause financial or security incidents. Cost centre misassignment silently mis-charges departmental budgets. Job title inconsistency undermines org chart accuracy and succession planning. Leavers not terminated in downstream systems are a security and audit risk. Manager hierarchy gaps break approval workflows. The highest-impact DQ check in this domain is: does every active HRIS record map to an active identity in Active Directory, and vice versa?',
      },
      {
        technique: 'Data Governance',
        why: 'Employee data governance carries the highest sensitivity classification in most organisations. Salary, medical, disciplinary, and performance data require strict access controls and audit logging. GDPR mandates defined retention periods (often 7 years post-termination for payroll records, 6 months for interview notes). Data governance here defines who can see what, how long it is kept, and how it is disposed of — with documented justification for every exception.',
      },
      {
        technique: 'Master Data Management',
        why: 'Employee MDM is most critical in two scenarios: post-merger integration (reconciling two HRIS systems with overlapping employee populations, mismatched job titles, and conflicting cost centre codes) and multi-system environments (where the same person exists in HRIS, payroll, Active Directory, and an external contractor platform with different IDs and potentially conflicting attributes). For single-HRIS organisations with clean JML processes, MDM scope may reduce to dedup on rehire and golden record maintenance — DQ and Governance may deliver more value than a full MDM implementation.',
      },
      {
        technique: 'Reverse Integration',
        why: 'Approved, governed employee data publishes back to payroll (for accurate salary payments), Active Directory (for system access provisioning), facilities management (desk assignments, access cards, car park allocation), L&D platforms (for training assignment based on role and location), and workforce analytics (for headcount, attrition, and cost reporting). The payroll reverse integration is the one with zero tolerance for error — every mistake is visible on payday.',
      },
    ],
    integrations: [
      {
        name: 'Workday HCM',
        category: 'HRIS',
        description:
          'Leading cloud HRIS — system of record for employee master data, org hierarchy, and compensation. Often the source of truth for JML triggers.',
      },
      {
        name: 'SAP SuccessFactors',
        category: 'HRIS',
        description:
          'Enterprise HR suite covering core HR, talent, learning, and succession. Complex integration footprint across payroll and IT systems.',
      },
      {
        name: 'Microsoft Active Directory / Entra ID',
        category: 'Identity',
        description:
          'Corporate identity platform. Employee records from HRIS must flow into AD/Entra to provision accounts, email, and access rights. JML latency between HRIS and AD is the most common security finding in enterprise audits.',
      },
      {
        name: 'ADP / Ceridian Dayforce',
        category: 'Payroll',
        description:
          'Payroll systems that consume employee master data. Discrepancies between HRIS and payroll are the primary source of payroll errors and regulatory penalties.',
      },
      {
        name: 'ServiceNow HRSD',
        category: 'Service Delivery',
        description:
          'HR service delivery platform that consumes employee master data to route queries, manage cases, and trigger onboarding workflows.',
      },
      {
        name: 'Okta / CyberArk',
        category: 'Identity Security',
        description:
          'Identity governance platforms that enforce access policies based on employee role and status. Require real-time sync with HRIS to respond to leavers within policy windows.',
      },
    ],
    scenarios: [
      {
        title: 'The Ghost Account Security Breach',
        narrative:
          'An employee left the company. Offboarding was completed in Workday. But the IT team\'s joiner/mover/leaver process ran nightly — not in real time. The former employee\'s VPN access remained active for 31 hours. During that window, a competitor reached out. The access logs showed login activity 18 hours after termination. Legal, HR, and IT spent four months in investigation. The fix was a real-time JML integration — the kind that should have been built on day one.',
        dmConcepts: ['JML Process', 'HR MDM', 'Identity Management', 'Data Governance'],
      },
      {
        title: 'The Restructure That Broke Payroll',
        narrative:
          'A regional reorganisation moved 340 employees to a new cost centre structure. The change was made in Workday. HR assumed payroll would pick it up automatically. Payroll ran on a different integration schedule and used a cost centre table that wasn\'t updated. Six weeks of payroll was coded to dissolved cost centres. Finance couldn\'t reconcile. Payroll was delayed. Employees complained.',
        dmConcepts: ['Org Hierarchy', 'Data Integration', 'Reference Data', 'JML Process'],
      },
      {
        title: 'The GDPR Subject Access Explosion',
        narrative:
          'A disgruntled ex-employee submitted a Subject Access Request on their last day. Your legal team has 30 days. The employee\'s data spans: Workday, ADP, performance management system, expense platform, IT ticketing, email archive, and three legacy project management tools. No one has a data map. The DPO starts manually emailing system owners.',
        dmConcepts: ['Data Privacy', 'Data Governance', 'Data Lineage', 'GDPR Compliance'],
      },
    ],
  },
};
