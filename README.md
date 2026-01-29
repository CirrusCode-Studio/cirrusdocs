# CirrusDocs AI

CirrusDocs AI is a document processing and analysis system designed to extract,
structure, and manage data from various document formats. The project focuses on
building a scalable backend architecture that supports document parsing,
storage, and further AI-assisted processing.

## 🚀 Features

- Upload and manage documents
- Parse and extract structured data from documents
- Modular parsing service for extensibility
- Metadata storage and document management
- Designed for AI-assisted document analysis in future stages

## 🧱 System Architecture

The system is designed with a modular, service-oriented structure to separate
core business logic, parsing services, and infrastructure components.

```text
cirrusdocs-ai/
├── ai-core/ # AI-related logic and domain experiments
├── backend/ # Main backend service (NestJS)
├── py-parsing-service/ # Python-based document parsing service
├── frontend/ # Frontend application
├── infra/ # Infrastructure and deployment configurations
├── docs/ # Technical documentation
└── README.md
```

## 🛠️ Tech Stack

### Backend
- **Framework**: NestJS
- **Database**: PostgreSQL
- **Cache / Queue**: Redis
- **Object Storage**: MinIO
- **API**: RESTful APIs

### Parsing Service
- **Language**: Python
- **Purpose**: Document parsing and extraction

### Frontend
- **Framework**: NextJS

### Infrastructure
- Docker / Docker Compose
- Environment-based configuration

## ⚙️ Processing Flow

1. Documents are uploaded via the backend API.
2. Files are stored in MinIO object storage.
3. Document metadata and processing status are stored in PostgreSQL.
4. Parsing requests are delegated to the Python parsing service.
5. Extracted data is returned and managed by the backend system.

## 📌 Current Status

- Core backend architecture implemented
- Document upload and storage flow completed
- Parsing service integration in progress
- Basic caching and task coordination using Redis

## 🔮 Future Improvements

- Improve AI-based content understanding
- Add support for more document formats
- Optimize parsing performance and scalability
- Enhance monitoring and error handling

## 👨‍💻 Ownership & Contribution
Maintained under **CirrusCode Studio** organization.
Primary contributor: **Tuan Kiet**.

## 👤 Author
**Tuan Kiet**  
Recent Software Technology Graduate  
Focused on backend development, distributed systems, and AI-assisted document processing

---
