# Zain Iraq Knowledge Base POC Walkthrough

Live demo: https://zain-iraq.netlify.app

## Purpose

This POC demonstrates how one governed knowledge base can serve three different journeys:

- Customer: public self-service knowledge and feedback.
- Agent: internal assisted support with skill-based knowledge and LLM help.
- Admin: content governance, publishing, visibility, alerts, analytics and API readiness.

The key story is that Admin manages one knowledge source, while Customer and Agent each see the correct version of that content based on role, channel and visibility.

## Recommended Demo Flow

Use this sequence during the walkthrough:

1. Start with the Customer view at `/`.
2. Open the Admin portal at `/admin`.
3. Continue into the Admin workspace and publish the demo update.
4. Return to the Customer view to show the public content update.
5. Open the Agent portal at `/agent`.
6. Continue into the Agent workspace to show internal guidance, pinned content and LLM assistance.
7. Close with API Readiness at `/api-readiness`.

## Customer Journey

Route: `/` or `/customer`

The default screen is customer-facing. It should feel like a public Zain support experience, not an internal dashboard.

The customer layer now includes a website-native support area that mirrors the way Zain content is organized around knowledge categories such as prepaid plans, services and offers, SIM replacement and Super Card. The intelligence layer sits on top of this familiar structure through guided scenarios and ranked answers.

### What the Customer Sees

- Public-only navigation: Home and Customer KB.
- Service alert banner for customer-facing announcements.
- Search box for public FAQs and support articles.
- Guided scenario panel for roaming, SIM replacement, bill/payment and product discovery.
- Ranked public knowledge results with confidence score.
- Public article cards for roaming, bundles and international support.
- "What's New" updates for customer-visible announcements.
- Missing-content feedback box.
- Language switcher for English, Arabic and Kurdish.

### Demo Script

1. Open https://zain-iraq.netlify.app.
2. Point out that the page is customer-facing by default.
3. Show that internal links such as Admin Dashboard and Agent Workspace are not visible.
4. Search for roaming support.
5. Select the Roaming issue scenario to show the linear journey: customer question, intent, best article and next action.
6. Open a public article such as "Roaming support update".
7. Click Helpful or Missing info to show customer feedback capture.
8. Switch to Arabic or Kurdish and show RTL layout.

### Business Message

Customers only see approved public content. They can search, read and provide feedback, but they do not see internal procedures, agent notes or admin tools.

## Admin Journey

Route: `/admin`

The Admin journey starts with a simple portal screen. It explains the role before entering the internal workspace.

### Admin Login Screen

The screen shows:

- Zain brand header.
- Admin portal introduction.
- Admin permissions: publish content, set visibility, manage alerts and review analytics.
- Demo credentials.
- Continue to Admin workspace button.

This is a POC login only and does not represent production authentication.

### Admin Workspace

After continuing into the workspace, Admin can demonstrate:

- Governance workspace overview.
- Demo publish action.
- Guided cause-and-effect workflow for publish update, failed search remediation and notification management.
- Article editor entry point.
- Article lifecycle management.
- Notifications and alerts.
- Analytics and content gaps.
- Agent groups and targeted skills.

### Demo Publish Flow

1. Open `/admin`.
2. Click Continue to Admin workspace.
3. Use the Admin cause-and-effect panel and select Publish update.
4. Click Publish demo update.
5. Return to `/` or `/customer`.
6. Show that the customer-facing content now reflects the updated roaming support message.
7. Open `/agent` and show that Agent also sees the updated operational version.

### Failed Search Remediation Flow

The Admin workspace includes a guided remediation scenario:

1. Review failed searches.
2. Identify a low-confidence roaming query.
3. Create or update the missing KB answer.
4. Approve and publish.
5. Future searches improve.

This is demonstrated as POC workflow logic. In production, the remediation would persist through database, workflow and analytics services.

### Article Management

Route: `/admin/articles`

This screen shows:

- List of articles.
- Status and visibility per article.
- Edit actions.
- Archive action.
- Pin management.

Route: `/admin/articles/roaming-activation`

The editor shows:

- Article title, category, content type and visibility.
- Rich answer area.
- Internal note.
- Media, video and attachment placeholders.
- Workflow steps.
- Channel variants.
- Save draft, Approve, Publish and Archive actions.

### Notifications

Route: `/admin/notifications`

This screen demonstrates how Admin can manage customer or internal alerts:

- Create an announcement.
- Select audience.
- Select channel.
- Schedule alert.
- Publish now.
- Review current announcements.

### Analytics

Route: `/admin/analytics`

This screen shows how Admin can monitor:

- API calls.
- Average response time.
- Low-confidence searches.
- Helpful rating.
- Knowledge gaps.
- Feedback feed.

### Groups and Skills

Route: `/admin/groups`

This screen shows targeted agent groups and skills:

