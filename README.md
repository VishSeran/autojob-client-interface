# AutoJob — Autonomous Job Application Multi-Agent System

**An AI-powered job discovery and application assistant built with LangGraph, FastAPI, and the Model Context Protocol (MCP).**

AutoJob helps job seekers discover relevant opportunities, compare vacancies against their resumes, generate tailored cover letters, and prepare job applications through a human-in-the-loop workflow. The system combines LLM-based agents with structured data extraction, persistent workflow state, and user-controlled approval before an application is sent.

> **Project status:** Active development. The backend agent workflow is being developed and tested; the React frontend and some production integrations are planned or in progress. Features described below may not all be production-ready.

## Overview

Job hunting often involves repeating the same tasks: searching vacancy boards, reading job advertisements, comparing qualifications, drafting application emails, and tracking submissions. AutoJob brings these steps into a coordinated, auditable workflow while keeping the user in control of important decisions.

The platform is designed to:

- Search job vacancies based on natural-language requests.
- Retrieve vacancy information from external job sources through MCP tools.
- Extract job details from advertisement images using a vision-capable LLM.
- Parse resumes into structured candidate profiles.
- Evaluate job relevance against education, skills, experience, and projects.
- Generate job-specific cover letters and application email drafts.
- Pause for user approval or rejection of a vacancy.
- Allow final email review before an application is sent.
- Preserve workflow progress using LangGraph checkpoints.

## How It Works

```mermaid
flowchart TD
    A[User starts job search] --> B[Load and parse resume]
    B --> C[Interpret search query]
    C --> D[Discover vacancies through MCP]
    D --> E[Extract advertisement details with vision LLM]
    E --> F[Evaluate job relevance]
    F --> G{User approves job?}
    G -- No --> H[Skip and continue to next job]
    H --> G
    G -- Yes --> I[Generate cover letter and email draft]
    I --> J{User approves final email?}
    J -- Edit --> I
    J -- Cancel --> H
    J -- Send --> K[Send via authorized Gmail connection]
    K --> L[Record application outcome]
    L --> H
```

*The diagram illustrates the intended end-to-end flow; individual branches and integrations are subject to ongoing implementation.*

## Key Features

### Intelligent Job Discovery

Natural-language job searches are converted into structured search parameters such as keywords, categories, locations, and result limits. The MCP integration allows AutoJob to interact with external job-search tools, including a TopJobs.lk integration under development.

### Resume Parsing and Candidate Profiles

Candidate resumes are transformed into structured data covering personal details, education, technical skills, experience, projects, certifications, and extracurricular activities. This profile provides context for subsequent job matching and cover letter generation.

### Vision-Based Vacancy Extraction

Some job boards publish vacancy details as images. A vision-capable model extracts visible job information, including responsibilities, requirements, descriptions, and contact details when available. Missing information should remain missing rather than being invented.

### AI Job Relevance Scoring

An LLM-assisted relevance agent evaluates each vacancy against the candidate's profile. The scoring workflow is designed to consider required qualifications, preferred skills, experience, and project alignment, helping users prioritize promising opportunities.

### Human-in-the-Loop Decisions

LangGraph interrupts allow the workflow to pause while a user reviews a job. Users can approve or reject opportunities before the system prepares an application. A second review stage is intended to support approval, editing, or cancellation of a drafted email before sending.

### Personalized Cover Letters

A cover letter agent drafts vacancy-specific application messages using information grounded in the candidate's resume and the job advertisement. It is instructed not to fabricate qualifications or employment history.

### Persistent Workflows

LangGraph checkpointing, backed by PostgreSQL, is used to retain workflow state across requests. This enables the API to resume the correct workflow using its persisted thread identifier.

### Gmail Application Delivery

The architecture includes Gmail OAuth integration for authorized email sending. Applications should only be sent after explicit user confirmation. Delivery status and application history are part of the intended workflow.

## Technology Stack

| Layer | Technologies |
| --- | --- |
| Backend API | Python, FastAPI, Pydantic |
| Agent orchestration | LangGraph, LangChain |
| LLM integration | Groq and provider-compatible language/vision models |
| External tools | Model Context Protocol (MCP), FastMCP |
| Database | PostgreSQL, SQLAlchemy 2.x, Alembic, psycopg |
| Workflow persistence | LangGraph PostgreSQL checkpointer |
| Authentication | JWT-based sessions; Google OAuth for Gmail integration |
| Frontend (planned) | React, TypeScript, Vite, Tailwind CSS |
| Email integration | Gmail API |

## Architecture

AutoJob separates API and persistence concerns from the agent workflow:

1. **FastAPI routes** receive authenticated workflow requests and user decisions.
2. **Workflow services** manage database records, workflow identifiers, and lifecycle operations.
3. **LangGraph** coordinates agents, state transitions, and approval interrupts.
4. **MCP clients and servers** expose job-search and vacancy-detail tools.
5. **LLM agents** handle query understanding, vision extraction, relevance evaluation, and cover letter drafting.
6. **PostgreSQL** stores application data, connection records, and checkpoint state.
7. **Gmail integration** handles authorized application delivery after review.

### Main workflow stages

