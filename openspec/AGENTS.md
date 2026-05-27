# OpenSpec + Superpowers Workflow

This project uses OpenSpec + Superpowers for spec-driven development.

## Workflow

1. **Propose**: `/opsx:propose <feature>` - Create a change proposal
2. **Design**: Load Superpowers/brainstorming to refine design
3. **Plan**: Load Superpowers/writing-plans to create tasks
4. **Implement**: Load Superpowers/subagent-driven-development or executing-plans with TDD
5. **Archive**: `/opsx:archive` - Complete and archive

## Conventions

- **Version number**: Update `index.html` footer version (currently v1.2.0) on every change — major feature → minor bump, bugfix → patch bump

## Directory Structure

- `openspec/changes/` - Active changes
- `openspec/changes/archive/` - Completed changes
- `openspec/specs/` - Specification documents
- `openspec/project.md` - Project context