- Billing.
- Technical support.
- Roaming desk.
- Digital care.
- Enterprise/PTX.

### Business Message

Admin governs the knowledge base. Changes made by Admin can control what customers see publicly and what agents see internally.

## Agent Journey

Route: `/agent`

The Agent journey starts with a dedicated portal screen before entering the internal agent workspace.

### Agent Login Screen

The screen shows:

- Agent portal introduction.
- Internal operational notes.
- Skill-based pinned articles.
- AI-assisted KB answers.
- Escalation guidance.
- Demo credentials.
- Continue to Agent workspace button.

### Agent Workspace

After continuing into the workspace, Agent can demonstrate:

- Agent assist workspace.
- Current selected agent skill group.
- Guided agent resolution workflow.
- Search for internal knowledge.
- Ranked knowledge results with confidence score.
- Operational updates.
- LLM assistant grounded by the KB.
- Agent persona cards.
- Personal pinned content.
- Open article tabs.

### Demo Script

1. Open `/agent`.
2. Click Continue to Agent workspace.
3. Show the current agent, for example Roaming.
4. Select a workflow such as Roaming complaint resolution, Escalation workflow or Restricted content access.
5. Show the troubleshooting steps and copy-ready response direction.
6. Search for "customer cannot use data while roaming".
7. Show ranked knowledge results and confidence score.
8. Open an agent article to show the difference between customer answer and internal note.
9. Use Ask assistant to demonstrate the LLM support area.
10. Select another agent persona to show targeted skills and pinned content.

### Agent Article View

Route example: `/agent/article/roaming-activation`

Agent article pages show:

- Copy-ready answer.
- Internal note.
- Procedure steps.
- Delivery channels.
- Confidence score.
- Feedback actions.
- Customer preview link when applicable.

### Business Message

Agents see more than customers. They get operational notes, escalation steps, pinned content and AI support grounded in the approved KB.

## API Readiness

Route: `/api-readiness`

This screen demonstrates that the POC is API-first and can support external channels.

It also includes a POC maturity disclosure that separates what is functional today, what is simulated for demo and what would be required for production.

### APIs Shown

- Search API.
- Article Retrieval API.
- Feedback API.
- Analytics and Logging API.
- Channel Content API.
- LLM Assistant API.

### Demo Points

- Each API card shows method, path and sample JSON.
- The response contract includes confidence score.
- Channel outputs can differ for Website, Chatbot, WhatsApp and Agent Portal.
- The LLM layer is positioned as an optional grounded assistant over approved KB content.
- The assistant labels responses as Live LLM or Simulated fallback so the demo is transparent.

### Sample JSON Links

- `/api-demo/search.json`
- `/api-demo/article.json`
- `/api-demo/feedback.json`
- `/api-demo/analytics.json`
- `/api-demo/channel-response.json`
- `/api-demo/llm-assistant.json`

## Language and RTL Flow

The header includes EN, AR and KU language options.

Demo checks:

- English uses left-to-right layout.
- Arabic uses right-to-left layout.
- Kurdish uses right-to-left layout.
- Public navigation remains customer-only in all languages.
- Article and key support content translate for customer, agent and admin contexts.

## What To Emphasize To Zain

- One knowledge source can serve multiple channels and roles.
- Customer, Agent and Admin journeys are separated clearly.
- Admin controls visibility and publishing.
- Agents receive internal support content without exposing it to customers.
- Customer-facing content remains clean and public.
- Feedback and analytics help identify missing or low-confidence knowledge.
- The POC is ready to discuss API integration, channel responses and LLM grounding.

## Current Maturity Answers

Use these answers if the client asks what is real versus simulated.

- Article count: 8 seeded articles.
- Customer-facing articles: public articles only are shown in the customer journey.
- Agent/internal articles: agent and private group articles are visible in agent/admin journeys.
- Ingestion: manually seeded from Zain-relevant public content and scenario requirements; no automated scraper yet.
- Search: keyword/token scoring with confidence simulation; not semantic/vector search yet.
- Multilingual: UI and seeded content translations exist for English, Arabic and Kurdish; true multilingual semantic search is not implemented yet.
- Confidence score: simulated from seeded article metadata.
- LLM: live Netlify function can call OpenAI when configured; UI falls back to clearly labeled simulated grounded responses if the endpoint/key is unavailable.
- Publishing: session-based demo state through browser local storage; not persisted to backend.
- RBAC: route and UI based separation for POC; no production authentication or authorization enforcement yet.
- Analytics: seeded/static analytics and demo feedback actions; no real event database yet.
- APIs: sample JSON contracts are static except the assistant endpoint, which is a live Netlify function when environment variables are configured.

## Suggested Closing Narrative

This POC is not only a knowledge base UI. It shows how Zain Iraq can govern knowledge centrally, expose approved answers to customers, support agents with internal procedures and prepare the same content for APIs, analytics, digital channels and grounded AI assistance.
