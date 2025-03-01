# GitHub Kanban Board

This project is an interactive Kanban board for managing GitHub Issues. Users can input a GitHub repository URL, load its issues, and drag them between "ToDo", "In Progress", and "Done" columns. The project includes tests to verify component rendering.

## Deployment
  The project is deployed on Netlify: https://github-kanban-board.netlify.app/

## Features
- Load GitHub repository issues by URL.
- Drag-and-drop functionality to move issues between columns.
- Persistent state using `localStorage` (issue positions) and `sessionStorage` (URL and metadata).
- Random repository generator for quick testing.
- Highlighting of the target column during drag-and-drop.
- Component testing with React Testing Library.

## Technologies
- **Frontend**: React, TypeScript, Chakra UI
- **State Management**: Redux Toolkit, Redux Persist
- **Drag-and-Drop**: @dnd-kit
- **Testing**: Jest, React Testing Library
- **Deployment**: Netlify
- **Version Control**: Git, GitHub

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/GithubKanbanBoard.git
2. Install dependencies:
    npm install
3. Run the project locally:
    npm run dev