| Stage | Responsibility |
| --- | --- |
| Resume extraction | Convert resume information into a structured profile |
| Query extraction | Interpret the user's search request |
| Job search | Fetch matching vacancies from job sources |
| Vacancy extraction | Read job details, including image-based advertisements |
| Relevance evaluation | Compare each job against the candidate profile |
| Job review | Pause for approval or rejection |
| Cover letter generation | Prepare a tailored application draft |
| Email review | Pause for final user confirmation or editing |
| Email delivery | Send an approved application through Gmail |
| Next job | Continue processing remaining vacancies |

## Getting Started

> Setup commands below are a general guide. Check the repository's actual configuration modules, dependency files, and API routes before running the application.

### Prerequisites

- Python 3.11 or a compatible version supported by the project dependencies
- PostgreSQL
- Access credentials for the configured LLM provider
- Credentials for any enabled MCP-backed job source
- Google OAuth credentials if testing Gmail sending
- Node.js and npm when the frontend is added

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/AutoJob-AI-Agent.git
cd AutoJob-AI-Agent
```

Replace `<your-username>` with your GitHub username.

### 2. Create a Python virtual environment

```bash
python -m venv venv
```

On Windows:

```powershell
.\venv\Scripts\activate
```

On macOS or Linux:

```bash
source venv/bin/activate
```

### 3. Install dependencies

If the repository contains a `requirements.txt` file:

```bash
pip install -r requirements.txt
```

Otherwise, use the dependency manager configured in the repository.

### 4. Configure environment variables

Create a local `.env` file based on the application's configuration requirements. For example:

```dotenv
DATABASE_URL=postgresql+psycopg://user:password@localhost:5432/autojob
GROQ_API_KEY=your_api_key
JWT_SECRET_KEY=replace_with_a_strong_random_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

These are illustrative names; match them to the actual `Pydantic Settings` configuration in the codebase. Never commit `.env`, OAuth tokens, resumes, or other secrets to Git.

### 5. Apply database migrations

If Alembic is configured:

```bash
alembic upgrade head
```

### 6. Start the backend

If your FastAPI application object is named `app` in `main.py`:

```bash
uvicorn main:app --reload
```

Adjust the import path to the actual entry point. The development API documentation is normally available at:

```text
http://127.0.0.1:8000/docs
```

Start any required MCP server separately, using its configured host, port, and startup command.

## API and Workflow Integration

The backend is designed around operations for:

- User registration, login, and authenticated sessions.
- Resume upload, parsing, and selection.
- Workflow creation and execution.
- Resuming paused workflows with user decisions.
- Reviewing and finalizing application emails.
- Gmail connection and authorized sending.
- Application history and workflow status.

Exact endpoint names and request schemas may evolve during development. Use the FastAPI OpenAPI documentation (`/docs`) as the source of truth for currently available routes.

### Workflow state and approvals

The frontend should not attempt to reproduce LangGraph's entire internal state. Instead, it should retain the backend-issued workflow identifier, display the current review request, and submit the user's decision to the appropriate endpoint. The backend resumes the persisted LangGraph thread.

## Frontend Roadmap

The planned web interface will include:

- [ ] Authentication screens
- [ ] Job-search dashboard
- [ ] Resume upload and profile management
- [ ] New workflow form
- [ ] Workflow progress and status display
- [ ] Job details and relevance review
- [ ] Cover letter and email preview/editor
- [ ] Gmail connection settings
- [ ] Application history and status tracking

## Development Priorities

- [x] Define the core multi-agent workflow architecture
- [x] Integrate LangGraph workflow state and human-review interrupts
- [x] Develop MCP-based job discovery tooling
- [x] Implement resume and job-detail schema models
- [x] Develop vision extraction and relevance evaluation agents
- [x] Develop cover letter generation workflow
- [ ] Harden MCP response handling and image extraction reliability
- [ ] Improve LLM rate-limit handling and token efficiency
- [ ] Complete end-to-end email review and delivery verification
- [ ] Build and integrate the React frontend
- [ ] Add automated tests, observability, and deployment configuration

Checkboxes describe development progress at a high level, not production-readiness guarantees.

## Security and Responsible Automation

AutoJob is designed to assist users, not to submit applications without oversight.

- Require explicit user approval before sending emails.
- Request only the Google OAuth permissions necessary for the enabled features.
- Encrypt stored OAuth credentials and protect authentication tokens.
- Keep API keys and database credentials out of source control.
- Validate and constrain remote image URLs before server-side downloads.
- Respect job-board terms of service and applicable rate limits.
- Avoid fabricated experience, qualifications, or job details.
- Record application outcomes and handle delivery failures safely.

## Known Limitations

This is an actively developed project. Image-based vacancy extraction depends on source-image quality, accessibility, and the selected vision model. LLM APIs may impose request and token-rate limits. Job listings can be incomplete or outdated, and AI relevance scores are advisory rather than definitive. The application workflow should not be treated as fully automated or production-ready until end-to-end review and email delivery have been tested.

## Contributing

Suggestions, bug reports, and improvements are welcome. If you would like to contribute, open an issue describing the proposed change before submitting a pull request.

## License

No license is specified here. Add a `LICENSE` file and update this section if you decide to release the project under an open-source license.

---

**AutoJob — Discover smarter. Apply with confidence.**
